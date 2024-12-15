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
      return [error as E] as const;
    }
  };
}
