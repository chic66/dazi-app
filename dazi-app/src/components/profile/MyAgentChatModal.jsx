import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Shield, Mic, Phone } from 'lucide-react'
import { agentPersonas, PRIVACY_NOTICE, QUICK_PROMPTS, generateAgentResponse, generateQuickPromptMessage } from '../../data/agentData'

export default function MyAgentChatModal({ isOpen, onClose, agentConfig, initialMessage }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  // 初始化欢迎消息
  useEffect(() => {
    if (isOpen) {
      const welcomeMsg = {
        from: 'agent',
        content: `嗨，我是 ${agentConfig?.name || '小搭'}～ ${PRIVACY_NOTICE} 有什么想聊聊的吗？`,
        timestamp: new Date()
      }

      if (initialMessage) {
        setMessages([
          welcomeMsg,
          { from: 'user', content: initialMessage, timestamp: new Date() }
        ])
        setTimeout(() => {
          const response = generateAgentResponse(initialMessage, null, null)
          setMessages(prev => [...prev, { from: 'agent', content: response, timestamp: new Date() }])
        }, 1000)
      } else {
        setMessages([welcomeMsg])
      }
    }
  }, [isOpen, initialMessage, agentConfig?.name])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { from: 'user', content: input, timestamp: new Date() }])
    const userInput = input
    setInput('')
    setTimeout(() => {
      const response = generateAgentResponse(userInput, null, null)
      setMessages(prev => [...prev, { from: 'agent', content: response, timestamp: new Date() }])
    }, 800)
  }

  const handleQuickPrompt = (prompt) => {
    const message = generateQuickPromptMessage(prompt)
    setMessages(prev => [...prev, { from: 'user', content: message, timestamp: new Date() }])
    setTimeout(() => {
      const response = generateAgentResponse(message, null, null)
      setMessages(prev => [...prev, { from: 'agent', content: response, timestamp: new Date() }])
    }, 800)
  }

  if (!isOpen) return null

  return (
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
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentPersona.color} flex items-center justify-center`}>
              <span className="text-lg">{currentPersona.emoji}</span>
            </div>
            <div>
              <p className="font-semibold text-text-primary">{agentConfig?.name || '小搭'}</p>
              <p className="text-xs text-text-muted">{currentPersona.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Mic size={20} className="text-text-secondary" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone size={20} className="text-text-secondary" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* 隐私提示 */}
        <div className="px-4 py-2 bg-purple-50/50 border-b border-purple-100">
          <p className="text-xs text-purple-700 flex items-center gap-1.5">
            <Shield size={12} />
            {PRIVACY_NOTICE}
          </p>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.from === 'agent' ? (
                <div className="max-w-[90%] px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">{currentPersona.emoji}</span>
                    <span className="text-xs text-purple-600 font-medium">{agentConfig?.name || '小搭'}</span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">{msg.content}</p>
                </div>
              ) : (
                <div className="max-w-[85%] px-4 py-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl rounded-br-md">
                  <p className="text-sm text-white leading-relaxed">{msg.content}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 快捷提示词 */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-text-secondary hover:bg-purple-100 hover:text-purple-600 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* 输入框 */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="想问小搭什么？"
              className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center disabled:opacity-40"
            >
              <Send size={20} className="text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}