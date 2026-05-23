import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, RefreshCw } from 'lucide-react'
import { draftTemplates, agentPersonas } from '../../data/agentData'

const toneConfig = {
  casual: { label: '轻松随意', emoji: '😊', color: 'bg-blue-100 text-blue-700' },
  caring: { label: '温柔关心', emoji: '🤗', color: 'bg-pink-100 text-pink-700' },
  active: { label: '主动友好', emoji: '🚀', color: 'bg-green-100 text-green-700' },
  humorous: { label: '幽默活泼', emoji: '😄', color: 'bg-purple-100 text-purple-700' }
}

export default function AgentDraftGeneratorModal({ isOpen, onClose, onSelectDraft, agentConfig }) {
  const [intent, setIntent] = useState('')
  const [drafts, setDrafts] = useState([])
  const [selectedTone, setSelectedTone] = useState('casual')

  // 生成 mock 草稿
  const generateDrafts = () => {
    if (!intent.trim()) return

    const mockDrafts = [
      { id: 1, tone: 'casual', text: `嘿，其实我最近在想...${intent}` },
      { id: 2, tone: 'caring', text: `不知道你最近怎么样，其实我想说...${intent}` },
      { id: 3, tone: 'active', text: `要不我们...${intent}` }
    ]
    setDrafts(mockDrafts)
  }

  // 获取当前 Agent 风格
  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  const handleSelectDraft = (draft) => {
    onSelectDraft(draft.text)
    onClose()
  }

  const handleRefresh = () => {
    generateDrafts()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentPersona.emoji}</span>
              <h3 className="text-xl font-bold text-text-primary">让小搭帮我说</h3>
            </div>
            <button onClick={onClose}>
              <X size={24} className="text-text-secondary" />
            </button>
          </div>

          {/* 输入意图 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              你想表达什么？
            </label>
            <textarea
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="例如：我想约她周末一起健身，但不要太唐突..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
            />
          </div>

          {/* 语气选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              选择语气
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(toneConfig).map(([tone, config]) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedTone === tone
                      ? `${config.color}`
                      : 'bg-gray-100 text-text-secondary'
                    }
                  `}
                >
                  {config.emoji} {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* 生成按钮 */}
          <button
            onClick={generateDrafts}
            disabled={!intent.trim()}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium disabled:opacity-50 mb-4"
          >
            生成草稿
          </button>

          {/* 生成的草稿 */}
          {drafts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-text-primary">生成的草稿</p>
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                >
                  <RefreshCw size={14} />
                  换一批
                </button>
              </div>

              {drafts.map((draft) => {
                const config = toneConfig[draft.tone]
                return (
                  <motion.button
                    key={draft.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectDraft(draft)}
                    className="w-full p-4 bg-white rounded-xl border border-gray-100 text-left hover:border-purple-200 hover:bg-purple-50 transition-colors"
                  >
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.color} mb-2 inline-block`}>
                      {config.emoji} {config.label}
                    </span>
                    <p className="text-sm text-text-primary">{draft.text}</p>
                  </motion.button>
                )
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}