import { Injectable, OnModuleInit } from '@nestjs/common';
import { Configuration, ConfigurationKeys } from './config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DBConfigService implements OnModuleInit {
  constructor(
    @InjectRepository(Configuration)
    private configurationRepository: Repository<Configuration>,
  ) {}

  // we can do the similar for dayoff and holidays like this structure value: {days: Date[]}
  // with a bit more validating when implementing the controller for the input for changing those. However im out of time so leave it as it is
  async changeDuration(duration: number, unit: 'm' | 'h') {
    await this.configurationRepository.update(
      { key: ConfigurationKeys.DURATION },
      { value: JSON.parse(JSON.stringify({ duration, unit })) },
    );
  }

  async changeWorkingTime(start_hour: string, end_hour: string) {
    await this.configurationRepository.update(
      { key: ConfigurationKeys.WORKING_TIME },
      { value: JSON.parse(JSON.stringify({ start_hour, end_hour })) },
    );
  }

  async getDuration() {
    const {
      value: { duration, unit },
    } = await this.configurationRepository.findOne({
      where: { key: ConfigurationKeys.DURATION },
    });
    return { duration, unit };
  }

  async getWorkingTime() {
    const {
      value: { start_hour, end_hour },
    } = await this.configurationRepository.findOne({
      where: { key: ConfigurationKeys.WORKING_TIME },
    });
    return { start_hour, end_hour };
  }

  // this is init code for duration and working time
  async onModuleInit() {
    const [durationExisted, workingTimeExisted] = await Promise.all([
      this.configurationRepository.exists({
        where: {
          key: ConfigurationKeys.DURATION,
        },
      }),
      this.configurationRepository.exists({
        where: {
          key: ConfigurationKeys.WORKING_TIME,
        },
      }),
    ]);

    if (!durationExisted) {
      await this.configurationRepository.save({
        key: ConfigurationKeys.DURATION,
        value: JSON.parse(JSON.stringify({ duration: 30, unit: 'm' })),
      });
    }

    if (!workingTimeExisted) {
      await this.configurationRepository.save({
        key: ConfigurationKeys.WORKING_TIME,
        value: JSON.parse(
          JSON.stringify({ start_hour: '09:00 AM', end_hour: '06:00 PM' }),
        ),
      });
    }
  }
}
