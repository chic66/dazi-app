import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Shield, MessageCircle } from 'lucide-react'
import { agentPersonas, myAgentData } from '../../data/agentData'

export default function MyAgentPrivateCard({ agentConfig, onOpenChat }) {
  const [input, setInput] = useState('')

  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]
  const agentInfo = myAgentData

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onOpenChat(input.trim())
      setInput('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-5 shadow-sm border border-purple-100/30 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${currentPersona.color} flex items-center justify-center shadow-md`}>
          <span className="text-2xl">{currentPersona.emoji}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-text-primary text-lg">{agentInfo.name}</h3>
            <span className="text-xs px-2 py-0.5 bg-white/80 text-purple-600 rounded-full">
              {currentPersona.name}
            </span>
          </div>
          <p className="text-xs text-purple-500/70 font-medium">{agentInfo.role}</p>
        </div>
      </div>

      {/* 私密提示条 */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3.5 mb-4">
        <p className="text-sm text-purple-700 flex items-center gap-2">
          <Shield size={14} className="flex-shrink-0" />
          {agentInfo.privacyNotice}
        </p>
      </div>

      {/* 上次聊天内容 */}
      <div className="mb-4">
        <p className="text-xs text-text-muted mb-2">上次聊天</p>
        <div className="space-y-2">
          <div className="bg-white/40 rounded-xl rounded-tl-none p-3">
            <p className="text-xs text-text-muted mb-1">你说：</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              "{agentInfo.lastUserThought}"
            </p>
          </div>
          <div className="bg-purple-100/60 rounded-xl rounded-tl-none p-3">
            <p className="text-xs text-purple-600/70 mb-1 flex items-center gap-1">
              <span>{currentPersona.emoji}</span>
              <span>小搭回你：</span>
            </p>
            <p className="text-sm text-purple-800 leading-relaxed">
              "{agentInfo.lastAgentReply}"
            </p>
          </div>
        </div>
      </div>

      {/* 输入区域 */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={agentInfo.inputPlaceholder}
            className="flex-1 px-4 py-3.5 bg-white/80 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-sm text-sm"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim()}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center disabled:opacity-40 shadow-md"
          >
            <Send size={20} className="text-white" />
          </motion.button>
        </div>
      </form>

      {/* 进入完整私聊 */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onOpenChat('')}
        className="w-full py-3 bg-white/60 backdrop-blur-sm rounded-2xl text-sm font-medium text-purple-600 hover:bg-white/80 transition-colors flex items-center justify-center gap-2"
      >
        <MessageCircle size={16} />
        <span>进入完整私聊</span>
        <span className="text-purple-400">→</span>
      </motion.button>
    </motion.div>
  )
}