import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthRegisterDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
