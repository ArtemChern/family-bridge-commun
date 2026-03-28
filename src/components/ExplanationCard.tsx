import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, ChatCircle, Heart, Robot } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface Explanation {
  category: 'tone' | 'clarity' | 'emotional'
  text: string
}

interface ExplanationCardProps {
  explanations: Explanation[]
}

const categoryConfig = {
  tone: {
    icon: ChatCircle,
    label: 'Tone Improvement',
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  clarity: {
    icon: Lightbulb,
    label: 'Clarity Enhancement',
    color: 'bg-accent/10 text-accent border-accent/20',
  },
  emotional: {
    icon: Heart,
    label: 'Emotional Balance',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
  },
}

export function ExplanationCard({ explanations }: ExplanationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="p-5 space-y-4 bg-white/70 backdrop-blur-md border border-border/60 shadow-sm">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Lightbulb size={22} weight="duotone" className="text-accent" />
          Why This Works Better
        </h3>
        <div className="space-y-3">
          {explanations.map((exp, idx) => {
            const config = categoryConfig[exp.category]
            const Icon = config.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 mt-1">
                  <Icon size={20} weight="duotone" />
                </div>
                <div className="space-y-1 flex-1">
                  <Badge variant="outline" className={config.color}>
                    {config.label}
                  </Badge>
                  <p className="text-sm leading-relaxed text-foreground/90">{exp.text}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
        <div className="flex items-start gap-2 pt-3 border-t border-border/40">
          <Robot size={14} weight="duotone" className="text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI-generated suggestions. Consider them thoughtfully in the context of your relationship.
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
