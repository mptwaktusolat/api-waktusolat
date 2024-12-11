import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/components/ui/button"

interface YearSelectorProps {
  year: number
  onYearChange: (year: number) => void
}

export function YearSelector({ year, onYearChange }: YearSelectorProps) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onYearChange(year - 1)}
        className="rounded-full flex items-center justify-center"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <h2 className="text-3xl font-semibold flex items-center">{year}</h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onYearChange(year + 1)}
        className="rounded-full flex items-center justify-center"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

