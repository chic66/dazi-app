import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Shield, MessageSquare } from 'lucide-react'
import { privateAgentResponses, agentPersonas } from '../../data/agentData'

export default function PrivateAgentChatPanel({ isOpen, onClose, agentConfig }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)

  // 获取当前 Agent 风格
  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  const handleSend = () => {
    if (!input.trim()) return

    // 添加用户消息
    setMessages(prev => [...prev, { from: 'user', text: input }])
    setInput('')

    // Mock Agent 回复
    setTimeout(() => {
      const matchedResponse = privateAgentResponses.find(r =>
        input.includes(r.question.split(' ')[0]) || input.includes(r.question.split('？')[0])
      )
      const response = matchedResponse || {
        question: input,
        answer: `我理解你的困惑。${currentPersona.name}风格的建议是：不用太担心，继续保持真诚的交流就好。有时候最自然的状态就是最好的状态～`
      }

      setMessages(prev => [...prev, { from: 'agent', text: response.answer }])
    }, 1000)
  }

  const handleSuggestionClick = (question) => {
    setInput(question)
    setShowSuggestions(false)
  }

  if (!isOpen) return null

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
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 h-[70vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-green-500" />
              <div>
                <h3 className="font-bold text-text-primary">私密对话</h3>
                <p className="text-xs text-text-muted">只有你能看到这些内容</p>
              </div>
            </div>
            <button onClick={onClose}>
              <X size={24} className="text-text-secondary" />
            </button>
          </div>

          {/* 隐私提示 */}
          <div className="bg-green-50 rounded-xl p-3 mb-4 flex items-start gap-2">
            <Shield size={16} className="text-green-500 mt-0.5" />
            <p className="text-xs text-green-700">
              这是一个完全私密的对话。对方的聊天记录中不会出现这里的内容。
            </p>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-auto space-y-3 mb-4">
            {messages.length === 0 && showSuggestions && (
              <div className="space-y-2">
                <p className="text-sm text-text-muted mb-2">你可能想问：</p>
                {privateAgentResponses.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(item.question)}
                    className="w-full p-3 bg-gray-50 rounded-xl text-left text-sm text-text-primary hover:bg-gray-100 transition-colors"
                  >
                    <MessageSquare size={14} className="inline mr-2 text-text-muted" />
                    {item.question}
                  </motion.button>
                ))}
              </div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-2.5 rounded-2xl text-sm
                    ${msg.from === 'user'
                      ? 'bg-purple-100 text-purple-900 rounded-br-md'
                      : 'bg-gray-100 text-text-primary rounded-bl-md'
                    }
                  `}
                >
                  <span className="text-xs opacity-60 mr-2">
                    {msg.from === 'user' ? '你' : currentPersona.emoji}
                  </span>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 输入框 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入你的问题..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center disabled:opacity-50"
            >
              <Send size={20} className="text-white" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}