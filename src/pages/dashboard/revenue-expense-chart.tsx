import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export function RevenueExpenseChart() {
  const chartData = [
    { month: "Jan", receitas: 4200, despesas: 2800 },
    { month: "Fev", receitas: 5100, despesas: 3200 },
    { month: "Mar", receitas: 4800, despesas: 2900 },
    { month: "Abr", receitas: 6200, despesas: 3500 },
    { month: "Mai", receitas: 7100, despesas: 3800 },
    { month: "Jun", receitas: 8240, despesas: 3120 },
  ];

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
