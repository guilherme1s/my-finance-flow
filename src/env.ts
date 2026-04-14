import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_APP_DEMO: z.enum(["true", "false"]).optional(),
});

export const env = envSchema.parse(import.meta.env);
export const isDemo = env.VITE_APP_DEMO === "true";