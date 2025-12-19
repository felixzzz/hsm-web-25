
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-hsm-blue text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">Hyundai Solusi Mobilitas</h3>
                        <p className="text-gray-300 max-w-sm">
                            Your trusted partner for certified used Hyundai cars and premium rental services in Indonesia.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-widest text-sm">Services</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link href="#used-cars" className="hover:text-hsm-sand">Certified Used Cars</Link></li>
                            <li><Link href="#rent-car" className="hover:text-hsm-sand">Rental Services</Link></li>
                            <li><Link href="#simulation" className="hover:text-hsm-sand">Financing Simulation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-widest text-sm">Contact</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>Jakarta, Indonesia</li>
                            <li>support@hsm.co.id</li>
                            <li>+62 21 555 1234</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} HSM. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
