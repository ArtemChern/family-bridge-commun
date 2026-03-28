import { useState } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { FloatingBackground } from '@/components/FloatingBackground'
import { AskTab, type QueryHistoryItem } from '@/components/AskTab'
import { SuggestionCard } from '@/components/SuggestionCard'
import { LicenseFooter } from '@/components/LicenseFooter'
import { LicensePage } from '@/components/LicensePage'
import { GameTab } from '@/components/GameTab'
import { MagnifyingGlass, ClockCounterClockwise, GameController, MapPin } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'sonner'

function App() {
  const [history, setHistory] = useLocalStorage<QueryHistoryItem[]>('query-history', [])
  const [showLicense, setShowLicense] = useState(false)
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null)

  const handleSaveHistory = (item: QueryHistoryItem) => {
    setHistory((prev) => [item, ...(prev || [])])
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
      <Toaster position="top-center" richColors closeButton />
      <FloatingBackground />

      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-10 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <img
            src="/logo.png"
            alt="PathSense logo"
            className="mx-auto mb-4 w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-lg shadow-primary/20"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            PathSense
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            AI-powered local guide — describe your situation, get smart suggestions with directions
          </p>
        </motion.div>

        <Tabs defaultValue="ask" className="space-y-6">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 h-11">
            <TabsTrigger value="ask" className="gap-1.5 text-sm font-semibold">
              <MagnifyingGlass size={16} weight="duotone" />
              Ask
            </TabsTrigger>
            <TabsTrigger value="game" className="gap-1.5 text-sm font-semibold">
              <GameController size={16} weight="duotone" />
              Challenge
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1.5 text-sm font-semibold">
              <ClockCounterClockwise size={16} weight="duotone" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ask">
            <AskTab onSaveHistory={handleSaveHistory} />
          </TabsContent>

          <TabsContent value="game">
            <GameTab />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="p-5 md:p-6 bg-white/70 backdrop-blur-md border border-border/60 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Search History</h2>
                {history && history.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearHistory}>
                    Clear
                  </Button>
                )}
              </div>

              {history && history.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ClockCounterClockwise size={48} weight="duotone" className="mx-auto mb-3 opacity-50" />
                  <p>No searches yet. Ask a question to see your history here.</p>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {history && history.map((item) => (
                      <Card key={item.id} className="p-4 space-y-2 bg-muted/30">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          {item.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} weight="fill" />
                              {item.location}
                            </span>
                          )}
                          <span>{new Date(item.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm font-medium">{item.situation}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {item.suggestions.length} suggestion{item.suggestions.length !== 1 ? 's' : ''}
                          </Badge>
                          <button
                            onClick={() => setExpandedHistoryId(
                              expandedHistoryId === item.id ? null : item.id
                            )}
                            className="text-xs text-primary hover:underline"
                          >
                            {expandedHistoryId === item.id ? 'Hide' : 'Show results'}
                          </button>
                        </div>
                        {expandedHistoryId === item.id && (
                          <div className="space-y-2 pt-2">
                            <Separator />
                            {item.suggestions.map((s, idx) => (
                              <SuggestionCard key={idx} suggestion={s} index={idx} />
                            ))}
                          </div>
                        )}
                      </Card>
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
