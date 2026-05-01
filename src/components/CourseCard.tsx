import { Link } from "react-router-dom";
import { Star, Clock, Flame, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Course, formatInr } from "@/data/courses";

export const CourseCard = ({ course }: { course: Course }) => {
  return (
    <article className="group relative bg-gradient-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-1 transition-bounce flex flex-col">
      <Link to={`/course/${course.id}`} className={cn("relative h-40 bg-gradient-to-br flex items-center justify-center text-6xl", course.gradient)}>
        <span className="drop-shadow-2xl group-hover:scale-110 transition-bounce">{course.emoji}</span>
        {course.trending && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-bold">
            <Flame className="h-3 w-3 text-warning" /> Trending 2026
          </div>
        )}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur text-[10px] font-semibold uppercase tracking-wider">
          {course.level}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground mb-1">{course.category}</p>
        <Link to={`/course/${course.id}`}>
          <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-smooth">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{course.tagline}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="text-foreground font-semibold">{course.rating}</span>
          </span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{(course.students / 1000).toFixed(1)}k</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-extrabold">{formatInr(course.priceInr)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatInr(course.originalInr)}</span>
        </div>

        <Button asChild variant="cta" className="w-full">
          <Link to={`/course/${course.id}`}>Enroll Now</Link>
        </Button>
      </div>
    </article>
  );
};
