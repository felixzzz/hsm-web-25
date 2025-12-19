import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { Calculator } from "@/components/home/Calculator";
import { WhatsAppBtn } from "@/components/ui/WhatsAppBtn";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <FeaturedCars />
      <Calculator />
      <WhatsAppBtn />
    </div>
  );
}
