import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { StadionService } from './stadion.service';
import { Stadion } from './stadion.model';

@Controller('Stadion')
export class StadionController {
  constructor(private stadionService: StadionService) {}

  @Post('DodajStadion')
  async createStadion(@Body() stadion: Stadion) {
    return this.stadionService.createStadion(stadion);
  }
  @Get('VratiStadion')
  async getStadion() {
    return this.stadionService.getStadion();
  }
  @Get('VratiStadion/:id')
  async getStadionByTim(@Param('id') id: string) {
    const timoviZaLigu = await this.stadionService.getStadionByTim(id);
    console.log(timoviZaLigu);
    return timoviZaLigu;
  }
}
