import { getTransactions } from "@/api/get-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { format, subMonths } from "date-fns";
import { MoveUpRight, MoveDownRight, TrendingUp } from "lucide-react";

export function RevenueCard() {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const monthlyRevenue = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type !== "Receita") return acc;

      const parsedDate = new Date(transaction.date);
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

  const currentRevenue = monthlyRevenue[currentMonth] ?? 0;
  const previousRevenue = monthlyRevenue[previousMonth] ?? 0;

  const hasPrevious = previousRevenue !== 0;

  const variation = hasPrevious
    ? ((currentRevenue - previousRevenue) / Math.abs(previousRevenue)) * 100
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
        <CardTitle className="text-muted-foreground">Receitas</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {currentRevenue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-primary/10 p-4">
            <TrendingUp size={24} className="text-primary" />
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
            {hasPrevious ? `${formattedVariation}%` : "—"}
          </span>

          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
