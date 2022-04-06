import { Request, Response, RequestHandler } from 'express';

type Method = | 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';
type Handler = (req: Request, res: Response) => any;

export type Route = {
  method: Method;
  path: string;
  middleware: RequestHandler[];
  handler: Handler;
}