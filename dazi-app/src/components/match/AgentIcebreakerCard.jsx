import { motion } from 'framer-motion'
import { Sparkles, Lightbulb, ChevronRight } from 'lucide-react'
import { getIcebreakers, agentPersonas } from '../../data/agentData'

export default function AgentIcebreakerCard({ partner, agentConfig, onSelectTopic }) {
  const icebreakers = partner.interests
    ? getIcebreakers(partner.interests)
    : getIcebreakers([])

  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentPersona.color} flex items-center justify-center`}>
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="font-semibold text-text-primary">小搭推荐</span>
      </div>

      {/* 推荐理由 */}
      <p className="text-sm text-text-secondary mb-3 leading-relaxed">
        你们都有 <span className="text-purple-600 font-medium">{partner.sharedInterests?.length || 2}</span> 个共同兴趣：
        {partner.sharedInterests?.join('、')}。
        从这些话题开始，可能会很自然～
      </p>

      {/* 破冰话题 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <Lightbulb size={12} />
          <span>试试这些开场白：</span>
        </div>
        {icebreakers.slice(0, 3).map((topic, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTopic && onSelectTopic(topic)}
            className="w-full text-left p-3 bg-white rounded-xl text-sm text-text-primary hover:bg-purple-50 transition-colors flex items-center justify-between group"
          >
            <span>{topic}</span>
            <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}