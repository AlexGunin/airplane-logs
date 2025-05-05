import { z } from 'zod';

const safeNumber = z.preprocess((val) => {
  const num = Number(val);
  return Number.isNaN(num) ? 0 : num;
}, z.number());

export const FlyPointScheme = z
  .object({
    Time: safeNumber,
    UTC: z.string().time().optional(),
    ny: safeNumber.optional(),
    Hбар1: safeNumber,
    λ: safeNumber,
    φ: safeNumber,
    γ: safeNumber.optional(),
    Танг: safeNumber.optional(),
  })
  .transform((data) => ({
    time: data['Time'],
    UTC: data.UTC,
    gForce: data['ny'],
    altitude: data['Hбар1'],
    longitude: data['λ'],
    latitude: data['φ'],
    roll: data['γ'],
    pitch: data['Танг'],
  }));

export const FlyScheme = z.array(FlyPointScheme);

export type FlyPointScheme = z.infer<typeof FlyPointScheme>;
export type FlyScheme = z.infer<typeof FlyScheme>;
