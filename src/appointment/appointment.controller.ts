import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createAppointment(
    @Body() body: CreateAppointmentDto,
  ): Promise<boolean> {
    //get userId from request, this will just be 1 for now
    const userId = 1;
    return this.appointmentService.createAppointmentbySlots(
      body.slotIds,
      userId,
    );
  }
}
