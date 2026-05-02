import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { COURSES } from "@/data/courses";

export const PopularCourses = () => {
  const featured = COURSES;
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-accent tracking-wider uppercase mb-2">
              Popular Courses
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-xl">
              Cohort-based programs built for{" "}
              <span className="text-gradient-primary">today's hiring bar.</span>
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/courses">View all courses →</Link>
          </Button>
        </div>

        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((c) => <CourseCard key={c.id} course={c} />)}
        </div> */}
        <div className="relative">
          {/* LEFT BUTTON */}
          <button
            onClick={() => {
              document
                .getElementById("courseScroll")
                ?.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur px-3 py-2 rounded-full"
          >
            ←
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => {
              document
                .getElementById("courseScroll")
                ?.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur px-3 py-2 rounded-full"
          >
            →
          </button>

          {/* SCROLL AREA */}
          <div
            id="courseScroll"
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-8"
          >
            {featured.map((c) => (
              <div key={c.id} className="w-[400px] flex-shrink-0 h-full">
                <CourseCard course={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
