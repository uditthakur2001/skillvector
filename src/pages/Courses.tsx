import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COURSES, CATEGORIES } from "@/data/courses";
import { cn } from "@/lib/utils";

const Courses = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const matchesCat = category === "All" || c.category === category;
      const q = query.trim().toLowerCase();
      const matchesQ = !q || c.title.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, category]);

  return (
    <PageShell>
      <section className="bg-gradient-hero py-16 lg:py-20 border-b border-border">
        <div className="container">
          <p className="text-sm font-semibold text-accent tracking-wider uppercase mb-2">Course Catalog</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Find your <span className="text-gradient-primary">next leap.</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Hand-picked, cohort-based programs taught by senior engineers from leading product companies.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, topics, categories…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11 h-12 text-base glass"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={category === c ? "default" : "glass"}
                  onClick={() => setCategory(c)}
                  className={cn(category === c && "bg-gradient-primary text-primary-foreground")}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} {filtered.length === 1 ? "course" : "courses"} found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No courses match your filters. Try clearing them.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default Courses;
