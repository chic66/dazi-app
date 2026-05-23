import { useState } from 'react'
import { motion } from 'framer-motion'
import { chatList, agentSuggestions } from '../../data/mockData'
import ChatListItem from './ChatListItem'
import ChatDetail from './ChatDetail'
import AgentPanel from './AgentPanel'

export default function MessagePage() {
  const [activeChat, setActiveChat] = useState(null)
  const [showAgent, setShowAgent] = useState(false)

  // 如果选择了聊天，显示聊天详情
  if (activeChat) {
    return (
      <ChatDetail
        chat={activeChat}
        onBack={() => setActiveChat(null)}
      />
    )
  }

  // 默认视图：左侧聊天列表
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-4 safe-top">
          <h1 className="text-xl font-bold text-text-primary">消息</h1>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {chatList.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onClick={() => setActiveChat(chat)}
          />
        ))}
      </div>
    </div>
  )
}
