import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MoreHorizontal, Send, Calendar, Sparkles, X, Mic } from 'lucide-react'
import { Avatar, Tag, Button, toast } from '../ui'
import { meetupInvites } from '../../data/mockData'
import { defaultAgentConfig } from '../../data/agentData'
import HumanChatPane from './HumanChatPane'
import AgentSideChatPanel from './AgentSideChatPanel'

export default function ChatDetail({ chat, onBack }) {
  const [humanMessages, setHumanMessages] = useState(chat.messages)
  const [humanInput, setHumanInput] = useState('')
  const [showAgent, setShowAgent] = useState(false)
  const [showMeetupModal, setShowMeetupModal] = useState(false)
  const [meetups, setMeetups] = useState(meetupInvites.filter(m => m.chatId === chat.id))
  const [agentConfig] = useState(defaultAgentConfig)
  const [meetupSuggestion, setMeetupSuggestion] = useState(null)

  // 发送消息给 TA
  const handleSendToHuman = () => {
    if (!humanInput.trim()) return
    setHumanMessages([...humanMessages, { id: Date.now(), from: 'me', text: humanInput }])
    setHumanInput('')
  }

  // 发送消息到左侧输入框（来自 Agent 建议）
  const handleSendSuggestionToInput = (text) => {
    setHumanInput(text)
  }

  // 发送约见建议到输入框
  const handleMeetupSuggestion = (suggestion) => {
    setMeetupSuggestion(suggestion)
    setShowAgent(true)
  }

  // 发送约见卡片
  const handleSendMeetup = (meetup) => {
    setMeetups([...meetups, meetup])
    setHumanMessages([...humanMessages, {
      id: Date.now(),
      from: 'me',
      type: 'meetup',
      meetup: meetup
    }])
    setShowMeetupModal(false)
    setMeetupSuggestion(null)
  }

  // 语音按钮点击
  const handleVoiceClick = () => {
    toast('语音输入功能暂未接入，当前为 Demo 占位')
  }

  return (
    <div className="h-full bg-background flex overflow-hidden">
      {/* ========== Left: Human Chat Pane ========== */}
      <div className={`flex flex-col transition-all duration-300 ${showAgent ? 'flex-1' : 'w-full'}`}>
        <HumanChatPane
          chat={chat}
          messages={humanMessages}
          inputText={humanInput}
          onInputChange={setHumanInput}
          onSend={handleSendToHuman}
          onVoiceClick={handleVoiceClick}
          onBack={onBack}
          onToggleAgent={() => setShowAgent(!showAgent)}
          showAgent={showAgent}
          onOpenMeetup={() => setShowMeetupModal(true)}
          onSendMeetup={handleSendMeetup}
          meetups={meetups}
          meetupSuggestion={meetupSuggestion}
          onCloseMeetupSuggestion={() => setMeetupSuggestion(null)}
        />
      </div>

      {/* ========== Right: Agent Side Panel ========== */}
      {showAgent && (
        <AgentSideChatPanel
          isOpen={true}
          onClose={() => setShowAgent(false)}
          chat={chat}
          humanMessages={humanMessages}
          agentConfig={agentConfig}
          onSendSuggestion={handleSendSuggestionToInput}
          onOpenMeetup={handleMeetupSuggestion}
        />
      )}
    </div>
  )
}