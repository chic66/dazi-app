import { motion } from 'framer-motion'
import { Calendar, Image, MessageSquare, Sparkles, Heart } from 'lucide-react'
import { Avatar, Tag } from '../ui'
import { currentUser, chatList } from '../../data/mockData'

const stageLabels = {
  '刚建立': { color: 'amber', text: '刚建立' },
  '搭子': { color: 'green', text: '搭子' },
  '好朋友': { color: 'primary', text: '好朋友' },
  '稳定互动': { color: 'secondary', text: '稳定互动' }
}

export default function RelationshipCard({ relationship, onClick, onChatClick }) {
  // 根据 buddyUserId 查找对应的聊天对象信息
  const chatData = chatList.find(c => c.partner.id === relationship.buddyUserId)
  const buddyName = chatData?.partner.name || '搭子'
  const buddyAvatar = chatData?.partner.avatar ||
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face'

  const stage = stageLabels[relationship.stage] || { color: 'gray', text: relationship.stage }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      {/* 顶部区域：关系名称 + 类型 + 头像 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-text-primary">{relationship.teamName}</h3>
            <Tag variant={stage.color}>{stage.text}</Tag>
          </div>
          <span className="text-xs px-2 py-1 bg-gray-100 text-text-secondary rounded-full">
            附近排名前 {relationship.rank}%
          </span>
        </div>

        {/* 双方头像 + 默契值 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Avatar src={currentUser.avatar} name="我" size="sm" />
            <span className="text-text-muted text-xs">我</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
          <div className="flex items-center gap-1">
            <Avatar src={buddyAvatar} name={buddyName} size="sm" />
            <span className="text-text-secondary text-sm font-medium">{buddyName}</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <Heart size={14} className="text-primary" />
            <span className="font-bold text-primary">{relationship.chemistry}</span>
            <span className="text-xs text-text-muted">默契值</span>
          </div>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="h-px bg-gray-100" />

      {/* 中部区域：共同记忆 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Image size={14} className="text-text-muted" />
            <span className="text-sm font-medium text-text-primary">共同记忆</span>
            <span className="text-xs text-text-muted">({relationship.memories?.length || 0} 条)</span>
          </div>
          <span className="text-xs text-text-muted">{relationship.memories?.[0]?.date || ''}</span>
        </div>

        {/* 记忆图片 */}
        <div className="flex gap-2 mb-2">
          {relationship.memories?.slice(0, 3).map((mem, idx) => (
            <div
              key={mem.id || idx}
              className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0"
            >
              {mem.image ? (
                <img src={mem.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <Sparkles size={16} className="text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 最近记忆文案 */}
        {relationship.memories?.[0]?.text && (
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
            {relationship.memories[0].text}
          </p>
        )}
      </div>

      {/* 分隔线 */}
      <div className="h-px bg-gray-100" />

      {/* 底部区域：关系指标 + 操作 */}
      <div className="p-4">
        {/* 关系指标行 */}
        <div className="flex items-center gap-4 mb-3 text-xs">
          <div className="flex items-center gap-1 text-text-secondary">
            <Calendar size={14} className="text-text-muted" />
            <span>线下见面</span>
            <span className="font-semibold text-secondary">{relationship.meetups} 次</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <Image size={14} className="text-text-muted" />
            <span>记忆</span>
            <span className="font-semibold text-secondary">{relationship.memories?.length || 0} 条</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <Sparkles size={14} className="text-text-muted" />
            <span>{relationship.recentInteraction}</span>
          </div>
        </div>

        {/* 聊天按钮 */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            onChatClick?.(relationship)
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-medium"
        >
          <MessageSquare size={16} />
          <span>开始聊天</span>
        </motion.button>
      </div>
    </motion.div>
  )
}