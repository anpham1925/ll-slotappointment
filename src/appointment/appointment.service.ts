import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from 'src/slot/slot.entity';
import { DataSource, In, IsNull, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,

    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,

    private dataSource: DataSource,
  ) {}

  async createAppointmentbySlots(
    slotIds: number[],
    userId: number,
  ): Promise<boolean> {
    // we can get the MAXIMUM_CONFIG for slots here and restrain it
    const MAXIMUM_SLOT = 5;
    if (MAXIMUM_SLOT < slotIds.length) {
      throw new Error("Can't create appointment with more than 5 slots");
    }

    // a more validation would be check if the slotIds are consecutive, if not, throw another error
    const IS_NOT_CONSECUTIVE_SLOT = false;
    if (IS_NOT_CONSECUTIVE_SLOT) {
      throw new Error('Slot ids are not consecutive');
    }
    const emptySlots = await this.slotRepository.find({
      where: {
        id: In(slotIds),
        appointmentId: IsNull(),
      },
    });

    if (!emptySlots.length || emptySlots.length !== slotIds.length) {
      throw new Error('Slots are not available');
    }

    const newAppointment = this.appointmentRepository.create({
      slots: emptySlots,
      userId,
    });

    await this.appointmentRepository.save(newAppointment);
    return true;
  }

  async cancelAppointment(appointmentId: number) {
    await this.appointmentRepository.delete({
      id: appointmentId,
    });
  }
}
