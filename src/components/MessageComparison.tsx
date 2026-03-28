import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MessageComparisonProps {
  original: string
  improved: string
}

export function MessageComparison({ original, improved }: MessageComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="p-5 space-y-3 border border-border/60 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Original</h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground/70 italic">{original}</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className={cn(
          "p-5 space-y-3 border border-primary/30 bg-primary/5",
          "shadow-md shadow-primary/10"
        )}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">Improved</h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground font-medium">{improved}</p>
        </Card>
      </motion.div>
    </div>
  )
}
