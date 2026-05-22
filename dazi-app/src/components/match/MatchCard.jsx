import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { X, Heart, Info, Sparkles } from 'lucide-react'
import { Avatar, Tag } from '../ui'

export default function MatchCard({ card, onDislike, onLike, onViewDetails }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])

  const cardRef = useRef(null)

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

  return (
    <motion.div
      ref={cardRef}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* 大图 */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={card.user.avatar}
          alt={card.user.name}
          className="w-full h-full object-cover"
        />

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* 用户信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {card.user.name}, {card.user.age}
              </h2>
              <p className="text-white/80 flex items-center gap-2">
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
          className="absolute top-8 left-6 px-4 py-2 border-4 border-red-500 rounded-xl rotate-[-15deg]"
        >
          <span className="text-red-500 font-bold text-2xl">不感兴趣</span>
        </motion.div>

        {/* 右滑提示 */}
        <motion.div
          style={{
            opacity: useTransform(x, [0, 100], [0, 1])
          }}
          className="absolute top-8 right-6 px-4 py-2 border-4 border-green-500 rounded-xl rotate-[15deg]"
        >
          <span className="text-green-500 font-bold text-2xl">感兴趣</span>
        </motion.div>
      </div>

      {/* 详情区域 */}
      <div className="p-6 h-[40vh] overflow-auto">
        {/* 共同兴趣 */}
        <div className="mb-4">
          <p className="text-sm text-text-secondary mb-2">共同兴趣</p>
          <div className="flex flex-wrap gap-2">
            {card.sharedInterests.map((interest, idx) => (
              <Tag key={idx} variant="primary">{interest}</Tag>
            ))}
          </div>
        </div>

        {/* 当前目标 */}
        <div className="mb-4">
          <p className="text-sm text-text-secondary mb-1">当前目标</p>
          <p className="font-medium text-secondary">{card.goal}</p>
        </div>

        {/* 可提供价值 */}
        <div className="mb-4">
          <p className="text-sm text-text-secondary mb-1">可提供价值</p>
          <p className="font-medium text-text-primary">{card.canOffer}</p>
        </div>

        {/* Agent 推荐理由 */}
        <div className="p-4 bg-accent-light rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-amber-500" />
            <span className="font-semibold text-amber-600">Agent 推荐理由</span>
          </div>
          <p className="text-sm text-text-secondary italic">{card.agentReason}</p>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onDislike}
            className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center shadow-md"
          >
            <X size={28} className="text-gray-400" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onViewDetails}
            className="w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-md"
          >
            <Info size={22} className="text-primary" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onLike}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
          >
            <Heart size={28} className="text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
