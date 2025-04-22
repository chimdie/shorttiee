import assert from "assert";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { findUserById, updateUserById } from "../db/users.db";
import {
  BadRequestResponse,
  ErrorResponse,
  NotFoundResponse,
  SuccessResponse
} from "../utils/response";
import { UserDto } from "../dto/user.dto";

export const getUserProfileCtl = ctlWrapper(async (req, res) => {
  assert(req.user);
  const [userError, userResult] = await findUserById(req.user.id);

  if (userError) {
    return ErrorResponse(res);
  }

  if (!userResult) {
    return NotFoundResponse(res);
  }

  return SuccessResponse(res, userResult);
});

export const updateUserProfileCtl = ctlWrapper(async (req, res) => {
  assert(req.user);
  const [userError, userResult] = await findUserById(req.user.id);

  if (userError) {
    return ErrorResponse(res);
  }

  if (!userResult) {
    return BadRequestResponse(res, "Account does not exist");
  }

  const _data = {};
  Object.assign(_data, userResult);
  Object.assign(_data, req.body);
  const data: UserDto = _data as UserDto;

  const [updateUserError] = await updateUserById(req.user.id, {
    mobileNumber: data.mobileNumber,
    lastName: data.lastName,
    firstName: data.firstName,
    gender: data.gender ?? null,
    address: data.address ?? null,
    photo: data.photo ?? null,
    businessName: data.businessName ?? null
  });

  if (updateUserError) {
    console.log(updateUserError);
    return ErrorResponse(res);
  }

  const [updatedUserError, updatedUserResult] = await findUserById(req.user.id);

  if (updatedUserError) {
    return ErrorResponse(res);
  }

  if (!updatedUserResult) {
    return ErrorResponse(res);
  }

  return SuccessResponse(res, updatedUserResult);
});
