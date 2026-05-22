import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus } from 'lucide-react'
import { circles, activities, interestCategories } from '../../data/mockData'
import CircleCard from './CircleCard'
import ActivityCard from './ActivityCard'
import { Tag } from '../ui'

export default function CirclePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-4 safe-top">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-text-primary">圈子</h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
            >
              <Plus size={20} className="text-white" />
            </motion.button>
          </div>

          {/* 搜索栏 */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="搜索圈子或活动..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          {/* 分类 */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {interestCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-secondary hover:bg-gray-50'
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-6">
        {/* 我的圈子 */}
        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">我的圈子</h2>
          <div className="grid grid-cols-2 gap-3">
            {circles.slice(0, 2).map((circle) => (
              <CircleCard key={circle.id} circle={circle} />
            ))}
          </div>
        </section>

        {/* 推荐圈子 */}
        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">推荐圈子</h2>
          <div className="grid grid-cols-2 gap-3">
            {circles.slice(2).map((circle) => (
              <CircleCard key={circle.id} circle={circle} />
            ))}
          </div>
        </section>

        {/* 附近活动 */}
        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">附近活动</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
