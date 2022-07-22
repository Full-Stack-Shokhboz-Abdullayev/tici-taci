import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { JoinerDto } from './player.dto';

export class JoinGameDto {
  @IsUUID(4)
  code = '';

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({
    each: true
  })
  @Type(() => JoinerDto)
  joiner: JoinerDto = new JoinerDto();
}
