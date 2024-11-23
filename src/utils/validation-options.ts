import {
  BadRequestException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) => {
    try {
      return new BadRequestException(
        errors
          .map((error) => Object.values(error.constraints).join(', '))
          .join(', '),
      );
    } catch (error) {
      return new BadRequestException('error input');
    }
  },
};

export default validationOptions;
