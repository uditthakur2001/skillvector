import { SimplePage } from "@/components/SimplePage";

const Terms = () => (
  <SimplePage eyebrow="Legal" title={<>Terms of <span className="text-gradient-primary">Service</span></>} lead="Last updated: 1 May 2026">
    <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
      <p>By using SkillVector you agree to the following terms.</p>
      <h3 className="text-foreground">Your account</h3>
      <p>Keep your login credentials secure. You're responsible for activity on your account.</p>
      <h3 className="text-foreground">Course access</h3>
      <p>Recorded courses come with lifetime access. Live cohorts run for the duration listed on the course page.</p>
      <h3 className="text-foreground">Refunds</h3>
      <p>30-day money-back guarantee on every paid course. See our refund policy for details.</p>
      <h3 className="text-foreground">Content</h3>
      <p>All course material is © SkillVector. You can use it for personal learning but cannot redistribute.</p>
    </div>
  </SimplePage>
);

export default Terms;
