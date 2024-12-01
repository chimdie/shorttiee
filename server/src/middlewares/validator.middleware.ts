import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodArray } from "zod";
import { ValidationResponse } from "../utils/response";
import debug from "debug";

export const validator = (opts?: {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
  files?: ZodArray<any, any>;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = item_validator(opts?.body, req.body);
    const params = item_validator(opts?.params, req.params);
    const query = item_validator(opts?.query, req.query);
    const files = item_validator(opts?.files, req.files);

    let err: string[] = [];
    const results = [body, params, query, files];

    for (let i = 0; i < results.length; i++) {
      const error = results[i][0];
      if (error !== null) {
        err = err.concat(error);
      }
    }

    if (err.length) {
      debug("app:validator")("list errors", err);
      debug("app:validator")("list errors pretty", "\n● " + err.join("\n● "));
      return ValidationResponse(res, err.at(0));
    }

    req.body = body[1];
    req.params = params[1] as Request["params"];
    req.query = query[1] as Request["query"];
    /**
     * WARN:
     * don't strip values from request files
     * req.files = files[1] as Request["files"];
     */

    return next();
  };
};

function item_validator<T = unknown>(
  schema?: AnyZodObject | ZodArray<any, any>,
  data?: T
) {
  if (!schema) {
    return [null, data] as const;
  }

  if ("strip" in schema) {
    schema.strip();
  }
  const result = schema.safeParse(data);

  if (result.success) {
    data = result.data as T;
    return [null, result.data] as const;
  }

  const err = result.error.errors.map((e) => e.message);

  return [err, null] as const;
}
