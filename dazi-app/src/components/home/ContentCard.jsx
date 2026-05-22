import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Avatar, Tag, InteractionBar } from '../ui'

const CardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function ContentCard({ card, onWantTogether }) {
  return (
    <motion.div
      variants={CardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-2xl shadow-md overflow-hidden mb-4"
    >
      {/* 用户信息 */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar src={card.user.avatar} name={card.user.name} size="md" />
          <div>
            <h3 className="font-semibold text-text-primary">{card.user.name}</h3>
            <p className="text-xs text-text-muted">{card.timestamp}</p>
          </div>
        </div>
        <button className="text-primary text-sm font-medium">+ 关注</button>
      </div>

      {/* 图片内容 */}
      <div className="relative">
        <img
          src={card.images[0]}
          alt="内容图片"
          className="w-full aspect-square object-cover"
        />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {card.user.interests.slice(0, 2).map((interest, idx) => (
            <Tag key={idx} variant="primary">{interest}</Tag>
          ))}
        </div>
      </div>

      {/* 文案 */}
      <div className="p-4">
        <p className="text-text-primary leading-relaxed">{card.text}</p>

        {/* 目标 */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-text-secondary">目标：</span>
          <span className="text-sm font-medium text-secondary">{card.goal}</span>
        </div>
      </div>

      {/* 互动栏 */}
      <InteractionBar
        likes={card.likes}
        comments={card.comments}
        collects={card.collects}
        liked={card.liked}
        collected={card.collected}
      />

      {/* 想一起按钮 */}
      <div className="px-4 pb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onWantTogether(card)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <Users size={18} />
          想一起
        </motion.button>
      </div>
    </motion.div>
  )
}
