import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Cell, Legend, Pie, PieChart } from "recharts";

const COLORS = ["#0ea5e9", "#f59e0b", "#22c55e", "#8b5cf6", "#f43f5e"];

export function CategoryChart() {
  const categoryData = [
    { name: "Alimentação", value: 1200 },
    { name: "Transporte", value: 800 },
    { name: "Moradia", value: 2500 },
    { name: "Lazer", value: 450 },
    { name: "Outros", value: 350 },
  ];

  const chartConfig = {
    Alimentação: { label: "Alimentação", color: COLORS[0] },
    Transporte: { label: "Transporte", color: COLORS[1] },
    Moradia: { label: "Moradia", color: COLORS[2] },
    Lazer: { label: "Lazer", color: COLORS[3] },
    Outros: { label: "Outros", color: COLORS[4] },
  } satisfies ChartConfig;

  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

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
