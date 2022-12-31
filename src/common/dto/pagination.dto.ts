import { IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    
    @ApiProperty({
        example: 10,
        description: 'Cantidad de registros a mostrar',
        required: false,
        minimum: 0
    })
    @IsOptional()
    @IsPositive()
    @Min(0)
    limit?: number;

    @ApiProperty({
        example: 0,
        description: 'Cantidad de registros a saltar',
        required: false,
        minimum: 0
    })
    @IsOptional()
    @Min(0)
    offset?: number;
}