import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Robot, Sparkle } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

interface ModelSelectorProps {
  value: string | undefined
  onChange: (value: string) => void
}

const models = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Most capable model - best for complex communication',
    badge: 'Recommended',
    badgeColor: 'bg-primary/10 text-primary border-primary/30',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Faster & efficient - great for quick improvements',
    badge: 'Fast',
    badgeColor: 'bg-accent/10 text-accent border-accent/30',
  },
]

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const selectedModel = models.find(m => m.id === value)

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold flex items-center gap-2">
        <Robot size={20} weight="duotone" className="text-primary" />
        AI Model:
      </Label>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 text-base">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id} className="cursor-pointer">
              <div className="flex items-center gap-2 py-1">
                <Sparkle size={16} weight="duotone" className="text-accent" />
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{model.name}</span>
                    <Badge variant="outline" className={`text-xs ${model.badgeColor}`}>
                      {model.badge}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{model.description}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedModel && (
        <Card className="p-3 bg-muted/30 border-muted">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <Sparkle size={14} weight="duotone" className="text-accent mt-0.5 flex-shrink-0" />
            <span>{selectedModel.description}</span>
          </p>
        </Card>
      )}
    </div>
  )
}
