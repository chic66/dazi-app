import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Check, User } from 'lucide-react'
import { Avatar, Tag, Button } from '../ui'

export default function ActivityCard({ activity, onRegister }) {
  const [registered, setRegistered] = useState(activity.registered)
  const [showSuccess, setShowSuccess] = useState(false)

  const typeColors = {
    '健身': 'fitness',
    '学习': 'learning',
    '社交': 'social'
  }

  const handleRegister = () => {
    if (registered) return
    setRegistered(true)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    onRegister?.()
  }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-4 shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Tag variant={typeColors[activity.type] || 'default'}>{activity.type}</Tag>
            <span className="text-xs text-text-muted">
              {activity.participants}/{activity.maxParticipants}人
            </span>
          </div>

          <h3 className="font-semibold text-text-primary mb-2">{activity.name}</h3>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Clock size={14} />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin size={14} />
              <span>{activity.location}</span>
            </div>
          </div>

          {/* 发起人 */}
          <div className="flex items-center gap-2 mt-3">
            <Avatar src={activity.host.avatar} name={activity.host.name} size="sm" />
            <span className="text-sm text-text-secondary">发起人 {activity.host.name}</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <Button
            variant={registered ? 'outline' : 'primary'}
            size="sm"
            onClick={handleRegister}
            disabled={registered}
            className={registered ? 'border-success text-success' : ''}
          >
            {registered ? (
              <span className="flex items-center gap-1">
                <Check size={16} />
                已报名
              </span>
            ) : (
              '报名'
            )}
          </Button>
        </div>
      </div>

      {/* 报名成功动画 */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-success text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          报名成功！
        </motion.div>
      )}
    </motion.div>
  )
}
