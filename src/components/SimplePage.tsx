import { ReactNode } from "react";
import { PageShell } from "@/components/PageShell";

export const SimplePage = ({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: string; children?: ReactNode }) => (
  <PageShell>
    <section className="bg-gradient-hero py-16 lg:py-20 border-b border-border">
      <div className="container max-w-4xl">
        <p className="text-sm font-semibold text-accent tracking-wider uppercase mb-2">{eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
        {lead && <p className="text-lg text-muted-foreground mt-4 max-w-2xl">{lead}</p>}
      </div>
    </section>
    <section className="container py-12 max-w-4xl">{children}</section>
  </PageShell>
);
