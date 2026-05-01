import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { CourseReview } from "@/data/courses";

type DBReview = { id: string; user_id: string; rating: number; comment: string | null; created_at: string };

export const CourseReviews = ({ courseId, seedReviews }: { courseId: string; seedReviews: CourseReview[] }) => {
  const { user } = useAuth();
  const [dbReviews, setDbReviews] = useState<DBReview[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("course_reviews").select("*").eq("course_id", courseId).order("created_at", { ascending: false }).limit(10);
    setDbReviews((data as DBReview[]) ?? []);
  };

  useEffect(() => { load(); }, [courseId]);

  const submit = async () => {
    if (!user) { toast.error("Please sign in to leave a review"); return; }
    if (!comment.trim()) { toast.error("Add a short comment"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("course_reviews").insert({ user_id: user.id, course_id: courseId, rating, comment: comment.trim() });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Thanks for your review!");
    setComment("");
    setRating(5);
    load();
  };

  const avg = (() => {
    const all = [...dbReviews.map(r => r.rating), ...seedReviews.map(r => r.rating)];
    return all.length ? (all.reduce((s, x) => s + x, 0) / all.length).toFixed(1) : "0";
  })();

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <span className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <strong>{avg}</strong>
          <span className="text-muted-foreground">({dbReviews.length + seedReviews.length})</span>
        </span>
      </div>

      {user && (
        <div className="rounded-xl bg-gradient-card border border-border p-5 mb-6">
          <p className="text-sm font-semibold mb-3">Share your experience</p>
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)} className="p-1">
                <Star className={`h-6 w-6 ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <Textarea placeholder="What did you like or not like?" value={comment} onChange={(e) => setComment(e.target.value)} maxLength={500} className="mb-3" />
          <Button variant="cta" size="sm" onClick={submit} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post review"}
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {dbReviews.map((r) => (
          <article key={r.id} className="p-5 rounded-xl bg-card/60 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-gradient-accent text-accent-foreground font-bold text-sm">U</AvatarFallback></Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">Verified Learner</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(n => <Star key={n} className={`h-3 w-3 ${n <= r.rating ? "fill-warning text-warning" : "text-muted-foreground/40"}`} />)}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{r.comment}</p>
          </article>
        ))}

        {seedReviews.map((r, i) => (
          <article key={i} className="p-5 rounded-xl bg-card/60 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-sm">{r.initials}</AvatarFallback></Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => <Star key={n} className={`h-3 w-3 ${n <= r.rating ? "fill-warning text-warning" : "text-muted-foreground/40"}`} />)}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{r.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
