import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function InviteSuccessToast({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-2xl p-8 w-[280px] text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
          >
            <span className="text-4xl">🎉</span>
          </motion.div>
          <h3 className="text-xl font-bold text-text-primary mb-2">邀请已发送</h3>
          <p className="text-text-secondary text-sm">等待对方回应～</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
