interface PageTitleProps {
  title: string;
  subtitle: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <header className="mt-4 w-full">
      <h1 className="text-2xl xl:text-3xl font-semibold">{title}</h1>
      <p className="text-lg text-muted-foreground">{subtitle}</p>
    </header>
  );
}
