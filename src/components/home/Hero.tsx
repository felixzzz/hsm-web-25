"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/images/hero-bg.png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
                <div className="max-w-2xl text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6"
                    >
                        Drive <span className="text-hsm-sand">Quality</span>.<br />
                        Rent <span className="text-hsm-blue bg-white px-2">Freedom</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg"
                    >
                        The official innovative marketplace for Hyundai Used Cars and Rental Services in Indonesia. Certified quality, guaranteed peace of mind.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="#used-cars"
                            className="px-8 py-4 bg-hsm-blue text-white font-bold rounded-full hover:bg-white hover:text-hsm-blue transition-all flex items-center gap-2"
                        >
                            Exlpore Used Cars <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="#rent-car"
                            className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-hsm-dark transition-all"
                        >
                            Rent a Hyundai
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
