import { motion } from 'framer-motion'
import { MapPin, Eye, MessageCircle, Brain, Shield, AlertTriangle, ChevronRight } from 'lucide-react'

const PRIVACY_ITEMS = [
  { id: 'location', icon: MapPin, label: '定位权限', value: '使用大致位置' },
  { id: 'visibility', icon: Eye, label: '主页可见范围', value: '所有人可见' },
  { id: 'message', icon: MessageCircle, label: '消息权限', value: '仅 Match 用户' },
  { id: 'memory', icon: Brain, label: '共同记忆默认权限', value: '默认仅双方可见' },
  { id: 'blacklist', icon: Shield, label: '黑名单', value: '0 人' },
  { id: 'meetup', icon: AlertTriangle, label: '线下见面安全设置', value: '已开启' },
]

export default function PrivacySafetyList({ onItemClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-5 shadow-sm mb-4"
    >
      <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
        <Shield size={18} className="text-secondary" />
        隐私与安全
      </h3>

      <div className="space-y-1">
        {PRIVACY_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-text-muted" />
                <span className="text-sm text-text-primary">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted">{item.value}</span>
                <ChevronRight size={16} className="text-text-muted" />
              </div>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}