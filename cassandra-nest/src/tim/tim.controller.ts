import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TimService } from './tim.service';
import { Tim } from './tim.model';

@Controller('Tim')
export class TimController {
  constructor(private timService: TimService) {}

  @Post('DodajTim')
  async createTim(@Body() tim: Tim) {
    try {
      const createdTim = await this.timService.createTim(tim);
      return createdTim;
    } catch (error) {
      console.error('Error creating Tim:', error);
      throw new Error('Failed to create Tim');
    }
  }

  @Get('VratiTim')
  async getTim() {
    try {
      const timovi = await this.timService.getTim();
      return timovi;
    } catch (error) {
      console.error('Error fetching Timovi:', error);
      throw new Error('Failed to fetch Timovi');
    }
  }

  @Get('employees/:id')
  async getEmployeeById(@Param('id') id: string) {
    try {
      const timoviZaLigu = await this.timService.getTimByLigaID(id);
      console.log(timoviZaLigu);
      return timoviZaLigu;
    } catch (error) {
      console.error(`Error fetching Timovi for Liga ID ${id}:`, error);
      throw new Error('Failed to fetch Timovi for Liga');
    }
  }

  @Get('tim/:timID')
  async getTimById(@Param('timID') timID: string) {
    try {
      const timoviZaLigu = await this.timService.getTimById(timID);
      console.log(timoviZaLigu);
      return timoviZaLigu;
    } catch (error) {
      console.error(`Error fetching Tim with ID ${timID}:`, error);
      throw new Error('Failed to fetch Tim');
    }
  }
}
