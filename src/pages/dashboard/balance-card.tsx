import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveUpRight, Wallet } from "lucide-react";

export function BalanceCard() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Saldo Total</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {(2000).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span className="rounded-full bg-primary/10 p-4">
            <Wallet size={24} className="text-primary" />
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MoveUpRight className="text-emerald-500" size={16} />
          <span className="font-bold text-emerald-500">+12%</span>
          <span>vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
