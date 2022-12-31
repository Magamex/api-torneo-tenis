import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JugadorService } from './jugador.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { GeneradorJugadorDto } from './dto/generador-jugador.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

@Controller('jugador')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  @Get('generador')
  generate(@Query() generadorJugadorDto: GeneradorJugadorDto) {
    return this.jugadorService.getList(generadorJugadorDto);
  }

  @Post()
  create(@Body() createJugadorDto: CreateJugadorDto) {
    return this.jugadorService.create(createJugadorDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.jugadorService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.jugadorService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateJugadorDto: UpdateJugadorDto) {
    return this.jugadorService.update(term, updateJugadorDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.jugadorService.remove(id);
  }
}
