import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class CreateJugadorDto {
    
    @ApiProperty({
        example: 'Juan',
        description: 'Nombre del jugador',
        required: true,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    nombre: string;
    
    @ApiProperty({
        example: 1,
        description: 'Genero del jugador',
        required: true,
        minimum: 0,
        maximum: 1
    })
    @IsInt()
    @Min(0)
    @Max(1)
    genero: number;
    
    @ApiProperty({
        example: 50,
        description: 'Habilidad del jugador',
        required: true,
        minimum: 0,
        maximum: 100
    })
    @IsInt()
    @Min(0)
    @Max(100)
    habilidad: number;
    
    @ApiProperty({
        example: 50,
        description: 'Fuerza del jugador solo si el genero es masculino se tendra en cuenta',
        required: false,
        minimum: 0,
        maximum: 100
    })
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    fuerza?: number;
    
    @ApiProperty({
        example: 50,
        description: 'Desplazamiento del jugador solo si el genero es masculino se tendra en cuenta',
        required: false,
        minimum: 0,
        maximum: 100
    })
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    desplazamiento?: number;
    
    @ApiProperty({
        example: 50,
        description: 'Reaccion del jugador solo si el genero es femenino se tendra en cuenta',
        required: false,
        minimum: 0,
        maximum: 100
    })
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    reaccion?: number;
}
