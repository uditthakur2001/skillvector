import { Link } from "react-router-dom";
import { SimplePage } from "@/components/SimplePage";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { COURSES, formatInr } from "@/data/courses";

const PLANS = [
  { name: "Starter", price: 0, desc: "Browse content & try sample lessons", features: ["Free preview lessons", "Community access", "Career resources"], cta: "Get started", to: "/auth", highlight: false },
  { name: "Recorded", price: 9999, desc: "Self-paced learning at your pace", features: ["All recorded courses", "Lifetime access", "Verified certificate", "Community support"], cta: "Browse courses", to: "/courses", highlight: false },
  { name: "Live Cohort", price: 24999, desc: "Most popular — guided learning", features: ["Live weekly classes", "1:1 mentorship", "Job placement support", "Capstone review", "Priority Q&A"], cta: "Browse live cohorts", to: "/courses", highlight: true },
];

const Pricing = () => (
  <SimplePage eyebrow="Pricing" title={<>Simple, transparent <span className="text-gradient-primary">pricing</span></>} lead="Pay per course or unlock the full cohort experience. Money-back guarantee on every plan.">
    <div className="grid md:grid-cols-3 gap-6">
      {PLANS.map((p) => (
        <article key={p.name} className={`p-7 rounded-2xl border ${p.highlight ? "border-primary bg-gradient-card shadow-glow" : "border-border bg-gradient-card"}`}>
          {p.highlight && <span className="inline-block px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold mb-3">MOST POPULAR</span>}
          <h3 className="text-xl font-bold">{p.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
          <p className="text-4xl font-extrabold mt-5">{p.price === 0 ? "Free" : <>from {formatInr(p.price)}</>}</p>
          <ul className="space-y-2.5 mt-6 mb-6 text-sm">
            {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />{f}</li>)}
          </ul>
          <Button asChild variant={p.highlight ? "cta" : "glass"} className="w-full"><Link to={p.to}>{p.cta}</Link></Button>
        </article>
      ))}
    </div>

    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Course pricing at a glance</h2>
      <div className="rounded-2xl border border-border bg-gradient-card overflow-hidden divide-y divide-border">
        {COURSES.map((c) => (
          <div key={c.id} className="p-5 flex items-center gap-4">
            <div className={`h-11 w-11 rounded-lg bg-gradient-to-br flex items-center justify-center text-2xl ${c.gradient}`}>{c.emoji}</div>
            <div className="flex-1">
              <Link to={`/course/${c.id}`} className="font-semibold hover:text-primary">{c.title}</Link>
              <p className="text-xs text-muted-foreground">{c.category} · {c.duration}</p>
            </div>
            <div className="text-right text-sm">
              <p>Recorded: <strong>{formatInr(c.priceInr)}</strong></p>
              <p>Live: <strong className="text-accent">{formatInr(c.livePriceInr)}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SimplePage>
);

export default Pricing;
