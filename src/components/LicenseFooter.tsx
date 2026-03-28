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
      className="mt-10 mb-6 relative z-10"
    >
      <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground/70">
        <p>
          Built by <span className="font-medium text-muted-foreground">Mosaic Team</span>
          {' · '}
          <span className="font-medium text-muted-foreground">AIForGoodHack South Europe 2026</span>
        </p>
        <p>
          <button
            onClick={onViewLicense}
            className="hover:text-foreground transition-colors"
          >
            MIT License
          </button>
          {' · '}
          <a
            href="https://github.com/ArtemChern/family-bridge-commun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </motion.footer>
  )
}
