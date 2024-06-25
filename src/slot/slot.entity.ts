import { Appointment } from 'src/appointment/appointment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Appointment, (appointment) => appointment.slots, {
    onDelete: 'SET NULL',
  })
  appointment: Appointment;

  @Column('date')
  date: Date;

  @Column()
  interval: string;

  @Column('time')
  time: string;

  @Column({ nullable: true })
  appointmentId?: number;
}
