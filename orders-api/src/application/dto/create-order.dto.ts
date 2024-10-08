import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  products: string[];
}
