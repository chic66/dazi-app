import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Settings, RefreshCw, X, Check } from 'lucide-react'
import { Button } from '../ui'

const AGENT_STYLES = [
  { id: 'gentle', name: '温柔鼓励型', description: '用温暖的方式支持你', emoji: '🌸' },
  { id: 'direct', name: '直接建议型', description: '给出明确的行动建议', emoji: '⚡' },
  { id: 'humor', name: '幽默活泼型', description: '用轻松的方式帮你', emoji: '🎭' },
  { id: 'rational', name: '理性分析型', description: '深度分析帮你决策', emoji: '🧠' },
  { id: 'romantic', name: '高情商恋爱军师型', description: '情感专家帮你处理关系', emoji: '💕' },
]

export default function AgentStyleSheet({ isOpen, currentStyle, onSelect, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">切换 Agent 风格</h3>
              <button onClick={onClose}>
                <X size={24} className="text-text-secondary" />
              </button>
            </div>

            <div className="space-y-3">
              {AGENT_STYLES.map((style) => (
                <motion.button
                  key={style.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelect(style.id)
                    onClose()
                  }}
                  className={`
                    w-full p-4 rounded-2xl text-left flex items-center justify-between
                    transition-all
                    ${currentStyle === style.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-gray-50 text-text-primary'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{style.emoji}</span>
                    <div>
                      <p className="font-medium">{style.name}</p>
                      <p className={`text-sm ${currentStyle === style.id ? 'text-white/80' : 'text-text-muted'}`}>
                        {style.description}
                      </p>
                    </div>
                  </div>
                  {currentStyle === style.id && <Check size={20} />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}