import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Jugador } from 'src/jugador/entities/jugador.entity';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { JugadorService } from '../jugador/jugador.service';
import { GeneradorJugadorDto } from '../jugador/dto/generador-jugador.dto';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Torneo } from './entities/torneo.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class TorneoService {

  constructor(
    @InjectModel(Torneo.name)
    private readonly torneoModel: Model<Torneo>,
    private readonly jugadorService: JugadorService
    ) {}

  async simularTorneo(generarJugadorDto: GeneradorJugadorDto) {
    let jugadores = await this.jugadorService.getList(generarJugadorDto);
    let pilaJugadores = [...jugadores];

    const historialPartidos = [];

    console.log('COMIENZA TORNEO')
    console.log(pilaJugadores)

    while (pilaJugadores.length > 1) {
      const jugador1 = pilaJugadores.pop();
      const jugador2 = pilaJugadores.pop();

      console.log(`${jugador1.nombre} vs ${jugador2.nombre}`);

      const ganador = this.determinarGanador(jugador1, jugador2);

      console.log(`${ganador.nombre} gano`);

      pilaJugadores.unshift(ganador);

      historialPartidos.push({
        jugador1: jugador1.nombre,
        jugador2: jugador2.nombre,
        ganador: ganador.nombre
      })

      console.log(pilaJugadores)
    }
  
    console.log(`El ganador es: ${pilaJugadores[0].nombre}`);
    console.log('FIN TORNEO')

    try {
      const torneo = await this.torneoModel.create({fecha: new Date(), ganador: pilaJugadores[0], historialPartidos})
      return torneo;
    } catch (error){
      this.handleExceptions(error);
    }

  }


  private determinarGanador(jugador1, jugador2){
    const suerte = Math.random();

    const genero = jugador1.genero;

    if(genero == 1){
      console.log(jugador1.nombre+': '+jugador1.habilidad * suerte + jugador1.fuerza + jugador1.desplazamiento + " vs " + jugador2.nombre+': '+jugador2.habilidad * suerte + jugador2.fuerza + jugador2.desplazamiento)
      if(jugador1.habilidad * suerte + jugador1.fuerza + jugador1.desplazamiento > jugador2.habilidad * suerte + jugador2.fuerza + jugador2.desplazamiento){
        return jugador1;
      }else{
        return jugador2;
      }
    }

    if(genero == 0){
      if(jugador1.habilidad * suerte + jugador1.reaccion > jugador2.habilidad * suerte + jugador2.reaccion){
        return jugador1;
      }else{
        return jugador2;
      }
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;

    return this.torneoModel.find()
      .skip(offset)
      .limit(limit)
      .select('-__v')
  }

  async findOne(term: string) {
    let torneo: Torneo;

    if(!torneo && isValidObjectId(term))
      torneo = await this.torneoModel.findById(term);

    if(!torneo)
      throw new NotFoundException(`Torneo: ${term} - no encontrado`);

    return torneo;
  }

  async remove(id: string) {
    const { deletedCount } = await this.torneoModel.deleteOne({_id: id});

    if(deletedCount === 0)
      throw new NotFoundException(`Torneo: ${id} - no existe`);

    return;
  }

  private handleExceptions(error: any){
      if(error.code === 11000){
        throw new BadRequestException(`Torneo existe en DB ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`No se pudo guardar torneo - Check logs`)
  }
}
