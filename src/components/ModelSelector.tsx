import { Robot, Sparkle } from '@phosphor-icons/react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ModelSelectorProps {
  value: string
  onChange: (value: string) => void
}

const models = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Most capable - best for complex family situations',
    badge: <Sparkle size={16} weight="duotone" className="text-accent" />
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Faster and efficient - great for everyday messages',
    badge: <Robot size={16} weight="duotone" className="text-primary" />
  }
]

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="model" className="text-base font-semibold">
        AI Model:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="model" className="h-12">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex items-center gap-2">
                {model.badge}
                <span className="font-medium">{model.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        {models.find((m) => m.id === value)?.description}
      </p>
    </div>
  )
}
