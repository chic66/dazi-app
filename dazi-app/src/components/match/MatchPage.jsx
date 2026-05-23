import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { matchCards as initialCards } from '../../data/mockData'
import { Tabs } from '../ui'
import MatchCard from './MatchCard'
import MatchSuccessModal from './MatchSuccessModal'
import RelationshipCard from './RelationshipCard'
import { MessageSquare } from 'lucide-react'

const tabs = [
  { id: 'discover', label: '发现搭子' },
  { id: 'my', label: '我的搭子' }
]

export default function MatchPage({ onNavigateToChat }) {
  const [activeTab, setActiveTab] = useState('discover')
  const [cards, setCards] = useState(initialCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [matchedCard, setMatchedCard] = useState(null)

  // 获取我的搭子列表（从 mockData 中导入）
  const { relationships } = require('../../data/mockData')

  const handleDislike = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleLike = () => {
    const card = cards[currentIndex]
    if (card?.willMatch) {
      setMatchedCard(card)
      setShowMatchModal(true)
    } else if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleViewDetails = () => {
    console.log('查看详情')
  }

  const handleStartChat = () => {
    setShowMatchModal(false)
    onNavigateToChat?.()
  }

  const handleChatClick = (relationship) => {
    onNavigateToChat?.(relationship)
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-4 safe-top">
          <h1 className="text-xl font-bold text-text-primary mb-4">搭子</h1>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* 发现搭子 */}
        {activeTab === 'discover' && (
          <div className="relative h-[calc(100vh-180px)]">
            {currentIndex < cards.length ? (
              <AnimatePresence>
                <MatchCard
                  key={cards[currentIndex].id}
                  card={cards[currentIndex]}
                  onDislike={handleDislike}
                  onLike={handleLike}
                  onViewDetails={handleViewDetails}
                />
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-5xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  附近没有更多搭子了
                </h3>
                <p className="text-text-secondary">
                  稍后再来看看，或者扩大搜索范围
                </p>
              </div>
            )}
          </div>
        )}

        {/* 我的搭子 - 原"关系成长"页面 */}
        {activeTab === 'my' && (
          <div className="space-y-4">
            {relationships.map((rel) => (
              <RelationshipCard
                key={rel.id}
                relationship={rel}
                onClick={() => {}}
                onChatClick={handleChatClick}
              />
            ))}
          </div>
        )}
      </div>

      <MatchSuccessModal
        isOpen={showMatchModal}
        card={matchedCard}
        onClose={() => setShowMatchModal(false)}
        onStartChat={handleStartChat}
      />
    </div>
  )
}