import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { Types } from "mongoose";
import { Jugador } from "src/jugador/entities/jugador.entity";

@Schema()
export class Torneo {
    @Prop()
    fecha: Date;

    @Prop({ 
        type: Types.ObjectId, 
        ref: Jugador.name 
    })
    ganador: Jugador;

    @Prop()
    historialPartidos: any[];
}

export const TorneoSchema = SchemaFactory.createForClass(Torneo);
