import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Jugador extends Document {

    @Prop({
        required: true,
        unique: true
    })
    nombre: string;

    @Prop({
        required: true
    })
    genero: number;

    @Prop({
        required: true
    })
    habilidad: number;

    @Prop()
    suerte: number;

    @Prop()
    fuerza: number;

    @Prop()
    desplazamiento: number;

    @Prop()
    reaccion: number;
}

export const JugadorSchema = SchemaFactory.createForClass(Jugador);