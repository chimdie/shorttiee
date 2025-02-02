import EventEmitter from "events";
import { sendEmail } from "../utils/email";
import { fnToResultAsync } from "../utils/fn-result";

export type Events = {
  "EVENT::EMAIL": [EmailPayload];
};
export type EmailPayload = {
  email: string;
  title: string;
  content: string;
  template: "REGISTER" | "FORGOT_PASSWORD";
};
export const AppEventEmitter = new EventEmitter<Events>();

AppEventEmitter.on("EVENT::EMAIL", async (payload) => {
  const fn = fnToResultAsync(sendEmail);
  const [err, _res] = await fn(payload);

  if (err != null) {
    console.log("EMAIL ERROR", err);
    return;
  }
});
