import { motion } from 'framer-motion'
import { Calendar, MapPin, Sparkles } from 'lucide-react'
import { getMeetupSuggestions, safetyTips, agentPersonas } from '../../data/agentData'

export default function AgentMeetupSuggestionCard({ sharedInterests, onSelectSuggestion }) {
  const suggestions = sharedInterests
    ? getMeetupSuggestions(sharedInterests)
    : getMeetupSuggestions(['默认'])

  const currentPersona = agentPersonas[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-secondary-light to-teal-50 rounded-2xl p-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-teal-400 flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="font-semibold text-text-primary">约见建议</span>
      </div>

      {/* 建议活动 */}
      <div className="space-y-2 mb-3">
        {suggestions.map((suggestion, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectSuggestion && onSelectSuggestion(suggestion)}
            className="w-full text-left p-3 bg-white rounded-xl hover:from-secondary hover:to-teal-200 transition-colors group"
          >
            <div className="flex items-start gap-2">
              <Calendar size={16} className="text-secondary mt-0.5" />
              <p className="text-sm text-text-primary">{suggestion}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 安全提示 */}
      <div className="bg-white/60 rounded-xl p-3">
        <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
          <MapPin size={12} />
          <span className="font-medium">见面安全提醒</span>
        </div>
        <ul className="space-y-0.5">
          {safetyTips.slice(0, 2).map((tip, idx) => (
            <li key={idx} className="text-xs text-text-muted flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-green-400" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}