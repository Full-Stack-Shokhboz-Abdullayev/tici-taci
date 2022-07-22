import { IsUUID } from 'class-validator';

export class CheckGameDto {
  @IsUUID(4, {
    message: 'Game code is not valid'
  })
  code = '';
}
