import {
  applyDecorators,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { MongoExceptionFilter } from '../filters/mongoose-errors.filter';

import { ValidationError } from 'class-validator';

export type Ret = { [key: string]: string | Ret };

export function convertError(errors: ValidationError[]) {
  const result: Ret = {};

  for (const error of Array.from(errors)) {
    if (error.children.length > 0) {
      result[error.property] = convertError(error.children);
    } else {
      result[error.property] = Object.values(error.constraints)[0];
    }
  }

  return result;
}

export const UseValidation = (): ClassDecorator =>
  applyDecorators(
    UseFilters(new MongoExceptionFilter()),
    UsePipes(
      new ValidationPipe({
        exceptionFactory(validationErrors = []) {
          if (this.isDetailedOutputDisabled) {
            return new WsException('Bad request');
          }
          const errors = convertError(validationErrors);

          return new WsException({
            message: 'Validation Error!',
            errors
          });
        }
      })
    )
  );
