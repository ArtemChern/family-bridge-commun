import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { FloatingBackground } from '@/components/FloatingBackground'
import { RoleSelector } from '@/components/RoleSelector'
import { MessageComparison } from '@/components/MessageComparison'
import { ExplanationCard } from '@/components/ExplanationCard'
import { LicenseFooter } from '@/components/LicenseFooter'
import { LicensePage } from '@/components/LicensePage'
import { PaperPlaneRight, ClockCounterClockwise, Sparkle, Warning } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface MessageHistory {
  id: string
  timestamp: number
  role: string
  original: string
  improved: string
  explanations: Array<{
    category: 'tone' | 'clarity' | 'emotional'
    text: string
  }>
}

interface AIResponse {
  improved: string
  explanations: Array<{
    category: 'tone' | 'clarity' | 'emotional'
    text: string
  }>
}

function App() {
  const [message, setMessage] = useState('')
  const [role, setRole] = useState('parent')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useKV<MessageHistory[]>('message-history', [])
  const [showLicense, setShowLicense] = useState(false)

  const handleImproveMessage = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message to improve')
      return
    }

    if (!role) {
      toast.error('Please select your role')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const promptText = spark.llmPrompt`You are an expert family communication coach. A ${role} has written the following message to their family member:

"${message}"

Your task is to:
1. Rewrite the message to be more effective, empathetic, and constructive while maintaining the original intent
2. Provide 2-3 specific explanations of what was changed and why it improves communication

Return a valid JSON object with this exact structure:
{
  "improved": "The rewritten message here",
  "explanations": [
    {"category": "tone", "text": "Explanation of tone improvement"},
    {"category": "clarity", "text": "Explanation of clarity improvement"},
    {"category": "emotional", "text": "Explanation of emotional balance"}
  ]
}

Categories must be exactly one of: "tone", "clarity", or "emotional"
Make sure the improved message feels natural and authentic, not overly formal.
Focus on reducing conflict, using "I" statements, removing absolute language, and promoting dialogue.`

      const response = await spark.llm(promptText, 'gpt-4o-mini', true)
      const parsed = JSON.parse(response) as AIResponse

      setResult(parsed)

      const newHistoryItem: MessageHistory = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        role,
        original: message,
        improved: parsed.improved,
        explanations: parsed.explanations,
      }

      setHistory((currentHistory) => [newHistoryItem, ...(currentHistory || [])])

      toast.success('Message improved successfully!')
    } catch (err) {
      console.error('Error improving message:', err)
      setError('Failed to improve message. Please try again.')
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewMessage = () => {
    setMessage('')
    setResult(null)
    setError(null)
  }

  const clearHistory = () => {
    setHistory([])
    toast.success('History cleared')
  }

  if (showLicense) {
    return <LicensePage onBack={() => setShowLicense(false)} />
  }

  return (
    <div className="min-h-screen relative">
      <FloatingBackground />

      <div className="container mx-auto px-6 py-8 md:py-12 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            FamilyBridge
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Improve your family communication with AI-powered message refinement
          </p>
        </motion.div>

        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="compose" className="gap-2">
              <PaperPlaneRight size={18} weight="duotone" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <ClockCounterClockwise size={18} weight="duotone" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="p-6 md:p-8 space-y-6 bg-card/80 backdrop-blur-sm border-2">
                <RoleSelector value={role} onChange={setRole} />

                <Separator />

                <div className="space-y-3">
                  <label htmlFor="message" className="text-base font-semibold">
                    Your Message:
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-32 text-base resize-none"
                    disabled={isLoading}
                  />
                  <p className="text-sm text-muted-foreground">
                    {message.length} characters
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <Warning size={18} weight="duotone" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleImproveMessage}
                    disabled={isLoading || !message.trim()}
                    className="flex-1 gap-2 h-12 text-base font-semibold"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Sparkle size={20} weight="duotone" className="animate-spin" />
                        Improving...
                      </>
                    ) : (
                      <>
                        <PaperPlaneRight size={20} weight="duotone" />
                        Improve Message
                      </>
                    )}
                  </Button>
                  {result && (
                    <Button
                      onClick={handleNewMessage}
                      variant="outline"
                      size="lg"
                      className="h-12"
                    >
                      New Message
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>

            {isLoading && (
              <Card className="p-6 space-y-4 bg-card/80 backdrop-blur-sm">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-32 w-full" />
              </Card>
            )}

            <AnimatePresence>
              {result && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <MessageComparison original={message} improved={result.improved} />
                  <ExplanationCard explanations={result.explanations} />
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Message History</h2>
                {history && history.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearHistory}>
                    Clear History
                  </Button>
                )}
              </div>

              {history && history.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ClockCounterClockwise size={48} weight="duotone" className="mx-auto mb-3 opacity-50" />
                  <p>No messages yet. Start composing to see your history here.</p>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {history && history.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <Card className="p-4 space-y-3 bg-muted/30">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span className="font-medium capitalize">{item.role}</span>
                            <span>{new Date(item.timestamp).toLocaleString()}</span>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Original:</p>
                            <p className="text-sm italic">{item.original}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-primary">Improved:</p>
                            <p className="text-sm font-medium">{item.improved}</p>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        <LicenseFooter onViewLicense={() => setShowLicense(true)} />
      </div>
    </div>
  )
}

export default App
