import { motion } from 'framer-motion'

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
}

export default function Avatar({ src, name, size = 'md', showOnline = false, isOnline = false }) {
  const sizeClass = sizes[size]

  return (
    <div className="relative inline-block">
      <div className={`${sizeClass} rounded-full overflow-hidden ring-2 ring-white shadow-md`}>
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      {showOnline && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            isOnline ? 'bg-success' : 'bg-text-muted'
          }`}
        />
      )}
    </div>
  )
}
