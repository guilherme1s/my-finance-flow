import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoveDownRight,
  MoveUpRight,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

type MetricType = "balance" | "revenue" | "expense" | "savings";

export interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  period: string;
  type: MetricType;
}

export function MetricCard({
  title,
  value,
  change,
  period,
  type,
}: MetricCardProps) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <span
            className={`rounded-full p-4 ${
              type === "expense" ? "bg-red-500/10" : "bg-primary/10"
            }`}
          >
            {type === "balance" && (
              <Wallet size={24} className="text-primary" />
            )}
            {type === "revenue" && (
              <TrendingUp size={24} className="text-primary" />
            )}
            {type === "expense" && (
              <TrendingDown
                size={24}
                className="text-rose-500 dark:text-rose-400"
              />
            )}
            {type === "savings" && (
              <PiggyBank size={24} className="text-primary" />
            )}
          </span>
        </div>
        <div className="text-md flex items-center gap-1 text-muted-foreground">
          {change > 0 ? (
            <>
              <MoveUpRight
                className="text-emerald-500 dark:text-emerald-400"
                size={16}
              />
              <span className="font-bold text-emerald-500 dark:text-emerald-400">
                +{change}%
              </span>{" "}
            </>
          ) : (
            <>
              <MoveDownRight
                className="text-rose-500 dark:text-rose-400"
                size={16}
              />
              <span className="font-bold text-rose-500 dark:text-rose-400">
                {change}%
              </span>{" "}
            </>
          )}
          {period}
        </div>
      </CardContent>
    </Card>
  );
}
