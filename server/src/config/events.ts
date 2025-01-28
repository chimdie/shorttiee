import EventEmitter from "events";
import { sendEmail } from "../utils/email";
import { fnToResultAsync } from "../utils/fn-result";

export type Events = {
  "EVENT::EMAIL::REGISTER": [EmailPayload];
  "EVENT::EMAIL::FORGOT_PASSWORD": [EmailPayload];
};
export type EmailPayload = { email: string; title: string; content: string };
export const AppEventEmitter = new EventEmitter<Events>();

AppEventEmitter.on("EVENT::EMAIL::REGISTER", async (payload) => {
  const fn = fnToResultAsync(sendEmail);
  const [err, _res] = await fn(payload);

  if (err != null) {
    console.log("EMAIL ERROR", err);
    return;
  }
});

AppEventEmitter.on("EVENT::EMAIL::FORGOT_PASSWORD", async (payload) => {
  const fn = fnToResultAsync(sendEmail);
  const [err, _res] = await fn(payload);

  if (err != null) {
    console.log("EMAIL ERROR", err);
    return;
  }
});
