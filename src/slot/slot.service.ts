import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dayjs, getStartAndEndOfDay } from 'src/helpers/dayjs';
import { Between, Repository } from 'typeorm';
import { SlotResponseDto } from './slot.dto';
import { Slot } from './slot.entity';
import { DBConfigService } from 'src/config/config.service';

export const DURATION_UNIT = 'm';
export const DURATION = 30;
export const SLOT_DURATION = `${DURATION}${DURATION_UNIT}`;
export const DAY_START = '09:00 AM';
export const DAY_END = '06:00 PM';
export const DATE_FORMAT = 'MM/DD/YYYY';
export const DATE_READ_FORMAT = `${DATE_FORMAT} hh:mm A`;

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,

    private configurationService: DBConfigService,
  ) {}
  private async _generateSlots(date: string) {
    const [{ start_hour, end_hour }, { duration, unit }] = await Promise.all([
      this.configurationService.getWorkingTime(),
      this.configurationService.getDuration(),
    ]);
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date, DATE_FORMAT);
    const existed = await this.slotRepository.exists({
      where: {
        date: Between(startOfDay.toDate(), endOfDay.toDate()),
        interval: this._getDurationString(duration, unit),
      },
    });
    if (!existed) {
      const slots = [];
      const startWorkingTime = dayjs(`${date} ${start_hour}`, DATE_READ_FORMAT);
      const endWorkingTime = dayjs(`${date} ${end_hour}`, DATE_READ_FORMAT);
      let temp = startWorkingTime.clone();
      while (temp.isBefore(endWorkingTime)) {
        slots.push({
          date,
          interval: SLOT_DURATION,
          time: temp.format('hh:mm A'),
        });
        temp = temp.clone().add(duration, unit);
      }

      await this.slotRepository.save(slots);
    }
  }

  async getSlots(date: string): Promise<SlotResponseDto[]> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date, DATE_FORMAT);
    const { duration, unit } = await this.configurationService.getDuration();

    const slots = await this.slotRepository.find({
      where: {
        // we could add more logic here for filtering out holidays / dayoff but im out of time so just leave it as it is
        date: Between(startOfDay.toDate(), endOfDay.toDate()),
        interval: this._getDurationString(duration, unit),
      },
      relations: ['appointment'],
    });
    if (!slots.length) {
      await this._generateSlots(date);
      return this.getSlots(date);
    }
    // or we can compare here and check if it's overlap with holidays or dayoffs and return another props for UI to know
    const result = slots.map((slot) => new SlotResponseDto(slot));
    return result;
  }

  private _getDurationString(duration: number, unit: string): string {
    return `${duration}${unit}`;
  }
}
