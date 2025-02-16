
import { z } from "zod";

export const formSchemaVariableExpenses = z.object({
    value: z.string().regex(/^-?\d+\,\d{2}$/, "O valor deve estar no formato decimal (ex: 12,90)")
    .refine((value) => {
        const numericValue = Number(value.replace(',', '.'));
        return numericValue >= 0; 
      }, {
        message: "O número deve ser positivo.",
      }),
    description: z.string().nonempty("Campo obrigatório."),
    date: z.string().regex(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "A data deve estar no formato dd/mm/yyyy."
    )
});

export type FormValues = z.infer<typeof formSchemaVariableExpenses>;