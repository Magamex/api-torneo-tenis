import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateJugadorDto {
    
    @IsString()
    nombre: string;
    
    @IsInt()
    @Min(0)
    @Max(1)
    genero: number;
    
    @IsInt()
    @Min(0)
    @Max(100)
    habilidad: number;
    
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    suerte?: number;
    
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    fuerza?: number;
    
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    desplazamiento?: number;
    
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    reaccion?: number;
}
