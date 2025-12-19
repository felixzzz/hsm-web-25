import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { Calculator } from "@/components/home/Calculator";
import { WhatsAppBtn } from "@/components/ui/WhatsAppBtn";
import { client } from "@/sanity/lib/client";
import { ALL_CARS_QUERY } from "@/sanity/lib/queries";
import { mapSanityCarToCar } from "@/sanity/lib/mapper";
import { cars as mockCars, Car } from "@/data/cars";

export const revalidate = 60; // Revalidate every 60 seconds

async function getCars() {
  try {
    const sanityCars = await client.fetch(ALL_CARS_QUERY);
    if (sanityCars && sanityCars.length > 0) {
      return sanityCars.map(mapSanityCarToCar);
    }
  } catch (error) {
    console.error("Sanity fetch failed, falling back to mock data:", error);
  }
  return mockCars;
}

export default async function Home() {
  const cars: Car[] = await getCars();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <FeaturedCars initialCars={cars} />
      <Calculator />
      <WhatsAppBtn />
    </div>
  );
}
