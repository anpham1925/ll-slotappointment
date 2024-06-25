import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SlotService } from './slot.service';
import { GetSlotRequestDto, SlotResponseDto } from './slot.dto';

@Controller('slots')
export class SlotController {
  constructor(private slotService: SlotService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query() query: GetSlotRequestDto): Promise<SlotResponseDto[]> {
    return this.slotService.getSlots(query.date);
  }
}
