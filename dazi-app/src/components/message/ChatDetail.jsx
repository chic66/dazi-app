import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MoreHorizontal, Send, Calendar, Sparkles, X, Lightbulb } from 'lucide-react'
import { Avatar, Tag, Button } from '../ui'
import { agentSuggestions, meetupInvites } from '../../data/mockData'
import { defaultAgentConfig, generateSilenceReminder } from '../../data/agentData'
import ChatAgentPanel from './ChatAgentPanel'
import AgentDraftGeneratorModal from './AgentDraftGeneratorModal'
import AgentInterpretMessageModal from './AgentInterpretMessageModal'
import PrivateAgentChatPanel from './PrivateAgentChatPanel'
import MeetupCard from './MeetupCard'

export default function ChatDetail({ chat, onBack }) {
  const [messages, setMessages] = useState(chat.messages)
  const [inputText, setInputText] = useState('')
  const [showAgent, setShowAgent] = useState(false)
  const [showMeetupModal, setShowMeetupModal] = useState(false)
  const [showDraftModal, setShowDraftModal] = useState(false)
  const [showInterpretModal, setShowInterpretModal] = useState(false)
  const [showPrivateChat, setShowPrivateChat] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [meetups, setMeetups] = useState(meetupInvites.filter(m => m.chatId === chat.id))
  const [agentConfig] = useState(defaultAgentConfig)

  const handleSend = () => {
    if (!inputText.trim()) return
    setMessages([...messages, { id: Date.now(), from: 'me', text: inputText }])
    setInputText('')
  }

  const handleSelectDraft = (text) => {
    setInputText(text)
    setShowAgent(false)
  }

  const handleSelectTopic = (topic) => {
    setInputText(topic)
    setShowAgent(false)
  }

  const handleMeetupSuggestion = (suggestion) => {
    setShowMeetupModal(true)
    // 可以自动填充建议到表单
  }

  const handleSendMeetup = (meetup) => {
    setMeetups([...meetups, meetup])
    setMessages([...messages, {
      id: Date.now(),
      from: 'me',
      type: 'meetup',
      meetup: meetup
    }])
    setShowMeetupModal(false)
  }

  const handleInterpretMessage = () => {
    // 获取最后一条对方的消息
    const lastTheirMessage = [...messages].reverse().find(m => m.from === 'them')
    if (lastTheirMessage) {
      setSelectedMessage(lastTheirMessage)
      setShowInterpretModal(true)
    }
  }

  const handleShowReminder = () => {
    const reminder = generateSilenceReminder(5, chat.partner.name, chat.sharedInterest)
    if (reminder) {
      setInputText(reminder)
    }
  }

  // 生成沉默提醒
  const showSilenceReminder = messages.length > 0 && !showAgent

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 safe-top">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft size={24} className="text-text-primary" />
          </button>

          <Avatar src={chat.partner.avatar} name={chat.partner.name} size="md" />

          <div className="flex-1">
            <h2 className="font-semibold text-text-primary">{chat.partner.name}</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-primary font-medium">{chat.chemistry} 默契</span>
              <span className="text-text-muted">·</span>
              <Tag variant="secondary">{chat.sharedInterest}</Tag>
            </div>
          </div>

          <button className="p-2">
            <MoreHorizontal size={24} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Silence Reminder */}
      <AnimatePresence>
        {showSilenceReminder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 bg-amber-50 border-b border-amber-100"
          >
            <button
              onClick={() => setShowAgent(true)}
              className="flex items-center gap-2 text-sm text-amber-700"
            >
              <Lightbulb size={14} />
              <span>你们已经 5 天没聊天了，要不要主动联系一下？</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 pb-32">
        {messages.map((msg, idx) => {
          if (msg.type === 'meetup') {
            return <MeetupCard key={msg.id} invite={msg.meetup} isMe />
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex mb-3 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.from === 'them' && (
                <Avatar src={chat.partner.avatar} name={chat.partner.name} size="sm" className="mr-2" />
              )}
              <div
                className={`
                  max-w-[75%] px-4 py-2.5 rounded-2xl relative group
                  ${msg.from === 'me'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-white text-text-primary rounded-bl-md shadow-sm'
                  }
                `}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {/* 消息操作按钮 */}
                {msg.from === 'them' && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setSelectedMessage(msg)
                        setShowInterpretModal(true)
                      }}
                      className="p-1.5 bg-white rounded-full shadow-md"
                      title="让小搭帮我理解"
                    >
                      <Lightbulb size={14} className="text-purple-500" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Agent Panel */}
      <ChatAgentPanel
        isOpen={showAgent}
        onClose={() => setShowAgent(false)}
        chat={chat}
        agentConfig={agentConfig}
        onSelectTopic={handleSelectTopic}
        onSelectDraft={handleSelectDraft}
        onMeetupSuggestion={handleMeetupSuggestion}
        onPrivateChat={() => {
          setShowAgent(false)
          setShowPrivateChat(true)
        }}
        onInterpretMessage={handleInterpretMessage}
        onShowReminder={showSilenceReminder ? handleShowReminder : null}
      />

      {/* Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border safe-bottom">
        <div className="flex items-center gap-2 p-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAgent(!showAgent)}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center transition-all
              ${showAgent
                ? 'bg-gradient-to-br from-purple-400 to-blue-400 shadow-lg'
                : 'bg-gray-100'
              }
            `}
          >
            <Sparkles size={20} className={showAgent ? 'text-white' : 'text-text-secondary'} />
          </motion.button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入消息..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDraftModal(true)}
            className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center"
            title="让小搭帮我说"
          >
            <Sparkles size={20} className="text-purple-600" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center disabled:opacity-50"
          >
            <Send size={20} className="text-white" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMeetupModal(true)}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
          >
            <Calendar size={20} className="text-white" />
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <MeetupModal
        isOpen={showMeetupModal}
        onClose={() => setShowMeetupModal(false)}
        onSend={handleSendMeetup}
      />

      <AgentDraftGeneratorModal
        isOpen={showDraftModal}
        onClose={() => setShowDraftModal(false)}
        onSelectDraft={handleSelectDraft}
        agentConfig={agentConfig}
      />

      <AgentInterpretMessageModal
        isOpen={showInterpretModal}
        onClose={() => setShowInterpretModal(false)}
        message={selectedMessage}
        agentConfig={agentConfig}
      />

      <PrivateAgentChatPanel
        isOpen={showPrivateChat}
        onClose={() => setShowPrivateChat(false)}
        agentConfig={agentConfig}
      />
    </div>
  )
}

function MeetupModal({ isOpen, onClose, onSend }) {
  const [formData, setFormData] = useState({
    type: '一起运动',
    date: '',
    time: '',
    location: '',
    note: ''
  })

  const types = ['一起运动', '咖啡聊天', '学习交流', '参加活动', '其他']

  const handleSubmit = () => {
    if (!formData.date || !formData.time || !formData.location) return
    onSend({
      id: Date.now(),
      type: formData.type,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      note: formData.note,
      status: 'pending',
      from: 'me'
    })
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
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 safe-bottom"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-text-primary">约见面</h3>
          <button onClick={onClose}>
            <X size={24} className="text-text-secondary" />
          </button>
        </div>

        {/* 安全提示 */}
        <div className="bg-green-50 rounded-xl p-3 mb-4 flex items-start gap-2">
          <span className="text-lg">🛡️</span>
          <div>
            <p className="text-xs text-green-700 font-medium">见面安全提醒</p>
            <p className="text-xs text-green-600">首次见面建议选择公共场所，并告诉朋友你的行程。</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* 活动类型 */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">活动类型</label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type })}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${formData.type === type
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-text-secondary'
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 日期时间 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">日期</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">时间</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* 地点 */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">地点</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="在哪里见面？"
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 备注 */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">备注（可选）</label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="有什么想说的？"
              rows={2}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            发送邀约
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}