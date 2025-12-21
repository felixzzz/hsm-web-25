"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t('home'), href: "/" },
        { name: t('used'), href: "/#used-cars" },
        { name: t('rent'), href: "/#rent-car" },
    ];

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || !isHomePage
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-4 text-hsm-blue"
                    : "bg-transparent py-6 text-white"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative h-6 w-32 md:w-36">
                    <Image
                        src="/images/hyundai-logo.png"
                        alt="Hyundai"
                        fill
                        className="object-contain"
                        style={{
                            filter: (!isScrolled && isHomePage) ? "brightness(0) invert(1)" : "none"
                        }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-hsm-sand transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Language Switcher */}
                    <div className={cn(
                        "flex items-center gap-2 text-sm font-bold border-l pl-6",
                        isScrolled || !isHomePage ? "border-hsm-blue/20" : "border-white/20"
                    )}>
                        <button
                            onClick={() => switchLocale('en')}
                            className={cn(
                                "cursor-pointer hover:text-hsm-sand transition-colors",
                                locale === 'en' ? "text-hsm-sand" : "opacity-50 hover:opacity-100"
                            )}
                        >
                            EN
                        </button>
                        <span className="opacity-50">|</span>
                        <button
                            onClick={() => switchLocale('id')}
                            className={cn(
                                "cursor-pointer hover:text-hsm-sand transition-colors",
                                locale === 'id' ? "text-hsm-sand" : "opacity-50 hover:opacity-100"
                            )}
                        >
                            ID
                        </button>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Link
                        href="https://wa.me/62812345678"
                        target="_blank"
                        className={cn(
                            "px-6 py-2 rounded-full font-bold text-sm transition-all",
                            isScrolled || !isHomePage
                                ? "bg-hsm-blue text-white hover:bg-hsm-dark"
                                : "bg-white text-hsm-blue hover:bg-hsm-sand hover:text-hsm-dark"
                        )}
                    >
                        {t('contact')}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white text-hsm-dark p-6 shadow-lg md:hidden flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-bold"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                        <button onClick={() => switchLocale('en')} className={locale === 'en' ? "font-bold text-hsm-blue" : "text-gray-500"}>EN</button>
                        <button onClick={() => switchLocale('id')} className={locale === 'id' ? "font-bold text-hsm-blue" : "text-gray-500"}>ID</button>
                    </div>
                </div>
            )}
        </nav>
    );
}
