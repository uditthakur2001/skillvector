import { useState , useEffect} from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Gift,
  Trophy,
  BookOpen,
  FileCheck2,
  Sparkles,
  Clock,
  PlayCircle,
  Award,
  Briefcase,
  Radio,
  Video as VideoIcon,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Lock,
} from "lucide-react";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAuth } from "@/hooks/useAuth";
import { COURSES, getCourse, formatInr, JOB_OPENINGS } from "@/data/courses";
import { ReferEarnModal } from "@/components/ReferEarnModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Dashboard = () => {
  const { enrollments, updateProgress } = useEnrollments();
  const { user } = useAuth();
  if (user === undefined) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return; // still loading

    if (!user) {
      navigate("/");
    }
  }, [user]);
  const [referOpen, setReferOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeClassId, setActiveClassId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "courses";

  const myCourses = enrollments
    .map((e) => ({ enrollment: e, course: getCourse(e.course_id) }))
    .filter((x) => x.course);

  const activeCourse = activeCourseId ? getCourse(activeCourseId) : null;
  const activeEnrollment = enrollments.find(
    (e) => e.course_id === activeCourseId,
  );
  const activeClass =
    activeCourse?.classes.find((c) => c.id === activeClassId) ??
    activeCourse?.classes[0];

  const avgProgress = myCourses.length
    ? Math.round(
        myCourses.reduce((s, c) => s + c.enrollment.progress, 0) /
          myCourses.length,
      )
    : 0;
  const completedCount = myCourses.filter(
    (c) => c.enrollment.progress >= 100,
  ).length;

  const initials = user?.user_metadata?.full_name
    ? String(user.user_metadata.full_name)
        .split(" ")
        .map((s: string) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (user?.email?.[0]?.toUpperCase() ?? "U");
  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Learner";

  // Course player modal
  if (activeCourse && activeEnrollment) {
    return (
      <PageShell>
        <section className="container py-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveCourseId(null);
              setActiveClassId(null);
            }}
            className="mb-4"
          >
            ← Back to dashboard
          </Button>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-border shadow-elegant">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeClass?.videoId}?rel=0&modestbranding=1`}
                  title={activeClass?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 rounded-xl bg-gradient-card border border-border">
                <div className="flex items-center gap-2 mb-1">
                  {activeClass?.type === "live" ? (
                    <Radio className="h-4 w-4 text-warning" />
                  ) : (
                    <VideoIcon className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    {activeClass?.type === "live"
                      ? "Live Session"
                      : "Recorded Lesson"}
                  </span>
                </div>
                <h2 className="font-bold text-xl">{activeClass?.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeCourse.title} · {activeClass?.duration}
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">
                      Course progress
                    </span>
                    <span className="font-semibold">
                      {activeEnrollment.progress}%
                    </span>
                  </div>
                  <Progress value={activeEnrollment.progress} className="h-2" />
                  <Button
                    variant="cta"
                    size="sm"
                    className="mt-3"
                    onClick={() =>
                      updateProgress(
                        activeCourse.id,
                        Math.min(100, activeEnrollment.progress + 15),
                      )
                    }
                  >
                    Mark complete & continue
                  </Button>
                </div>
              </div>
            </div>

            <aside className="space-y-3">
              <div className="rounded-xl bg-gradient-card border border-border p-4">
                <h3 className="font-semibold mb-3 text-sm">Course content</h3>
                <div className="space-y-1">
                  {activeCourse.classes.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveClassId(c.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-smooth",
                        activeClass?.id === c.id
                          ? "bg-primary/15 text-foreground"
                          : "hover:bg-secondary/60 text-muted-foreground",
                      )}
                    >
                      {c.type === "live" ? (
                        <Radio className="h-4 w-4 text-warning shrink-0" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-primary shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate font-medium">
                          {c.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {c.duration}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-gradient-card border border-border p-4">
                <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-accent" /> Tests
                </h3>
                <div className="space-y-2">
                  {activeCourse.tests.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-2.5 rounded-md bg-secondary/50"
                    >
                      <div>
                        <p className="text-sm font-medium">{t.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.questions} Qs · {t.durationMin} min
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="glass"
                        onClick={() => toast.info("Test starting soon!")}
                      >
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="bg-gradient-hero py-12 border-b border-border">
        <div className="container flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 hidden sm:flex">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-accent tracking-wider uppercase mb-1">
                Welcome back, {displayName.split(" ")[0]}
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Your <span className="text-gradient-primary">Learning Hub</span>
              </h1>
            </div>
          </div>
          <Button variant="cta" size="lg" onClick={() => setReferOpen(true)}>
            <Gift className="h-4 w-4" /> Refer & Earn
          </Button>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active Courses",
              value: myCourses.length,
              icon: BookOpen,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: "Avg. Progress",
              value: `${avgProgress}%`,
              icon: Trophy,
              color: "text-accent",
              bg: "bg-accent/10",
            },
            {
              label: "Completed",
              value: completedCount,
              icon: Award,
              color: "text-warning",
              bg: "bg-warning/10",
            },
            {
              label: "Reward Points",
              value: "1,250",
              icon: Sparkles,
              color: "text-fuchsia-400",
              bg: "bg-fuchsia-500/10",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl bg-gradient-card border border-border flex items-center gap-3"
            >
              <div
                className={cn(
                  "h-11 w-11 rounded-xl flex items-center justify-center",
                  s.bg,
                  s.color,
                )}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-extrabold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue={initialTab} className="w-full">
          <TabsList className="bg-secondary/60 mb-6 flex-wrap h-auto">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="refer">Refer & Earn</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            {myCourses.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl bg-gradient-card border border-border">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No enrollments yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Browse our catalog and enroll in your first course to start
                  your learning journey.
                </p>
                <Button asChild variant="cta" size="lg">
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {myCourses.map(({ enrollment, course }) => (
                  <article
                    key={enrollment.id}
                    className="rounded-2xl bg-gradient-card border border-border overflow-hidden hover:shadow-glow transition-smooth"
                  >
                    <div className="flex">
                      <div
                        className={cn(
                          "w-28 shrink-0 bg-gradient-to-br flex items-center justify-center text-5xl",
                          course!.gradient,
                        )}
                      >
                        <span>{course!.emoji}</span>
                      </div>
                      <div className="p-5 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs text-muted-foreground">
                            {course!.category}
                          </p>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] py-0 px-1.5",
                              enrollment.plan === "live"
                                ? "bg-warning/15 text-warning"
                                : "bg-primary/15 text-primary",
                            )}
                          >
                            {enrollment.plan === "live" ? "LIVE" : "RECORDED"}
                          </Badge>
                        </div>
                        <h3 className="font-bold leading-snug mb-2">
                          {course!.title}
                        </h3>
                        <div className="space-y-1.5 mb-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-semibold">
                              {enrollment.progress}%
                            </span>
                          </div>
                          <Progress
                            value={enrollment.progress}
                            className="h-1.5"
                          />
                        </div>
                        <Button
                          variant="cta"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setActiveCourseId(course!.id);
                            setActiveClassId(course!.classes[0].id);
                          }}
                        >
                          <PlayCircle className="h-4 w-4" /> Continue learning
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tests">
            {myCourses.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Enroll in a course to access tests.
              </div>
            ) : (
              <div className="space-y-3">
                {myCourses
                  .flatMap(({ course }) =>
                    course!.tests.map((t) => ({ test: t, course: course! })),
                  )
                  .map(({ test, course }) => (
                    <div
                      key={`${course.id}-${test.id}`}
                      className="p-4 rounded-xl bg-gradient-card border border-border flex items-center gap-4"
                    >
                      <div className="h-11 w-11 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                        <FileCheck2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{test.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {course.title} · {test.questions} questions ·{" "}
                          {test.durationMin} min
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="cta"
                        onClick={() => toast.info(`Starting "${test.title}"…`)}
                      >
                        Start test
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="certificates">
            {completedCount === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-gradient-card border border-border">
                <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold mb-1">No certificates yet</h3>
                <p className="text-sm text-muted-foreground">
                  Complete a course to earn your verified certificate.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {myCourses
                  .filter((c) => c.enrollment.progress >= 100)
                  .map(({ course }) => (
                    <div
                      key={course!.id}
                      className="p-6 rounded-2xl bg-gradient-card border border-border text-center"
                    >
                      <Award className="h-12 w-12 text-warning mx-auto mb-3" />
                      <h3 className="font-bold">{course!.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Verified certificate · ID: SV-{course!.id.toUpperCase()}
                        -{Date.now().toString().slice(-5)}
                      </p>
                      <Button
                        size="sm"
                        variant="cta"
                        className="mt-4"
                        onClick={() =>
                          toast.success("Downloading certificate…")
                        }
                      >
                        Download PDF
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="jobs">
            <div className="mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" /> Open positions
                for you
              </h3>
              <p className="text-sm text-muted-foreground">
                Curated roles from our hiring partners.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {JOB_OPENINGS.map((j, i) => (
                <article
                  key={i}
                  className="p-5 rounded-xl bg-gradient-card border border-border hover:border-primary/40 transition-smooth"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary text-2xl flex items-center justify-center shrink-0">
                      {j.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold">{j.role}</h4>
                      <p className="text-sm text-muted-foreground">
                        {j.company}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        <Badge variant="secondary">
                          <MapPin className="h-3 w-3 mr-1" />
                          {j.location}
                        </Badge>
                        <Badge variant="secondary">{j.type}</Badge>
                        <Badge className="bg-accent/15 text-accent hover:bg-accent/20">
                          {j.salary}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="cta"
                    className="w-full mt-4"
                    onClick={() =>
                      toast.success(`Application submitted to ${j.company}!`)
                    }
                  >
                    Apply now <ArrowRight className="h-4 w-4" />
                  </Button>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="refer">
            <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-accent mx-auto flex items-center justify-center mb-4 shadow-accent-glow">
                <Gift className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Refer friends, earn rewards
              </h3>
              <p className="text-muted-foreground mb-2 max-w-lg mx-auto">
                Get ₹500 in credits when a friend signs up, and ₹2,000 when they
                enroll in a course.
              </p>
              <p className="text-3xl font-extrabold text-gradient-accent mt-6 mb-1">
                1,250 pts
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                ≈ {formatInr(1250)} redeemable
              </p>
              <Button
                variant="cta"
                size="lg"
                onClick={() => setReferOpen(true)}
              >
                Get my referral link
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {myCourses.length === 0 && (
          <div className="mt-12">
            <h3 className="font-bold text-lg mb-4">Recommended for you</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {COURSES.slice(0, 3).map((c) => (
                <Link
                  key={c.id}
                  to={`/course/${c.id}`}
                  className="p-4 rounded-xl bg-gradient-card border border-border hover:border-primary/40 transition-smooth flex items-center gap-3"
                >
                  <div
                    className={cn(
                      "h-12 w-12 rounded-lg bg-gradient-to-br flex items-center justify-center text-2xl",
                      c.gradient,
                    )}
                  >
                    {c.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{c.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatInr(c.priceInr)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <ReferEarnModal open={referOpen} onOpenChange={setReferOpen} />
    </PageShell>
  );
};

export default Dashboard;
