import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Briefcase,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MENTORS = [
  {
    name: "Aarav Mehta",
    role: "Ex-Google DeepMind",
    expertise: "AI / ML",
    initials: "AM",
    rating: 5.0,
    sessions: 320,
    gradient: "from-violet-500 to-pink-500",
  },
  {
    name: "Priya Sharma",
    role: "Senior Eng, Stripe",
    expertise: "Full Stack",
    initials: "PS",
    rating: 4.9,
    sessions: 410,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Rohan Iyer",
    role: "Lead Sec, HackerOne",
    expertise: "Cybersecurity",
    initials: "RI",
    rating: 4.9,
    sessions: 285,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Neha Kapoor",
    role: "Principal SRE, Atlassian",
    expertise: "Cloud / DevOps",
    initials: "NK",
    rating: 4.8,
    sessions: 360,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "Karan Verma",
    role: "Sr. Mobile Eng, Swiggy",
    expertise: "React Native",
    initials: "KV",
    rating: 4.7,
    sessions: 220,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Ananya Rao",
    role: "Staff Designer, Figma",
    expertise: "Product Design",
    initials: "AR",
    rating: 5.0,
    sessions: 290,
    gradient: "from-indigo-500 to-purple-500",
  },
];

const STEPS = [
  {
    icon: Lightbulb,
    title: "Pick a mentor",
    desc: "Browse 350+ vetted mentors from FAANG and top product teams. Filter by expertise.",
  },
  {
    icon: Calendar,
    title: "Book a 30-min slot",
    desc: "Choose a time that works for both. Mentor sees your goals beforehand.",
  },
  {
    icon: MessageCircle,
    title: "Meet 1:1",
    desc: "Live video call. Get personalized feedback on code, career or projects.",
  },
  {
    icon: CheckCircle2,
    title: "Follow-up",
    desc: "Mentor shares notes & action items. Continue chat in our community.",
  },
];

const Mentors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applyOpen, setApplyOpen] = useState(false);
  const [bookingFor, setBookingFor] = useState<(typeof MENTORS)[number] | null>(
    null,
  );
  const [howOpen, setHowOpen] = useState(false);

  // Application form
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Booking form
  const [bookForm, setBookForm] = useState<{
    topic: string;
    slotAt: Date | null;
  }>({
    topic: "",
    slotAt: null,
  });
  const submitApplication = async () => {
    if (!appForm.name || !appForm.email || !appForm.expertise) {
      toast.error("Fill all required fields");
      return;
    }
    if (!user) {
      toast.error("Please sign in first");
      navigate("/auth");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("mentor_applications").insert({
      user_id: user.id,
      full_name: appForm.name,
      email: appForm.email,
      expertise: appForm.expertise,
      experience: appForm.experience,
      message: appForm.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Application received! We'll be in touch within 3 days.");
    setApplyOpen(false);
    setAppForm({
      name: "",
      email: "",
      expertise: "",
      experience: "",
      message: "",
    });
  };

  const submitBooking = async () => {
    if (!bookingFor) return;
    if (!bookForm.topic.trim() || !bookForm.slotAt) {
      toast.error("Pick a topic and slot");
      return;
    }
    if (!user) {
      toast.error("Please sign in to book");
      navigate("/auth");
      return;
    }
    // 🔥 ADD THIS CHECK
    if (bookForm.slotAt < new Date()) {
      toast.error("You can't book a past time");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("mentor_bookings").insert({
      user_id: user.id,
      mentor_name: bookingFor.name,
      // slot_at: new Date(bookForm.slotAt).toISOString(),
      slot_at: bookForm.slotAt ? bookForm.slotAt.toISOString() : null,
      topic: bookForm.topic,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(
      `Session booked with ${bookingFor.name}! Check your dashboard.`,
    );
    setBookingFor(null);
    setBookForm({ topic: "", slotAt: null });
  };

  return (
    <PageShell>
      <section className="bg-gradient-hero py-16 lg:py-20 border-b border-border">
        <div className="container">
          <p className="text-sm font-semibold text-accent tracking-wider uppercase mb-2">
            Mentors
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Learn from{" "}
            <span className="text-gradient-primary">people who built it.</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Senior engineers, designers and security pros from FAANG and top
            product companies — available 1:1.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="cta" size="lg" onClick={() => setApplyOpen(true)}>
              Apply as Mentor
            </Button>
            <Button variant="glass" size="lg" onClick={() => setHowOpen(true)}>
              How it works
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS.map((m) => (
            <article
              key={m.name}
              className="p-6 rounded-2xl bg-gradient-card border border-border hover:shadow-glow hover:-translate-y-1 transition-bounce"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback
                    className={`bg-gradient-to-br ${m.gradient} text-white font-bold`}
                  >
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
              </div>
              <div className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary inline-block mb-4 font-semibold">
                <Briefcase className="inline h-3 w-3 mr-1" /> {m.expertise}
              </div>
              <div className="flex items-center justify-between text-sm mb-5">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                  <strong>{m.rating}</strong>
                </span>
                <span className="text-muted-foreground">
                  {m.sessions} sessions
                </span>
              </div>
              <Button
                variant="cta"
                className="w-full"
                onClick={() => setBookingFor(m)}
              >
                <MessageCircle className="h-4 w-4" /> Book a session
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Apply as Mentor */}
      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply to become a Mentor</DialogTitle>
            <DialogDescription>
              We'll review your application within 3 business days.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={appForm.name}
                onChange={(e) =>
                  setAppForm({ ...appForm, name: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={appForm.email}
                onChange={(e) =>
                  setAppForm({ ...appForm, email: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Area of expertise *</Label>
              <Input
                placeholder="e.g. AI/ML, Frontend, DevOps"
                value={appForm.expertise}
                onChange={(e) =>
                  setAppForm({ ...appForm, expertise: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Years of experience</Label>
              <Input
                placeholder="5+ years at Google, Stripe…"
                value={appForm.experience}
                onChange={(e) =>
                  setAppForm({ ...appForm, experience: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Why do you want to mentor?</Label>
              <Textarea
                rows={3}
                value={appForm.message}
                onChange={(e) =>
                  setAppForm({ ...appForm, message: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <Button
            variant="cta"
            size="lg"
            onClick={submitApplication}
            disabled={submitting}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit application"
            )}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Book session */}
      <Dialog
        open={!!bookingFor}
        onOpenChange={(v) => !v && setBookingFor(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book a session with {bookingFor?.name}</DialogTitle>
            <DialogDescription>
              30-minute 1:1 video call. Free for your first session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>What do you want to discuss?</Label>
              <Textarea
                rows={3}
                placeholder="e.g. Code review for my portfolio site"
                value={bookForm.topic}
                onChange={(e) =>
                  setBookForm({ ...bookForm, topic: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Pick a slot</Label>
              <div className="mt-1">
                <DatePicker
                  selected={bookForm.slotAt ? new Date(bookForm.slotAt) : null}
                  onChange={(date) =>
                    setBookForm({ ...bookForm, slotAt: date })
                  }
                  showTimeSelect
                  timeIntervals={30}
                  timeFormat="HH:mm"
                  dateFormat="dd MMM yyyy, h:mm aa"
                  minDate={new Date()}
                  placeholderText="Select date & time"
                  className="w-full px-4 py-3 rounded-xl bg-[#0f172a] text-white border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
          </div>
          <Button
            variant="cta"
            size="lg"
            onClick={submitBooking}
            disabled={submitting}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Confirm booking"
            )}
          </Button>
        </DialogContent>
      </Dialog>

      {/* How it works */}
      <Dialog open={howOpen} onOpenChange={setHowOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>How mentorship works</DialogTitle>
            <DialogDescription>
              From booking to follow-up — here's the flow.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-accent">STEP {i + 1}</p>
                  <h4 className="font-semibold">{s.title}</h4>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
};

export default Mentors;
