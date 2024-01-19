import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { LigaService } from './liga.service';
import { Liga } from './liga.model';

@Controller('Liga')
export class LigaController {
  constructor(private ligaService: LigaService) {}

  @Post('DodajLigu')
  async createLiga(@Body() liga: Liga) {
    try {
      const createdLiga = await this.ligaService.createEmployee(liga);
      return createdLiga;
    } catch (error) {
      console.error('Error creating Liga:', error);
      throw new Error('Failed to create Liga');
    }
  }

  @Get('VratiLige')
  async getLige() {
    try {
      const lige = await this.ligaService.getLiga();
      return lige;
    } catch (error) {
      console.error('Error fetching Lige:', error);
      throw new Error('Failed to fetch Lige');
    }
  }
}
