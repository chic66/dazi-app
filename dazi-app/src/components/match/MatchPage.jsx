import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { matchCards as initialCards, relationships, chatList } from '../../data/mockData'
import { Tabs } from '../ui'
import MatchCard from './MatchCard'
import MatchSuccessModal from './MatchSuccessModal'
import RelationshipCard from './RelationshipCard'
import { toast } from '../ui'

const tabs = [
  { id: 'my', label: '我的搭子' },
  { id: 'discover', label: 'Agent 推荐搭子' }
]

export default function MatchPage({ onNavigateToChat }) {
  const [activeTab, setActiveTab] = useState('my')
  const [cards, setCards] = useState(initialCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [matchedCard, setMatchedCard] = useState(null)
  const [showEmpty, setShowEmpty] = useState(false)

  const handleDislike = () => {
    if (currentIndex < cards.length - 1) {
      toast('已跳过')
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowEmpty(true)
    }
  }

  const handleLike = () => {
    const card = cards[currentIndex]
    if (card?.willMatch) {
      setMatchedCard(card)
      setShowMatchModal(true)
    } else if (currentIndex < cards.length - 1) {
      toast('已加入感兴趣列表')
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowEmpty(true)
    }
  }

  const handleViewDetails = () => {
    toast('查看详情')
  }

  const handleStartChat = () => {
    setShowMatchModal(false)
    onNavigateToChat?.()
  }

  const handleChatClick = (relationship) => {
    const chatPartner = relationship.buddyUserId
    const chat = chatList.find(c => c.partner.id === chatPartner)
    if (chat) {
      onNavigateToChat?.(chat)
    } else {
      toast('聊天功能即将可用')
    }
  }

  const handleRelationshipClick = (relationship) => {
    toast(`进入 ${relationship.teamName} 详情页`)
  }

  // 重置推荐列表
  const handleResetCards = () => {
    setCurrentIndex(0)
    setShowEmpty(false)
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

      <div className="pb-24">
        {/* 我的搭子 */}
        {activeTab === 'my' && (
          <div className="p-4">
            {/* 引导文案 */}
            <div className="mb-4 text-center">
              <p className="text-sm text-text-muted">你的关系正在这里慢慢长出来</p>
            </div>

            <div className="space-y-4">
              {relationships.map((rel) => (
                <RelationshipCard
                  key={rel.id}
                  relationship={rel}
                  onClick={() => handleRelationshipClick(rel)}
                  onChatClick={handleChatClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Agent 推荐搭子 */}
        {activeTab === 'discover' && (
          <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
            {!showEmpty && currentIndex < cards.length ? (
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
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-5xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  暂时没有更多推荐了
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  稍后再来看看，或者告诉我们在找什么样的搭子
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetCards}
                  className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium"
                >
                  重新看看
                </motion.button>
              </div>
            )}
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