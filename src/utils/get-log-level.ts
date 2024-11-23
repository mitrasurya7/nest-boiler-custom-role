import { LogLevel } from '@nestjs/common/services/logger.service';

function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) return ['warn', 'error', 'log'];
  return ['verbose', 'debug', 'warn', 'error', 'log'];
}

export default getLogLevels;
