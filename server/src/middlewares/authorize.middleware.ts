import { ForbiddenError } from "@casl/ability";
import type { NextFunction, Request, Response } from "express";
import type {
  Actions,
  Subjects,
  SubjectFields
} from "../config/types/abilities";
import { defineAbilityFor } from "../config/abilities";
import { ForbiddenResponse } from "../utils/response";

/**
 * @description
 * This authorizes the user based on the rules set in the abilities definition
 *
 * Use this middleware after using the authentication middleware
 * to ensure that the user is available for authorization
 */
export function authorize<S extends Subjects>(
  action: Actions,
  subject: S,
  fields?: SubjectFields<S>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return ForbiddenResponse(res);
    }

    const ability = defineAbilityFor(req.user);
    req.userAbility = ability;

    if (!fields) {
      const cannot = ForbiddenError.from(ability).unlessCan(action, subject);
      return cannot ? ForbiddenResponse(res, cannot.message) : next();
    }

    for (const field of fields) {
      const cannot = ForbiddenError.from(ability).unlessCan(
        action,
        subject,
        field
      );
      if (cannot) {
        return ForbiddenResponse(res, cannot.message);
      }
    }

    return next();
  };
}
