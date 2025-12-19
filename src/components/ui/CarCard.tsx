import Image from "next/image";
import Link from "next/link";
import { Gauge, Zap, Calendar } from "lucide-react";
import { Car } from "@/data/cars";
import { cn } from "@/lib/utils";

interface CarCardProps {
    car: Car;
}

export function CarCard({ car }: CarCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(price);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    {car.type === 'Used' || car.type === 'Both' ? (
                        <span className="bg-hsm-blue text-white text-xs font-bold px-3 py-1 rounded-full">USED</span>
                    ) : null}
                    {car.type === 'Rent' || car.type === 'Both' ? (
                        <span className="bg-hsm-sand text-hsm-dark text-xs font-bold px-3 py-1 rounded-full">RENT</span>
                    ) : null}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1 group-hover:text-hsm-blue transition-colors line-clamp-1">{car.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{car.model} • {car.year}</p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 mb-4 text-xs text-gray-500">
                    <div className="flex flex-col items-center gap-1">
                        <Gauge size={14} />
                        <span>{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Zap size={14} />
                        <span>{car.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Calendar size={14} />
                        <span>{car.year}</span>
                    </div>
                </div>

                {/* Pricing */}
                <div className="mt-auto">
                    {car.price > 0 && (
                        <div className="mb-1">
                            <span className="text-gray-400 text-xs block">Purchase Price</span>
                            <span className="font-bold text-lg text-hsm-blue">{formatPrice(car.price)}</span>
                        </div>
                    )}
                    {car.rentPrice && car.rentPrice > 0 && (
                        <div className="mt-2">
                            <span className="text-gray-400 text-xs block">Rental Starting From</span>
                            <span className="font-bold text-lg text-hsm-dark">{formatPrice(car.rentPrice)}/mo</span>
                        </div>
                    )}
                </div>

                <Link
                    href={`/cars/${car.id}`}
                    className="mt-4 w-full block text-center py-2 rounded-lg border border-hsm-blue text-hsm-blue hover:bg-hsm-blue hover:text-white transition-colors font-medium text-sm"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
