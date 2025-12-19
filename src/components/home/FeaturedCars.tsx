"use client";

import { useState } from "react";
import { Car } from "@/data/cars";
import { CarCard } from "@/components/ui/CarCard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = ["All", "Used Car", "Rent Car"];

interface FeaturedCarsProps {
    initialCars: Car[];
}

export function FeaturedCars({ initialCars }: FeaturedCarsProps) {
    const [activeTab, setActiveTab] = useState("All");

    const filteredCars = initialCars.filter(car => {
        if (activeTab === "All") return true;
        if (activeTab === "Used Car") return car.type === 'Used' || car.type === 'Both';
        if (activeTab === "Rent Car") return car.type === 'Rent' || car.type === 'Both';
        return true;
    });

    return (
        <section className="py-20 bg-hsm-gray" id="used-cars">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Inventory</h2>
                        <p className="text-gray-600">Explore our curated selection of verified Hyundai vehicles.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-white p-1 rounded-full shadow-sm">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                    activeTab === tab
                                        ? 'bg-hsm-blue text-white shadow-md'
                                        : 'text-gray-500 hover:text-hsm-blue'
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCars.slice(0, 9).map((car) => (
                        <motion.div
                            key={car.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CarCard car={car} />
                        </motion.div>
                    ))}
                </div>

                {filteredCars.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No cars found in this category.
                    </div>
                )}
            </div>
        </section>
    );
}
