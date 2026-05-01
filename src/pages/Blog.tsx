import { SimplePage } from "@/components/SimplePage";

const POSTS = [
  { title: "From bootcamp to Razorpay: Aditi's 6-month journey", excerpt: "How a finance graduate cracked her first SDE role through cohort learning + mentorship.", date: "Apr 28, 2026", tag: "Success Story" },
  { title: "Why we redesigned our AI/ML course for 2026", excerpt: "Less theory, more building. A look at the new syllabus and what changed.", date: "Apr 22, 2026", tag: "Curriculum" },
  { title: "Live cohorts vs self-paced: which one is for you?", excerpt: "We crunched data from 5,000+ learners to find out which format leads to better outcomes.", date: "Apr 15, 2026", tag: "Insights" },
  { title: "The SkillVector mentor handbook", excerpt: "How our 350+ mentors deliver consistent, high-impact 1:1 sessions every week.", date: "Apr 8, 2026", tag: "Behind the scenes" },
];

const Blog = () => (
  <SimplePage eyebrow="Blog" title={<>Insights from <span className="text-gradient-primary">the SkillVector</span> team.</>} lead="Career advice, curriculum updates, and stories from our learners and mentors.">
    <div className="grid sm:grid-cols-2 gap-6 mt-4">
      {POSTS.map((p) => (
        <article key={p.title} className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-smooth">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">{p.tag}</span>
          <h3 className="text-lg font-bold mt-2 mb-2">{p.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{p.excerpt}</p>
          <p className="text-xs text-muted-foreground">{p.date}</p>
        </article>
      ))}
    </div>
  </SimplePage>
);

export default Blog;
