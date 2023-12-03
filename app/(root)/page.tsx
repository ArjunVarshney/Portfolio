import AboutPage from "@/components/home/about-page";
import LandingPage from "@/components/home/landing-page";import { Separator } from "@/components/ui/separator";

export default function Home() {
   return (
      <main className="container">
         <LandingPage/>
         <Separator/>
         <AboutPage/>
         <Separator/>
      </main>
   );
}
