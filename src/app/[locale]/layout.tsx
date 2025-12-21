import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "HSM | Hyundai Solusi Mobilitas",
  description: "Official Hyundai Used Car & Rental Services in Indonesia. Quality certified cars and premium rental solutions.",
  icons: {
    icon: '/icon.ico',
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) { // eslint-disable-line @typescript-eslint/no-explicit-any
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${outfit.variable} antialiased bg-white text-hsm-dark flex flex-col min-h-screen font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
