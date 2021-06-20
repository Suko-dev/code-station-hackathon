import { NextFunction, Response, Request } from "express";

// eslint-disable-next-line @typescript-eslint/ban-types
export default (fn: Function) => {
  return (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => fn(request, response, next).catch(next);
};
