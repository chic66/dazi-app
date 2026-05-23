import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageSquare, Calendar, Brain, Shield, ChevronRight, ChevronDown } from 'lucide-react'
import { agentPersonas, chatTopicsByRelationship, draftTemplates, meetupSuggestions, getMeetupSuggestions } from '../../data/agentData'

export default function ChatAgentPanel({
  isOpen,
  onClose,
  chat,
  agentConfig,
  onSelectTopic,
  onSelectDraft,
  onMeetupSuggestion,
  onPrivateChat,
  onInterpretMessage,
  onShowReminder
}) {
  const [activeTab, setActiveTab] = useState('topics')

  // 根据关系阶段获取推荐话题
  const getTopics = () => {
    const chemistry = chat?.chemistry || 0
    if (chemistry >= 600) return chatTopicsByRelationship.stable
    if (chemistry >= 300) return chatTopicsByRelationship.warming
    return chatTopicsByRelationship.new
  }

  // 获取约见建议
  const suggestions = chat?.partner?.interests
    ? getMeetupSuggestions(chat.partner.interests)
    : getMeetupSuggestions([])

  // 获取当前 Agent 风格
  const currentPersona = agentPersonas.find(p => p.id === agentConfig?.persona) || agentPersonas[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-purple-50 via-white to-blue-50 border-t border-border overflow-hidden"
        >
          <div className="p-4 space-y-4">
            {/* Agent Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentPersona.color} flex items-center justify-center`}>
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-text-primary">{agentConfig?.name || '小搭'}</span>
                  <span className="text-xs text-text-muted ml-2">{currentPersona.name}</span>
                </div>
              </div>
              <button onClick={onClose} className="p-1">
                <ChevronDown size={20} className="text-text-muted" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'topics', label: '推荐话题', icon: MessageSquare },
                { id: 'drafts', label: '消息草稿', icon: Sparkles },
                { id: 'meetup', label: '约见面', icon: Calendar },
                { id: 'understand', label: '理解TA', icon: Brain },
                { id: 'private', label: '私聊', icon: Shield }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all
                    ${activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }
                  `}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[120px]">
              {/* 推荐话题 */}
              {activeTab === 'topics' && (
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary mb-2">
                    根据你们的默契值，我推荐这些话题：
                  </p>
                  {getTopics().map((topic, idx) => (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectTopic(topic)}
                      className="w-full text-left p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm text-text-primary">{topic}</p>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 消息草稿 */}
              {activeTab === 'drafts' && (
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary mb-2">
                    选择一个语气，我来帮你生成消息：
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(draftTemplates).map(([tone, drafts]) => (
                      <motion.button
                        key={tone}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectDraft(drafts[0], tone)}
                        className="p-3 bg-white rounded-xl text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-text-muted mb-1 inline-block">
                          {tone === 'casual' ? '轻松' : tone === 'caring' ? '温柔' : tone === 'active' ? '主动' : '幽默'}
                        </span>
                        <p className="text-sm text-text-primary line-clamp-2">{drafts[0]}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* 约见面 */}
              {activeTab === 'meetup' && (
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary mb-2">
                    基于你们的共同兴趣，我建议：
                  </p>
                  {suggestions.map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onMeetupSuggestion(suggestion)}
                      className="w-full text-left p-3 bg-gradient-to-r from-secondary-light to-white rounded-xl hover:from-secondary hover:to-teal-200 transition-colors group"
                    >
                      <p className="text-sm text-text-primary group-hover:text-text-primary">
                        {suggestion}
                      </p>
                      <span className="text-xs text-secondary mt-1 inline-block">
                        点击自动填充邀约
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 理解TA */}
              {activeTab === 'understand' && (
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary mb-2">
                    点击聊天中的任意消息，我可以帮你分析对方的情绪和意图
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onInterpretMessage}
                    className="w-full p-3 bg-white rounded-xl flex items-center gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <Brain size={20} className="text-purple-500" />
                    <div>
                      <p className="text-sm text-text-primary">帮我理解 TA 的消息</p>
                      <p className="text-xs text-text-muted">选择一条消息获取分析</p>
                    </div>
                  </motion.button>
                </div>
              )}

              {/* 私聊 Agent */}
              {activeTab === 'private' && (
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary mb-2">
                    这里只有你能看到，可以倾诉困惑或寻求建议
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onPrivateChat}
                    className="w-full p-3 bg-white rounded-xl flex items-center gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <Shield size={20} className="text-green-500" />
                    <div>
                      <p className="text-sm text-text-primary">私下问小搭</p>
                      <p className="text-xs text-text-muted">私密对话，只有你能看到</p>
                    </div>
                  </motion.button>
                </div>
              )}
            </div>

            {/* 沉默提醒 */}
            {onShowReminder && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onShowReminder}
                className="w-full p-3 bg-amber-50 rounded-xl text-left border border-amber-200"
              >
                <p className="text-sm text-amber-700">
                  💡 你们已经很久没聊天了，要不要主动联系一下？
                </p>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}