import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Dumbbell, Brain, Camera, Globe, BookOpen, Coffee, Music } from 'lucide-react'
import { Button } from '../ui'

const interestIcons = {
  '健身': Dumbbell,
  'AI编程': Brain,
  '摄影': Camera,
  '语言': Globe,
  '读书': BookOpen,
  '咖啡': Coffee,
  '音乐': Music
}

const interestOptions = ['健身', 'AI编程', '摄影', '语言', '读书', '咖啡', '跳舞', '桌游', '户外']

export default function InviteModal({ isOpen, onClose, card, onInvite }) {
  const [selectedInterest, setSelectedInterest] = useState(null)
  const [isInviting, setIsInviting] = useState(false)

  const handleInvite = () => {
    if (!selectedInterest) return
    setIsInviting(true)
    setTimeout(() => {
      setIsInviting(false)
      onInvite(selectedInterest)
      onClose()
    }, 800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-0 max-w-md mx-auto bg-white rounded-t-3xl z-50"
          >
            {/* 拖动条 */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">发起搭子邀请</h2>
                <button onClick={onClose} className="p-2">
                  <X size={24} className="text-text-secondary" />
                </button>
              </div>

              {/* 选择兴趣/目标 */}
              <p className="text-text-secondary mb-4">选择你们可以一起做的事情：</p>

              <div className="grid grid-cols-3 gap-3">
                {interestOptions.map((interest) => {
                  const Icon = interestIcons[interest] || Users
                  const isSelected = selectedInterest === interest
                  return (
                    <motion.button
                      key={interest}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedInterest(interest)}
                      className={`
                        p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all
                        ${isSelected
                          ? 'border-primary bg-primary-light'
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                        }
                      `}
                    >
                      <Icon size={24} className={isSelected ? 'text-primary' : 'text-text-secondary'} />
                      <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                        {interest}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleInvite}
                  disabled={!selectedInterest}
                  loading={isInviting}
                  className="w-full"
                  size="lg"
                >
                  发送邀请
                </Button>
              </div>
            </div>

            <div className="h-safe-bottom bg-white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
