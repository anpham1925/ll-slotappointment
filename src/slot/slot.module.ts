import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotController } from './slot.controller';
import { Slot } from './slot.entity';
import { SlotService } from './slot.service';
import { Configuration } from 'src/config/config.entity';
import { DBConfigModule } from 'src/config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, Configuration]), DBConfigModule],
  providers: [SlotService],
  controllers: [SlotController],
})
export class SlotModule {}
