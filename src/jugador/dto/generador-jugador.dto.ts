import { IsOptional, Min, Max } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GeneradorJugadorDto{
    
    @ApiProperty({
        example: 1,
        description: 'Genero del jugador',
        required: true,
        minimum: 0,
        maximum: 1
    })
    @Min(0)
    @Max(1)
    genero: number;

    @ApiProperty({
        example: 4,
        description: 'Cantidad de jugadores a generar',
        required: true,
        minimum: 0
    })
    @Min(0)
    cantidad: number;
    
    @ApiProperty({
        example: 2,
        description: 'Cantidad de grupos a generar',
        required: false,
        minimum: 0
    })
    @IsOptional()
    @Min(0)
    grupo?: number;
}