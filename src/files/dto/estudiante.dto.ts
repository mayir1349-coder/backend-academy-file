import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class createESTudianteDto {
    @IsNumber()
    @IsOptional()
    id?: number;
    
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    paterno: string;

    @IsOptional()
    @IsString()
    materno?: string;

}



