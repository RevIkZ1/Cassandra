import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { StadionService } from './stadion.service';
import { Stadion } from './stadion.model';

@Controller('Stadion')
export class StadionController {
  constructor(private stadionService: StadionService) {}

  @Post('DodajStadion')
  async createStadion(@Body() stadion: Stadion) {
    try {
      return await this.stadionService.createStadion(stadion);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating stadium');
    }
  }

  @Get('VratiStadion')
  async getStadion() {
    try {
      return await this.stadionService.getStadion();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error retrieving stadiums');
    }
  }

  @Get('VratiStadion/:id')
  async getStadionByTim(@Param('id') id: string) {
    try {
      const timoviZaLigu = await this.stadionService.getStadionByTim(id);
      console.log(timoviZaLigu);
      return timoviZaLigu;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error retrieving stadium by team',
      );
    }
  }
}
