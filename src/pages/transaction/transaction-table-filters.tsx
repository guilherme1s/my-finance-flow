import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export function TransactionTableFilters() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Buscar transação..." className="w-md" />
      <NativeSelect>
        <NativeSelectOption value="">Todos</NativeSelectOption>
        <NativeSelectOption value="todo">Despesas</NativeSelectOption>
        <NativeSelectOption value="in-progress">Receitas</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
