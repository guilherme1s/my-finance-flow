import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveUpRight, PiggyBank } from "lucide-react";

export function SavingsCard() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Economia</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {(8000).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-primary/10 p-4">
            <PiggyBank size={24} className="text-primary" />
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MoveUpRight className="text-emerald-500" size={16} />
          <span className="font-bold text-emerald-500">+15%</span>
          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
