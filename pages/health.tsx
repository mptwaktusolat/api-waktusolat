'use client'

import { useState } from 'react'
import Link from "next/link"
import { YearSelector } from "@/components/year-selector"
import { ZoneSelector } from "@/components/zone-selector"
import { MonthCard } from "@/components/month-card"

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export default function HealthDashboard() {
    const [year, setYear] = useState(new Date().getFullYear())
    const [zone, setZone] = useState("WLY01")

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">MPT Health Dashboard</h1>
                    <Link
                        href="/"
                        className="text-purple-600 hover:text-purple-800"
                    >
                        Back
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <YearSelector year={year} onYearChange={setYear} />
                    <ZoneSelector onZoneChange={setZone} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {months.map((month, index) => (
                        <MonthCard
                            key={month}
                            month={month}
                            monthNumber={index + 1}
                            year={year}
                            zone={zone}
                        />
                    ))}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <p>All data is checked:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>based on {zone} zone</li>
                        <li>against v2 solat API. Hence, data prior May 2023 is expected to be not available</li>
                    </ul>
                    <p>
                        Prayer time database is{" "}
                        <Link href="#" className="text-blue-600 hover:underline">
                            updated periodically
                        </Link>
                        . Fetched from e-solat JAKIM portal.
                    </p>
                </div>
            </div>
        </div>
    )
}

