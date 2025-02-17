
import { z } from "zod";

export const formSchemaLogin = z.object({
  username: z.string().min(3,{
    message: "Seu username deve ter no mínimo três caracteres",
  }),
  password: z.string().min(8,{
    message: "A senha deverá ter no mínimo oito caracteres."
  })
});

export type FormValues = z.infer<typeof formSchemaLogin>;