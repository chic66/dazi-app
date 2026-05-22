import { motion } from 'framer-motion'
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react'
import { useState } from 'react'

export default function InteractionBar({ likes, comments, collects, liked, collected, onLike, onWantTogether }) {
  const [localLiked, setLocalLiked] = useState(liked)
  const [localCollected, setLocalCollected] = useState(collected)
  const [localLikes, setLocalLikes] = useState(likes)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLike = () => {
    setIsAnimating(true)
    setLocalLiked(!localLiked)
    setLocalLikes(localLiked ? localLikes - 1 : localLikes + 1)
    setTimeout(() => setIsAnimating(false), 300)
    onLike?.()
  }

  const handleCollect = () => {
    setLocalCollected(!localCollected)
  }

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors"
        >
          <motion.div
            animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={22}
              className={localLiked ? 'fill-primary text-primary' : ''}
            />
          </motion.div>
          <span className="text-sm">{localLikes}</span>
        </motion.button>

        <button className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors">
          <MessageCircle size={22} />
          <span className="text-sm">{comments}</span>
        </button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleCollect}
          className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
        >
          <Bookmark size={22} className={localCollected ? 'fill-accent text-accent' : ''} />
          <span className="text-sm">{collects}</span>
        </motion.button>
      </div>

      <button className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors">
        <Share2 size={22} />
      </button>
    </div>
  )
}
