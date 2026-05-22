import { motion } from 'framer-motion'
import { Search, MapPin, Users } from 'lucide-react'
import { Avatar } from '../ui'

export default function CircleCard({ circle, onClick }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md"
    >
      <div className="relative h-32">
        <img
          src={circle.cover}
          alt={circle.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <Users size={16} className="text-white" />
          <span className="text-white text-sm">{circle.members} 人</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-text-primary mb-1">{circle.name}</h3>
        <p className="text-sm text-text-secondary line-clamp-1">{circle.recentActivity}</p>
      </div>
    </motion.div>
  )
}
