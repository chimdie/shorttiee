import type { Application } from "express";
import http from "http";

export class CreateApplicationService<T extends keyof Express.Locals> {
  constructor(private app: Application) {}
  addService<U extends T>(
    name: U,
    service: Express.Locals[T]
  ): Exclude<T, U> extends never
    ? Omit<CreateApplicationService<any>, "addService">
    : CreateApplicationService<Exclude<T, U>> {
    this.app.locals[name as T] = service;
    return this;
  }
  build() {
    return http.createServer(this.app);
  }
}
