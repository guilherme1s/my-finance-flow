import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

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
  return (
    <>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id} className="align-middle">
          <TableCell className="py-4">{transaction.id}</TableCell>

          <TableCell className="py-4 text-muted-foreground">
            {transaction.date}
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
              <Button
                size="lg"
                className="flex cursor-pointer items-center gap-2 bg-primary/10 px-4 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
              >
                <Pencil className="h-4 w-4" />
                <span className="font-medium">Editar</span>
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="flex cursor-pointer items-center gap-2 px-4"
              >
                <Trash className="h-4 w-4" />
                <span className="font-medium">Excluir</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
