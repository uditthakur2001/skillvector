import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { COURSES } from "@/data/courses";

export const PopularCourses = () => {
  const featured = COURSES.slice(0, 4);
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-accent tracking-wider uppercase mb-2">Popular Courses</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-xl">
              Cohort-based programs built for{" "}
              <span className="text-gradient-primary">today's hiring bar.</span>
            </h2>
          </div>
          <Button asChild variant="ghost"><Link to="/courses">View all courses →</Link></Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
    </section>
  );
};
