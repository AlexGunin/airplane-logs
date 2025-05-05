import { z } from 'zod';

export const safeParseArray = <T extends z.ZodTypeAny>(array: unknown[], schema: T) => {
  return array.reduce<z.infer<T>[]>((acc, cur) => {
    const parsed = schema.safeParse(cur);

    if (parsed.success) {
      acc.push(parsed.data);
    }

    return acc;
  }, []);
};
