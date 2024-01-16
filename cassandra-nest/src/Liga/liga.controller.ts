import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { LigaService } from './liga.service';
import { Liga } from './liga.model';

@Controller('Liga')
export class LigaController {
  constructor(private ligaService: LigaService) {}

  @Post('DodajLigu')
  async createLiga(@Body() liga: Liga) {
    return this.ligaService.createEmployee(liga);
  }
  @Get('VratiLige')
  async getLige() {
    return this.ligaService.getLiga();
  }
}
