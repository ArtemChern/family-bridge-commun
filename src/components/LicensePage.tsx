import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface LicensePageProps {
  onBack: () => void
}

export function LicensePage({ onBack }: LicensePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 md:py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 gap-2"
          >
            <ArrowLeft size={18} weight="duotone" />
            Back to App
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              MIT License
            </h1>
            <p className="text-lg text-muted-foreground">
              FamilyBridge is open source software
            </p>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm border-2">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6 font-mono text-sm leading-relaxed">
                <div>
                  <h2 className="font-bold text-lg mb-2 font-sans">MIT License</h2>
                </div>

                <div>
                  <p className="text-muted-foreground">Copyright (c) 2026 Mosaic Team</p>
                </div>

                <div className="space-y-4 text-foreground/90">
                  <p>
                    Permission is hereby granted, free of charge, to any person obtaining a copy
                    of this software and associated documentation files (the "Software"), to deal
                    in the Software without restriction, including without limitation the rights
                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:
                  </p>

                  <p>
                    The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.
                  </p>

                  <p className="uppercase font-semibold">
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                    SOFTWARE.
                  </p>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-bold text-base mb-3 font-sans">About FamilyBridge</h3>
                  <div className="space-y-2 text-muted-foreground font-sans text-sm">
                    <p>
                      FamilyBridge is an AI-powered communication tool designed to help families
                      communicate more effectively and empathetically.
                    </p>
                    <p>
                      Built by the Mosaic Team for the AI For Good 2026 South Europe Hackathon.
                    </p>
                    <p className="pt-2">
                      This project aims to strengthen family relationships through better
                      communication practices powered by artificial intelligence.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>
              For questions or contributions, please visit our{' '}
              <a
                href="https://github.com/ArtemChern/family-bridge-commun"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors font-semibold"
              >
                GitHub repository
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
