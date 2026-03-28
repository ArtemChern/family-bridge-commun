import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GithubLogo, Users, Certificate, FileText } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface LicenseFooterProps {
  onViewLicense: () => void
}

export function LicenseFooter({ onViewLicense }: LicenseFooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-12 relative z-10"
    >
      <Card className="p-5 bg-white/50 backdrop-blur-sm border border-border/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users size={18} weight="duotone" className="text-accent" />
              <span>Created by <strong className="text-foreground">Mosaic Team</strong></span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-2">
              <Certificate size={18} weight="duotone" className="text-accent" />
              <span>Developed for <strong className="text-foreground">AIForGoodHack South Europe 2026</strong></span>
            </div>
            <span className="hidden md:inline">•</span>
            <button
              onClick={onViewLicense}
              className="underline hover:text-accent transition-colors font-medium"
            >
              MIT License
            </button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={onViewLicense}
            >
              <FileText size={18} weight="duotone" />
              License
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open('https://github.com/ArtemChern/family-bridge-commun', '_blank')}
            >
              <GithubLogo size={18} weight="duotone" />
              Repository
            </Button>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-muted-foreground/80 border-t border-border/40 pt-3">
          <p>Empowering families through better communication</p>
        </div>
      </Card>
    </motion.footer>
  )
}
