import { motion } from 'framer-motion'
import { Sparkles, MessageSquare, Calendar, ChevronRight, Lightbulb } from 'lucide-react'
import { Avatar } from '../ui'

export default function AgentPanel({ suggestions, isOpen, onClose, onSelectDraft, onMeetupSuggestion }) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-gradient-to-br from-accent-light to-white border-t border-border"
    >
      <div className="p-4 space-y-4">
        {/* Agent 标题 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold text-text-primary">你的 AI 搭子助手</span>
          </div>
          <button onClick={onClose} className="text-text-muted">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 温暖解读 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={18} className="text-amber-500" />
            <span className="font-medium text-amber-600">对话氛围解读</span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {suggestions.warmthAnalysis}
          </p>
        </div>

        {/* 推荐话题 */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">推荐话题</h4>
          <div className="space-y-2">
            {suggestions.topics.map((topic, idx) => (
              <button
                key={idx}
                className="w-full text-left p-3 bg-white rounded-xl text-sm text-text-primary hover:bg-gray-50 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* 消息草稿 */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">可发送消息</h4>
          <div className="space-y-2">
            {suggestions.drafts.map((draft, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectDraft(draft.text)}
                className="w-full text-left p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-text-primary">{draft.text}</p>
                <span className="text-xs text-text-muted mt-1 inline-block">
                  风格：{draft.style === 'casual' ? '轻松随意' : draft.style === 'caring' ? '关心体贴' : '主动友好'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 约见建议 */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">约见面建议</h4>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onMeetupSuggestion}
            className="w-full p-4 bg-gradient-to-r from-secondary to-teal-400 rounded-xl text-white text-left"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={18} />
              <span className="font-medium">约 TA 见面</span>
            </div>
            <p className="text-sm text-white/80">{suggestions.meetupSuggestion}</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
