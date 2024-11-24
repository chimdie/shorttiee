import { CreateListingsDto } from "../dto/listings.dto";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { SuccessResponse } from "../utils/response";
import { Request } from "express";

export const createListingCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateListingsDto>, res) => {
    return SuccessResponse(res, null, 201);
  }
);
