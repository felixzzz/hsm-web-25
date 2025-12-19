import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-geist-sans", // Reusing the variable name to match globals.css or I can change globals.css
  subsets: ["latin"],
  display: 'swap',
});

// We can just alias it to what we use in globals.css, or just update globals.css. 
// Glbals.css uses --font-geist-sans. I'll stick to that variable name for minimal changes in CSS w.r.t default content, 
// OR I should change it to --font-outfit and update globals.css.
// Let's keep it simple: mapped to standard variable.

export const metadata: Metadata = {
  title: "HSM | Hyundai Solusi Mobilitas",
  description: "Official Hyundai Used Car & Rental Services in Indonesia. Quality certified cars and premium rental solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} antialiased bg-white text-hsm-dark flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
