import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, NavigationArrow, Star } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export interface Suggestion {
  name: string
  type: string
  why: string
  address: string
  distance: string
  rating: string
  mapsQuery: string
}

interface SuggestionCardProps {
  suggestion: Suggestion
  index: number
}

export function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(suggestion.mapsQuery)}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(suggestion.mapsQuery)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="p-4 bg-white/60 backdrop-blur-sm border border-border/60 space-y-3 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold leading-tight">{suggestion.name}</h3>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{suggestion.type}</Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin size={12} weight="fill" />
                {suggestion.distance}
              </span>
              {suggestion.rating && (
                <span className="flex items-center gap-1">
                  <Star size={12} weight="fill" className="text-yellow-500" />
                  {suggestion.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">{suggestion.why}</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin size={12} weight="duotone" className="flex-shrink-0" />
          <span className="truncate">{suggestion.address}</span>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 gap-1.5 h-8 text-xs font-semibold"
            onClick={() => window.open(directionsUrl, '_blank')}
          >
            <NavigationArrow size={14} weight="fill" />
            Get Directions
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs"
            onClick={() => window.open(mapsUrl, '_blank')}
          >
            <MapPin size={14} weight="duotone" />
            Map
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
