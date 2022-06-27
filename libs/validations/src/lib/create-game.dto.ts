import { SignEnum } from '@tici-taci/typings';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { JoinGameFormDto } from './join-game.dto';

export class CreateGameDto extends JoinGameFormDto {
  @IsString()
  @IsNotEmpty({
    message: 'Game title is required'
  })
  title = '';

  @IsEnum(SignEnum)
  sign: SignEnum = SignEnum.X;
}
