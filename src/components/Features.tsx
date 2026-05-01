import { Video, Hammer, Trophy } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live Mentorship",
    desc: "Weekly 1:1 sessions with senior engineers from Google, Stripe & Meta. Real feedback, real growth.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Hammer,
    title: "Real-world Projects",
    desc: "Ship production-grade apps that solve real problems — every project becomes a portfolio piece.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Trophy,
    title: "Guaranteed Placements",
    desc: "94% of our graduates land roles within 6 months. Or your tuition is on us — that's our promise.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-accent tracking-wider uppercase mb-2">
            Why SkillVector
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            An ecosystem built around{" "}
            <span className="text-gradient-accent">your outcomes.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-smooth"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${f.bg} ${f.color} mb-5 group-hover:scale-110 transition-bounce`}>
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
