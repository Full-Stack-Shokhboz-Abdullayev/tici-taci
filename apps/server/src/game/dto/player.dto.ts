import { SignEnum } from '@tici-taci/typings';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class JoinerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(SignEnum)
  sign: SignEnum;
}
