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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "@/api/create-transaction";
import { toast } from "sonner";
import { editTransaction } from "@/api/edit-transaction";
import { getCategories } from "@/api/get-categories";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const newTransactionFormSchema = z.object({
  description: z.string().min(1),
  category: z.string().min(1),
  amount: z.coerce.number().min(0.01),
  type: z.enum(["Receita", "Despesa"]),
});

export type newTransactionFormSchemaType = z.infer<
  typeof newTransactionFormSchema
>;

interface TransactionWithId extends newTransactionFormSchemaType {
  id: number;
}

interface NewTransactionFormProps {
  transaction?: TransactionWithId;
}

export function NewTransactionForm({ transaction }: NewTransactionFormProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: createTransactionFn } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const { mutateAsync: editTransactionFn } = useMutation({
    mutationFn: ({ id, ...transaction }: TransactionWithId) =>
      editTransaction(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: transaction
      ? {
          description: transaction.description,
          category: transaction.category,
          amount: transaction.amount,
          type: transaction.type,
        }
      : {
          category: "",
          type: "Receita",
        },
  });

  const handleSaveTransaction = async ({
    amount,
    category,
    description,
    type,
  }: newTransactionFormSchemaType) => {
    const action = transaction?.id ? "editar transação" : "criar transação";

    try {
      if (transaction?.id) {
        await editTransactionFn({
          id: transaction.id,
          amount,
          category,
          description,
          type,
        });
      } else {
        await createTransactionFn({
          amount,
          category,
          description,
          type,
        });
      }
    } catch {
      toast.error(`Erro ao ${action}`, {
        description: "Tente novamente.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSaveTransaction)}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Descrição" {...register("description")} />

      <NativeSelect className="w-full" {...register("category")}>
        <NativeSelectOption value="" disabled>
          Selecione uma categoria
        </NativeSelectOption>
        {categories.map((category) => (
          <NativeSelectOption key={category.id} value={category.name}>
            {category.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>

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
