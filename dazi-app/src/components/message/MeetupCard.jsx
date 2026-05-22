import { motion } from 'framer-motion'
import { MapPin, Clock, Check, X, CheckCheck } from 'lucide-react'

export default function MeetupCard({ invite, isMe }) {
  const statusConfig = {
    pending: { color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-600', text: '等待回应' },
    accepted: { color: 'bg-green-50 border-green-200', textColor: 'text-green-600', text: '已接受' },
    declined: { color: 'bg-red-50 border-red-200', textColor: 'text-red-600', text: '已拒绝' }
  }

  const config = statusConfig[invite.status] || statusConfig.pending

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`${config.color} border-2 rounded-2xl p-4 my-4`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{isMe ? '📍' : '🤝'}</span>
        <span className="font-semibold text-text-primary">
          {isMe ? '你发起了见面邀约' : '收到了见面邀约'}
        </span>
      </div>

      <div className="bg-white/80 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-primary font-medium">{invite.type}</span>
          <span className={`${config.textColor} text-sm`}>{config.text}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Clock size={14} />
          <span>{invite.date} {invite.time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <MapPin size={14} />
          <span>{invite.location}</span>
        </div>

        {invite.note && (
          <p className="text-sm text-text-secondary pt-2 border-t border-gray-100">
            备注：{invite.note}
          </p>
        )}
      </div>

      {!isMe && invite.status === 'pending' && (
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-2 rounded-xl bg-green-500 text-white font-medium flex items-center justify-center gap-1">
            <Check size={18} />
            接受
          </button>
          <button className="flex-1 py-2 rounded-xl bg-gray-100 text-text-secondary font-medium flex items-center justify-center gap-1">
            <X size={18} />
            婉拒
          </button>
        </div>
      )}
    </motion.div>
  )
}
