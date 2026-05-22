import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Toast({ message, type = 'success', isVisible, onClose }) {
  if (!isVisible) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <span className="w-5 h-5 text-center">!</span>,
    info: <span className="w-5 h-5 text-center">i</span>
  }

  const colors = {
    success: 'bg-success text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-secondary text-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg ${colors[type]} flex items-center gap-2`}
    >
      {icons[type]}
      <span className="font-medium">{message}</span>
    </motion.div>
  )
}
