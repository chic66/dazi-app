import { motion } from 'framer-motion'
import { Users, TrendingUp, Award } from 'lucide-react'
import { Avatar, Tag, ProgressBar } from '../ui'

export default function PartnerCard({ partner, onClick }) {
  const stageColors = {
    '搭子': 'primary',
    '好朋友': 'secondary',
    '暧昧': 'accent',
    '情侣': 'primary'
  }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4"
    >
      <Avatar
        src={partner.user.avatar}
        name={partner.user.name}
        size="lg"
        showOnline
        isOnline={partner.user.online}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-text-primary truncate">{partner.user.name}</h3>
          <span className="text-xs text-text-muted">{partner.lastInteraction}</span>
        </div>

        <p className="text-sm text-text-secondary truncate mb-2">{partner.lastMessage}</p>

        <div className="flex items-center gap-3">
          <Tag variant={stageColors[partner.stage] || 'default'} className="text-xs">
            {partner.stage}
          </Tag>
          <span className="text-xs text-text-muted">{partner.sharedGoal}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1 text-primary">
          <span className="text-lg font-bold">{partner.chemistry}</span>
        </div>
        <span className="text-xs text-text-muted">默契值</span>
      </div>
    </motion.div>
  )
}
