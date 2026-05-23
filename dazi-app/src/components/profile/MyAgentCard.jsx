import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Settings, RefreshCw, Check } from 'lucide-react'
import { Button } from '../ui'
import AgentStyleSheet from './AgentStyleSheet'

export default function MyAgentCard({ agent, currentStyle, onStyleChange, onSettings }) {
  const [showStyleSheet, setShowStyleSheet] = useState(false)

  const currentStyleInfo = {
    gentle: '温柔鼓励型',
    direct: '直接建议型',
    humor: '幽默活泼型',
    rational: '理性分析型',
    romantic: '高情商恋爱军师型',
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl p-5 shadow-sm mb-4"
      >
        {/* 标题 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">我的 Agent</h3>
            <p className="text-xs text-text-muted">你的专属关系助手</p>
          </div>
        </div>

        {/* Agent 信息 */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <p className="font-semibold text-text-primary">{agent.name}</p>
              <p className="text-sm text-text-secondary">风格：{currentStyleInfo[currentStyle]}</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {agent.name}会在你需要时帮你破冰、整理表达、提醒重要节点。
          </p>

          {/* 设置状态 */}
          <div className="flex flex-wrap gap-2">
            {agent.enabledPermissions.map((permission, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-50 rounded-full text-xs text-text-secondary flex items-center gap-1"
              >
                <Check size={12} className="text-green-500" />
                {permission}
              </span>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onSettings}
          >
            <Settings size={16} className="mr-2" />
            设置 Agent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => setShowStyleSheet(true)}
          >
            <RefreshCw size={16} className="mr-2" />
            切换风格
          </Button>
        </div>
      </motion.div>

      <AgentStyleSheet
        isOpen={showStyleSheet}
        currentStyle={currentStyle}
        onSelect={onStyleChange}
        onClose={() => setShowStyleSheet(false)}
      />
    </>
  )
}