import { HttpException, HttpStatus } from '@nestjs/common';

import { FavsConfig } from './favs/config/favs.config';

export class NotFoundError extends HttpException {
  constructor() {
    super('Not found!', HttpStatus.NOT_FOUND);
  }
}

export class WrongPasswordError extends HttpException {
  constructor() {
    super('Wrong password!', HttpStatus.FORBIDDEN);
  }
}

export class NotExistingError extends HttpException {
  constructor(entity: FavsConfig) {
    super(
      `Can't add non-existing ${entity} to favorites!`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
