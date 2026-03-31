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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "@/api/create-transaction";
import { Toaster } from "sonner";

const newTransactionFormSchema = z.object({
  description: z.string().min(1),
  category: z.string().min(1),
  amount: z.coerce.number().min(0.01),
  type: z.enum(["Receita", "Despesa"]),
});

export type newTransactionFormSchemaType = z.infer<
  typeof newTransactionFormSchema
>;

export function NewTransactionForm() {
  const queryClient = useQueryClient();

  const { mutateAsync: createTransactionFn } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "Receita",
    },
  });

  const handleSaveTransaction = async ({
    amount,
    category,
    description,
    type,
  }: newTransactionFormSchemaType) => {
    try {
      await createTransactionFn({
        amount: amount,
        category: category,
        description: description,
        type: type,
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSaveTransaction)}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Descrição" {...register("description")} />
      <Input placeholder="Categoria" {...register("category")} />
      <Input placeholder="Valor" {...register("amount")} />

			<Toaster />

      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex max-w-sm gap-2"
          >
            <FieldLabel htmlFor="Receita-option">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Receita</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="Receita" id="Receita-option" />
              </Field>
            </FieldLabel>

            <FieldLabel htmlFor="Despesa-option">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Despesa</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="Despesa" id="Despesa-option" />
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
