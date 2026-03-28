import { PageTitle } from "@/components/ui/theme/page-title";
import { Helmet } from "react-helmet-async";
import {
  TransactionTableBodyContent,
  type TransactionsType,
} from "./transaction-table-body-content";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { TransactionTableFilters } from "./transaction-table-filters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TransactionTableHeaderContent } from "./transaction-table-header-content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewTransactionForm } from "./new-transaction-form";

export function Transaction() {
  const transactions: TransactionsType[] = [
    {
      id: 1,
      date: "05/01/2024",
      description: "Salário",
      category: "Trabalho",
      type: "Receita",
      amount: 50000,
    },
    {
      id: 2,
      date: "10/01/2024",
      description: "Aluguel",
      category: "Moradia",
      type: "Despesa",
      amount: 1800,
    },
    {
      id: 3,
      date: "15/01/2024",
      description: "Freelance",
      category: "Trabalho",
      type: "Receita",
      amount: 2740,
    },
    {
      id: 4,
      date: "18/01/2024",
      description: "Supermercado",
      category: "Alimentação",
      type: "Despesa",
      amount: 650,
    },
    {
      id: 5,
      date: "20/01/2024",
      description: "Conta de Luz",
      category: "Moradia",
      type: "Despesa",
      amount: -1800,
    },
    {
      id: 6,
      date: "22/01/2024",
      description: "Uber",
      category: "Transporte",
      type: "Despesa",
      amount: -120,
    },
    {
      id: 7,
      date: "25/01/2024",
      description: "Cinema",
      category: "Lazer",
      type: "Despesa",
      amount: -80,
    },
    {
      id: 8,
      date: "28/01/2024",
      description: "Dividendos",
      category: "Investimentos",
      type: "Receita",
      amount: 320,
    },
  ];

  const totalTransactions = 100;

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
            <Button className="h-10 cursor-pointer text-lg">
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
            <Table className="mb-6 w-full table-fixed">
              <TableHeader>
                <TransactionTableHeaderContent />
              </TableHeader>

              <TableBody>
                <TransactionTableBodyContent transactions={transactions} />
              </TableBody>
            </Table>

            <div className="flex w-full justify-between">
              <p className="text-muted-foreground">
                1 de {totalTransactions} transações
              </p>

              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </CardDescription>
        </Card>
      </main>
    </div>
  );
}
