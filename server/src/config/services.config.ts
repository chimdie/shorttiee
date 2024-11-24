import type { Application } from "express"

export class CreateApplicationService {
  constructor(private app: Application) { }
  addService<T extends keyof Express.Locals>(name: T, service: Express.Locals[T]) {
    this.app.locals[name] = service;
    return this
  }
  build() {
    return this.app
  }
}
