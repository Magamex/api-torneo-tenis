import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TorneoService } from './torneo.service';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { GeneradorJugadorDto } from '../jugador/dto/generador-jugador.dto';

@Controller('torneo')
export class TorneoController {
  constructor(private readonly torneoService: TorneoService) {}


  @Post('generar')
  create(@Body() generadorJugadorDto: GeneradorJugadorDto) {
    return this.torneoService.simularTorneo(generadorJugadorDto);
  }

  // @Get()
  // findAll() {
  //   return this.torneoService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.torneoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTorneoDto: UpdateTorneoDto) {
    return this.torneoService.update(+id, updateTorneoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.torneoService.remove(+id);
  }
}
