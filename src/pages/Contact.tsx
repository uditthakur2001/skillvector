import { useState } from "react";
import { SimplePage } from "@/components/SimplePage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Fill all fields"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent! We'll get back within 24 hours.");
    }, 900);
  };

  return (
    <SimplePage eyebrow="Contact" title={<>We'd <span className="text-gradient-primary">love to hear</span> from you.</>} lead="Questions about our courses, mentorship or partnerships? Drop us a line.">
      <div className="grid md:grid-cols-2 gap-10 mt-4">
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
          <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
          <div><Label>Message</Label><Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1" /></div>
          <Button variant="cta" size="lg" type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send message"}
          </Button>
        </form>
        <div className="space-y-5">
          {[
            { icon: Mail, label: "Email us", value: "hello@skillvector.app" },
            { icon: Phone, label: "Call us", value: "+91 80 1234 5678" },
            { icon: MapPin, label: "Bengaluru HQ", value: "Indiranagar, Bengaluru 560038" },
          ].map((c) => (
            <div key={c.label} className="p-5 rounded-xl bg-gradient-card border border-border flex items-start gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center"><c.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className="font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SimplePage>
  );
};

export default Contact;
