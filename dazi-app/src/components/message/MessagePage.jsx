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

  // 默认视图：左侧聊天列表 + 右侧 Agent 辅助面板
  return (
    <div className="flex h-screen bg-background">
      {/* 左侧：聊天列表 */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="p-4 safe-top">
            <h1 className="text-xl font-bold text-text-primary">消息</h1>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-auto p-4 pb-24 space-y-3">
          {chatList.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onClick={() => setActiveChat(chat)}
            />
          ))}
        </div>
      </div>

      {/* 右侧：Agent 辅助面板 */}
      <div className="w-80 border-l border-border bg-white hidden lg:block">
        <AgentPanel
          suggestions={agentSuggestions}
          isOpen={true}
          onClose={() => setShowAgent(false)}
          onSelectDraft={(text) => console.log('Selected draft:', text)}
          onMeetupSuggestion={() => console.log('Meetup suggestion clicked')}
        />
      </div>
    </div>
  )
}
