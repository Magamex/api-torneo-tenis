// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateJugadorDto } from './create-jugador.dto';

export class UpdateJugadorDto extends PartialType(CreateJugadorDto) {}
