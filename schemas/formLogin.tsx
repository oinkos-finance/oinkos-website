
import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z.string().email({
    message: "Por favor insira um email válido.",
  }),
  password: z.string().min(8,{
    message: "A senha deverá ter no mínimo oito caracteres"
  })
});

export type FormValues = z.infer<typeof formSchemaLogin>;