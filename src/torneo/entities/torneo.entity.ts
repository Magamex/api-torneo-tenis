import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { Types } from "mongoose";
import { Jugador } from "src/jugador/entities/jugador.entity";
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Torneo {

    @ApiProperty({
        example: '{"$date":"2022-12-31T05:52:53.348Z"}',
        description: 'Fecha del torneo'
    })
    @Prop()
    fecha: Date;

    @ApiProperty({
        example: '{"$oid":"63af6a9fc2f9d7a6832fa607"}',
        description: 'Jugador ganador del torneo'
    })
    @Prop({ 
        type: Types.ObjectId, 
        ref: Jugador.name 
    })
    ganador: Jugador;

    @ApiProperty({
        example: '[{"jugador1":"milo","jugador2":"luciano","ganador":"milo"},{"jugador1":"carlos","jugador2":"mario","ganador":"mario"},{"jugador1":"martin","jugador2":"pedro","ganador":"martin"},{"jugador1":"marcos","jugador2":"mariano","ganador":"mariano"},{"jugador1":"milo","jugador2":"mario","ganador":"mario"},{"jugador1":"martin","jugador2":"mariano","ganador":"mariano"},{"jugador1":"mario","jugador2":"mariano","ganador":"mariano"}]',
        description: 'Historial de partidos del torneo'
    })
    @Prop()
    historialPartidos: any[];
}

export const TorneoSchema = SchemaFactory.createForClass(Torneo);
