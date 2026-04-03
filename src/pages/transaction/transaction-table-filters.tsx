import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

interface TransactionTableFiltersProps {
  typeOptions: string[];
  typeFilter: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onTypeChange: (type: string) => void;
}

export function TransactionTableFilters({
  typeOptions,
  typeFilter,
  searchTerm,
  onSearchChange,
  onTypeChange,
}: TransactionTableFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value);
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Buscar transação..."
        className="w-md"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <NativeSelect value={typeFilter} onChange={handleTypeChange}>
        {typeOptions.map((option) => (
          <NativeSelectOption key={option} value={option}>
            {option}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
