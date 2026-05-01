import { Link } from "react-router-dom";
import { SimplePage } from "@/components/SimplePage";
import { Button } from "@/components/ui/button";
import { JOB_OPENINGS } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";

const Careers = () => (
  <SimplePage eyebrow="Careers" title={<>Build the future of <span className="text-gradient-primary">tech education.</span></>} lead="We're a small, fast team in Bengaluru. We're hiring across engineering, content, and operations.">
    <div className="grid sm:grid-cols-2 gap-4 mt-4">
      {JOB_OPENINGS.slice(0, 6).map((j, i) => (
        <article key={i} className="p-5 rounded-xl bg-gradient-card border border-border">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary text-2xl flex items-center justify-center">{j.logo}</div>
            <div className="flex-1">
              <h4 className="font-bold">{j.role}</h4>
              <p className="text-xs text-muted-foreground">{j.company} (partner)</p>
              <div className="flex flex-wrap gap-1.5 mt-2 text-xs">
                <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" />{j.location}</Badge>
                <Badge className="bg-accent/15 text-accent">{j.salary}</Badge>
              </div>
            </div>
          </div>
          <Button asChild size="sm" variant="cta" className="w-full mt-4"><Link to="/dashboard">Apply via dashboard <ArrowRight className="h-4 w-4" /></Link></Button>
        </article>
      ))}
    </div>
  </SimplePage>
);

export default Careers;
