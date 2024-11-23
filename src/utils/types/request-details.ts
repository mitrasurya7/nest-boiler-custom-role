import { Request } from 'express';

export interface IRequestDetails extends Request {
  requestId: string;
}
