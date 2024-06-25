import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { Slot } from 'src/slot/slot.entity';
import { AppointmentController } from './appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Slot])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
