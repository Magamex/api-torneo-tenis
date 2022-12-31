import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JugadorService } from './jugador.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { GeneradorJugadorDto } from './dto/generador-jugador.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Jugador')
@Controller('jugador')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  @Get('generador')
  @ApiResponse({ status: 200, description: 'Genera lista de jugadores' })
  @ApiResponse({ status: 400, description: 'Cantidad de jugadores tiene que ser par' })
  generate(@Query() generadorJugadorDto: GeneradorJugadorDto) {
    return this.jugadorService.getList(generadorJugadorDto);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Jugador creado' })
  @ApiResponse({ status: 400, description: 'Jugador ya existe' })
  create(@Body() createJugadorDto: CreateJugadorDto) {
    return this.jugadorService.create(createJugadorDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de jugadores' })
  @ApiResponse({ status: 400, description: 'Error en ingresar valores no validos' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.jugadorService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Jugador encontrado' })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  findOne(@Param('term') term: string) {
    return this.jugadorService.findOne(term);
  }

  @Patch(':term')
  @ApiResponse({ status: 200, description: 'Jugador actualizado' })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  update(@Param('term') term: string, @Body() updateJugadorDto: UpdateJugadorDto) {
    return this.jugadorService.update(term, updateJugadorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Jugador eliminado' })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  @ApiResponse({ status: 400, description: 'Error en ingresar valores no validos' })
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.jugadorService.remove(id);
  }
}
