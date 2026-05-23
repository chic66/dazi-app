import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sparkles, Bell, Shield, ChevronRight, Check } from 'lucide-react'
import { agentPersonas, reminderLevels, agentPermissions, defaultAgentConfig } from '../../data/agentData'

export default function MyAgentSettingsPage({ isOpen, onClose, agentConfig, onUpdate }) {
  const [localConfig, setLocalConfig] = useState(agentConfig || defaultAgentConfig)
  const [showPersonaSheet, setShowPersonaSheet] = useState(false)
  const [showReminderSheet, setShowReminderSheet] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    onUpdate(localConfig)
    onClose()
  }

  const togglePermission = (permissionId) => {
    setLocalConfig(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const currentPersona = agentPersonas.find(p => p.id === localConfig.persona) || agentPersonas[0]
  const currentReminder = reminderLevels.find(r => r.id === localConfig.reminderLevel) || reminderLevels[2]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="absolute right-0 top-0 bottom-0 left-0 bg-background"
      >
        {/* Header */}
        <div className="bg-white border-b border-border px-4 py-3 safe-top">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-text-primary" />
            </button>
            <h2 className="text-lg font-bold text-text-primary">我的 Agent</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 pb-32">
          {/* Agent 名称 */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Agent 名称
            </label>
            <input
              type="text"
              value={localConfig.name}
              onChange={(e) => setLocalConfig(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="给你的 Agent 起个名字"
            />
          </div>

          {/* Agent 风格 */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-sm font-medium text-text-primary mb-3">
              <Sparkles size={16} className="inline mr-1" />
              Agent 风格
            </label>
            <button
              onClick={() => setShowPersonaSheet(true)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentPersona.emoji}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-text-primary">{currentPersona.name}</p>
                  <p className="text-xs text-text-muted">{currentPersona.description}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-text-muted" />
            </button>
          </div>

          {/* 提醒频率 */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-sm font-medium text-text-primary mb-3">
              <Bell size={16} className="inline mr-1" />
              提醒频率
            </label>
            <button
              onClick={() => setShowReminderSheet(true)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-left">
                <p className="text-sm font-medium text-text-primary">{currentReminder.name}</p>
                <p className="text-xs text-text-muted">{currentReminder.description}</p>
              </div>
              <ChevronRight size={20} className="text-text-muted" />
            </button>
          </div>

          {/* 权限设置 */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-sm font-medium text-text-primary mb-3">
              <Shield size={16} className="inline mr-1" />
              Agent 权限
            </label>
            <div className="space-y-3">
              {agentPermissions.map(permission => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">{permission.name}</p>
                    <p className="text-xs text-text-muted">{permission.description}</p>
                  </div>
                  <button
                    onClick={() => togglePermission(permission.id)}
                    className={`
                      w-12 h-7 rounded-full transition-all relative
                      ${localConfig.permissions.includes(permission.id)
                        ? 'bg-purple-500'
                        : 'bg-gray-300'
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all
                        ${localConfig.permissions.includes(permission.id) ? 'left-6' : 'left-1'}
                      `}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border safe-bottom">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium"
          >
            保存设置
          </button>
        </div>

        {/* Persona Sheet */}
        <AnimatePresence>
          {showPersonaSheet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setShowPersonaSheet(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-auto"
              >
                <h3 className="text-lg font-bold text-text-primary mb-4">选择 Agent 风格</h3>
                <div className="space-y-3">
                  {agentPersonas.map(persona => (
                    <motion.button
                      key={persona.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setLocalConfig(prev => ({ ...prev, persona: persona.id }))
                        setShowPersonaSheet(false)
                      }}
                      className={`
                        w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all
                        ${localConfig.persona === persona.id
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300'
                          : 'bg-gray-50 border-2 border-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{persona.emoji}</span>
                        <div>
                          <p className="font-medium text-text-primary">{persona.name}</p>
                          <p className="text-sm text-text-muted">{persona.description}</p>
                        </div>
                      </div>
                      {localConfig.persona === persona.id && (
                        <Check size={20} className="text-purple-500" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reminder Sheet */}
        <AnimatePresence>
          {showReminderSheet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setShowReminderSheet(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
              >
                <h3 className="text-lg font-bold text-text-primary mb-4">选择提醒频率</h3>
                <div className="space-y-3">
                  {reminderLevels.map(level => (
                    <motion.button
                      key={level.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setLocalConfig(prev => ({ ...prev, reminderLevel: level.id }))
                        setShowReminderSheet(false)
                      }}
                      className={`
                        w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all
                        ${localConfig.reminderLevel === level.id
                          ? 'bg-secondary-light border-2 border-secondary'
                          : 'bg-gray-50 border-2 border-transparent'
                        }
                      `}
                    >
                      <div>
                        <p className="font-medium text-text-primary">{level.name}</p>
                        <p className="text-sm text-text-muted">{level.description}</p>
                      </div>
                      {localConfig.reminderLevel === level.id && (
                        <Check size={20} className="text-secondary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}