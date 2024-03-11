import { HttpException, HttpStatus } from '@nestjs/common';

import { Entity, Action } from './app.config';

export class NotFoundError extends HttpException {
  constructor(entity: Entity) {
    super(
      `${entity.charAt(0).toUpperCase() + entity.slice(1)} not found!`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class WrongPasswordError extends HttpException {
  constructor() {
    super('Wrong password!', HttpStatus.FORBIDDEN);
  }
}

export class NotExistingError extends HttpException {
  constructor(entity: Entity, action: Action) {
    super(
      `Can't ${action} non-existing ${entity}!`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
