
import { z } from "zod";

export const formSchemaLogin = z.object({
  username: z.string().nonempty({
    message: "É obrigatório colocar seu username.",
  }),
  password: z.string().nonempty({
    message: "É obrigatório colocar sua senha."
  })
});

export type FormValues = z.infer<typeof formSchemaLogin>;