import { AppError } from "./errors";

export function fnToResult<
  E extends Error,
  T extends (...arg: any[]) => any,
  U = ReturnType<T>
>(fn: T) {
  return (...arg: Parameters<T>) => {
    try {
      const res: U = fn(...arg);
      return [null, res] as const;
    } catch (error: any) {
      return [AppError.from(error) as AppError] as const;
    }
  };
}

export function fnToResultAsync<
  E extends Error,
  T extends (...arg: any[]) => any,
  U = Awaited<ReturnType<T>>
>(fn: T) {
  return async (...arg: Parameters<T>) => {
    try {
      const res: U = await fn(...arg);
      return [null, res] as const;
    } catch (error: any) {
      return [AppError.from(error) as AppError] as const;
    }
  };
}
