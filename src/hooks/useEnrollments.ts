import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type Enrollment = {
  id: string;
  course_id: string;
  plan: "live" | "recorded";
  amount_paid: number;
  progress: number;
  enrolled_at: string;
};

export const useEnrollments = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) { setEnrollments([]); return; }
    setLoading(true);
    const { data } = await supabase.from("enrollments").select("*").eq("user_id", user.id).order("enrolled_at", { ascending: false });
    setEnrollments((data as Enrollment[]) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const enroll = async (courseId: string, amountPaid: number, plan: "live" | "recorded") => {
    if (!user) return { error: "not_authenticated" };
    const { error } = await supabase.from("enrollments").upsert({
      user_id: user.id,
      course_id: courseId,
      plan,
      amount_paid: amountPaid,
      progress: Math.floor(Math.random() * 15),
    }, { onConflict: "user_id,course_id" });
    await refresh();
    return { error };
  };

  const isEnrolled = (courseId: string) => enrollments.some((e) => e.course_id === courseId);

  const updateProgress = async (courseId: string, progress: number) => {
    if (!user) return;
    await supabase.from("enrollments").update({ progress }).eq("user_id", user.id).eq("course_id", courseId);
    await refresh();
  };

  return { enrollments, loading, enroll, isEnrolled, refresh, updateProgress };
};
