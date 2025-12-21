"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CalendarClock } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
    {
        title: "HSM Certified Used Cars",
        description: "Experience the confidence of buying a used Hyundai with our comprehensive certification program.",
        items: ["100+ Point Inspection", "1 Year Warranty", "Genuine Parts Only"],
        icon: ShieldCheck,
        bg: "bg-hsm-gray",
        text: "text-hsm-dark"
    },
    {
        title: "HSM Rental Solutions",
        description: "Need a car for a day, a month, or a year? We offer flexible rental plans tailored to you.",
        items: ["Daily to Yearly Terms", "Maintenance Included", "Insurance Coverage"],
        icon: CalendarClock,
        bg: "bg-hsm-blue",
        text: "text-white"
    }
];

export function Services() {
    const t = useTranslations('HomePage');

    return (
        <section className="py-20 bg-white" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('servicesTitle')}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t('servicesSubtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className={`${feature.bg} ${feature.text} p-10 rounded-3xl relative overflow-hidden group`}
                        >
                            <div className="relative z-10">
                                <feature.icon size={48} className="mb-6 opacity-80" />
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className={`mb-8 ${feature.text === 'text-white' ? 'text-blue-100' : 'text-gray-600'}`}>
                                    {feature.description}
                                </p>
                                <ul className="space-y-3">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-medium">
                                            <span className={`w-2 h-2 rounded-full ${feature.text === 'text-white' ? 'bg-hsm-sand' : 'bg-hsm-blue'}`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-current opacity-5 rounded-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
