import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Bell, Palette, HelpCircle, Info, LogOut, X } from 'lucide-react'

const SETTING_ITEMS = [
  { id: 'account', icon: User, label: '账号与绑定' },
  { id: 'notification', icon: Bell, label: '通知设置' },
  { id: 'appearance', icon: Palette, label: '外观设置' },
  { id: 'help', icon: HelpCircle, label: '帮助与反馈' },
  { id: 'about', icon: Info, label: '关于我们' },
]

export default function SettingsList({ onLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-5 shadow-sm mb-8"
      >
        <h3 className="font-bold text-text-primary mb-4">系统设置</h3>

        <div className="space-y-1">
          {SETTING_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-text-muted" />
                  <span className="text-sm text-text-primary">{item.label}</span>
                </div>
                <span className="text-text-muted">&gt;</span>
              </button>
            )
          })}
        </div>

        {/* 退出登录 */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-colors mt-4 border-t border-gray-100 pt-4"
        >
          <div className="flex items-center gap-3">
            <LogOut size={18} className="text-red-500" />
            <span className="text-sm text-red-500">退出登录</span>
          </div>
        </button>
      </motion.div>

      {/* 退出登录确认弹窗 */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text-primary">退出登录</h3>
                <button onClick={() => setShowLogoutConfirm(false)}>
                  <X size={24} className="text-text-secondary" />
                </button>
              </div>

              <p className="text-text-secondary mb-6">确定要退出当前账号吗？</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 bg-gray-100 rounded-xl text-sm font-medium text-text-primary"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false)
                    onLogout()
                  }}
                  className="flex-1 py-3 bg-red-500 rounded-xl text-sm font-medium text-white"
                >
                  退出登录
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}