import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.entity';
import { DBConfigService } from './config.service';

@Module({
  imports: [TypeOrmModule.forFeature([Configuration])],
  providers: [DBConfigService],
  controllers: [],
  exports: [DBConfigService],
})
export class DBConfigModule {}
