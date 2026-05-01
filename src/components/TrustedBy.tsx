const logos = [
  "GOOGLE", "MICROSOFT", "AMAZON", "META", "NETFLIX",
  "STRIPE", "AIRBNB", "UBER", "TESLA", "NVIDIA", "SPOTIFY", "FIGMA",
];

export const TrustedBy = () => {
  return (
    <section className="py-14 border-y border-border bg-card/30">
      <div className="container">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-8">
          Our graduates work at
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex marquee-track gap-16 w-max">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-muted-foreground/60 hover:text-foreground transition-smooth whitespace-nowrap"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
