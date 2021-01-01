import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Chicken } from '../chicken.interface';
import { ChickensService } from './chickens.service';
import { CreateChickenDto } from './create-chicken.dto';

@Controller('chickens')
export class ChickensController {
  constructor(private chickensService: ChickensService) {}

  @Get()
  findAll(): HttpException {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.chickensService.findAll();
  }

  @Post()
  create(@Body() createChickenDto: CreateChickenDto) {
    this.chickensService.create(createChickenDto);
  }
}
