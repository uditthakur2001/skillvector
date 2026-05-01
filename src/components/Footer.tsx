import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin } from "lucide-react";

const COLS = [
  { title: "Learn", items: [
    { label: "Courses", to: "/courses" },
    { label: "Mentors", to: "/mentors" },
    { label: "Pricing", to: "/pricing" },
    { label: "Scholarships", to: "/scholarships" },
  ]},
  { title: "Company", items: [
    { label: "About", to: "/about" },
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/press" },
    { label: "Contact", to: "/contact" },
  ]},
  { title: "Resources", items: [
    { label: "Blog", to: "/blog" },
    { label: "FAQ", to: "/faq" },
    { label: "Help Center", to: "/help" },
    { label: "Community", to: "/community" },
  ]},
  { title: "Legal", items: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Refunds", to: "/refunds" },
    { label: "Cookies", to: "/cookies" },
  ]},
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/40 mt-12">
      <div className="container py-14 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-primary-foreground font-black text-lg leading-none">V</span>
            </span>
            Skill<span className="text-gradient-accent">Vector</span>
          </div>
          <p className="text-sm text-muted-foreground">Career-launching tech education for the next generation of builders.</p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-md flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold mb-4 text-sm">{col.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.items.map((i) => (
                <li key={i.label}><Link to={i.to} className="hover:text-foreground transition-smooth">{i.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 SkillVector. Crafted for builders.
      </div>
    </footer>
  );
};
