import { PageTitle } from "@/components/ui/theme/page-title";
import { Helmet } from "react-helmet-async";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { NewCategoryForm } from "./new-category-form";
import { CategoryTableHeaderContent } from "./category-table-header-content";
import { getCategories } from "@/api/get-categories";
import { CategoryTableBodyContent } from "./category-table-body-content";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

export function Category() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 8;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        category.description.toLowerCase().includes(searchLower) ||
        category.name.toLowerCase().includes(searchLower);

      return searchMatch;
    });
  }, [categories, searchTerm]);

  const totalCategories = filteredCategories.length;

  const currentCategories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return filteredCategories.slice(start, end);
  }, [filteredCategories, currentPage]);

  const totalPages = Math.ceil(totalCategories / itemsPerPage);

  return (
    <div className="mx-auto flex w-full max-w-430 flex-col items-center justify-between gap-8 px-6 py-4 min-[1720px]:px-0">
      <Helmet title="Categorias" />

      <header className="flex w-full items-center justify-between">
        <PageTitle
          title="Categorias"
          subtitle="Crie e gerencie suas categorias para utilizar em suas transações"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="h-10 cursor-pointer text-md">
              <Plus className="mr-2" size={16} /> Nova Categoria
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Nova Categoria
              </DialogTitle>
            </DialogHeader>

            <NewCategoryForm />
          </DialogContent>
        </Dialog>
      </header>

      <main className="flex w-full flex-col gap-4">
        <Input
          placeholder="Buscar categoria..."
          className="w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Card>
          <CardDescription className="px-4">
            {categories.length > 0 ? (
              <>
                <Table className="mb-6 w-full table-fixed">
                  <TableHeader>
                    <CategoryTableHeaderContent />
                  </TableHeader>

                  <TableBody>
                    <CategoryTableBodyContent categories={currentCategories} />
                  </TableBody>
                </Table>

                <div className="flex w-full justify-between">
                  <p className="text-muted-foreground">
                    {currentPage * itemsPerPage - itemsPerPage + 1} a{" "}
                    {Math.min(currentPage * itemsPerPage, totalCategories)} de{" "}
                    {totalCategories} categorias
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

                        {Array.from({ length: totalPages }, (_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              isActive={currentPage === index + 1}
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
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
                Não há categorias disponíveis. Crie uma nova categoria para
                começar a organizar suas transações.
              </p>
            )}
          </CardDescription>
        </Card>
      </main>
    </div>
  );
}
