import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, Settings, Shield } from 'lucide-react'
import { agentPersonas, defaultAgentConfig, QUICK_PROMPTS, generateAgentResponse } from '../../data/agentData'

export default function MyAgentPrivateCard({ agentConfig, onOpenChat, onOpenSettings }) {
  const [input, setInput] = useState('')
  const [lastResponse, setLastResponse] = useState('有什么想聊聊的吗？')

  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onOpenChat(input.trim())
      setInput('')
    }
  }

  const handleQuickPrompt = (prompt) => {
    onOpenChat(prompt)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-2xl p-5 shadow-sm border border-purple-100/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentPersona.color} flex items-center justify-center shadow-md`}>
            <span className="text-2xl">{currentPersona.emoji}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-text-primary">{agentConfig?.name || '小搭'}</h3>
              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                {currentPersona.name}
              </span>
            </div>
            <p className="text-xs text-text-muted">你的私密关系助手</p>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <Settings size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* 隐私提示 */}
      <div className="bg-purple-50/50 rounded-xl p-3 mb-4">
        <p className="text-xs text-purple-700 flex items-center gap-1.5">
          <Shield size={12} />
          这里只有你能看到，可以和我说说最近的关系困惑
        </p>
      </div>

      {/* 最近对话摘要 */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        <p className="text-xs text-text-muted mb-1">小搭说：</p>
        <p className="text-sm text-text-secondary">{lastResponse}</p>
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="想问小搭什么？"
            className="flex-1 px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-sm"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center disabled:opacity-40 shadow-sm"
          >
            <Send size={20} className="text-white" />
          </motion.button>
        </div>
      </form>

      {/* 快捷提示词 */}
      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.slice(0, 4).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickPrompt(prompt)}
            className="px-3 py-1.5 bg-white/80 rounded-full text-xs text-text-secondary hover:bg-purple-50 hover:text-purple-600 transition-colors border border-gray-100"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* 进入完整聊天 */}
      <button
        onClick={() => onOpenChat('')}
        className="w-full mt-4 py-2.5 bg-white rounded-xl text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors border border-purple-100"
      >
        进入完整私聊 →
      </button>
    </motion.div>
  )
}