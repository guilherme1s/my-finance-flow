import { getTransactions } from "@/api/get-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { format, parse, subMonths } from "date-fns";
import { MoveUpRight, MoveDownRight, TrendingDown } from "lucide-react";

export function ExpenseCard() {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const monthlyExpenses = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type !== "Despesa") return acc;

      const parsedDate = parse(transaction.date, "dd/MM/yyyy", new Date());
      const month = format(parsedDate, "yyyy-MM");

      if (!acc[month]) acc[month] = 0;

      acc[month] += transaction.amount;

      return acc;
    },
    {} as Record<string, number>
  );

  const now = new Date();
  const currentMonth = format(now, "yyyy-MM");
  const previousMonth = format(subMonths(now, 1), "yyyy-MM");

  const currentExpense = monthlyExpenses[currentMonth] ?? 0;
  const previousExpense = monthlyExpenses[previousMonth] ?? 0;

  const hasPrevious = previousExpense !== 0;

  const variation = hasPrevious
    ? ((currentExpense - previousExpense) / Math.abs(previousExpense)) * 100
    : 0;

  const isPositive = variation >= 0;

  const formattedVariation = hasPrevious
    ? Math.abs(variation) > 999
      ? `${isPositive ? "+" : ""}999`
      : `${isPositive ? "+" : ""}${variation.toFixed(0)}`
    : "—";

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Despesas</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {currentExpense.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-red-500/10 p-4">
            <TrendingDown size={24} className="text-rose-500" />
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          {hasPrevious &&
            (isPositive ? (
              <MoveUpRight className="text-rose-500" size={16} />
            ) : (
              <MoveDownRight className="text-emerald-500" size={16} />
            ))}

          <span
            className={`font-bold ${
              isPositive ? "text-rose-500" : "text-emerald-500"
            }`}
          >
            {hasPrevious ? `${formattedVariation}%` : "—"}
          </span>

          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
