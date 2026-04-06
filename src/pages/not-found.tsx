import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <FileX size={56} className="text-muted-foreground" />

        <h1 className="text-3xl font-semibold">Página não encontrada</h1>

        <p className="text-lg text-muted-foreground">
          A página que você está tentando acessar não existe ou foi removida.
        </p>

        <Button asChild className="p-4 text-lg">
          <Link to="/">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  );
}
