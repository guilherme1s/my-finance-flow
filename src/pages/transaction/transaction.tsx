import { PageTitle } from "@/components/ui/theme/page-title";
import { Helmet } from "react-helmet-async";
import { TransactionTableBodyContent } from "./transaction-table-body-content";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { TransactionTableFilters } from "./transaction-table-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

export function Transaction() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    staleTime: Infinity,
  });

  const totalTransactions = transactions.length;

  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  const currentTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return transactions.slice(start, end);
  }, [transactions, currentPage]);

  return (
    <div className="mx-auto flex w-full max-w-430 flex-col items-center justify-between gap-8 px-6 py-4 min-[1720px]:px-0">
      <Helmet title="Transações" />

      <header className="flex w-full items-center justify-between">
        <PageTitle
          title="Transações"
          subtitle="Gerencie todas as suas transacoes financeiras."
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="h-10 cursor-pointer text-lg">
              <Plus className="mr-2" size={16} /> Nova Transação
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Nova Transação
              </DialogTitle>
            </DialogHeader>

            <NewTransactionForm />
          </DialogContent>
        </Dialog>
      </header>

      <main className="flex w-full flex-col gap-4">
        <TransactionTableFilters />

        <Card>
          <CardDescription className="px-4">
            {transactions.length > 0 ? (
              <>
                <Table className="mb-6 w-full table-fixed">
                  <TransactionTableHeaderContent />

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
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              isActive={currentPage === i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </>
            ) : (
              <p className="py-8 text-center text-xl text-muted-foreground">
                Não há transações disponíveis
              </p>
            )}
          </CardDescription>
        </Card>
      </main>
    </div>
  );
}
