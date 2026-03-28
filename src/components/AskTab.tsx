import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { SuggestionCard, type Suggestion } from '@/components/SuggestionCard'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { getSuggestions } from '@/lib/azure-llm'
import {
  MagnifyingGlass,
  MapPin,
  Sparkle,
  Warning,
  Crosshair,
  ArrowClockwise,
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export interface QueryHistoryItem {
  id: string
  timestamp: number
  location: string
  situation: string
  suggestions: Suggestion[]
}

interface AskTabProps {
  onSaveHistory: (item: QueryHistoryItem) => void
}

export function AskTab({ onSaveHistory }: AskTabProps) {
  const [location, setLocation] = useState('')
  const [situation, setSituation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [results, setResults] = useState<Suggestion[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported by your browser')
      return
    }
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`)
        setIsLocating(false)
        toast.success('Location detected')
      },
      () => {
        setIsLocating(false)
        toast.error('Could not detect location. Enter it manually.')
      },
      { timeout: 8000 }
    )
  }

  const handleAsk = async () => {
    if (!situation.trim()) {
      toast.error('Describe your situation')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const suggestions = await getSuggestions(location, situation)
      setResults(suggestions)

      const historyItem: QueryHistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        location,
        situation,
        suggestions,
      }
      onSaveHistory(historyItem)
      toast.success(`Found ${suggestions.length} suggestions`)
    } catch (err) {
      console.error('Error getting suggestions:', err)
      setError('Failed to get suggestions. Please try again.')
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSituation('')
    setResults(null)
    setError(null)
  }

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="p-5 md:p-7 space-y-5 bg-white/70 backdrop-blur-md border border-border/60 shadow-sm">
          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-semibold flex items-center gap-1.5">
              <MapPin size={16} weight="duotone" className="text-primary" />
              Location
            </label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="City, neighborhood, or address..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={detectLocation}
                disabled={isLoading || isLocating}
                title="Detect my location"
                className="flex-shrink-0"
              >
                <Crosshair size={18} weight="duotone" className={isLocating ? 'animate-pulse' : ''} />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Situation */}
          <div className="space-y-2">
            <label htmlFor="situation" className="text-sm font-semibold">
              What do you need?
            </label>
            <Textarea
              id="situation"
              placeholder="Describe your situation, conditions, what you're looking for...&#10;&#10;Examples:&#10;• I need a quiet café with Wi-Fi to work for a few hours&#10;• Looking for a wheelchair-accessible restaurant for a family dinner&#10;• It's raining and I need an indoor activity with kids"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="min-h-28 text-sm resize-none"
              disabled={isLoading}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <Warning size={18} weight="duotone" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleAsk}
              disabled={isLoading || !situation.trim()}
              className="flex-1 gap-2 h-11 text-sm font-semibold"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Sparkle size={18} weight="duotone" className="animate-spin" />
                  Finding places...
                </>
              ) : (
                <>
                  <MagnifyingGlass size={18} weight="duotone" />
                  Get Suggestions
                </>
              )}
            </Button>
            {results && (
              <Button onClick={handleReset} variant="outline" size="lg" className="h-11 gap-1.5">
                <ArrowClockwise size={16} weight="bold" />
                New
              </Button>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="p-4 space-y-3 bg-white/60 backdrop-blur-md border border-border/60">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-8 w-full rounded-lg" />
            </Card>
          ))}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {results && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">
              {results.length} suggestion{results.length !== 1 ? 's' : ''} found
            </p>
            {results.map((s, idx) => (
              <SuggestionCard key={idx} suggestion={s} index={idx} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
