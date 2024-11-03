import { Router } from "express";

export const router = Router();

router.get("/", (_req, res) => {
  return res.json({ message: "Success" });
});
