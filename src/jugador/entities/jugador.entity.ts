import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Jugador extends Document {

    @ApiProperty({
        example: 'milo',
        description: 'Nombre del jugador',
        required: true
    })
    @Prop({
        required: true,
        unique: true
    })
    nombre: string;

    @ApiProperty({
        example: 1,
        description: 'Genero del jugador',
        required: true
    })
    @Prop({
        required: true
    })
    genero: number;

    @ApiProperty({
        example: 50,
        description: 'Habilidad del jugador',
        required: true
    })
    @Prop({
        required: true
    })
    habilidad: number;

    @ApiProperty({
        example: 50,
        description: 'Fuerza del jugador solo si el genero es masculino se tendra en cuenta',
        required: false
    })
    @Prop()
    fuerza: number;

    @ApiProperty({
        example: 50,
        description: 'Desplazamiento del jugador solo si el genero es masculino se tendra en cuenta',
        required: false
    })
    @Prop()
    desplazamiento: number;

    @ApiProperty({
        example: 50,
        description: 'Reaccion del jugador solo si el genero es femenino se tendra en cuenta',
        required: false
    })
    @Prop()
    reaccion: number;
}

export const JugadorSchema = SchemaFactory.createForClass(Jugador);