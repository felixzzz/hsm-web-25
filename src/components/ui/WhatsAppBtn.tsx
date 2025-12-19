import Link from "next/link";
import { Phone } from "lucide-react";

export function WhatsAppBtn() {
    return (
        <Link
            href="https://wa.me/62812345678"
            target="_blank"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <Phone size={28} className="fill-current" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap pl-0 group-hover:pl-3 font-bold">
                Chat with Us
            </span>
        </Link>
    );
}
