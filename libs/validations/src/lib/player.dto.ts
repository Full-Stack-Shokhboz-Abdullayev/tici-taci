import { SignEnum } from '@tici-taci/typings';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class JoinerDto {
  @IsString()
  @IsNotEmpty({
    message: 'Player name is required'
  })
  name = '';
}

export class PlayerDto {
  @IsString()
  @IsNotEmpty({
    message: 'Player name is required'
  })
  name = '';

  @IsEnum(SignEnum)
  sign: SignEnum = SignEnum.X;
}
