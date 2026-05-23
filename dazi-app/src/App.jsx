import React, { useState, useEffect } from 'react'
import HomePage from './components/home/HomePage'
import MatchPage from './components/match/MatchPage'
import MessagePage from './components/message/MessagePage'
import CirclePage from './components/circle/CirclePage'
import MyPage from './components/profile/MyPage'
import { Toast, registerToast } from './components/ui'

const App = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [toastMessage, setToastMessage] = useState(null)

  // 注册 toast 回调
  registerToast((message) => setToastMessage(message))

  // Toast 自动消失
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'match':
        return <MatchPage />
      case 'message':
        return <MessagePage />
      case 'circle':
        return <CirclePage />
      case 'profile':
        return <MyPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-2 flex justify-around items-center z-50 safe-bottom">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === 'home' ? 'text-primary' : 'text-text-muted'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs">首页</span>
        </button>
        <button
          onClick={() => setActiveTab('match')}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === 'match' ? 'text-primary' : 'text-text-muted'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs">搭子</span>
        </button>
        <button
          onClick={() => setActiveTab('circle')}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === 'circle' ? 'text-primary' : 'text-text-muted'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xs">圈子</span>
        </button>
        <button
          onClick={() => setActiveTab('message')}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === 'message' ? 'text-primary' : 'text-text-muted'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs">消息</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === 'profile' ? 'text-primary' : 'text-text-muted'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs">我的</span>
        </button>
      </nav>
      {/* Toast */}
      {toastMessage && (
        <Toast
          isVisible={true}
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  )
}

export default App