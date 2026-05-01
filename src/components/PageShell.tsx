import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 pt-16">{children}</main>
    <Footer />
  </div>
);
