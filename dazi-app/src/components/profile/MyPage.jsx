import { useState } from 'react'
import { toast } from '../ui'
import ProfileIdentityCard from './ProfileIdentityCard'
import ProfileCompletionCard from './ProfileCompletionCard'
import GrowthGrid from './GrowthGrid'
import MyAgentCard from './MyAgentCard'
import RelationshipPreferenceCard from './RelationshipPreferenceCard'
import PrivacySafetyList from './PrivacySafetyList'
import SettingsList from './SettingsList'

// Mock 数据
const MOCK_USER = {
  id: 'u_self',
  name: 'Luna',
  age: 24,
  location: '上海 · 徐汇附近',
  bio: '想找一起学 AI、健身和探索城市的搭子',
  relationshipStatus: '开放认识新朋友',
  interests: ['AI 编程', '健身', '语言交换', '城市探索'],
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
}

const MOCK_COMPLETION = {
  percent: 76,
  missingItems: ['补充 1 个当前目标', '添加 2 张兴趣照片', '填写可提供价值'],
}

const MOCK_GROWTH = {
  interests: {
    count: 4,
    latest: 'AI 编程',
    tags: ['健身', 'AI 编程', '语言交换', '城市探索'],
  },
  goals: {
    activeCount: 3,
    focusGoal: '学会用 AI 做一个小 Demo',
    progress: 40,
  },
  strengths: ['可以教中文', '会基础 AI 编程', '可以一起健身', '熟悉上海好玩的地方'],
  growth: {
    monthlyRecords: 12,
    completedGoals: 2,
    latest: '完成一次 AI Demo 学习打卡',
  },
}

const MOCK_AGENT = {
  name: '小搭',
  style: 'gentle',
  enabledPermissions: ['推荐破冰话题', '提醒联系搭子', '整理共同记忆', '线下安全提醒'],
}

const MOCK_PREFERENCE = {
  status: '开放认识新朋友',
  targetTypes: ['同性搭子', '异性搭子'],
  distance: '5km 内',
  matchEnabled: true,
  romanticOpen: true,
}

export default function MyPage() {
  const [user] = useState(MOCK_USER)
  const [completion] = useState(MOCK_COMPLETION)
  const [growth] = useState(MOCK_GROWTH)
  const [agent, setAgent] = useState(MOCK_AGENT)
  const [preference, setPreference] = useState(MOCK_PREFERENCE)

  const handleToast = (message) => {
    toast(message)
  }

  const handleGrowthItemClick = (type) => {
    const messages = {
      interests: '进入兴趣栏目列表页',
      goals: '进入目标管理页',
      strengths: '进入特长编辑页',
      growth: '进入成长记录页',
    }
    handleToast(messages[type] || '点击了')
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F6F3' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#F8F6F3]/95 backdrop-blur-md border-b border-gray-100">
        <div className="p-4 safe-top">
          <h1 className="text-xl font-bold text-text-primary">我的</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32 space-y-4">
        {/* 1. 顶部个人身份卡片 */}
        <ProfileIdentityCard
          user={user}
          onEditProfile={() => handleToast('进入编辑资料页')}
          onViewProfile={() => handleToast('查看我的主页')}
        />

        {/* 2. 资料完整度卡片 */}
        <ProfileCompletionCard
          completion={completion}
          onComplete={() => handleToast('进入编辑资料页')}
        />

        {/* 3. 我的兴趣与目标模块 */}
        <GrowthGrid data={growth} onItemClick={handleGrowthItemClick} />

        {/* 4. 我的 Agent 模块 */}
        <MyAgentCard
          agent={agent}
          currentStyle={agent.style}
          onStyleChange={(style) => setAgent(prev => ({ ...prev, style }))}
          onSettings={() => handleToast('进入 Agent 设置页')}
        />

        {/* 5. 关系偏好模块 */}
        <RelationshipPreferenceCard
          preference={preference}
          onUpdate={setPreference}
        />

        {/* 6. 隐私与安全模块 */}
        <PrivacySafetyList onItemClick={(id) => handleToast(`进入${id}设置页`)} />

        {/* 7. 系统设置模块 */}
        <SettingsList onLogout={() => handleToast('已退出登录')} />
      </div>
    </div>
  )
}