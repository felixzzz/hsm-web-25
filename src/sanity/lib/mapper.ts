import { Car } from "@/data/cars";
import { urlFor } from "./image";

interface SanityCarSource {
    slug?: string; // slug is essentially a string here
    _id: string;
    name: string;
    displayName?: { en: string; id: string };
    description?: { en: string; id: string };
    model: string;
    year: number;
    type: 'Used' | 'Rent' | 'Both';
    price?: number;
    rentPrice?: number;
    specs?: {
        mileage?: number;
        transmission?: 'Manual' | 'Automatic' | 'iVT' | 'DCT';
        fuel?: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    };
    image?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    available?: boolean;
}

export function mapSanityCarToCar(sanityCar: SanityCarSource): Car {
    return {
        id: sanityCar.slug || sanityCar._id,
        name: sanityCar.name,
        displayName: sanityCar.displayName,
        description: sanityCar.description,
        model: sanityCar.model,
        year: sanityCar.year,
        type: sanityCar.type,
        price: sanityCar.price || 0,
        rentPrice: sanityCar.rentPrice,
        mileage: sanityCar.specs?.mileage || 0,
        transmission: sanityCar.specs?.transmission || 'Automatic',
        fuel: sanityCar.specs?.fuel || 'Petrol',
        image: sanityCar.image ? urlFor(sanityCar.image).url() : '/images/car-placeholder.png',
        available: sanityCar.available !== false, // default true
    };
}
