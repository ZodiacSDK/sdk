import type { ReactNode } from "react";

export function AppHeader({
  title,
  subtitle,
  trailing
}: {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) {
  return (
    <header className="app-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {trailing ? <div>{trailing}</div> : null}
    </header>
  );
}

export function FooterNote({ children }: { children: ReactNode }) {
  return <p className="footer-note">{children}</p>;
}
