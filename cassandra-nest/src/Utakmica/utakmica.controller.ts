import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UtakmicaService } from './utakmica.service';
import { Utakmica } from './utakmica.model';
import { types } from 'cassandra-driver';

@Controller('Utakmica')
export class UtakmicaController {
  constructor(private utakmicaService: UtakmicaService) {}

  @Post('DodajUtakmica')
  async createTim(@Body() utakmica: Utakmica) {
    try {
      const createdUtakmica =
        await this.utakmicaService.createUtakmcia(utakmica);
      return createdUtakmica;
    } catch (error) {
      console.error('Error creating Utakmica:', error);
      throw new Error('Failed to create Utakmica');
    }
  }

  @Get('VratiUtakmice')
  async getTim() {
    try {
      const utakmice = await this.utakmicaService.getUtakmica();
      return utakmice;
    } catch (error) {
      console.error('Error fetching Utakmice:', error);
      throw new Error('Failed to fetch Utakmice');
    }
  }

  @Put('IzmeniUtakmicu')
  async IzmeniUtakmicu(
    @Body('id') id: string,
    @Body('DomacinGo') DomacinGo: string,
    @Body('GostGo') GostGo: string,
    @Body('DomacinCrveni') DomacinCrveni: string,
    @Body('GostCrveni') GostCrveni: string,
    @Body('DomacinZuti') DomacinZuti: string,
    @Body('GostZuti') GostZuti: string,
    @Body('AsistencijaDomacin') AsistencijaDomacin: string,
    @Body('AsistencijaGost') AsistencijaGost: string,
  ) {
    try {
      const updatedUtakmica = await this.utakmicaService.updateUtakmica(
        id,
        DomacinGo,
        GostGo,
        DomacinCrveni,
        GostCrveni,
        DomacinZuti,
        GostZuti,
        AsistencijaDomacin,
        AsistencijaGost,
      );
      return updatedUtakmica;
    } catch (error) {
      console.error(`Error updating Utakmica with ID ${id}:`, error);
      throw new Error('Failed to update Utakmica');
    }
  }
}
