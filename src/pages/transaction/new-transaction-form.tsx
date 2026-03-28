import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  amount: z.coerce.number().min(0.01),
  type: z.enum(["revenue", "expense"]),
});

type newTransactionFormSchemaType = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionForm() {
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "revenue",
    },
  });

  const handleSaveTransaction = (data: newTransactionFormSchemaType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSaveTransaction)}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Nome" {...register("name")} />
      <Input placeholder="Descrição" {...register("description")} />
      <Input placeholder="Categoria" {...register("category")} />
      <Input placeholder="Valor" {...register("amount")} />

      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex max-w-sm gap-2"
          >
            <FieldLabel htmlFor="revenue-option">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Receita</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="revenue" id="revenue-option" />
              </Field>
            </FieldLabel>

            <FieldLabel htmlFor="expense-option">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Despesa</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="expense" id="expense-option" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        )}
      />
      <Separator />

      <Button type="submit">Salvar</Button>
    </form>
  );
}
