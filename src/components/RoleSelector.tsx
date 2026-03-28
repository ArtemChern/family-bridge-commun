import { User, UserCircle } from '@phosphor-icons/react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface RoleSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">I am a:</Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="parent" id="parent" />
          <Label
            htmlFor="parent"
            className="flex items-center gap-2 cursor-pointer text-base font-medium"
          >
            <User className="text-primary" size={20} weight="duotone" />
            Parent
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="child" id="child" />
          <Label
            htmlFor="child"
            className="flex items-center gap-2 cursor-pointer text-base font-medium"
          >
            <UserCircle className="text-accent" size={20} weight="duotone" />
            Child
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
