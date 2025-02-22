
import { z } from "zod";

export const formSchemaMyProfile = z.object({
  username: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor insira um email válido.",
  }),
  salary : z.coerce.number().min(0,{
    message: "Por favor insira um número válido.",
  }).refine(value => /^\d+(\.\d{1,2})?$/.test(value.toString()), { message: "O salário deve ter no máximo duas casas decimais." }),
  password: z.string(),
  confirmPassword: z.string()
  
});

export type FormValues = z.infer<typeof formSchemaMyProfile>;