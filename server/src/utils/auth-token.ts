import jwt from "jsonwebtoken";

export function signAuthToken<T>(payload: T) {
  try {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    return [null, token] as const;
  } catch (error) {
    return [error as Error] as const;
  }
}

export function verifyAuthToken(payload: string) {
  try {
    const result = jwt.verify(payload, process.env.JWT_SECRET);

    return [null, result] as const;
  } catch (error) {
    return [error as Error] as const;
  }
}
