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
        <Card className="p-6 space-y-3 border-2 border-muted bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
            <h3 className="font-semibold text-muted-foreground">Original Message</h3>
          </div>
          <p className="text-base leading-relaxed text-foreground/80 italic">{original}</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className={cn(
          "p-6 space-y-3 border-2 border-primary/30 bg-primary/5",
          "shadow-lg shadow-primary/10"
        )}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="font-semibold text-primary">Improved Message</h3>
          </div>
          <p className="text-base leading-relaxed text-foreground font-medium">{improved}</p>
        </Card>
      </motion.div>
    </div>
  )
}
