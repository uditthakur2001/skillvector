import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
// import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMagicLink = async (signup: boolean) => {
    if (!email.trim()) { toast.error("Enter your email"); return; }
    if (signup && !name.trim()) { toast.error("Enter your name"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}`,
        data: signup ? { full_name: name.trim(), phone: phone.trim() } : undefined,
      },
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
    toast.success("Check your inbox for the login link!");
  };

  const google = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}`,
    },
  });

  if (error) {
    toast.error("Google sign-in failed");
  }
};

  return (
    <PageShell>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 bg-gradient-hero">
        <div className="container max-w-md">
          <div className="rounded-3xl bg-gradient-card border border-border shadow-elegant p-8">
            <div className="text-center mb-6">
              <div className="inline-flex h-12 w-12 rounded-xl bg-gradient-primary items-center justify-center mb-4">
                <span className="text-primary-foreground font-black text-xl">V</span>
              </div>
              <h1 className="text-2xl font-extrabold">Welcome to SkillVector</h1>
              <p className="text-sm text-muted-foreground mt-1">Sign in or create an account to access your dashboard.</p>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-accent/15 mx-auto flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg">Check your email</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-6">We sent a magic login link to<br /><strong className="text-foreground">{email}</strong></p>
                <Button variant="glass" onClick={() => setSent(false)}>Use a different email</Button>
              </div>
            ) : (
              <Tabs defaultValue="signin">
                <TabsList className="grid grid-cols-2 mb-6 w-full">
                  <TabsTrigger value="signin">Sign in</TabsTrigger>
                  <TabsTrigger value="signup">Create account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <div>
                    <Label htmlFor="si-email">Email</Label>
                    <Input id="si-email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
                  </div>
                  <Button variant="cta" size="lg" className="w-full" onClick={() => sendMagicLink(false)} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send magic link <ArrowRight className="h-4 w-4" /></>}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div>
                    <Label htmlFor="su-name">Full name</Label>
                    <Input id="su-name" placeholder="Aarav Sharma" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="su-email">Email</Label>
                    <Input id="su-email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="su-phone">Phone (optional)</Label>
                    <Input id="su-phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
                  </div>
                  <Button variant="cta" size="lg" className="w-full" onClick={() => sendMagicLink(true)} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send magic link <ArrowRight className="h-4 w-4" /></>}
                  </Button>
                </TabsContent>

                <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px bg-border flex-1" /> OR <div className="h-px bg-border flex-1" />
                </div>

                <Button variant="glass" size="lg" className="w-full" onClick={google}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continue with Google
                </Button>
              </Tabs>
            )}

            <p className="text-xs text-center text-muted-foreground mt-6">
              By continuing you agree to our <Link to="/terms" className="underline">Terms</Link> &{" "}
              <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Auth;
