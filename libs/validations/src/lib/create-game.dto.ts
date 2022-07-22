import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested
} from 'class-validator';
import { PlayerDto } from './player.dto';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty({
    message: 'Game title is required'
  })
  title = '';

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({
    each: true
  })
  @Type(() => PlayerDto)
  maker: PlayerDto = new PlayerDto();
}
