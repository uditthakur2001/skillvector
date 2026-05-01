import { SimplePage } from "@/components/SimplePage";

const Privacy = () => (
  <SimplePage eyebrow="Legal" title={<>Privacy <span className="text-gradient-primary">Policy</span></>} lead="Last updated: 1 May 2026">
    <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
      <p>SkillVector respects your privacy. This policy explains what we collect and how we use it.</p>
      <h3 className="text-foreground">What we collect</h3>
      <p>Your name, email, and phone number when you sign up. Course progress and quiz results. Payment metadata (we never store card details — payments go through certified gateways).</p>
      <h3 className="text-foreground">How we use it</h3>
      <p>To deliver courses, send class reminders, issue certificates, and improve our platform. We never sell your data.</p>
      <h3 className="text-foreground">Your rights</h3>
      <p>You can request a copy of your data, ask us to correct it, or delete your account at any time by emailing privacy@skillvector.app.</p>
    </div>
  </SimplePage>
);

export default Privacy;
