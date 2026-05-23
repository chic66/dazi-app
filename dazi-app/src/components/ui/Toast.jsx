import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Toast({ message, type = 'success', isVisible, onClose }) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg ${type === 'success' ? 'bg-success' : type === 'error' ? 'bg-red-500' : 'bg-secondary'} text-white flex items-center gap-2`}
    >
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </motion.div>
  )
}

// Toast 全局状态管理
let toastCallback = null
export const registerToast = (callback) => { toastCallback = callback }
export const toast = (message) => { if (toastCallback) toastCallback(message) }