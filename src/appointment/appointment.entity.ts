import { Slot } from 'src/slot/slot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Slot, (slot) => slot.appointment)
  slots: Slot[];

  @Column()
  userId: number;
}
