import { Preloader } from "@/components/portfolio/Preloader";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { AmbientBackground } from "@/components/portfolio/AmbientBackground";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Activity } from "@/components/portfolio/Activity";
import { Certification } from "@/components/portfolio/Certification";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <AmbientBackground />
      <Navbar />
      <main className="relative mx-auto w-full max-w-[1780px] 2xl:max-w-[1920px] px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <Hero />
        <About />
        <Skills />
        <Activity />
        <Projects />
        <Certification />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
