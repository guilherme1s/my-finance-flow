import { Card } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export function NoDataDashboard() {
  return (
    <Card className="flex w-full items-center justify-center px-4 py-38">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <LayoutDashboard size={40} className="text-muted-foreground" />

        <h1 className="text-2xl font-semibold">Dashboard não disponível</h1>

        <p className="text-sm text-muted-foreground">
          Adicione transações para visualizar seus dados.
        </p>
      </div>
    </Card>
  );
}
