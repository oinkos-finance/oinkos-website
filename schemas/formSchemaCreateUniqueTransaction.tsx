
import { z } from "zod";

export const formSchemaCreateUniqueTransaction = z.object({
  title: z.string().nonempty("Campo obrigatório."),
  value:z
  .union([
    z.string().regex(/^\d+(\.\d{1,2})?$/, "Digite um número válido (números inteiros ou decimal com o ponto como separador)."),
    z.number(),
  ])
  .transform((value) => (typeof value === "string" ? parseFloat(value) : value))
  .refine((value) => value >= 0, {
    message: "O número deve ser positivo.",
  }),
  paymentType: z.enum(["directTransfer", "cash", "creditCard", "debitCard"], {
    required_error: "Selecione um método de pagamento",
    message: "Selecione um dos valores permitidos"
  }),
  category: z.string().nonempty("Campo obrigatório."),
  transactionDate: z.string().nonempty('Data inválida ou formato incorreto')
});

export type FormValues = z.infer<typeof formSchemaCreateUniqueTransaction>;