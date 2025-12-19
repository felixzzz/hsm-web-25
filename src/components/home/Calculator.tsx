"use client";

import { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";

export function Calculator() {
    const [mode, setMode] = useState<'loan' | 'rent'>('loan');

    // Loan State
    const [price, setPrice] = useState(300000000);
    const [dpPercent, setDpPercent] = useState(20);
    const [years, setYears] = useState(3);

    // Rent State
    const [rentDuration, setRentDuration] = useState(1);
    const [rentModel, setRentModel] = useState("SUV");

    // Loan Calculation
    const interestRate = 0.08; // 8% flat
    const dpAmount = price * (dpPercent / 100);
    const loanAmount = price - dpAmount;
    const totalInterest = loanAmount * interestRate * years;
    const totalLoan = loanAmount + totalInterest;
    const monthlyInstallment = totalLoan / (years * 12);

    // Rent Calculation (Mock)
    const getRentPrice = () => {
        let base = 5000000;
        if (rentModel === "SUV") base = 7000000;
        if (rentModel === "EV") base = 10000000;

        // Discount for longer duration
        if (rentDuration > 6) base = base * 0.9;
        if (rentDuration > 12) base = base * 0.8;

        return base;
    };

    const formatIDR = (num: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
    };

    return (
        <section className="py-20 bg-hsm-blue text-white" id="simulation">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Plan Your Budget</h2>
                        <p className="text-blue-200 text-lg mb-8">
                            Smart tools to help you decide whether buying or renting is the best option for your financial goals.
                            Compare monthly costs instantly.
                        </p>
                        <div className="flex gap-4 mb-4">
                            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                                <CalcIcon size={32} className="text-hsm-sand mb-2" />
                                <h4 className="font-bold">Transparent</h4>
                                <p className="text-sm text-blue-200">No hidden fees in our simulations.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="bg-white text-hsm-dark rounded-3xl p-8 shadow-2xl">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-100 mb-8">
                                <button
                                    onClick={() => setMode('loan')}
                                    className={`flex-1 pb-4 font-bold text-center border-b-2 transition-colors ${mode === 'loan' ? 'border-hsm-blue text-hsm-blue' : 'border-transparent text-gray-400'}`}
                                >
                                    Or Used Car Loan
                                </button>
                                <button
                                    onClick={() => setMode('rent')}
                                    className={`flex-1 pb-4 font-bold text-center border-b-2 transition-colors ${mode === 'rent' ? 'border-hsm-blue text-hsm-blue' : 'border-transparent text-gray-400'}`}
                                >
                                    Rental Subscription
                                </button>
                            </div>

                            {mode === 'loan' ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Car Price</label>
                                        <input
                                            type="range" min="100000000" max="1000000000" step="10000000"
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                            className="w-full accent-hsm-blue h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="text-right font-bold mt-2">{formatIDR(price)}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Down Payment (%)</label>
                                            <select
                                                value={dpPercent} onChange={(e) => setDpPercent(Number(e.target.value))}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-hsm-blue"
                                            >
                                                <option value={20}>20%</option>
                                                <option value={30}>30%</option>
                                                <option value={50}>50%</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Tenure (Years)</label>
                                            <select
                                                value={years} onChange={(e) => setYears(Number(e.target.value))}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-hsm-blue"
                                            >
                                                <option value={1}>1 Year</option>
                                                <option value={3}>3 Years</option>
                                                <option value={5}>5 Years</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bg-hsm-gray p-6 rounded-xl mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-500 text-sm">Est. Monthly Payment</span>
                                            <span className="text-2xl font-bold text-hsm-blue">{formatIDR(monthlyInstallment)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-400">
                                            <span>DP: {formatIDR(dpAmount)}</span>
                                            <span>Interest: 8% Flat</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Car Type</label>
                                        <div className="flex gap-2">
                                            {['MPV', 'SUV', 'EV'].map(m => (
                                                <button
                                                    key={m}
                                                    onClick={() => setRentModel(m)}
                                                    className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${rentModel === m ? 'bg-hsm-blue text-white' : 'border-gray-200 text-gray-500'}`}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Duration (Months)</label>
                                        <input
                                            type="range" min="1" max="24" step="1"
                                            value={rentDuration}
                                            onChange={(e) => setRentDuration(Number(e.target.value))}
                                            className="w-full accent-hsm-blue h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="text-right font-bold mt-2">{rentDuration} Months</div>
                                    </div>

                                    <div className="bg-hsm-gray p-6 rounded-xl mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-500 text-sm">Monthly Subscription</span>
                                            <span className="text-2xl font-bold text-hsm-blue">{formatIDR(getRentPrice())}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 text-right">
                                            Includes Insurance & Service
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
