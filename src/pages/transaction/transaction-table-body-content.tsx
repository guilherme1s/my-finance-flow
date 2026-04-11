import { Badge } from "@/components/ui/badge";
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
import { NewTransactionForm } from "./new-transaction-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "@/api/delete-transaction";
import { toast } from "sonner";
import { useState } from "react";

export interface TransactionsType {
  id: number;
  date: string;
  description: string;
  category: string;
  type: "Receita" | "Despesa";
  amount: number;
}

interface TransactionTableBodyPropsContent {
  transactions: TransactionsType[];
}

export function TransactionTableBodyContent({
  transactions,
}: TransactionTableBodyPropsContent) {
  const [editingTransactionId, setEditingTransactionId] = useState<
    number | null
  >(null);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteTransactionFn } = useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleDeleteTransaction = async (id: number) => {
    try {
      await deleteTransactionFn(id);
      toast.success("Transação excluída com sucesso!");
    } catch {
      toast.error("Erro ao deletar transação. Tente novamente.");
    }
  };

  return (
    <>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id} className="align-middle">
          <TableCell className="py-4 text-muted-foreground">
            {new Date(transaction.date).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </TableCell>

          <TableCell className="py-4">{transaction.description}</TableCell>

          <TableCell className="py-4">
            <Badge variant="outline" className="text-md h-6 rounded-sm">
              {transaction.category}
            </Badge>
          </TableCell>

          <TableCell className="py-4">
            <Badge
              variant="outline"
              className={`h-6 rounded-sm px-2 text-sm ${
                transaction.type === "Receita"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
              }`}
            >
              {transaction.type}
            </Badge>
          </TableCell>

          <TableCell className="py-4">
            {transaction.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </TableCell>

          <TableCell className="py-4">
            <div className="flex items-center gap-2">
              <Dialog
                open={editingTransactionId === transaction.id}
                onOpenChange={(open) =>
                  setEditingTransactionId(open ? transaction.id : null)
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
                  <DialogTitle>Editar Transação</DialogTitle>
                  <NewTransactionForm
                    transaction={transaction}
                    onSuccess={() => setEditingTransactionId(null)}
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
                    Excluir transação
                  </DialogTitle>
                  <p className="text-lg">
                    Tem certeza que desaja excluir essa transação?
                  </p>

                  <div className="flex gap-2">
                    <Button
                      className="w-1/2 cursor-pointer"
                      onClick={() => handleDeleteTransaction(transaction.id)}
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
