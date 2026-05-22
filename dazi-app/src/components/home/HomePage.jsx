import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contentCards as initialCards } from '../../data/mockData'
import HomeHeader from './HomeHeader'
import ContentCard from './ContentCard'
import InviteModal from './InviteModal'
import InviteSuccessToast from './InviteSuccessToast'

export default function HomePage() {
  const [cards, setCards] = useState(initialCards)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleWantTogether = (card) => {
    setSelectedCard(card)
    setInviteModalOpen(true)
  }

  const handleInvite = (interest) => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />

      <div className="px-4 py-4 pb-24">
        <AnimatePresence mode="popLayout">
          {cards.map((card) => (
            <ContentCard
              key={card.id}
              card={card}
              onWantTogether={handleWantTogether}
            />
          ))}
        </AnimatePresence>
      </div>

      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        card={selectedCard}
        onInvite={handleInvite}
      />

      <InviteSuccessToast isVisible={showSuccess} />
    </div>
  )
}
