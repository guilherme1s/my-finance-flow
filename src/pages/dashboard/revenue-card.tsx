import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveUpRight, TrendingUp } from "lucide-react";

export function RevenueCard() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Receitas</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {(12500).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-primary/10 p-4">
            <TrendingUp size={24} className="text-primary" />
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MoveUpRight className="text-emerald-500" size={16} />
          <span className="font-bold text-emerald-500">+8%</span>
          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
