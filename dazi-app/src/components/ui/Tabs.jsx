import { motion } from 'framer-motion'

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            relative flex-1 py-2 px-3 text-sm font-medium rounded-full transition-all duration-200
            ${activeTab === tab.id ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
          `}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default Tabs
