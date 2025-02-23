import { z } from "zod";

export const formSchemaRegister = z.object({
    username: z.string().min(3, {
        message: "Nome deve ter pelo menos 3 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor insira um email válido.",
    }),
    password: z.string().min(8, {
        message: "A senha deve ter no mínimo oito caracteres."
    }),
    confirmPassword: z.string()
    .nonempty("É obrigatório confirmar sua senha.")
}).refine(({ password, confirmPassword}) => password === confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirm_password"]
})

export type FormValues = z.infer<typeof formSchemaRegister>;