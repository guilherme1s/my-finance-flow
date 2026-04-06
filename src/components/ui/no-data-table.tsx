import type { LucideIcon } from "lucide-react";

interface NoDataTableProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function NoDataTable({
  title,
  description,
  icon: Icon,
}: NoDataTableProps) {
  return (
    <div className="flex items-center justify-center px-4 py-38">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <Icon size={40} className="text-muted-foreground" />

        <h1 className="text-2xl font-semibold">{title}</h1>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
