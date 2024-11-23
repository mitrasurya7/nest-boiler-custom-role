import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  permissionIds: number[];
}
