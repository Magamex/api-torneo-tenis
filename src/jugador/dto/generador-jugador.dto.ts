import { IsOptional, IsPositive, Min, Max } from "class-validator";

export class GeneradorJugadorDto{
    
    @Min(0)
    @Max(1)
    genero: number;

    @Min(0)
    cantidad: number;
    
    @IsOptional()
    @Min(0)
    grupo?: number;
}