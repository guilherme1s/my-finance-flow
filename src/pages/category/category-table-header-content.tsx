import { TableHead, TableRow } from "@/components/ui/table";

export function CategoryTableHeaderContent() {
  return (
    <TableRow>
      <TableHead className="text-sm">Nome</TableHead>
      <TableHead className="text-sm">Descrição</TableHead>
      <TableHead className="text-sm">Ações</TableHead>
    </TableRow>
  );
}
