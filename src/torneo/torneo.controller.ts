import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TorneoService } from './torneo.service';
import { GeneradorJugadorDto } from '../jugador/dto/generador-jugador.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger/dist';

@ApiTags('Torneo')
@Controller('torneo')
export class TorneoController {
  constructor(private readonly torneoService: TorneoService) {}

  @Post('generar')
  @ApiResponse({ status: 201, description: 'Torneo generado' })
  @ApiResponse({ status: 400, description: 'Cantidad de jugadores tiene que ser par' })
  create(@Body() generadorJugadorDto: GeneradorJugadorDto) {
    return this.torneoService.simularTorneo(generadorJugadorDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de Torneos' })
  @ApiResponse({ status: 400, description: 'Error en ingresar valores no validos' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.torneoService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Torneo Encontrado' })
  @ApiResponse({ status: 404, description: 'Torneo no encontrado' })
  findOne(@Param('term') term: string) {
    return this.torneoService.findOne(term);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Torneo eliminado' })
  @ApiResponse({ status: 404, description: 'Torneo no encontrado' })
  @ApiResponse({ status: 400, description: 'Error en ingresar valores no validos' })
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.torneoService.remove(id);
  }
}
