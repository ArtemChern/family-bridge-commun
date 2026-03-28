import { Robot, Sparkle } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem,

  value: string

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
  const selectedModel = models.find(m => m.id === value) || models[0]

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">AI Model:</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex items-center gap-2">
                {model.badge}
      </Select>
        <p className
        </p>
    </div>
}









