import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Users, MapPin, Lock, Check } from 'lucide-react'
import { Button } from '../ui'

const STATUS_OPTIONS = [
  { id: 'find_partner', label: '寻找搭子' },
  { id: 'find_friend', label: '寻找朋友' },
  { id: 'open_to_strangers', label: '开放认识新朋友' },
  { id: 'same_sex_only', label: '已有对象，仅找同性搭子' },
  { id: 'circles_only', label: '只参与圈子' },
  { id: 'pause', label: '暂停 Match' },
]

export default function RelationshipPreferenceSheet({ isOpen, preference, onUpdate, onClose }) {
  const [localPreference, setLocalPreference] = useState(preference)

  const handleSave = () => {
    onUpdate(localPreference)
    onClose()
  }

  const toggleTargetType = (type) => {
    setLocalPreference(prev => ({
      ...prev,
      targetTypes: prev.targetTypes.includes(type)
        ? prev.targetTypes.filter(t => t !== type)
        : [...prev.targetTypes, type]
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">关系偏好设置</h3>
              <button onClick={onClose}>
                <X size={24} className="text-text-secondary" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 关系状态 */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  <Heart size={14} className="inline mr-1" />
                  当前状态
                </label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setLocalPreference(prev => ({ ...prev, status: status.label }))}
                      className={`
                        px-3 py-2 rounded-full text-sm font-medium transition-all
                        ${localPreference.status === status.label
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-text-secondary'
                        }
                      `}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
                {localPreference.status === '已有对象，仅找同性搭子' && (
                  <p className="mt-3 text-sm text-text-muted bg-amber-50 rounded-xl p-3">
                    你仍然可以继续寻找同性搭子、参加圈子活动和维护已有关系。
                  </p>
                )}
                {localPreference.status === '暂停 Match' && (
                  <p className="mt-3 text-sm text-text-muted bg-amber-50 rounded-xl p-3">
                    你将不再进入推荐池，但仍可聊天、查看首页和参加圈子。
                  </p>
                )}
              </div>

              {/* 推荐对象范围 */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  <Users size={14} className="inline mr-1" />
                  推荐范围
                </label>
                <div className="flex flex-wrap gap-2">
                  {['同性搭子', '异性搭子'].map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleTargetType(type)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                        ${localPreference.targetTypes.includes(type)
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-text-secondary'
                        }
                      `}
                    >
                      {localPreference.targetTypes.includes(type) && <Check size={14} />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 距离范围 */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  <MapPin size={14} className="inline mr-1" />
                  距离范围
                </label>
                <div className="flex flex-wrap gap-2">
                  {['1km 内', '3km 内', '5km 内', '10km 内', '不限'].map((distance) => (
                    <button
                      key={distance}
                      onClick={() => setLocalPreference(prev => ({ ...prev, distance }))}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${localPreference.distance === distance
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-text-secondary'
                        }
                      `}
                    >
                      {distance}
                    </button>
                  ))}
                </div>
              </div>

              {/* 亲密关系 */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  <Lock size={14} className="inline mr-1" />
                  亲密关系
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <span className="text-sm text-text-secondary">是否允许亲密关系自然发展</span>
                  <button
                    onClick={() => setLocalPreference(prev => ({ ...prev, romanticOpen: !prev.romanticOpen }))}
                    className={`
                      w-12 h-7 rounded-full transition-all relative
                      ${localPreference.romanticOpen ? 'bg-secondary' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all
                        ${localPreference.romanticOpen ? 'left-6' : 'left-1'}
                      `}
                    />
                  </button>
                </div>
              </div>

              {/* Match 开关 */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-sm font-medium text-text-primary">开启 Match</p>
                  <p className="text-xs text-text-muted">关闭后不会收到新的搭子推荐</p>
                </div>
                <button
                  onClick={() => setLocalPreference(prev => ({ ...prev, matchEnabled: !prev.matchEnabled }))}
                  className={`
                    w-12 h-7 rounded-full transition-all relative
                    ${localPreference.matchEnabled ? 'bg-secondary' : 'bg-gray-300'}
                  `}
                >
                  <span
                    className={`
                      absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all
                      ${localPreference.matchEnabled ? 'left-6' : 'left-1'}
                    `}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSave} className="w-full" size="lg">
                保存设置
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}