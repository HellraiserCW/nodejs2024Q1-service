import { HttpException, HttpStatus } from '@nestjs/common';

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
