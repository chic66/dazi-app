import { motion } from 'framer-motion'
import { Sparkles, ChevronRight } from 'lucide-react'
import { Button } from '../ui'

export default function ProfileCompletionCard({ completion, onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5"
    >
      {/* 标题和百分比 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-amber-500" />
          <h3 className="font-semibold text-text-primary">资料完整度</h3>
        </div>
        <span className="text-2xl font-bold text-amber-500">{completion.percent}%</span>
      </div>

      {/* 进度条 */}
      <div className="h-2 bg-white rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completion.percent}%` }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
        />
      </div>

      {/* 缺失项提示 */}
      <p className="text-sm text-text-secondary mb-4">
        你的资料完整度 {completion.percent}%。补充目标和特长后，系统能更准确推荐搭子。
      </p>

      {/* 缺失项列表 */}
      <div className="bg-white/60 rounded-xl p-3 mb-4">
        <p className="text-sm text-text-muted mb-2">还可以完善：</p>
        <ul className="space-y-1">
          {completion.missingItems.map((item, idx) => (
            <li key={idx} className="text-sm text-text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 完善按钮 */}
      <Button onClick={onComplete} className="w-full" variant="primary">
        去完善
        <ChevronRight size={16} className="ml-1" />
      </Button>
    </motion.div>
  )
}