type Unite<T> =
  T extends Record<string, unknown> ? { [Key in keyof T]: T[Key] } : T;

type StrictEquals<A1, A2> =
  (<A>() => A extends A2 ? true : false) extends <A>() => A extends A1
    ? true
    : false
  ? true
  : false;

export type Equals<A1, A2> = StrictEquals<Unite<A1>, Unite<A2>>;

export type Expand<T extends Record<string, any>> = {
  [k in keyof T]: T[k];
};

interface _WithDBTimestamps<T extends Record<string, any>> extends T {
  createdAt: string;
  updatedAt: string;
}

export type WithDBTimestamps<T extends Record<string, any>> = Expand<
  _WithDBTimestamps<T>
>;

interface _WithId<T extends Record<string, any>> extends T {
  id: string;
}

export type WithId<T extends Record<string, any>> = Expand<_WithId<T>>;
