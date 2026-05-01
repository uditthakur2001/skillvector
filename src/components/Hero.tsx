import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-vector.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      <div className="container relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Live + recorded cohorts · 1:1 mentorship · Placements</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Point your career in the right{" "}
            <span className="text-gradient-primary">vector.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Master in-demand skills through cohort-based courses, 1:1 mentorship from
            FAANG engineers, and portfolio-grade projects that get you hired.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/courses">Explore Courses<ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/mentors">Join as Mentor</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm">
            <div><div className="text-2xl font-bold">25k+</div><div className="text-muted-foreground">Active learners</div></div>
            <div className="h-10 w-px bg-border" />
            <div><div className="text-2xl font-bold">350+</div><div className="text-muted-foreground">Expert mentors</div></div>
            <div className="h-10 w-px bg-border" />
            <div><div className="text-2xl font-bold">94%</div><div className="text-muted-foreground">Placement rate</div></div>
          </div>
        </div>

        <div className="relative animate-fade-in-up [animation-delay:200ms]">
          <div className="absolute -inset-10 bg-gradient-primary opacity-30 blur-3xl rounded-full animate-pulse-glow" />
          <div className="relative animate-float">
            <img src={heroImg} alt="SkillVector vector arrow ascending through neon orbit" width={1280} height={1280} className="w-full h-auto rounded-3xl shadow-elegant" />
          </div>
        </div>
      </div>
    </section>
  );
};
