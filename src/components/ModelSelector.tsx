import { Robot, Sparkle } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem,
interface ModelSelectorProps {
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
  },

  co
  r
      <Label className
        AI Model:
      
        <SelectTri
        </SelectTrigger>
    
 

                    <span className="font-medium">{model.name}</span>
                      {model.badge}

          
            </SelectItem>
        </SelectContent>

        <Card cla
            <S
      
      )}
  )


        <SelectContent>





                  <div className="flex items-center gap-2">







              </div>

          ))}







            {selectedModel.description}

        </Card>

    </div>

}
