import { TableHead, TableRow } from "@/components/ui/table";

export function TransactionTableHeaderContent() {
  return (
    <TableRow>
      <TableHead className="text-sm">Data</TableHead>
      <TableHead className="text-sm">Descrição</TableHead>
      <TableHead className="text-sm">Categoria</TableHead>
      <TableHead className="text-sm">Tipo</TableHead>
      <TableHead className="text-sm">Valor</TableHead>
      <TableHead className="text-sm">Ações</TableHead>
    </TableRow>
  );
}
