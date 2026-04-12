import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface PaginationTableProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function PaginationTable({
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  totalItems,
}: PaginationTableProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-muted-foreground">
        {currentPage * itemsPerPage - itemsPerPage + 1} a{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}{" "}
        categorias
      </p>

      <Pagination className="mx-0 w-auto shrink-0 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-label="previous-page"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
							aria-label="next-page"
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
