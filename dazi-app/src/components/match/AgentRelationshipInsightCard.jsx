import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, MessageSquare, Calendar, Heart } from 'lucide-react'
import { generateRelationshipInsight, relationshipStages, agentPersonas } from '../../data/agentData'

export default function AgentRelationshipInsightCard({ relationship, onAction }) {
  const { chemistry = 500, meetups = 0, lastInteraction = '2小时前', stage = 'warming' } = relationship

  // 生成洞察
  const insights = generateRelationshipInsight(chemistry, meetups, lastInteraction, stage)

  // 获取当前关系阶段
  const currentStage = relationshipStages.find(s => s.id === stage) || relationshipStages[0]

  // 建议动作
  const actions = [
    { id: 'message', label: '发消息', icon: MessageSquare, color: 'bg-blue-100 text-blue-600' },
    { id: 'meetup', label: '约见面', icon: Calendar, color: 'bg-green-100 text-green-600' },
    { id: 'memory', label: '记回忆', icon: Heart, color: 'bg-pink-100 text-pink-600' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <span className="font-semibold text-text-primary">关系洞察</span>
            <span className="text-xs text-text-muted ml-2">{currentStage.name}阶段</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp size={14} className="text-purple-500" />
          <span className="text-sm font-bold text-purple-600">{chemistry}</span>
        </div>
      </div>

      {/* 洞察内容 */}
      <div className="space-y-2 mb-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
            <p className="text-sm text-text-secondary">{insight}</p>
          </div>
        ))}
      </div>

      {/* 下一步建议 */}
      <div className="mb-3">
        <p className="text-xs text-text-muted mb-2">下一步可以：</p>
        <div className="flex gap-2">
          {actions.map(action => (
            <motion.button
              key={action.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAction && onAction(action.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl ${action.color} transition-colors`}
            >
              <action.icon size={14} />
              <span className="text-xs font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 关系阶段描述 */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs text-text-muted">
          <span className="font-medium text-text-secondary">阶段：</span>
          {currentStage.description}
        </p>
      </div>
    </motion.div>
  )
}