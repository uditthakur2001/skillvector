import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/mentors", label: "Mentors" },
  { to: "/pricing", label: "Pricing" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const initials = user?.user_metadata?.full_name
    ? String(user.user_metadata.full_name).split(" ").map((s: string) => s[0]).slice(0, 2).join("").toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-smooth", scrolled ? "glass shadow-elegant" : "bg-transparent")}>
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <span className="text-primary-foreground font-black text-lg leading-none">V</span>
          </span>
          <span>Skill<span className="text-gradient-accent">Vector</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className={cn("px-4 py-2 text-sm font-medium rounded-md transition-smooth",
                pathname === l.to ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")}>
              {l.label}
            </Link>
          ))}
          {user && (
            <Link to="/dashboard"
              className={cn("px-4 py-2 text-sm font-medium rounded-md transition-smooth",
                pathname.startsWith("/dashboard") ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")}>
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-primary transition-smooth">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-sm">{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold truncate">{user.user_metadata?.full_name || "Learner"}</span>
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}><LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard?tab=profile")}><UserIcon className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => { await signOut(); navigate("/"); }}><LogOut className="h-4 w-4 mr-2" /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>Sign in</Button>
              <Button variant="cta" size="sm" onClick={() => navigate("/auth")}>Get Started</Button>
            </>
          )}
        </div>

        <button className="md:hidden p-2 rounded-md hover:bg-secondary" onClick={() => setOpen((s) => !s)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-border animate-fade-in-up">
          <div className="container py-4 flex flex-col gap-1">
            {[...links, ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : [])].map((l) => (
              <Link key={l.to} to={l.to} className="px-4 py-3 rounded-md text-sm font-medium hover:bg-secondary">{l.label}</Link>
            ))}
            <div className="flex gap-2 pt-2">
              {user ? (
                <Button variant="ghost" className="flex-1" onClick={async () => { await signOut(); navigate("/"); }}>Sign out</Button>
              ) : (
                <>
                  <Button variant="ghost" className="flex-1" onClick={() => navigate("/auth")}>Sign in</Button>
                  <Button variant="cta" className="flex-1" onClick={() => navigate("/auth")}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
