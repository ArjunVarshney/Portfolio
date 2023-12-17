import AboutPage from "@/components/home/about-page";
import BlogPage from "@/components/home/blog-page";
import ContactPage from "@/components/home/contact-page";
import LandingPage from "@/components/home/landing-page";
import ProjectsPage from "@/components/home/projects-page";
import { Separator } from "@/components/ui/separator";

export default function Home() {
   return (
      <main className="container">
         <LandingPage />
         <Separator />
         <AboutPage />
         <Separator />
         <ProjectsPage />
         <Separator />
         <BlogPage />
         <Separator />
         <ContactPage />
      </main>
   );
}
