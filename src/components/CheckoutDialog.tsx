import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Building2, CheckCircle2, Loader2, Lock, Mail } from "lucide-react";
import { type Course, formatInr } from "@/data/courses";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Stage = "form" | "processing" | "success" | "magic_sent";

export const CheckoutDialog = ({
  course,
  open,
  onOpenChange,
  plan,
}: {
  course: Course;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  plan: "live" | "recorded";
}) => {
  const navigate = useNavigate();
  const { enroll } = useEnrollments();
  const { user } = useAuth();
  const [stage, setStage] = useState<Stage>("form");
  const [method, setMethod] = useState("upi");
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
  });

  const basePrice = plan === "live" ? course.livePriceInr : course.priceInr;
  const tax = Math.round(basePrice * 0.18);
  const total = basePrice + tax;

  const reset = () => {
    setStage("form");
    setMethod("upi");
  };

  const handleClose = (v: boolean) => {
    if (!v) setTimeout(reset, 300);
    onOpenChange(v);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all details");
      return;
    }

    // If not logged in, send magic link first; user clicks it then can buy
    if (!user) {
      setStage("processing");
      const { error } = await supabase.auth.signInWithOtp({
        email: form.email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/course/${course.id}?plan=${plan}&checkout=1`,
          data: { full_name: form.name.trim(), phone: form.phone.trim() },
        },
      });
      if (error) {
        toast.error(error.message);
        setStage("form");
        return;
      }
      setStage("magic_sent");
      return;
    }

    setStage("processing");
    setTimeout(async () => {
      const { error } = await enroll(course.id, total, plan);
      if (error) {
        toast.error("Enrollment failed");
        setStage("form");
        return;
      }
      setStage("success");
      toast.success("Payment successful! 🎉");
    }, 1600);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {stage === "form" && (
          <form onSubmit={handlePay}>
            <DialogHeader className="p-6 pb-4 bg-gradient-card border-b border-border">
              <DialogTitle className="text-xl">Secure Checkout</DialogTitle>
              <DialogDescription>
                {course.title} · <span className="capitalize text-accent font-semibold">{plan}</span> cohort
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Aarav Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" />
                </div>
                {!user && (
                  <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-md">
                    💡 We'll email you a one-tap login link — no password needed. Once you click it, your enrollment will be activated.
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Payment Method</Label>
                <RadioGroup value={method} onValueChange={setMethod} className="gap-2">
                  {[
                    { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm", icon: Smartphone },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Rupay", icon: CreditCard },
                    { id: "netbanking", label: "Net Banking", desc: "All major banks", icon: Building2 },
                  ].map((m) => (
                    <label key={m.id} htmlFor={m.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth ${method === m.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`}>
                      <RadioGroupItem value={m.id} id={m.id} />
                      <m.icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{m.label}</div>
                        <div className="text-xs text-muted-foreground">{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div className="rounded-lg bg-secondary/50 p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{plan === "live" ? "Live cohort" : "Recorded course"}</span><span>{formatInr(basePrice)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>{formatInr(tax)}</span></div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between font-bold text-base"><span>Total</span><span className="text-gradient-primary">{formatInr(total)}</span></div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-2">
              <Button variant="cta" size="lg" type="submit" className="w-full">
                <Lock className="h-4 w-4" /> Pay {formatInr(total)}
              </Button>
              <p className="text-xs text-center text-muted-foreground">🔒 Demo gateway · No real money charged</p>
            </div>
          </form>
        )}

        {stage === "processing" && (
          <div className="p-12 flex flex-col items-center justify-center gap-4 min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center">
              <h3 className="font-bold text-lg">Processing…</h3>
              <p className="text-sm text-muted-foreground mt-1">Please don't close this window</p>
            </div>
          </div>
        )}

        {stage === "magic_sent" && (
          <div className="p-8 flex flex-col items-center justify-center gap-4 min-h-[400px] text-center">
            <div className="h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center">
              <Mail className="h-10 w-10 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">Check your inbox</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                We sent a one-tap login link to <strong className="text-foreground">{form.email}</strong>. Click it to confirm your account and finish enrollment.
              </p>
            </div>
            <Button variant="glass" className="mt-2" onClick={() => handleClose(false)}>Close</Button>
          </div>
        )}

        {stage === "success" && (
          <div className="p-8 flex flex-col items-center justify-center gap-4 min-h-[400px] text-center">
            <div className="h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center animate-pulse-glow">
              <CheckCircle2 className="h-12 w-12 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                You're enrolled in <strong className="text-foreground">{course.title}</strong>. Welcome to the cohort!
              </p>
            </div>
            <div className="flex gap-2 w-full pt-4">
              <Button variant="glass" className="flex-1" onClick={() => handleClose(false)}>Close</Button>
              <Button variant="cta" className="flex-1" onClick={() => { handleClose(false); navigate("/dashboard"); }}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
