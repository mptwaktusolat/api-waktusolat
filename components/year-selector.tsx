import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/components/ui/button"

interface YearSelectorProps {
  year: number
  onYearChange: (year: number) => void
}

export function YearSelector({ year, onYearChange }: YearSelectorProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onYearChange(year - 1)}
        className="rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <h2 className="text-3xl font-semibold">{year}</h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onYearChange(year + 1)}
        className="rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

