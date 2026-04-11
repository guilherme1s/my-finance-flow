import { ChartPie } from "lucide-react";

export function NoDataCategoryChart() {
  return (
    <div className="flex w-full items-center justify-center px-4 py-24">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <ChartPie size={35} className="text-muted-foreground" />

        <h1 className="text-xl font-semibold">
          Nenhuma despesa para o mês atual
        </h1>
      </div>
    </div>
  );
}
