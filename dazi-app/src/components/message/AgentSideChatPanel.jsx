import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Phone, Mic, Send, Shield, MessageSquare, Lightbulb, ArrowRight, X } from 'lucide-react'
import { toast } from '../ui'
import { agentPersonas, judgeCurrentStage, generateAgentResponse, generateAssistChat, generateNextStep, PRIVACY_NOTICE } from '../../data/agentData'

// 初始 Agent 欢迎消息
const INITIAL_AGENT_WELCOME = '我在旁边看着你们的聊天。你可以把不好意思直接说的话先告诉我，我帮你想一种更自然的表达。'

// 快捷 chips 映射到 Agent 回复
const QUICK_CHIP_RESPONSES = {
  '我该怎么回？': '可以先接住 TA 刚才提到的兴趣点，再轻轻抛一个问题。比如：「你刚才说最近在学 AI，我也在入门，你现在主要看课程还是做项目呀？」',
  '怕打扰TA': '这种顾虑很正常。你可以发一句轻量、不要求对方立刻回应的话，让对方有空间，比如：「刚看到你之前说的那个 AI 工具，我也去试了一下，还挺有意思。」',
  '想自然约见': '想约见面可以先在聊天中自然提一个活动或地点。比如：「最近天气不错，周末有什么计划吗？」这样引入会更自然，不会显得太突然。',
  '帮我理解TA': '从 TA 最近的消息来看，态度比较积极。TA 可能对你们的话题有兴趣，但还在试探。可以继续围绕共同目标聊，不要急着推进关系。',
  '关系到哪了？': '你们目前处于「熟络阶段」。TA 对你有回应，默契值也在慢慢积累。再多聊一两轮，找机会自然地约线下见面会更顺利。'
}

export default function AgentSideChatPanel({
  isOpen,
  onClose,
  chat,
  humanMessages,
  agentConfig,
  onSendSuggestion,
  onOpenMeetup
}) {
  const [agentMessages, setAgentMessages] = useState([])
  const [agentInput, setAgentInput] = useState('')
  const [currentStage, setCurrentStage] = useState(null)
  const [showMeetupPanel, setShowMeetupPanel] = useState(false)
  const [suggestedMeetup, setSuggestedMeetup] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const messagesEndRef = useRef(null)

  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  // 监听聊天变化，更新阶段判断
  useEffect(() => {
    const stage = judgeCurrentStage(chat, humanMessages)
    setCurrentStage(stage)
  }, [chat, humanMessages])

  // 初始化欢迎消息
  useEffect(() => {
    if (isOpen && agentMessages.length === 0) {
      setAgentMessages([{
        from: 'agent',
        content: INITIAL_AGENT_WELCOME,
        timestamp: new Date()
      }])
    }
  }, [isOpen])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [agentMessages])

  // 发送消息给 Agent
  const handleAgentSend = () => {
    if (!agentInput.trim()) return
    const userMsg = agentInput.trim()
    setAgentMessages(prev => [...prev, { from: 'user', content: userMsg, timestamp: new Date() }])
    setAgentInput('')
    setTimeout(() => {
      const response = generateAgentResponse(userMsg, currentStage, chat)
      setAgentMessages(prev => [...prev, { from: 'agent', content: response, timestamp: new Date() }])
    }, 800)
  }

  // 点击快捷 chip
  const handleQuickChip = (chipText) => {
    setAgentMessages(prev => [...prev, { from: 'user', content: chipText, timestamp: new Date() }])
    setTimeout(() => {
      const response = QUICK_CHIP_RESPONSES[chipText] || '我理解你的想法～慢慢来，不要着急。'
      setAgentMessages(prev => [...prev, { from: 'agent', content: response, timestamp: new Date() }])
    }, 600)
  }

  // 点击理解 TA
  const handleUnderstandTA = () => {
    const lastHumanMsg = humanMessages.length > 0 ? humanMessages[humanMessages.length - 1] : null
    let analysis = '我分析了一下 TA 最近的消息：'

    if (lastHumanMsg?.from === 'them') {
      const text = lastHumanMsg.text || ''
      const lowerText = text.toLowerCase()

      if (lowerText.includes('好') || lowerText.includes('嗯') || lowerText.includes('行')) {
        analysis += 'TA 似乎表示同意或认可。可以继续这个话题，或者自然地推进下一步。如果之前聊到活动，可以顺势约具体时间～'
      } else if (lowerText.includes('哈哈') || lowerText.includes('笑')) {
        analysis += 'TA 心情看起来不错！继续保持这种轻松的聊天氛围，可以适当开些小玩笑或者分享有趣的事。'
      } else if (lowerText.includes('忙') || lowerText.includes('累')) {
        analysis += 'TA 可能比较忙或者有些疲惫。可以适当表达关心，但不要追问太多。给彼此一些空间，晚点再聊～'
      } else if (lowerText.includes('？') || lowerText.includes('什么') || lowerText.includes('怎么')) {
        analysis += 'TA 可能对之前的话题有些好奇或困惑。可以把话说得更清楚一些，多分享一些背景信息。'
      } else {
        analysis += '从这条消息来看，TA 的态度比较中性积极。不一定完全没有兴趣，可能只是在试探。继续保持自然互动就好。'
      }
    } else {
      analysis += '从最近的聊天来看，TA 并不是完全没有回应你们的对话。也许只是聊天节奏比较慢，不一定是对你不感兴趣。可以耐心一些，继续围绕共同兴趣展开话题。'
    }

    setAgentMessages(prev => [...prev, { from: 'agent', content: analysis, timestamp: new Date() }])
  }

  // 点击发送建议到左侧
  const handleSendSuggestion = (msg) => {
    onSendSuggestion(msg)
  }

  // 点击约见面
  const handleMeetupClick = () => {
    const chemistry = chat?.chemistry || 0
    if (chemistry < 300) {
      toast('现在可以先不要直接约见面。你们还可以再围绕共同目标聊一两轮，让关系更自然一些～')
      return
    }
    const meetupSuggestions = [
      '最近天气不错，要不要找个咖啡馆一起坐坐？聊聊 AI 学习的心得。',
      '发现附近有个很棒的图书馆，有空可以一起去学习，互相监督～',
      '有个线下 AI 技术 meetup 要不要一起去看看？'
    ]
    const randomSuggestion = meetupSuggestions[Math.floor(Math.random() * meetupSuggestions.length)]
    setSuggestedMeetup(randomSuggestion)
    setShowMeetupPanel(true)
  }

  // 发送约见内容到左侧输入框
  const handleSendMeetupToInput = () => {
    if (suggestedMeetup) {
      onSendSuggestion(suggestedMeetup)
      setShowMeetupPanel(false)
      setSuggestedMeetup('')
    }
  }

  // 语音按钮
  const handleVoice = () => {
    toast('语音倾诉功能暂未接入，当前为 Demo 占位')
  }

  // 电话按钮
  const handlePhone = () => {
    toast('电话陪伴功能暂未接入，当前为 Demo 占位')
  }

  const assistChat = generateAssistChat(currentStage, chat)

  // 面板内容
  const panelContent = (
    <div className="flex flex-col h-full bg-white w-full">
      {/* ========== Header ========== */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 border-b border-purple-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentPersona.color} flex items-center justify-center shadow-md`}>
              <span className="text-lg">{currentPersona.emoji}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-text-primary">{agentConfig?.name || '小搭'}</p>
                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">{currentPersona.name}</span>
              </div>
              <p className="text-xs text-purple-500">只对你可见</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handlePhone} className="p-2 hover:bg-white/50 rounded-full" title="电话">
              <Phone size={18} className="text-purple-500" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full" title="收起">
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* ========== 隐私提示条 ========== */}
      <div className="px-4 py-2.5 bg-purple-50/60 border-b border-purple-100 flex-shrink-0">
        <p className="text-xs text-purple-700 flex items-center gap-1.5">
          <Shield size={12} />
          这里只有你能看到，可以倾诉困惑或寻求建议
        </p>
      </div>

      {/* ========== 主内容区 - Flex 布局分配空间 ========== */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* 上半部分：阶段卡片 + 约见面 + Agent 聊天记录（约占 2/3） */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* 当前阶段卡片 */}
          {currentStage && (
            <div className="px-4 py-3">
              <div className="bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-2xl p-3 border border-purple-200/50">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Lightbulb size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-purple-700">{currentStage.title}</span>
                  </div>
                  <button
                    onClick={handleUnderstandTA}
                    className="text-xs px-2 py-0.5 bg-white rounded-full text-purple-600 hover:bg-purple-50 border border-purple-200 font-medium"
                  >
                    理解TA
                  </button>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{currentStage.description}</p>
              </div>
            </div>
          )}

          {/* 约见面小按钮 */}
          <div className="px-4 pb-2">
            <button
              onClick={handleMeetupClick}
              className="w-full text-left px-3 py-1.5 text-xs text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MessageSquare size={12} />
              <span>约TA见面</span>
            </button>
          </div>

          {/* 约见面展开面板 */}
          <AnimatePresence>
            {showMeetupPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-3"
              >
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-3 border border-teal-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-teal-700">约TA见面</span>
                    <button onClick={() => setShowMeetupPanel(false)} className="p-1 hover:bg-teal-100 rounded-full">
                      <X size={12} className="text-teal-600" />
                    </button>
                  </div>
                  <p className="text-xs text-text-primary mb-2">{suggestedMeetup}</p>
                  <button
                    onClick={handleSendMeetupToInput}
                    className="w-full py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg text-xs font-medium"
                  >
                    发送到聊天框
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Agent 聊天记录 */}
          <div className="px-4 space-y-2">
            {agentMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.from === 'agent' ? (
                  <div className="max-w-[92%] px-3 py-2 bg-gray-100 rounded-2xl rounded-bl-md">
                    <p className="text-xs text-text-primary leading-relaxed">{msg.content}</p>
                  </div>
                ) : (
                  <div className="max-w-[88%] px-3 py-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl rounded-br-md">
                    <p className="text-xs text-white leading-relaxed">{msg.content}</p>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 下半部分：辅助聊天推荐（约占 1/4，最大高度限制） */}
        <div className="flex-shrink-0 border-t border-amber-100" style={{ maxHeight: '28%' }}>
          <div className="p-3 overflow-y-auto" style={{ maxHeight: '100%' }}>
            {/* 辅助聊天建议 - 暖黄色区域 */}
            {assistChat && (
              <div className="rounded-2xl p-3" style={{ background: 'rgba(255, 247, 214, 0.65)', border: '1px solid #FFE7A3' }}>
                {/* 标题 */}
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#6B4E16' }}>
                  推荐发送给 TA 的消息
                </p>
                <p className="text-xs mb-3" style={{ color: '#A88A3D' }}>
                  点击后会填入左侧聊天框，你可以再编辑
                </p>
                <div className="space-y-2">
                  {assistChat.suggestedMessages.map((msg, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendSuggestion(msg)}
                      className="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2 transition-all"
                      style={{
                        background: '#FFF7D6',
                        border: '1px solid #FFE7A3',
                        minHeight: '42px'
                      }}
                    >
                      <p className="text-sm flex-1 truncate" style={{ color: '#4A3B1A' }}>{msg}</p>
                      <span className="text-xs flex-shrink-0" style={{ color: '#D98A00' }}>填入 →</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 快捷 Chips */}
            <div className="flex flex-wrap gap-1 mt-3">
              {Object.keys(QUICK_CHIP_RESPONSES).map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleQuickChip(chip)}
                  className="px-2 py-1 bg-purple-50 rounded-full text-xs text-purple-600 hover:bg-purple-100 transition-colors border border-purple-100"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== Agent 输入框 ========== */}
      <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={handleVoice}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            title="语音"
          >
            <Mic size={16} className="text-text-secondary" />
          </button>

          <input
            type="text"
            value={agentInput}
            onChange={(e) => setAgentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAgentSend()}
            placeholder="和小搭说说你的顾虑……"
            className="flex-1 px-3 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200 text-sm"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAgentSend}
            disabled={!agentInput.trim()}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center disabled:opacity-40"
          >
            <Send size={16} className="text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  )

  // 移动端：右侧抽屉
  return (
    <div className="flex-1 lg:w-96 lg:flex-shrink-0 border-l border-purple-100 flex flex-col min-h-0">
      {panelContent}
    </div>
  )
}