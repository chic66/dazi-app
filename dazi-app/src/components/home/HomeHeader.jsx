import { motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { Avatar, Tag } from '../ui'

export default function HomeHeader() {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 safe-top">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">搭</span>
          </motion.div>
          <div>
            <h1 className="text-lg font-bold gradient-text">搭子</h1>
            <p className="text-xs text-text-muted">找到志同道合的伙伴</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <Search size={20} className="text-text-secondary" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary shadow-md flex items-center justify-center"
          >
            <Sparkles size={20} className="text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
