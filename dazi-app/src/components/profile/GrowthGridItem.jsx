import { motion } from 'framer-motion'
import { Heart, Target, Star, TrendingUp } from 'lucide-react'

const iconMap = {
  interests: Heart,
  goals: Target,
  strengths: Star,
  growth: TrendingUp,
}

export default function GrowthGridItem({ type, title, count, subtitle, progress, tags, onClick }) {
  const Icon = iconMap[type] || Star

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center">
          <Icon size={20} className="text-primary" />
        </div>
        <span className="text-lg font-bold text-text-primary">{count}</span>
      </div>
      <h4 className="font-medium text-text-primary mb-1">{title}</h4>
      <p className="text-xs text-text-muted mb-2">{subtitle}</p>

      {/* Progress bar for goals */}
      {progress !== undefined && (
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-secondary to-teal-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Tags for interests */}
      {tags && (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-50 rounded-full text-xs text-text-secondary"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-text-muted">+{tags.length - 3}</span>
          )}
        </div>
      )}
    </motion.div>
  )
}