import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TimService } from './tim.service';
import { Tim } from './tim.model';

@Controller('Tim')
export class TimController {
  constructor(private timService: TimService) {}

  @Post('DodajTim')
  async createTim(@Body() tim: Tim) {
    return this.timService.createTim(tim);
  }
  @Get('VratiTim')
  async getTim() {
    return this.timService.getTim();
  }
  @Get('employees/:id')
  async getEmployeeById(@Param('id') id: string) {
    const timoviZaLigu = await this.timService.getTimByLigaID(id);
    console.log(timoviZaLigu);
    return timoviZaLigu;
  }
  @Get('tim/:timID')
  async getTimById(@Param('timID') timID: string) {
    const timoviZaLigu = await this.timService.getTimById(timID);
    console.log(timoviZaLigu);
    return timoviZaLigu;
  }
}
