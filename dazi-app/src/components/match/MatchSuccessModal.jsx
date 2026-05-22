import { motion } from 'framer-motion'
import { X, Sparkles, MessageCircle } from 'lucide-react'
import { Avatar, Button } from '../ui'

export default function MatchSuccessModal({ isOpen, card, onClose, onStartChat }) {
  if (!isOpen || !card) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
      >
        {/* 头像合并动画 */}
        <div className="relative w-32 h-16 mx-auto mb-4">
          <motion.div
            initial={{ x: -40 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="absolute left-4"
          >
            <div className="w-16 h-16 rounded-full ring-4 ring-white shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="我"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="absolute right-4"
          >
            <div className="w-16 h-16 rounded-full ring-4 ring-white shadow-lg overflow-hidden">
              <img
                src={card.user.avatar}
                alt={card.user.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* 心形 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">❤️</span>
            </div>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold gradient-text mb-2"
        >
          匹配成功！
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-secondary mb-6"
        >
          你和 {card.user.name} 都对彼此感兴趣，快打个招呼吧！
        </motion.p>

        {/* Agent 破冰建议 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-accent-light rounded-2xl p-4 mb-6 text-left"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-amber-500" />
            <span className="font-semibold text-amber-600">破冰建议</span>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            你们都有 {card.sharedInterests.join('、')} 的兴趣，可以从这些话题开始聊起～
          </p>

          <div className="space-y-2">
            <button
              onClick={onStartChat}
              className="w-full p-3 bg-white rounded-xl text-left text-sm text-text-primary hover:bg-gray-50 transition-colors"
            >
              我也在学 {card.sharedInterests[0]}，你最近有什么进展吗？
            </button>
            <button
              onClick={onStartChat}
              className="w-full p-3 bg-white rounded-xl text-left text-sm text-text-primary hover:bg-gray-50 transition-colors"
            >
              你好呀！看到你也想 {card.goal}，加油！
            </button>
            <button
              onClick={onStartChat}
              className="w-full p-3 bg-white rounded-xl text-left text-sm text-text-primary hover:bg-gray-50 transition-colors"
            >
              嗨，很高兴认识你！有空一起 {card.sharedInterests[0]} 吗？
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <Button variant="outline" onClick={onClose} className="flex-1">
            再看看
          </Button>
          <Button onClick={onStartChat} className="flex-1" icon={MessageCircle}>
            开始聊天
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
