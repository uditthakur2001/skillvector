import { SimplePage } from "@/components/SimplePage";
import aboutImg from "@/assets/about-team.jpg";
import { Target, Users, Zap } from "lucide-react";

const About = () => (
  <SimplePage eyebrow="About SkillVector" title={<>We exist to point talented people in <span className="text-gradient-primary">the right vector.</span></>} lead="SkillVector was founded in 2024 by ex-FAANG engineers who saw too many talented people stuck in dead-end careers because they didn't have access to real mentorship.">
    <img src={aboutImg} alt="The SkillVector team" width={1280} height={800} loading="lazy" className="w-full rounded-3xl border border-border shadow-elegant my-8" />

    <div className="grid md:grid-cols-3 gap-6 my-12">
      {[
        { icon: Target, title: "Our Mission", desc: "Make world-class tech mentorship accessible to every learner in India and beyond." },
        { icon: Users, title: "Our Community", desc: "25,000+ learners, 350+ mentors, and 200+ hiring partners — and growing fast." },
        { icon: Zap, title: "Our Edge", desc: "Cohort-based learning + live mentorship + real projects = 94% placement rate." },
      ].map((c) => (
        <div key={c.title} className="p-6 rounded-2xl bg-gradient-card border border-border">
          <c.icon className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-bold mb-2">{c.title}</h3>
          <p className="text-sm text-muted-foreground">{c.desc}</p>
        </div>
      ))}
    </div>

    <h2 className="text-2xl font-bold mt-12 mb-4">Our story</h2>
    <p className="text-muted-foreground leading-relaxed">
      We started SkillVector after years of mentoring junior engineers at companies like Google, Stripe, and Atlassian. We kept seeing the same pattern: brilliant people held back by lack of access to senior guidance. So we built the platform we wished existed when we started — one that combines deep technical content with real human mentorship, and ends with a job, not just a certificate.
    </p>
  </SimplePage>
);

export default About;
