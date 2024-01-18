import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
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
  @Delete('deleteIgracById/:id')
  async deleteIgracById(@Param('id') id: string) {
    console.log(id);
    const igracBrisanje = await this.igracService.deleteIgracById(id);
    return 200;
  }
}
