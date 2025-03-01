import { Card, CardContent } from "@/components/components/ui/card"
import { CheckCircle2, XCircle, LoaderCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface MonthCardProps {
  month: string
  monthNumber: number
  year: number
  zone: string
}

async function checkMonthHealth(year: number, month: number, zone: string) {
  const res = await fetch(`/api/v2/solat/${zone}?year=${year}&month=${month}`, {
    headers: {
      'User-Agent': 'MPTDashboard'
    }
  })
  return res.status === 200
}

export function MonthCard({ month, monthNumber, year, zone }: MonthCardProps) {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchHealth = async () => {
      setIsHealthy(null) // Reset to loading state
      const health = await checkMonthHealth(year, monthNumber, zone)
      setIsHealthy(health)
    }
    fetchHealth()
  }, [year, monthNumber, zone])

  return (
    <Card className="bg-white dark:bg-zinc-800 dark:border-zinc-700">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
        {isHealthy === null ? (
          <LoaderCircle className="spinner w-12 h-12 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
        ) : isHealthy ? (
          <CheckCircle2 className="w-12 h-12 text-green-500 dark:text-green-400" />
        ) : (
          <XCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
        )}
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{month}</span>
      </CardContent>
    </Card>
  )
}

