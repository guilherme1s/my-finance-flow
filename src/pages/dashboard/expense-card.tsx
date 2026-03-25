import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveDownRight, TrendingDown } from "lucide-react";

export function ExpenseCard() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Despesas</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {(5000).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-red-500/10 p-4">
            <TrendingDown size={24} className="text-rose-500" />
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MoveDownRight className="text-rose-500" size={16} />
          <span className="font-bold text-rose-500">-5%</span>
          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
