import { getTransactions } from "@/api/get-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { parse, isSameMonth, subMonths } from "date-fns";
import { MoveUpRight, MoveDownRight, PiggyBank } from "lucide-react";

export function SavingsCard() {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const now = new Date();
  const lastMonth = subMonths(now, 1);

  let currentSavings = 0;
  let previousSavings = 0;

  transactions.forEach((transaction) => {
    const date = parse(transaction.date, "dd/MM/yyyy", new Date());

    const value =
      transaction.type === "Receita" ? transaction.amount : -transaction.amount;

    if (isSameMonth(date, now)) {
      currentSavings += value;
    }

    if (isSameMonth(date, lastMonth)) {
      previousSavings += value;
    }
  });

  const hasPrevious = previousSavings !== 0;

  const variation = hasPrevious
    ? ((currentSavings - previousSavings) / Math.abs(previousSavings)) * 100
    : 0;

  const isPositive = variation >= 0;

  const formattedVariation = hasPrevious
    ? Math.abs(variation) > 999
      ? `${isPositive ? "+" : ""}999`
      : `${isPositive ? "+" : ""}${variation.toFixed(1)}`
    : "—";

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Economia</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {currentSavings.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-primary/10 p-4">
            <PiggyBank size={24} className="text-primary" />
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          {hasPrevious &&
            (isPositive ? (
              <MoveUpRight className="text-emerald-500" size={16} />
            ) : (
              <MoveDownRight className="text-red-500" size={16} />
            ))}

          <span
            className={`font-bold ${
              isPositive ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {formattedVariation}%
          </span>

          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
