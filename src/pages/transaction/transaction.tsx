import { PageTitle } from "@/components/ui/theme/page-title";
import { Helmet } from "react-helmet-async";
import { TransactionTableBodyContent } from "./transaction-table-body-content";
import { ArrowRightLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { TransactionTableFilters } from "./transaction-table-filters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewTransactionForm } from "./new-transaction-form";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/api/get-transactions";
import { useMemo, useState } from "react";
import { TransactionTableHeaderContent } from "./transaction-table-header-content";
import { NoDataTable } from "@/components/ui/no-data-table";
import { PaginationTable } from "@/components/ui/pagination-table";

export function Transaction() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("Todos os tipos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

  const itemsPerPage = 8;

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    staleTime: Infinity,
  });

  const transactionTypeOptions = ["Todos os tipos", "Despesas", "Receitas"];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const typeMatch =
        filterType === "Todos os tipos" ||
        (filterType === "Despesas" && transaction.type === "Despesa") ||
        (filterType === "Receitas" && transaction.type === "Receita");

      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower);

      return typeMatch && searchMatch;
    });
  }, [transactions, filterType, searchTerm]);

  const totalTransactions = filteredTransactions.length;
  const currentTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  return (
    <div className="mx-auto flex w-full max-w-430 flex-col items-center justify-between gap-8 px-6 py-4 min-[1720px]:px-0">
      <Helmet title="Transações" />

      <header className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <PageTitle
          title="Transações"
          subtitle="Gerencie todas as suas transacoes financeiras."
        />

        <Dialog
          open={isAddCategoryDialogOpen}
          onOpenChange={setIsAddCategoryDialogOpen}
        >
          <DialogTrigger asChild>
            <Button type="button" className="text-md h-10 cursor-pointer">
              <Plus className="mr-2" size={16} /> Nova Transação
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Nova Transação
              </DialogTitle>
            </DialogHeader>

            <NewTransactionForm
              onSuccess={() => setIsAddCategoryDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </header>

      <main className="flex w-full flex-col gap-4">
        <TransactionTableFilters
          typeOptions={transactionTypeOptions}
          typeFilter={filterType}
          searchTerm={searchTerm}
          onTypeChange={setFilterType}
          onSearchChange={setSearchTerm}
        />

        <Card>
          <div className="px-4">
            {transactions.length > 0 ? (
              <>
                <Table className="mb-6 w-full lg:table-fixed">
                  <TableHeader>
                    <TransactionTableHeaderContent />
                  </TableHeader>

                  <TableBody>
                    <TransactionTableBodyContent
                      transactions={currentTransactions}
                    />
                  </TableBody>
                </Table>

                <div className="flex w-full justify-between">
                  <p className="text-muted-foreground">
                    {currentPage * itemsPerPage - itemsPerPage + 1} a{" "}
                    {Math.min(currentPage * itemsPerPage, totalTransactions)} de{" "}
                    {totalTransactions} transações
                  </p>

                  <div>
                    <PaginationTable
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      totalPages={totalPages}
                    />
                  </div>
                </div>
              </>
            ) : (
              <NoDataTable
                title="Nenhuma transação encontrada"
                description="Começe criando uma nova transação para acompanhar suas finanças."
                icon={ArrowRightLeft}
              />
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
