import { useEffect, useState } from "react";
import { Link, useParams, Navigate, useSearchParams } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Star, Clock, Users, BookOpen, Award, Flame, ChevronLeft, Radio, Video } from "lucide-react";
import { getCourse, formatInr } from "@/data/courses";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { CourseReviews } from "@/components/CourseReviews";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const CourseDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const course = id ? getCourse(id) : undefined;
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<"live" | "recorded">((searchParams.get("plan") as any) === "live" ? "live" : "recorded");
  const { isEnrolled } = useEnrollments();
  const { user } = useAuth();

  // Auto-open checkout if returning from magic link
  useEffect(() => {
    if (searchParams.get("checkout") === "1" && user && course && !isEnrolled(course.id)) {
      setOpen(true);
    }
  }, [searchParams, user, course, isEnrolled]);

  if (!course) return <Navigate to="/courses" replace />;
  const enrolled = isEnrolled(course.id);
  const currentPrice = plan === "live" ? course.livePriceInr : course.priceInr;
  const currentOriginal = plan === "live" ? course.liveOriginalInr : course.originalInr;
  const discount = Math.round(((currentOriginal - currentPrice) / currentOriginal) * 100);

  return (
    <PageShell>
      <section className={cn("relative overflow-hidden border-b border-border")}>
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", course.gradient)} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="container relative py-16 lg:py-20">
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-3">
            <Link to="/courses"><ChevronLeft className="h-4 w-4" /> Back to courses</Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">{course.category}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-xs font-semibold uppercase tracking-wider">{course.level}</span>
                {course.trending && (
                  <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/15 text-warning text-xs font-bold">
                    <Flame className="h-3 w-3" /> Trending 2026
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{course.title}</h1>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl">{course.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /><strong>{course.rating}</strong> rating</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" />{course.students.toLocaleString("en-IN")} students</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4" />{course.duration}</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><Award className="h-4 w-4" />Certificate</span>
              </div>
            </div>

            <div className={cn("hidden lg:flex h-64 rounded-3xl bg-gradient-to-br items-center justify-center text-9xl shadow-elegant", course.gradient)}>
              <span className="drop-shadow-2xl animate-float">{course.emoji}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">About this course</h2>
            <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {course.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Syllabus</h2>
              <span className="text-sm text-muted-foreground">· {course.syllabus.length} modules</span>
            </div>
            <Accordion type="single" collapsible defaultValue="m-0" className="border border-border rounded-xl bg-card/50 divide-y divide-border">
              {course.syllabus.map((mod, i) => (
                <AccordionItem key={mod.title} value={`m-${i}`} className="border-0 px-5">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="h-7 w-7 rounded-md bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-semibold">{mod.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pl-10 pb-2">
                      {mod.lessons.map((l) => (
                        <li key={l} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {l}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Your instructor</h2>
            <div className="flex gap-5 p-6 rounded-xl bg-gradient-card border border-border">
              <Avatar className="h-16 w-16 shrink-0">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-lg">{course.instructor.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{course.instructor.name}</h3>
                <p className="text-sm text-accent font-medium">{course.instructor.role}</p>
                <p className="text-sm text-muted-foreground mt-2">{course.instructor.bio}</p>
              </div>
            </div>
          </div>

          <CourseReviews courseId={course.id} seedReviews={course.reviews} />
        </div>

        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-2xl bg-gradient-card border border-border shadow-elegant overflow-hidden">
            <div className={cn("h-32 bg-gradient-to-br flex items-center justify-center text-6xl", course.gradient)}>
              <span className="drop-shadow-2xl">{course.emoji}</span>
            </div>
            <div className="p-6 space-y-5">
              <Tabs value={plan} onValueChange={(v) => setPlan(v as any)}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="recorded"><Video className="h-3.5 w-3.5 mr-1.5" /> Recorded</TabsTrigger>
                  <TabsTrigger value="live"><Radio className="h-3.5 w-3.5 mr-1.5" /> Live cohort</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold">{formatInr(currentPrice)}</span>
                <span className="text-base text-muted-foreground line-through">{formatInr(currentOriginal)}</span>
                <span className="ml-auto text-xs font-bold px-2 py-1 rounded-md bg-accent/15 text-accent">{discount}% OFF</span>
              </div>
              <p className="text-xs text-warning">⏰ {plan === "live" ? "Cohort starts soon · Limited seats" : "Lifetime access · Start instantly"}</p>

              {enrolled ? (
                <Button asChild variant="cta" size="lg" className="w-full">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button variant="cta" size="lg" className="w-full" onClick={() => setOpen(true)}>
                  Buy Now · {plan === "live" ? "Live" : "Recorded"}
                </Button>
              )}

              <ul className="text-sm space-y-2.5 pt-2">
                {(plan === "live" ? [
                  "Live weekly classes & doubt-clearing",
                  "Mentor 1:1 sessions",
                  "Verified certificate",
                  "Job placement support",
                  "Capstone project review",
                ] : [
                  "Lifetime access to recordings",
                  "Hands-on assignments",
                  "Verified certificate",
                  "Community support",
                  "30-day money-back guarantee",
                ]).map((b) => (
                  <li key={b} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      <CheckoutDialog course={course} open={open} onOpenChange={setOpen} plan={plan} />
    </PageShell>
  );
};

export default CourseDetail;
