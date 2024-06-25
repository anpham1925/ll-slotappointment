import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ConfigurationKeys {
  WORKING_TIME = 'WORKING_TIME',
  DURATION = 'DURATION',
  DAY_OFF = 'DAY_OFF',
  UNAVAILABLE_HOURS = 'UNAVAILABLE_HOURS',
}

export type ConfigurationValue = Record<string, any>;

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: ConfigurationKeys,
  })
  key: ConfigurationKeys;

  @Column('jsonb')
  value: ConfigurationValue;
}
