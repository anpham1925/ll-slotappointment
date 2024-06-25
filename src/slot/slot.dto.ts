import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Matches } from 'class-validator';
import { Appointment } from 'src/appointment/appointment.entity';
import { Slot } from './slot.entity';

export class SlotResponseDto {
  constructor(partial: Partial<Slot>) {
    Object.assign(this, partial);
  }

  date: Date;
  time: string;

  @Exclude()
  appointmentId?: number;

  @Exclude()
  interval: string;

  @Exclude()
  appointment: Appointment;

  @Exclude()
  id: number;

  @Expose()
  get available_slots(): number {
    return this.appointmentId ? 0 : 1;
  }
}

export class GetSlotRequestDto {
  @IsNotEmpty({ message: 'Date is required' })
  @Matches(/^(\d{1,2}(\/)\d{1,2}(\/)\d{2,4})$/i, {
    message: 'date must be formatted as MM/DD/YYYY',
  })
  date: string;
}
