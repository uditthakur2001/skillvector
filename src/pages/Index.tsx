import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { PopularCourses } from "@/components/PopularCourses";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <PopularCourses />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
