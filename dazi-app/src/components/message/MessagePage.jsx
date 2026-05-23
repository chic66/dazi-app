import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, UserPlus, Check, Clock, X } from 'lucide-react'
import { Avatar, Button } from '../ui'
import { toast } from '../ui'
import { chatList, interactionNotifications, requestNotifications } from '../../data/mockData'
import ChatListItem from './ChatListItem'
import ChatDetail from './ChatDetail'

const tabs = [
  { id: 'chat', label: '聊天' },
  { id: '互动', label: '互动' },
  { id: '请求', label: '请求', badge: requestNotifications.length }
]

export default function MessagePage({ pendingChat, onClearPendingChat }) {
  const [activeChat, setActiveChat] = useState(null)
  const [activeTab, setActiveTab] = useState('chat')
  const [interactions, setInteractions] = useState(interactionNotifications)
  const [requests, setRequests] = useState(requestNotifications)

  // 如果有待处理的聊天，直接打开
  useState(() => {
    if (pendingChat) {
      setActiveChat(pendingChat)
      onClearPendingChat?.()
    }
  }, [pendingChat])

  // 如果选择了聊天，显示聊天详情
  if (activeChat) {
    return (
      <ChatDetail
        chat={activeChat}
        onBack={() => setActiveChat(null)}
      />
    )
  }

  const handleAcceptRequest = (reqId) => {
    setRequests(prev => prev.map(r =>
      r.id === reqId ? { ...r, status: 'accepted' } : r
    ))
    toast('已接受请求')
  }

  const handleLaterRequest = (reqId) => {
    setRequests(prev => prev.map(r =>
      r.id === reqId ? { ...r, status: 'later' } : r
    ))
    toast('已放到稍后处理')
  }

  const handleRejectRequest = (reqId) => {
    setRequests(prev => prev.map(r =>
      r.id === reqId ? { ...r, status: 'rejected' } : r
    ))
    toast('已拒绝')
  }

  const handleViewInteraction = (item) => {
    toast(`查看: ${item.target}`)
  }

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'like': return <Heart size={16} className="text-primary" />
      case 'comment': return <MessageCircle size={16} className="text-secondary" />
      case 'collect': return <span className="text-amber-500">★</span>
      case 'follow': return <UserPlus size={16} className="text-purple-500" />
      default: return null
    }
  }

  const getInteractionText = (type) => {
    switch (type) {
      case 'like': return '赞了'
      case 'comment': return '评论了'
      case 'collect': return '收藏了'
      case 'follow': return '关注了你'
      default: return ''
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-4 safe-top">
          <h1 className="text-xl font-bold text-text-primary mb-4">消息</h1>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-gray-100'
                  }
                `}
              >
                {tab.label}
                {tab.badge > 0 && activeTab !== tab.id && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* 聊天 Tab */}
        {activeTab === 'chat' && (
          <div className="p-4 space-y-3">
            {chatList.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                onClick={() => setActiveChat(chat)}
              />
            ))}
          </div>
        )}

        {/* 互动 Tab */}
        {activeTab === 'interactions' && (
          <div className="p-4 space-y-3">
            {interactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-3xl">💬</span>
                </div>
                <p className="text-text-secondary">还没有互动通知</p>
              </div>
            ) : (
              interactions.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3"
                >
                  <Avatar src={item.user.avatar} name={item.user.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-medium text-text-primary">{item.user.name}</span>
                      {getInteractionIcon(item.type)}
                      <span className="text-sm text-text-secondary">{getInteractionText(item.type)}</span>
                    </div>
                    <p className="text-sm text-text-muted mb-1">{item.target}</p>
                    {item.content && (
                      <p className="text-sm text-text-secondary bg-gray-50 rounded-lg p-2 mb-2">
                        "{item.content}"
                      </p>
                    )}
                    <p className="text-xs text-text-muted">{item.time}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleViewInteraction(item)}
                  >
                    查看
                  </Button>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* 请求 Tab */}
        {activeTab === 'requests' && (
          <div className="p-4 space-y-3">
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-3xl">📬</span>
                </div>
                <p className="text-text-secondary">暂时没有新请求</p>
              </div>
            ) : (
              requests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl p-4 shadow-sm ${
                    req.status === 'rejected' ? 'opacity-50' :
                    req.status === 'later' ? 'opacity-70' : ''
                  }`}
                >
                  {req.status === 'accepted' ? (
                    /* 已接受状态 */
                    <div className="flex items-center gap-3">
                      <Avatar src={req.user.avatar} name={req.user.name} size="md" />
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{req.user.name}</p>
                        <p className="text-sm text-secondary">已成为搭子</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          const chat = chatList.find(c => c.partner.id === req.user.id)
                          if (chat) setActiveChat(chat)
                        }}
                      >
                        开始聊天
                      </Button>
                    </div>
                  ) : req.status === 'rejected' ? (
                    /* 已拒绝状态 */
                    <div className="flex items-center gap-3">
                      <Avatar src={req.user.avatar} name={req.user.name} size="md" />
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{req.user.name}</p>
                        <p className="text-sm text-text-muted">已拒绝</p>
                      </div>
                    </div>
                  ) : req.status === 'later' ? (
                    /* 稍后处理状态 */
                    <div className="flex items-center gap-3">
                      <Avatar src={req.user.avatar} name={req.user.name} size="md" />
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{req.user.name}</p>
                        <p className="text-sm text-text-muted">稍后处理</p>
                      </div>
                      <button
                        onClick={() => handleAcceptRequest(req.id)}
                        className="text-sm text-primary"
                      >
                        接受
                      </button>
                    </div>
                  ) : (
                    /* 默认状态 */
                    <>
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar src={req.user.avatar} name={req.user.name} size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-text-primary">{req.user.name}</p>
                            <span className="text-xs text-text-muted">{req.time}</span>
                          </div>
                          <p className="text-sm text-secondary mb-1">
                            {req.type === 'match' && `想和你成为 ${req.reason}`}
                            {req.type === 'invite' && `${req.reason} · ${req.location || ''}`}
                            {req.type === 'meetup' && req.reason}
                          </p>
                          {req.content && (
                            <p className="text-sm text-text-muted">{req.content}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {req.type === 'match' && (
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(req.id)}
                            className="flex-1"
                          >
                            <Check size={14} className="mr-1" />
                            接受
                          </Button>
                        )}
                        {req.type === 'invite' && (
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(req.id)}
                            className="flex-1"
                          >
                            <Check size={14} className="mr-1" />
                            接受
                          </Button>
                        )}
                        {req.type === 'meetup' && (
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(req.id)}
                            className="flex-1"
                          >
                            <Check size={14} className="mr-1" />
                            接受
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleLaterRequest(req.id)}
                          className="flex-1"
                        >
                          <Clock size={14} className="mr-1" />
                          稍后
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRejectRequest(req.id)}
                          className="px-3"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}