import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Arjun Varshney",
   description: "ML expert | Full stack web developer | Cloud engineer",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={font.className} suppressHydrationWarning={true}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
               <div className="flex flex-col min-h-full w-full">
                  <NavBar />
                  <div className="p-0 mt-16 h-full w-full overflow-hidden">
                     {children}
                  </div>
                  <Footer />
               </div>
            </ThemeProvider>
            <Toaster />
         </body>
      </html>
   );
}
