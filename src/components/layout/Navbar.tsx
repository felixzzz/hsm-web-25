"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Used Cars", href: "#used-cars" },
        { name: "Rent Car", href: "#rent-car" },
        { name: "Simulation", href: "#simulation" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-4 text-hsm-blue"
                    : "bg-transparent py-6 text-white"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative h-6 w-32 md:w-36">
                    <Image
                        src="/images/hyundai-logo.svg"
                        alt="Hyundai"
                        fill
                        className="object-contain"
                        style={{
                            filter: !isScrolled ? "brightness(0) invert(1)" : "none"
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
                        isScrolled ? "border-hsm-blue/20" : "border-white/20"
                    )}>
                        <span className="cursor-pointer hover:text-hsm-sand transition-colors">EN</span>
                        <span className="opacity-50">|</span>
                        <span className="cursor-pointer opacity-50 hover:opacity-100 hover:text-hsm-sand transition-colors">ID</span>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Link
                        href="https://wa.me/62812345678"
                        target="_blank"
                        className={cn(
                            "px-6 py-2 rounded-full font-bold text-sm transition-all",
                            isScrolled
                                ? "bg-hsm-blue text-white hover:bg-hsm-dark"
                                : "bg-white text-hsm-blue hover:bg-hsm-sand hover:text-hsm-dark"
                        )}
                    >
                        Contact Us
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
                </div>
            )}
        </nav>
    );
}
