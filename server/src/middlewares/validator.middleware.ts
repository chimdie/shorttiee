import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { ValidationResponse } from "../utils/response";
import debug from "debug";

export const validator = (opts?: {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = item_validator(opts?.body, req.body);
    const params = item_validator(opts?.params, req.params);
    const query = item_validator(opts?.query, req.query);

    let err: string[] = [];
    const results = [body, params, query];

    for (let i = 0; i < results.length; i++) {
      const error = results[i][0];
      if (error !== null) {
        err = err.concat(error);
      }
    }

    debug("app:validator")("list errors", err);
    if (err.length) {
      return ValidationResponse(res, err.at(0));
    }

    req.body = body[1];
    req.params = params[1] as Request["params"];
    req.query = query[1] as Request["query"];

    return next();
  };
};

function item_validator<T = unknown>(schema?: AnyZodObject, data?: T) {
  if (!schema) {
    return [null, data] as const;
  }

  const result = schema.strip().safeParse(data);

  if (result.success) {
    data = result.data as T;
    return [null, result.data] as const;
  }

  const err = result.error.errors.map((e) => e.message);

  return [err, null] as const;
}
