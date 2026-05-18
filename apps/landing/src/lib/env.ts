import { z } from "zod";

const EnvSchema = z.object({
  // Add environment variables here as needed
  // EXAMPLE: ANALYTICS_ID: z.string().min(1),
});

type Env = z.infer<typeof EnvSchema>;
let _env: Env | undefined;

export function env(): Env {
  _env ??= EnvSchema.parse(process.env);
  return _env;
}
