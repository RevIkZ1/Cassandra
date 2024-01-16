import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { IgracService } from './igrac.service';
import { Igrac } from './igrac.model';

@Controller('Igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}

  @Post('DodajIgrace')
  async createIgrace(@Body() igrac: Igrac) {
    return this.igracService.createIgrac(igrac);
  }
  @Get('VratiIgrace')
  async getIgrace() {
    return this.igracService.getIgrac();
  }
  @Get('VratiIgrace/:id')
  async getIgraceByTim(@Param('id') id: string) {
    const timoviZaLigu = await this.igracService.getIgracByTim(id);
    console.log(timoviZaLigu);
    return timoviZaLigu;
  }
}
