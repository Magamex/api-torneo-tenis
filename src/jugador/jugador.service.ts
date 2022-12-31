import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model, isValidObjectId } from 'mongoose';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { Jugador } from './entities/jugador.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { GeneradorJugadorDto } from './dto/generador-jugador.dto';

@Injectable()
export class JugadorService {

  constructor(
    @InjectModel(Jugador.name)
    private readonly jugadorModel: Model<Jugador>
  ){}

  async create(createJugadorDto: CreateJugadorDto) {
    createJugadorDto.nombre = createJugadorDto.nombre.toLowerCase();
    
    console.log(createJugadorDto);

    try {
      const jugador = await this.jugadorModel.create(createJugadorDto);
      return jugador;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto:PaginationDto) {
    const { limit=10, offset=0 } = paginationDto;

    return this.jugadorModel.find()
      .skip(offset)
      .limit(limit)
      .select('-__v')
  }

  async findOne(term: string) {

    let jugador: Jugador;

    if(!jugador && isValidObjectId(term))
      jugador = await this.jugadorModel.findById(term);

    if(!jugador)
      jugador = await this.jugadorModel.findOne({nombre: term.toLowerCase()});

    if(!jugador)
      throw new NotFoundException(`el Jugador: ${term} - no existe`)

    return jugador;
  }

  async getList(generadorJugadorDto: GeneradorJugadorDto){
    let { genero = 0, cantidad = 4, grupo = 0 } = generadorJugadorDto;

    let valcant: boolean | number = false;

    if(cantidad % 2 == 0)
      grupo = cantidad/2;

    if(grupo % 2 == 0)
      valcant = grupo * 2;

    if(!valcant)
      throw new BadRequestException(`La cantidad o el grupo debe ser par`);

    if(genero == 0 || genero == 1)
      return await this.jugadorModel.find({genero}).limit(valcant).select('-__v');

    throw new BadRequestException(`Ocurrio un error - getList`);
  }

  async update(term: string, updateJugadorDto: UpdateJugadorDto) {
    const jugador = await this.findOne(term);

    if(updateJugadorDto.nombre)
      updateJugadorDto.nombre = updateJugadorDto.nombre.toLowerCase();

    try {
      await jugador.updateOne(updateJugadorDto);
      return {...jugador.toJSON(), ...updateJugadorDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.jugadorModel.deleteOne({_id: id});

    if(deletedCount === 0)
      throw new NotFoundException(`El jugador con id: ${id} - no existe`);

    return;
  }

  private handleExceptions(error: any){
      if(error.code === 11000){
        throw new BadRequestException(`Jugador existe en DB ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`No se pudo crear jugadores - Check logs`)
  }
}
