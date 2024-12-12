'use client'

import { useState } from 'react'
import Link from "next/link"
import { YearSelector } from "@/components/year-selector"
import { ZoneSelector } from "@/components/zone-selector"
import { MonthCard } from "@/components/month-card"
// Pinjam styling dari Location CSS module
import styles from "../styles/Locations.module.css";
import Head from 'next/head'

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export default function HealthDashboard() {
    const [year, setYear] = useState(new Date().getFullYear())
    const [zone, setZone] = useState("WLY01")

    return (
        <>
            <Head>
                <title>Data Health | Waktu Solat API</title>
                <meta
                    name="description"
                    content="Prayer time data availibily | Easily integrate Waktu Solat API into your applications for accurate prayer times and prayer zone detection."
                />
                <meta
                    property="og:title"
                    content="Waktu Solat API - Malaysia Prayer Time API"
                />
                <meta
                    property={"og:image"}
                    content={"https://mpt-server.vercel.app/metaimage.png"}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen relative overflow-hidden">
                {/* Subtle glowing object */}
                <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] opacity-50"></div>

                <div className="container mx-auto px-4 py-8 relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">MPT Health Dashboard</h1>
                        <Link className={styles.link} href={"/"}>Home</Link>

                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <YearSelector year={year} onYearChange={setYear} />
                        <ZoneSelector onZoneChange={setZone} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
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

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>All data is checked:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>based on {zone} zone</li>
                            <li>against v2 solat API. Hence, data prior May 2023 is expected to be not available</li>
                        </ul>
                        <p>
                            Prayer time database is updated periodically{" "}
                            <Link href="https://www.e-solat.gov.my/index.php" className="text-blue-600 dark:text-blue-400 hover:underline">
                                from e-solat JAKIM
                            </Link>
                            {" "}portal. See fetcher implementation on{" "}
                            <Link href={"https://github.com/mptwaktusolat/waktusolat-fetcher"} className="text-blue-600 dark:text-blue-400 hover:underline">
                                GitHub
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

