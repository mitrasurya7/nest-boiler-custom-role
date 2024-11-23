import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
