import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TorneoService } from './torneo.service';
import { GeneradorJugadorDto } from '../jugador/dto/generador-jugador.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

@Controller('torneo')
export class TorneoController {
  constructor(private readonly torneoService: TorneoService) {}

  @Post('generar')
  create(@Body() generadorJugadorDto: GeneradorJugadorDto) {
    return this.torneoService.simularTorneo(generadorJugadorDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.torneoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.torneoService.findOne(term);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.torneoService.remove(id);
  }
}
