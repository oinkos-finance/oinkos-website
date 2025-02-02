import { z } from "zod";

export const formSchemaRegister = z.object({
    name: z.string().min(3, {
        message: "Nome deve ter pelo menos 3 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor insira um email válido.",
    }),
    password: z.string().min(8, {
        message: "A senha deverá ter no mínimo oito caracteres"
    }),
    confirm_password: z.string()
    .nonempty("É obrigatório confirmar sua senha")
}).refine(({ password, confirm_password}) => password === confirm_password, {
    message: "As senhas não são iguais",
    path: ["confirm_password"]
})

export type FormValues = z.infer<typeof formSchemaRegister>;