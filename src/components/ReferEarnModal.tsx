import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Gift, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

export const ReferEarnModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [copied, setCopied] = useState(false);
  const link = "https://skillvector.app/r/ARAV2026";
  const points = 1250;

  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="h-14 w-14 rounded-2xl bg-gradient-accent flex items-center justify-center mb-3 shadow-accent-glow">
            <Gift className="h-7 w-7 text-accent-foreground" />
          </div>
          <DialogTitle className="text-2xl">Refer & Earn</DialogTitle>
          <DialogDescription>
            Invite friends to SkillVector. Earn ₹500 in credits for every signup, and ₹2,000 when they enroll.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl bg-gradient-card border border-border p-5 my-2">
          <p className="text-xs text-muted-foreground mb-1">Your points balance</p>
          <p className="text-3xl font-extrabold text-gradient-accent">{points.toLocaleString("en-IN")} pts</p>
          <p className="text-xs text-muted-foreground mt-2">≈ ₹{(points * 1).toLocaleString("en-IN")} redeemable</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your referral link</label>
          <div className="flex gap-2">
            <Input readOnly value={link} className="font-mono text-xs" />
            <Button type="button" variant="cta" size="icon" onClick={copy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Button variant="glass" className="w-full mt-2">
          <Share2 className="h-4 w-4" /> Share on WhatsApp
        </Button>
      </DialogContent>
    </Dialog>
  );
};
