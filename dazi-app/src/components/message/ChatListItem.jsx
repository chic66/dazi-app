import { motion } from 'framer-motion'
import { Avatar, Tag } from '../ui'

export default function ChatListItem({ chat, onClick }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <Avatar src={chat.partner.avatar} name={chat.partner.name} size="lg" />
        {chat.unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {chat.unread}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-text-primary">{chat.partner.name}</h3>
          <span className="text-xs text-text-muted">{chat.lastTime}</span>
        </div>
        <p className="text-sm text-text-secondary truncate mb-1.5">{chat.lastMessage}</p>
        <Tag variant="secondary" className="text-xs">{chat.sharedInterest}</Tag>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-lg font-bold text-primary">{chat.chemistry}</span>
        <span className="text-xs text-text-muted">默契</span>
      </div>
    </motion.div>
  )
}
