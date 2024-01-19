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
    try {
      const createdIgrac = await this.igracService.createIgrac(igrac);
      return createdIgrac;
    } catch (error) {
      console.error('Error creating Igrac:', error);
      throw new Error('Failed to create Igrac');
    }
  }

  @Get('VratiIgrace')
  async getIgrace() {
    try {
      const igraci = await this.igracService.getIgrac();
      return igraci;
    } catch (error) {
      console.error('Error fetching Igraci:', error);
      throw new Error('Failed to fetch Igraci');
    }
  }

  @Get('VratiIgrace/:id')
  async getIgraceByTim(@Param('id') id: string) {
    try {
      const timoviZaLigu = await this.igracService.getIgracByTim(id);
      console.log(timoviZaLigu);
      return timoviZaLigu;
    } catch (error) {
      console.error(`Error fetching Igraci for Tim ID ${id}:`, error);
      throw new Error('Failed to fetch Igraci for Tim');
    }
  }

  @Delete('deleteIgracById/:id')
  async deleteIgracById(@Param('id') id: string) {
    try {
      console.log(id);
      const igracBrisanje = await this.igracService.deleteIgracById(id);
      return 200;
    } catch (error) {
      console.error(`Error deleting Igrac with ID ${id}:`, error);
      throw new Error('Failed to delete Igrac');
    }
  }
}
