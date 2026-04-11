import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/api/create-category";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { editCategory } from "@/api/edit-category";
import { Textarea } from "@/components/ui/textarea";

const newCategoryFormSchema = z.object({
  name: z.string().min(2),
  description: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : "-")),
});

export type newCategoryFormSchemaType = z.infer<typeof newCategoryFormSchema>;

interface CategoryWithId extends newCategoryFormSchemaType {
  id: number;
}

interface NewCategoryFormProps {
  category?: CategoryWithId;
  onSuccess: () => void;
}

export function NewCategoryForm({ category, onSuccess }: NewCategoryFormProps) {
  const { mutateAsync: createCategoryFn } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { mutateAsync: editCategoryFn, isPending: categoryLoading } =
    useMutation({
      mutationFn: ({ id, ...category }: CategoryWithId) =>
        editCategory(id, category),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(newCategoryFormSchema),
    defaultValues: category && {
      name: category.name,
      description: category.description,
    },
  });

  const handleSaveCategory = async ({
    name,
    description,
  }: newCategoryFormSchemaType) => {
    try {
      if (category?.id) {
        await editCategoryFn({ id: category.id, name, description });
        toast.success("Categoria editada com sucesso.");
        onSuccess();
      } else {
        await createCategoryFn({
          name,
          description,
        });
        toast.success("Categoria criada com sucesso.");
        onSuccess();
      }
    } catch {
      toast.error("Erro ao criar categoria. Tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSaveCategory)}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Nome*" {...register("name")} />
      <Textarea placeholder="Descrição" {...register("description")} />

      <Separator />

      <Button type="submit" disabled={categoryLoading}>
        Salvar
      </Button>
    </form>
  );
}
