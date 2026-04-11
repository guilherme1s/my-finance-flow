import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { NewCategoryForm } from "./new-category-form";
import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/api/delete-category";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { useState } from "react";

export interface CategoryType {
  id: number;
  name: string;
  description: string;
}

interface CategoryTableBodyPropsContent {
  categories: CategoryType[];
}

export function CategoryTableBodyContent({
  categories,
}: CategoryTableBodyPropsContent) {
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const { mutateAsync: deleteCategoryFn } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategoryFn(id);
      toast.success("Categoria excluída com sucesso!");
    } catch {
      toast.error("Erro ao deletar categoria. Tente novamente.");
    }
  };

  return (
    <>
      {categories.map((category) => (
        <TableRow key={category.id} className="align-middle">
          <TableCell className="py-4 text-muted-foreground">
            {category.name}
          </TableCell>

          <TableCell className="py-4">{category.description}</TableCell>

          <TableCell className="py-4">
            <div className="flex items-center gap-2">
              <Dialog
                open={editingCategoryId === category.id}
                onOpenChange={(open) =>
                  setEditingCategoryId(open ? category.id : null)
                }
              >
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="flex cursor-pointer items-center gap-2 bg-primary/10 px-4 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="font-medium">Editar</span>
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle>Editar Categoria</DialogTitle>
                  <NewCategoryForm
                    category={category}
                    onSuccess={() => setEditingCategoryId(null)}
                  />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="flex cursor-pointer items-center gap-2 px-4"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="font-medium">Excluir</span>
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle className="text-xl">
                    Excluir Categoria
                  </DialogTitle>
                  <p className="text-lg">
                    Tem certeza que desaja excluir essa categoria?
                  </p>

                  <div className="flex gap-2">
                    <Button
                      className="w-1/2 cursor-pointer"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Sim
                    </Button>

                    <DialogClose asChild>
                      <Button className="w-1/2 cursor-pointer bg-rose-500">
                        Não
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
