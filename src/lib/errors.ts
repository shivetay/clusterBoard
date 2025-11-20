export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

const HTTP_STATUS = {
  validation: 422,
  conflict: 409,
  unauthorized: 401,
  notFound: 404,
} as const;

export class ValidationError extends HttpError {
  constructor(message = 'Validation failed') {
    super(HTTP_STATUS.validation, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(HTTP_STATUS.conflict, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(HTTP_STATUS.unauthorized, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(HTTP_STATUS.notFound, message);
  }
}
