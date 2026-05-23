import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { X, Heart, Sparkles, Users } from 'lucide-react'
import { Avatar, Tag } from '../ui'
import InviteModal from '../home/InviteModal'

export default function MatchCard({ card, onDislike, onLike, onViewDetails }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])

  const cardRef = useRef(null)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      animate(x, 300, { type: 'spring', stiffness: 200 })
      setTimeout(() => onLike(), 200)
    } else if (info.offset.x < -100) {
      animate(x, -300, { type: 'spring', stiffness: 200 })
      setTimeout(() => onDislike(), 200)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500 })
    }
  }

  const handleWantTogether = () => {
    setShowInviteModal(true)
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* 大图 - 优先展示完整人物 */}
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={card.user.avatar}
            alt={card.user.name}
            className="w-full h-full object-cover object-center"
          />

          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* 用户基础信息 */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {card.user.name}, {card.user.age}
                </h2>
                <p className="text-white/90 flex items-center gap-2 text-sm">
                  <span>{card.user.distance}</span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span>{card.user.city}</span>
                </p>
              </div>
            </div>
          </div>

          {/* 左滑提示 */}
          <motion.div
            style={{
              opacity: useTransform(x, [-100, 0], [1, 0])
            }}
            className="absolute top-6 left-4 px-3 py-1.5 border-2 border-red-400 rounded-lg rotate-[-12deg] bg-white/90"
          >
            <span className="text-red-500 font-bold text-sm">跳过</span>
          </motion.div>

          {/* 右滑提示 */}
          <motion.div
            style={{
              opacity: useTransform(x, [0, 100], [0, 1])
            }}
            className="absolute top-6 right-4 px-3 py-1.5 border-2 border-green-400 rounded-lg rotate-[12deg] bg-white/90"
          >
            <span className="text-green-600 font-bold text-sm">感兴趣</span>
          </motion.div>
        </div>

        {/* 详情区域 - 可滚动 */}
        <div className="p-5 pb-32 overflow-y-auto" style={{ height: 'calc(50vh - 24px)' }}>
          {/* 操作提示 */}
          <div className="text-center mb-4">
            <p className="text-xs text-text-muted">
              ← 左滑跳过 · 右滑感兴趣 →
            </p>
          </div>

          {/* 共同兴趣标签 */}
          <div className="mb-4">
            <p className="text-xs text-text-muted mb-2">共同兴趣</p>
            <div className="flex flex-wrap gap-2">
              {card.sharedInterests.map((interest, idx) => (
                <Tag key={idx} variant="primary">{interest}</Tag>
              ))}
            </div>
          </div>

          {/* 最近目标 */}
          <div className="mb-4">
            <p className="text-xs text-text-muted mb-1">最近目标</p>
            <p className="font-medium text-secondary text-sm">{card.goal}</p>
          </div>

          {/* 特长 / 可提供价值 */}
          <div className="mb-4">
            <p className="text-xs text-text-muted mb-1">可提供价值</p>
            <p className="text-sm text-text-primary">{card.canOffer}</p>
          </div>

          {/* 可互换价值 */}
          <div className="mb-4">
            <p className="text-xs text-text-muted mb-1">为什么适合做搭子</p>
            <p className="text-sm text-text-primary leading-relaxed">{card.exchangeValue}</p>
          </div>

          {/* Agent 推荐理由 - 淡暖黄色区域 */}
          <div
            className="p-4 rounded-2xl mb-4"
            style={{
              background: '#FFF7D6',
              border: '1px solid #FFE7A3'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-sm font-semibold" style={{ color: '#6B4E16' }}>Agent 推荐理由</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#5C4312' }}>{card.agentReason}</p>
          </div>
        </div>

        {/* 底部操作按钮 - 固定在底部 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onDislike}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm"
              title="暂不感兴趣"
            >
              <X size={22} className="text-gray-400" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWantTogether}
              className="w-12 h-12 rounded-full bg-white border-2 border-secondary flex items-center justify-center shadow-sm"
              title="想一起"
            >
              <Users size={20} className="text-secondary" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onLike}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20"
              title="感兴趣"
            >
              <Heart size={22} className="text-white" />
            </motion.button>
          </div>

          {/* 辅助文字 */}
          <div className="flex justify-center gap-6 mt-2 text-xs text-text-muted">
            <span>跳过</span>
            <span>想一起</span>
            <span>感兴趣</span>
          </div>
        </div>
      </motion.div>

      {/* 邀请弹窗 */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        card={card}
        onInvite={() => {
          setShowInviteModal(false)
        }}
      />
    </>
  )
}