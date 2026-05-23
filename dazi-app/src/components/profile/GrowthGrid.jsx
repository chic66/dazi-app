import { motion } from 'framer-motion'
import GrowthGridItem from './GrowthGridItem'

export default function GrowthGrid({ data, onItemClick }) {
  const items = [
    {
      type: 'interests',
      title: '我的兴趣栏目',
      count: data.interests.count,
      subtitle: `最近更新：${data.interests.latest}`,
      tags: data.interests.tags,
    },
    {
      type: 'goals',
      title: '我的目标',
      count: data.goals.activeCount,
      subtitle: `本周重点：${data.goals.focusGoal}`,
      progress: data.goals.progress,
    },
    {
      type: 'strengths',
      title: '我的特长',
      count: data.strengths.length,
      subtitle: data.strengths.slice(0, 2).join('、') + '...',
      tags: data.strengths,
    },
    {
      type: 'growth',
      title: '我的成长记录',
      count: data.growth.monthlyRecords,
      subtitle: `完成 ${data.growth.completedGoals} 个小目标`,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-4"
    >
      <h3 className="text-lg font-bold text-text-primary mb-3">我的成长</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <GrowthGridItem
            key={item.type}
            {...item}
            onClick={() => onItemClick(item.type)}
          />
        ))}
      </div>
    </motion.div>
  )
}