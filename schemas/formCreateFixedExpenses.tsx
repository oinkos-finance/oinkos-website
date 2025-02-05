
import { z } from "zod";

export const formSchemaCreateFixedExpenses = z.object({
  description: z.string().nonempty("Campo obrigatório"),
  value : z.string().regex(/^\d+\,\d{2}$/, "O valor deve estar no formato decimal (ex: 12,90)")
});

export type FormValues = z.infer<typeof formSchemaCreateFixedExpenses>;