import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Jugador } from 'src/jugador/entities/jugador.entity';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { JugadorService } from '../jugador/jugador.service';
import { GeneradorJugadorDto } from '../jugador/dto/generador-jugador.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Torneo } from './entities/torneo.entity';

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

    console.log('COMIENZA TORNEO')
    console.log(pilaJugadores)

    while (pilaJugadores.length > 1) {
      const jugador1 = pilaJugadores.pop();
      const jugador2 = pilaJugadores.pop();

      console.log(`${jugador1.nombre} vs ${jugador2.nombre}`);

      const ganador = this.determinarGanador(jugador1, jugador2);

      console.log(`${ganador.nombre} gano`);

      pilaJugadores.unshift(ganador);

      console.log(pilaJugadores)
    }
  
    console.log(`El ganador es: ${pilaJugadores[0].nombre}`);
    console.log('FIN TORNEO')

    try {
      const torneo = await this.torneoModel.create({fecha: new Date(), ganador: pilaJugadores[0]})
      return torneo;
    } catch (error){
      this.handleExceptions(error);
    }

    // return pilaJugadores[0];


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

  create(createTorneoDto: CreateTorneoDto) {
    return 'This action adds a new torneo';
  }

  findAll() {
    return `This action returns all torneo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} torneo`;
  }

  update(id: number, updateTorneoDto: UpdateTorneoDto) {
    return `This action updates a #${id} torneo`;
  }

  remove(id: number) {
    return `This action removes a #${id} torneo`;
  }

  private handleExceptions(error: any){
      if(error.code === 11000){
        throw new BadRequestException(`Torneo existe en DB ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`No se pudo guardar torneo - Check logs`)
  }
}
