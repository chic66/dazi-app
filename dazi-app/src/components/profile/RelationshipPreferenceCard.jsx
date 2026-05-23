import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, MapPin, Lock, ChevronRight } from 'lucide-react'
import RelationshipPreferenceSheet from './RelationshipPreferenceSheet'

export default function RelationshipPreferenceCard({ preference, onUpdate }) {
  const [showSheet, setShowSheet] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-5 shadow-sm mb-4"
      >
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <Heart size={18} className="text-primary" />
          关系偏好
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="px-2 py-0.5 bg-primary-light rounded-full text-primary">
                {preference.status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">推荐范围</span>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-text-muted" />
              <span className="text-text-secondary">{preference.targetTypes.join(' + ')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">距离范围</span>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-text-muted" />
              <span className="text-text-secondary">{preference.distance}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">亲密关系</span>
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-text-muted" />
              <span className="text-text-secondary">
                {preference.romanticOpen ? '可慢慢发展' : '暂不开放'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSheet(true)}
          className="w-full py-3 bg-gray-50 rounded-xl text-sm font-medium text-text-primary hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          调整偏好
          <ChevronRight size={16} />
        </button>
      </motion.div>

      <RelationshipPreferenceSheet
        isOpen={showSheet}
        preference={preference}
        onUpdate={onUpdate}
        onClose={() => setShowSheet(false)}
      />
    </>
  )
}