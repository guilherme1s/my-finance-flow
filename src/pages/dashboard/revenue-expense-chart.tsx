import { getTransactions } from "@/api/get-transactions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, parse, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

export function RevenueExpenseChart() {
  const { data: transactions = [] } = useQuery({
    queryFn: getTransactions,
    queryKey: ["transactions"],
  });

  const now = new Date();

  const last6Months = Array.from({ length: 6 }).map((_, index) => {
    const date = subMonths(now, 5 - index);
    return {
      key: format(date, "yyyy-MM"),
      label: format(date, "MMM", { locale: ptBR }),
    };
  });

  const grouped = transactions.reduce(
    (acc, transaction) => {
      const date = parse(transaction.date, "dd/MM/yyyy", new Date());
      const monthKey = format(date, "yyyy-MM");

      if (!last6Months.find((month) => month.key === monthKey)) return acc;

      if (!acc[monthKey]) {
        acc[monthKey] = {
          receitas: 0,
          despesas: 0,
        };
      }

      if (transaction.type === "Receita") {
        acc[monthKey].receitas += transaction.amount;
      } else {
        acc[monthKey].despesas += transaction.amount;
      }

      return acc;
    },
    {} as Record<string, { receitas: number; despesas: number }>
  );

  const chartData = last6Months.map(({ key, label }) => ({
    month: label,
    receitas: grouped[key]?.receitas ?? 0,
    despesas: grouped[key]?.despesas ?? 0,
  }));

  const chartConfig = {
    receitas: {
      label: "Receitas",
      color: "var(--chart-1)",
    },
    despesas: {
      label: "Despesas",
      color: "#f43f5e",
    },
  } satisfies ChartConfig;

  return (
    <Card className="p-6">
      <CardHeader className="mb-2">
        <p className="text-xl font-semibold">Receitas vs Despesas</p>
        <p className="text-lg text-muted-foreground">
          Comparativo dos últimos 6 meses
        </p>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.3}
                />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value / 1000}k`}
            />

            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="receitas"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#colorReceitas)"
            />
            <Area
              type="monotone"
              dataKey="despesas"
              stroke="#f43f5e"
              strokeWidth={2}
              fill="url(#colorDespesas)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
