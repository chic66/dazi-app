import { motion } from 'framer-motion'
import { MapPin, Edit3, ExternalLink, Heart } from 'lucide-react'
import { Avatar, Tag, Button } from '../ui'

export default function ProfileIdentityCard({ user, onEditProfile, onViewProfile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-sm"
    >
      {/* 头像和基本信息 */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar src={user.avatar} name={user.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
            <span className="text-text-muted text-sm">{user.age}岁</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary text-sm mb-2">
            <MapPin size={14} />
            <span>{user.location}</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">{user.bio}</p>
        </div>
      </div>

      {/* 关系状态 */}
      <div className="mb-4">
        <Tag variant="secondary" className="text-sm">
          <Heart size={12} className="mr-1" />
          {user.relationshipStatus}
        </Tag>
      </div>

      {/* 兴趣标签 */}
      <div className="flex flex-wrap gap-2 mb-5">
        {user.interests.map((interest, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="px-3 py-1.5 bg-gradient-to-r from-primary-light to-white rounded-full text-sm text-primary font-medium"
          >
            {interest}
          </motion.span>
        ))}
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onEditProfile}
        >
          <Edit3 size={16} className="mr-2" />
          编辑资料
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={onViewProfile}
        >
          <ExternalLink size={16} className="mr-2" />
          查看主页
        </Button>
      </div>
    </motion.div>
  )
}