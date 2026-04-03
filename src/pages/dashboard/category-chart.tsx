import { getTransactions } from "@/api/get-transactions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { format, parse } from "date-fns";
import type { TransactionsType } from "../transaction/transaction-table-body-content";

type GroupedTransactions = Record<
  string,
  {
    total: number;
    items: TransactionsType[];
  }
>;

const COLORS = ["#0ea5e9", "#f59e0b", "#22c55e", "#8b5cf6", "#f43f5e"];

export function CategoryChart() {
  const { data: transactions = [] } = useQuery<TransactionsType[]>({
    queryFn: getTransactions,
    queryKey: ["transactions"],
  });

  const currentMonth = format(new Date(), "yyyy-MM");

  const expenseTransactions = transactions.filter((transaction) => {
    if (transaction.type !== "Despesa") return false;

    const transactionDate = parse(transaction.date, "dd/MM/yyyy", new Date());
    const transactionMonth = format(transactionDate, "yyyy-MM");

    return transactionMonth === currentMonth;
  });

  const transactionsGroupedByCategory =
    expenseTransactions.reduce<GroupedTransactions>((acc, transaction) => {
      const key = transaction.category;

      if (!acc[key]) {
        acc[key] = {
          total: 0,
          items: [],
        };
      }

      acc[key].items.push(transaction);
      acc[key].total += transaction.amount;

      return acc;
    }, {});

  const categoryData = Object.entries(transactionsGroupedByCategory)
    .map(([category, data]) => ({
      name: category,
      value: data.total,
    }))
    .sort((a, b) => b.value - a.value);

  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  const chartConfig = Object.fromEntries(
    categoryData.map((item, index) => [
      item.name,
      {
        label: item.name,
        color: COLORS[index % COLORS.length],
      },
    ])
  ) satisfies ChartConfig;

  return (
    <Card className="p-6">
      <CardHeader className="mb-2">
        <p className="text-xl font-semibold">Despesas por categoria</p>
        <p className="text-lg text-muted-foreground">
          Distribuição do mês atual
        </p>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <ChartTooltip content={<ChartTooltipContent />} />

            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ChartContainer>

        <div className="flex w-full flex-col items-center">
          <p className="text-xl text-muted-foreground">Total de despesas</p>
          <p className="text-2xl font-bold">
            R$ {total.toLocaleString("pt-BR")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
