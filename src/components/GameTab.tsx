import { useState, useEffect, useCallback, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { generateGameQuestion, type GameQuestion } from '@/lib/azure-llm'
import {
  Trophy,
  Timer,
  CheckCircle,
  XCircle,
  Lightning,
  ArrowRight,
  Play,
  Star,
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

type GamePhase = 'idle' | 'loading' | 'playing' | 'feedback' | 'finished'

const GAME_DURATION = 60 // seconds

export function GameTab() {
  const [phase, setPhase] = useState<GamePhase>('idle')
  const [question, setQuestion] = useState<GameQuestion | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [highScore, setHighScore] = useLocalStorage('game-high-score', 0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Timer countdown
  useEffect(() => {
    if (phase === 'playing' || phase === 'feedback' || phase === 'loading') {
      if (timeLeft <= 0) {
        // only transition to finished if we're not already there
        if (phase !== 'finished' as GamePhase) {
          endGame()
        }
        return
      }
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timerRef.current!)
    }
  }, [phase, timeLeft])

  // Watch for time running out
  useEffect(() => {
    if (timeLeft <= 0 && (phase === 'playing' || phase === 'feedback' || phase === 'loading')) {
      endGame()
    }
  }, [timeLeft, phase])

  const endGame = useCallback(() => {
    clearInterval(timerRef.current!)
    if (score > highScore) {
      setHighScore(score)
      toast.success(`New high score: ${score}!`)
    }
    setPhase('finished')
  }, [score, highScore, setHighScore])

  const startGame = async () => {
    setScore(0)
    setStreak(0)
    setQuestionsAnswered(0)
    setTimeLeft(GAME_DURATION)
    setSelected(null)
    setQuestion(null)
    await loadNextQuestion()
  }

  const loadNextQuestion = async () => {
    setPhase('loading')
    setSelected(null)
    try {
      const q = await generateGameQuestion()
      setQuestion(q)
      setPhase('playing')
    } catch (err) {
      console.error('Failed to generate question:', err)
      toast.error('Failed to load question. Try again.')
      setPhase('idle')
    }
  }

  const handleSelect = (idx: number) => {
    if (phase !== 'playing' || selected !== null) return
    setSelected(idx)
    const isCorrect = idx === question!.bestIndex
    const points = isCorrect ? 10 + streak * 5 : 0

    if (isCorrect) {
      setScore((s) => s + points)
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
    }
    setQuestionsAnswered((n) => n + 1)
    setPhase('feedback')
  }

  const handleNext = () => {
    if (timeLeft <= 0) {
      endGame()
    } else {
      loadNextQuestion()
    }
  }

  const timerColor =
    timeLeft > 30 ? 'text-green-600' : timeLeft > 10 ? 'text-yellow-600' : 'text-red-600'

  return (
    <div className="space-y-5">
      {/* Score bar — always visible during game */}
      {phase !== 'idle' && phase !== 'finished' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="px-5 py-3 bg-white/70 backdrop-blur-md border border-border/60 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Trophy size={18} weight="duotone" className="text-yellow-500" />
                  <span className="text-sm font-bold">{score}</span>
                </div>
                {streak > 1 && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Lightning size={12} weight="fill" className="text-yellow-500" />
                    {streak}x streak
                  </Badge>
                )}
              </div>
              <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${timerColor}`}>
                <Timer size={18} weight="duotone" />
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Idle — start screen */}
      {phase === 'idle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="p-6 md:p-8 bg-white/70 backdrop-blur-md border border-border/60 shadow-sm text-center space-y-5">
            <div className="space-y-2">
              <Trophy size={48} weight="duotone" className="mx-auto text-yellow-500" />
              <h2 className="text-xl font-bold">Situation Challenge</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Real-world city scenarios — pick the smartest action!
                Score points for good decisions, bonus for streaks. You have <strong>60 seconds</strong>.
              </p>
            </div>
            {highScore > 0 && (
              <p className="text-xs text-muted-foreground">
                Your best: <span className="font-bold text-yellow-600">{highScore} pts</span>
              </p>
            )}
            <Button size="lg" className="gap-2 h-12 text-base font-semibold" onClick={startGame}>
              <Play size={20} weight="duotone" />
              Start Game
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Loading */}
      {phase === 'loading' && (
        <Card className="p-6 space-y-4 bg-white/60 backdrop-blur-md border border-border/60">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <div className="grid gap-3">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </Card>
      )}

      {/* Playing / Feedback */}
      {(phase === 'playing' || phase === 'feedback') && question && (
        <motion.div
          key={question.scenario}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          {/* Scenario */}
          <Card className="p-5 bg-white/70 backdrop-blur-md border border-border/60 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Scenario</p>
            <p className="text-sm leading-relaxed">{question.scenario}</p>
          </Card>

          {/* Variants */}
          <div className="grid gap-3">
            {question.variants.map((v, idx) => {
              const isChosen = selected === idx
              const isCorrect = idx === question.bestIndex
              const showResult = phase === 'feedback'

              let border = 'border-border/60 hover:border-primary/40'
              let bg = 'bg-white/60 hover:bg-white/80'
              if (showResult && isCorrect) {
                border = 'border-green-500'
                bg = 'bg-green-50/80'
              } else if (showResult && isChosen && !isCorrect) {
                border = 'border-red-400'
                bg = 'bg-red-50/80'
              }

              return (
                <motion.button
                  key={idx}
                  whileTap={phase === 'playing' ? { scale: 0.98 } : undefined}
                  onClick={() => handleSelect(idx)}
                  disabled={phase !== 'playing'}
                  className={`relative text-left w-full rounded-xl border p-4 transition-all ${border} ${bg} backdrop-blur-sm disabled:cursor-default`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <p className="text-sm leading-relaxed flex-1">{v}</p>
                    {showResult && isCorrect && (
                      <CheckCircle size={20} weight="fill" className="text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    {showResult && isChosen && !isCorrect && (
                      <XCircle size={20} weight="fill" className="text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {phase === 'feedback' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <Card className="p-4 bg-white/70 backdrop-blur-md border border-border/60 space-y-2">
                  <div className="flex items-center gap-2">
                    {selected === question.bestIndex ? (
                      <>
                        <CheckCircle size={18} weight="fill" className="text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Correct! +{10 + (streak - 1) * 5} pts</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} weight="fill" className="text-red-500" />
                        <span className="text-sm font-semibold text-red-600">Not quite</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{question.explanation}</p>
                </Card>
                <Button onClick={handleNext} className="w-full gap-2 h-11 font-semibold">
                  <ArrowRight size={18} weight="bold" />
                  Next Question
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Finished */}
      {phase === 'finished' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-6 md:p-8 bg-white/70 backdrop-blur-md border border-border/60 shadow-sm text-center space-y-5">
            <Star size={48} weight="duotone" className="mx-auto text-yellow-500" />
            <h2 className="text-xl font-bold">Time's Up!</h2>
            <div className="space-y-1">
              <p className="text-3xl font-bold">{score} <span className="text-base font-normal text-muted-foreground">points</span></p>
              <p className="text-sm text-muted-foreground">
                {questionsAnswered} question{questionsAnswered !== 1 ? 's' : ''} answered
              </p>
              {score >= highScore && score > 0 && (
                <Badge className="mt-2 gap-1 bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Trophy size={12} weight="fill" />
                  New High Score!
                </Badge>
              )}
            </div>
            <Separator />
            <Button size="lg" className="gap-2 h-12 text-base font-semibold" onClick={startGame}>
              <Play size={20} weight="duotone" />
              Play Again
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
