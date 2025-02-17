
import { z } from "zod";

export const formSchemaMyProfile = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor insira um email válido.",
  }),
  balance : z.number({
    message: "Por favor insira um número válido.",
  })
  
});

export type FormValues = z.infer<typeof formSchemaMyProfile>;