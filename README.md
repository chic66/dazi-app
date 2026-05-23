# 搭子 App

温暖、有成长感的移动社交 Demo，帮助用户基于共同兴趣和目标找到志同道合的伙伴。

![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss)

## 在线预览

**GitHub Pages:** https://chic66.github.io/dazi-app

**本地开发:**
```bash
cd dazi-app
npm install
npm run dev
```

访问 `http://localhost:5173/`

## 功能模块

| 模块 | 说明 |
|------|------|
| 首页 | 兴趣内容流卡片，支持点赞、评论、收藏 |
| 搭子 | 滑动匹配、搭子列表、关系成长 |
| 圈子 | 兴趣社群、活动列表 |
| 消息 | 聊天列表 + Agent 辅助面板 |
| 我的 | 个人中心、Agent 设置、关系偏好、隐私设置 |

## 项目结构

```
dazi-app/
├── src/
│   ├── components/
│   │   ├── ui/          # 基础组件 (Button, Avatar, Toast...)
│   │   ├── home/        # 首页组件
│   │   ├── match/       # 搭子组件
│   │   ├── circle/      # 圈子组件
│   │   ├── message/     # 消息组件
│   │   └── profile/     # 我的组件
│   ├── data/
│   │   └── mockData.js  # Mock 数据
│   └── styles/
│       └── index.css    # 全局样式
├── index.html
├── vite.config.js
└── tailwind.config.js
```

## 技术栈

- **框架:** React 18 + Vite 5
- **样式:** Tailwind CSS 3.3
- **动画:** Framer Motion 10
- **图标:** Lucide React

## 设计风格

温暖成长系 — 柔和的渐变背景、圆润的卡片、舒适的颜色搭配。

- 主色: `#FF6B6B` (珊瑚红)
- 副色: `#4ECDC4` (青绿色)
- 背景: `#FFFBF7` (暖白)

## 开发记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-05-22 | v1.0 | 项目初始化，基础页面结构 |
| 2026-05-23 | v1.1 | 新增「我的」页面，Agent 辅助，关系偏好设置 |

## 许可证

MIT