import { Helmet } from "react-helmet-async";
import { BalanceCard } from "./balance-card";
import { ExpenseCard } from "./expense-card";
import { RevenueCard } from "./revenue-card";
import { SavingsCard } from "./saving-card";
import { PageTitle } from "@/components/ui/theme/page-title";

export function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-430 flex-col items-center justify-between gap-8 px-6 py-4 min-[1720px]:px-0">
      <Helmet title="Dashboard" />
      <PageTitle title="Dashboard" subtitle="Acompanhe suas finanças" />

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <BalanceCard />
        <RevenueCard />
        <ExpenseCard />
        <SavingsCard />
      </div>
    </div>
  );
}
