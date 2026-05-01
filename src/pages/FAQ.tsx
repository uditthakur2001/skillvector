import { SimplePage } from "@/components/SimplePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_LIST = [
  { q: "Is there a free trial?", a: "Yes — every course has free preview lessons. You can also book a free 30-minute mentorship session." },
  { q: "What's the difference between live and recorded?", a: "Recorded courses are self-paced with lifetime access. Live cohorts add weekly classes, mentor 1:1s, and placement support." },
  { q: "Do you offer placement support?", a: "Yes. Live cohort students get mock interviews, resume reviews, and intros to our 200+ hiring partners. 94% placement within 6 months." },
  { q: "Can I get a refund?", a: "Absolutely. We offer a no-questions-asked 30-day money-back guarantee on every paid course." },
  { q: "Are certificates verified?", a: "Yes — every certificate is signed and verifiable on our platform via a unique ID." },
  { q: "Do I need prior coding experience?", a: "Some courses are beginner-friendly (React Native, Product Design). Others assume basic programming knowledge — check the course detail page." },
  { q: "How does Refer & Earn work?", a: "Share your referral link. You earn ₹500 when a friend signs up and ₹2,000 when they enroll in a paid course." },
];

const FAQ = () => (
  <SimplePage eyebrow="FAQ" title={<>Frequently asked <span className="text-gradient-primary">questions</span></>} lead="Everything you need to know about SkillVector.">
    <Accordion type="single" collapsible className="border border-border rounded-2xl bg-card/50 divide-y divide-border">
      {FAQ_LIST.map((f, i) => (
        <AccordionItem key={i} value={`f-${i}`} className="border-0 px-5">
          <AccordionTrigger className="hover:no-underline text-left font-semibold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </SimplePage>
);

export default FAQ;
