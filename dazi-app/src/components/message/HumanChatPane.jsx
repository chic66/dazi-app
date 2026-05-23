import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MoreHorizontal, Send, Calendar, Sparkles, X, Mic } from 'lucide-react'
import { Avatar, Tag, Button } from '../ui'
import MeetupCard from './MeetupCard'

export default function HumanChatPane({
  chat,
  messages,
  inputText,
  onInputChange,
  onSend,
  onVoiceClick,
  onBack,
  onToggleAgent,
  showAgent,
  onOpenMeetup,
  onSendMeetup,
  meetups,
  meetupSuggestion,
  onCloseMeetupSuggestion
}) {
  const [showMeetupModal, setShowMeetupModal] = useState(false)
  const messagesEndRef = useRef(null)

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 safe-top z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft size={24} className="text-text-primary" />
          </button>

          <Avatar src={chat.partner.avatar} name={chat.partner.name} size="md" />

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-text-primary truncate">{chat.partner.name}</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-primary font-medium">{chat.chemistry} 默契</span>
              <span className="text-text-muted">·</span>
              <Tag variant="secondary">{chat.sharedInterest}</Tag>
            </div>
          </div>

          {/* Agent 助手按钮 - 更醒目 */}
          <button
            onClick={onToggleAgent}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              showAgent
                ? 'bg-purple-500 text-white'
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            }`}
          >
            <Sparkles size={16} />
            <span className="text-xs font-medium">{showAgent ? '收起助手' : '小搭助手'}</span>
          </button>

          <button className="p-2">
            <MoreHorizontal size={24} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Messages Area - 可滚动区域，留出底部输入框空间 */}
      <div className="flex-1 overflow-y-auto p-4" style={{ paddingBottom: '120px' }}>
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
                  max-w-[75%] px-4 py-2.5 rounded-2xl
                  ${msg.from === 'me'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-white text-text-primary rounded-bl-md shadow-sm'
                  }
                `}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Meetup Suggestion Banner */}
      <AnimatePresence>
        {meetupSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-4 right-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-4 border border-teal-200 shadow-lg z-30"
            style={{ bottom: '100px' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤝</span>
                <span className="font-semibold text-teal-700">约TA见面</span>
              </div>
              <button onClick={onCloseMeetupSuggestion} className="p-1 hover:bg-teal-100 rounded-full">
                <X size={16} className="text-teal-600" />
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-3">{meetupSuggestion}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  onInputChange(meetupSuggestion)
                  onCloseMeetupSuggestion()
                }}
              >
                编辑发送
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onInputChange(meetupSuggestion)
                  onSend()
                  onCloseMeetupSuggestion()
                }}
              >
                直接发送
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Input - 固定在 Tab Bar 上方 10px */}
      <div
        className="absolute left-0 right-0 bg-white border-t border-gray-200 z-20"
        style={{
          bottom: '10px',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
          paddingTop: '8px',
        }}
      >
        <div className="flex items-center gap-2 px-4">
          <button
            onClick={onVoiceClick}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
            title="语音输入"
          >
            <Mic size={20} className="text-text-secondary" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
            placeholder="输入消息..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onSend}
            disabled={!inputText.trim()}
            className="w-11 h-11 rounded-full bg-primary flex items-center justify-center disabled:opacity-50 flex-shrink-0"
          >
            <Send size={18} className="text-white" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMeetupModal(true)}
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"
            title="约见面"
          >
            <Calendar size={18} className="text-white" />
          </motion.button>
        </div>
      </div>

      {/* Meetup Modal */}
      <MeetupModal
        isOpen={showMeetupModal}
        onClose={() => setShowMeetupModal(false)}
        onSend={onSendMeetup}
      />
    </div>
  )
}

function MeetupModal({ isOpen, onClose, onSend }) {
  const [formData, setFormData] = useState({
    type: '学习交流',
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
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
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