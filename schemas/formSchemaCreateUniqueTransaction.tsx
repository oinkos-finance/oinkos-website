
import { z } from "zod";

export const formSchemaCreateUniqueTransaction = z.object({
  description: z.string().nonempty("Campo obrigatório."),
  value: z
  .string()
  .regex(/^-?\d+,\d{2}$/, "O valor deve estar no formato decimal (ex: 12,90)")
  .refine((value) => {
    const numericValue = Number(value.replace(',', '.'));
    return numericValue >= 0; 
  }, {
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