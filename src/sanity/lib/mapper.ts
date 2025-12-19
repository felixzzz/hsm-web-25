import { Car } from "@/data/cars";
import { urlFor } from "./image";

export function mapSanityCarToCar(sanityCar: any): Car {
    return {
        id: sanityCar.slug || sanityCar._id,
        name: sanityCar.name,
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
