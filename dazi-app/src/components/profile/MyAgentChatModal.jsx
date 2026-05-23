import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Shield } from 'lucide-react'
import { agentPersonas, myAgentData, generateAgentResponse } from '../../data/agentData'

export default function MyAgentChatModal({ isOpen, onClose, agentConfig, initialMessage }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]
  const agentInfo = myAgentData

  useEffect(() => {
    if (isOpen) {
      const welcomeMsg = {
        from: 'agent',
        content: `嗨，我是 ${agentConfig?.name || '小搭'}～ ${agentInfo.privacyNotice} 有什么想聊聊的吗？`,
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
    } else {
      setMessages([])
      setInput('')
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
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-purple-50 to-white rounded-t-3xl h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-100/50">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentPersona.color} flex items-center justify-center shadow-md`}>
              <span className="text-2xl">{currentPersona.emoji}</span>
            </div>
            <div>
              <p className="font-bold text-text-primary">{agentConfig?.name || '小搭'}</p>
              <p className="text-xs text-purple-500">{currentPersona.name} · {agentInfo.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-purple-100 rounded-full transition-colors"
          >
            <X size={22} className="text-purple-600" />
          </button>
        </div>

        {/* 隐私提示 */}
        <div className="px-4 py-3 bg-white/60 backdrop-blur-sm border-b border-purple-100/30">
          <p className="text-xs text-purple-600 flex items-center gap-2">
            <Shield size={14} />
            {agentInfo.privacyNotice}
          </p>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`
              }
            >
              {msg.from === 'agent' ? (
                <div className="max-w-[88%] px-4 py-3 bg-white rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-base">{currentPersona.emoji}</span>
                    <span className="text-xs text-purple-600 font-medium">{agentConfig?.name || '小搭'}</span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">{msg.content}</p>
                </div>
              ) : (
                <div className="max-w-[85%] px-4 py-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rounded-br-md shadow-md">
                  <p className="text-sm text-white leading-relaxed">{msg.content}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 输入框 */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-purple-100/50">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={agentInfo.inputPlaceholder}
              className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-sm text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center disabled:opacity-40 shadow-lg shadow-purple-200"
            >
              <Send size={22} className="text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}