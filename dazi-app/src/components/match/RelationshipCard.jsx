import { motion } from 'framer-motion'
import { Clock, Calendar, Award, Image } from 'lucide-react'
import { Avatar, Tag, ProgressBar } from '../ui'

export default function RelationshipCard({ relationship, onClick }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-md"
    >
      {/* 搭子队名 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-text-primary">{relationship.teamName}</h3>
        <Tag variant="secondary">{relationship.stage}</Tag>
      </div>

      {/* 双方头像 */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Avatar
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
          name="我"
          size="lg"
        />
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-white text-xl">+</span>
        </div>
        <Avatar
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face"
          name="搭子"
          size="lg"
        />
      </div>

      {/* 默契值 */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold gradient-text mb-1">{relationship.chemistry}</div>
        <span className="text-sm text-text-secondary">默契值</span>
      </div>

      {/* 排名 */}
      <div className="flex items-center justify-center gap-2 mb-4 text-sm">
        <Award size={16} className="text-accent" />
        <span className="text-text-secondary">超越附近</span>
        <span className="font-semibold text-accent">{relationship.rank}</span>
        <span className="text-text-secondary">搭子</span>
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-text-muted mb-1">
          <span>关系进展</span>
          <span>{Math.min(relationship.chemistry / 10, 100)}%</span>
        </div>
        <ProgressBar value={relationship.chemistry} max={1000} color="primary" />
      </div>

      {/* 记忆预览 */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-primary">共同记忆</span>
          <span className="text-xs text-text-muted">{relationship.memories.length} 条</span>
        </div>
        <div className="flex gap-2">
          {relationship.memories.slice(0, 3).map((mem, idx) => (
            <div
              key={mem.id}
              className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden"
            >
              {mem.image ? (
                <img src={mem.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image size={20} className="text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 见面次数 */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-sm text-text-secondary">
          <Calendar size={16} />
          <span>线下见面</span>
        </div>
        <span className="font-semibold text-secondary">{relationship.meetups} 次</span>
      </div>
    </motion.div>
  )
}
