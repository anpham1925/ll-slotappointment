import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsInt({ each: true })
  slotIds: number[];
}
