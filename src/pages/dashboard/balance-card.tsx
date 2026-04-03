import { getTransactions } from "@/api/get-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MoveUpRight, MoveDownRight, Wallet } from "lucide-react";
import { parse, isSameMonth, subMonths } from "date-fns";

export function BalanceCard() {
  const { data: transactions = [] } = useQuery({
    queryFn: getTransactions,
    queryKey: ["transactions"],
  });

  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "Receita"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const now = new Date();
  const lastMonth = subMonths(now, 1);

  let currentBalance = 0;
  let previousBalance = 0;

  transactions.forEach((transaction) => {
    const date = parse(transaction.date, "dd/MM/yyyy", new Date());

    const value =
      transaction.type === "Receita" ? transaction.amount : -transaction.amount;

    if (isSameMonth(date, now)) {
      currentBalance += value;
    }

    if (isSameMonth(date, lastMonth)) {
      previousBalance += value;
    }
  });

  const hasPrevious = previousBalance !== 0;

  const variation = hasPrevious
    ? ((currentBalance - previousBalance) / Math.abs(previousBalance)) * 100
    : 0;

  const isPositive = variation >= 0;

  const formattedVariation = hasPrevious
    ? `${isPositive ? "+" : ""}${variation.toFixed(0)}%`
    : "—";

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Saldo Total</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {totalBalance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-primary/10 p-4">
            <Wallet size={24} className="text-primary" />
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          {hasPrevious ? (
            isPositive ? (
              <MoveUpRight className="text-emerald-500" size={16} />
            ) : (
              <MoveDownRight className="text-red-500" size={16} />
            )
          ) : null}

          <span
            className={`font-bold ${
              isPositive ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {formattedVariation}
          </span>

          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
