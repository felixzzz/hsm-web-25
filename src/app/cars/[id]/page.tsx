import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cars } from "@/data/cars";
import { ArrowLeft, Check, Phone, ShieldCheck } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { CAR_BY_SLUG_QUERY, CAR_SLUGS_QUERY } from "@/sanity/lib/queries";
import { mapSanityCarToCar } from "@/sanity/lib/mapper";

// Generate segments for all cars (Mock + Sanity)
export async function generateStaticParams() {
    const mockParams = cars.map((car) => ({ id: car.id }));
    try {
        const slugs = await client.fetch(CAR_SLUGS_QUERY);
        const sanityParams = slugs.map((s: any) => ({ id: s.slug }));
        // Combine and dedup if necessary
        return [...mockParams, ...sanityParams];
    } catch (error) {
        console.error("Sanity slug fetch failed:", error);
        return mockParams;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let car = cars.find((c) => c.id === id);

    if (!car) {
        try {
            const sanityCar = await client.fetch(CAR_BY_SLUG_QUERY, { slug: id });
            if (sanityCar) car = mapSanityCarToCar(sanityCar);
        } catch (e) { }
    }

    if (!car) return { title: "Car Not Found" };

    return {
        title: `${car.name} | HSM`,
        description: `Buy or Rent ${car.year} ${car.name}. Certified quality from Hyundai Solusi Mobilitas.`,
    };
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // 1. Try Mock Data first (speed) or last? 
    // Usually CMS > Mock. But for now Mock is guaranteed.
    // Let's check Mock first for existing IDs '1', '2'.
    let car = cars.find((car) => car.id === id);

    // 2. If not found, check Sanity
    if (!car) {
        try {
            const sanityCar = await client.fetch(CAR_BY_SLUG_QUERY, { slug: id });
            if (sanityCar) {
                car = mapSanityCarToCar(sanityCar);
            }
        } catch (error) {
            console.error("Sanity car fetch failed:", error);
        }
    }

    if (!car) {
        notFound();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(price);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar Placeholder/Back Button */}
            <div className="fixed top-24 left-6 z-40">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur text-hsm-dark rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all font-bold text-sm"
                >
                    <ArrowLeft size={18} /> Back
                </Link>
            </div>

            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh] bg-hsm-gray">
                <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-2">{car.name}</h1>
                    <p className="text-xl opacity-90">{car.year} • {car.mileage.toLocaleString()} km</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Details */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <div className="p-4 bg-hsm-gray rounded-xl">
                                <span className="block text-gray-500 text-xs uppercase mb-1">Transmission</span>
                                <span className="font-bold">{car.transmission}</span>
                            </div>
                            <div className="p-4 bg-hsm-gray rounded-xl">
                                <span className="block text-gray-500 text-xs uppercase mb-1">Fuel Type</span>
                                <span className="font-bold">{car.fuel}</span>
                            </div>
                            <div className="p-4 bg-hsm-gray rounded-xl">
                                <span className="block text-gray-500 text-xs uppercase mb-1">Mileage</span>
                                <span className="font-bold">{car.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="p-4 bg-hsm-gray rounded-xl">
                                <span className="block text-gray-500 text-xs uppercase mb-1">Year</span>
                                <span className="font-bold">{car.year}</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">Vehicle Highlights</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['Certified Inspection Passed', '1 Year Warranty Included', 'Flood Free Guarantee', 'Accident Free Guarantee', 'Genuine Odometer', 'Official Service History'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <div className="bg-green-100 text-green-600 p-1 rounded-full">
                                        <Check size={16} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sticky top-24">
                            <div className="mb-8">
                                {car.type !== 'Rent' && (
                                    <div className="mb-6">
                                        <span className="text-gray-500 text-sm block mb-1">Purchase Price</span>
                                        <span className="text-3xl font-bold text-hsm-blue block">{formatPrice(car.price)}</span>
                                    </div>
                                )}

                                {(car.type === 'Rent' || car.type === 'Both') && (
                                    <div>
                                        <span className="text-gray-500 text-sm block mb-1">Rental Est.</span>
                                        <span className="text-2xl font-bold text-hsm-dark block">{formatPrice(car.rentPrice || 8000000)}<span className="text-base font-normal text-gray-400">/mo</span></span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href={`https://wa.me/62812345678?text=Hi HSM, I am interested in ${car.name} (${car.id})`}
                                    target="_blank"
                                    className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2"
                                >
                                    <Phone size={20} /> Chat via WhatsApp
                                </Link>
                                <button className="w-full py-4 bg-hsm-blue text-white font-bold rounded-xl hover:bg-hsm-dark transition-all">
                                    Book Test Drive
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500">
                                <ShieldCheck className="text-hsm-blue h-8 w-8" />
                                <p>This vehicle is protected by HSM Certified Warranty for 12 months.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
