import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UtakmicaService } from './utakmica.service';
import { Utakmica } from './utakmica.model';
import { types } from 'cassandra-driver';

@Controller('Utakmica')
export class UtakmicaController {
  constructor(private utakmicaService: UtakmicaService) {}

  @Post('DodajUtakmica')
  async createTim(@Body() utakmica: Utakmica) {
    return this.utakmicaService.createUtakmcia(utakmica);
  }
  @Get('VratiUtakmice')
  async getTim() {
    return this.utakmicaService.getUtakmica();
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
    return this.utakmicaService.updateUtakmica(
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
  }
}
