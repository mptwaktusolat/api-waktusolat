"use client"

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/components/ui/select"

interface Zone {
    jakimCode: string
    negeri: string
    daerah: string
}

interface ZoneSelectorProps {
    onZoneChange: (zone: string) => void
}

export function ZoneSelector({ onZoneChange }: ZoneSelectorProps) {
    const [zones, setZones] = useState<Zone[]>([])

    useEffect(() => {
        fetch('/zones')
            .then(response => response.json())
            .then(data => setZones(data))
            .catch(error => console.error('Error fetching zones:', error))
    }, [])

    return (
        <Select
            onValueChange={onZoneChange}
            defaultValue="WLY01"
        >
            <SelectTrigger className="xl:w-[700px] md:w-[400px] sm:w-[350px] w-[240px] dark:shadow-sm dark:bg-[#2B2B2B] dark:text-white">
                <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#2B2B2B]">
                {zones.map((zone) => (
                    <SelectItem
                        key={zone.jakimCode}
                        value={zone.jakimCode}
                        className="dark:text-white"
                    >
                        {zone.jakimCode} - {zone.negeri} ({zone.daerah})
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

