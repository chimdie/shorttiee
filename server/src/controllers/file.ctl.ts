import { ctlWrapper } from "../utils/ctl-wrapper";
import { SuccessResponse } from "../utils/response";

export const createFileCtl = ctlWrapper(async (req, res) => {
  console.log("files", req.files, req.body);
  return SuccessResponse(res, null, 201);
});
