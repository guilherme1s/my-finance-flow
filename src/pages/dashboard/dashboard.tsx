import { Helmet } from "react-helmet-async";
import { MetricCard, type MetricCardProps } from "./metric-card";

export function Dashboard() {
  const financialMetrics: MetricCardProps[] = [
    {
      title: "Saldo Total",
      value: 2000,
      change: 12,
      period: "vs. mês anterior",
      type: "balance",
    },
    {
      title: "Receitas",
      value: 12500,
      change: -12,
      period: "este mês",
      type: "revenue",
    },
    {
      title: "Despesas",
      value: 12500,
      change: 12,
      period: "este mês",
      type: "expense",
    },
    {
      title: "Economia",
      value: 12500,
      change: 12,
      period: "acumulado",
      type: "savings",
    },
  ];

  return (
    <div className="w-440:px-0 mx-auto flex w-full max-w-430 flex-col items-center justify-between gap-8 px-6 py-4">
      <Helmet title="Dashboard" />
      <header className="mt-4 w-full">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-lg text-muted-foreground">Acompanhe suas finanças</p>
      </header>
      <main className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {financialMetrics.map((card) => {
          return (
            <MetricCard
              key={card.title}
              title={card.title}
              value={card.value}
              change={card.change}
              period={card.period}
              type={card.type}
            />
          );
        })}
      </main>
    </div>
  );
}
