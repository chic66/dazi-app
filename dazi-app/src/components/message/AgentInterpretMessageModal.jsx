import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, Heart } from 'lucide-react'
import { interpretEmotion, agentPersonas } from '../../data/agentData'

export default function AgentInterpretMessageModal({ isOpen, onClose, message, agentConfig }) {
  const [interpretation, setInterpretation] = useState(null)

  // 获取当前 Agent 风格
  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  // 当打开时自动解读
  useState(() => {
    if (isOpen && message) {
      setInterpretation(interpretEmotion(message.text || message))
    }
  }, [isOpen, message])

  if (!isOpen || !message) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[90%] max-w-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain size={20} className="text-purple-500" />
              <h3 className="font-bold text-text-primary">帮你理解 TA</h3>
            </div>
            <button onClick={onClose}>
              <X size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Agent 风格提示 */}
          <div className={`text-xs px-2 py-1 rounded-full ${currentPersona.color.replace('from-', 'bg-').replace('to-', '/').split(' ')[0]} text-white mb-4 inline-block`}>
            {currentPersona.emoji} {currentPersona.name} 风格解读
          </div>

          {/* 原消息 */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <p className="text-xs text-text-muted mb-1">TA 说：</p>
            <p className="text-sm text-text-primary">"{message.text || message}"</p>
          </div>

          {/* 解读结果 */}
          <div className="space-y-3">
            {/* 可能含义 */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">💭</span>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-0.5">可能含义</p>
                <p className="text-sm text-text-primary">{interpretation?.possibleMeaning}</p>
              </div>
            </div>

            {/* 情绪倾向 */}
            <div className="flex items-start gap-2">
              <Heart size={14} className="text-pink-400 mt-1" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">情绪倾向</p>
                <p className="text-sm text-text-primary">{interpretation?.emotion}</p>
              </div>
            </div>

            {/* 建议回应 */}
            <div className="bg-purple-50 rounded-xl p-3">
              <p className="text-xs text-purple-600 mb-1">💡 小搭的建议</p>
              <p className="text-sm text-text-primary">{interpretation?.suggestion}</p>
            </div>
          </div>

          {/* 提示 */}
          <p className="text-xs text-text-muted mt-4 text-center">
            以上分析仅供参考，实际情况可能有所不同
          </p>

          <button
            onClick={onClose}
            className="w-full mt-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-text-primary"
          >
            我知道了
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}