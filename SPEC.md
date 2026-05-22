# 搭子 APP MVP Demo 规格文档

## 1. 概念与愿景

「搭子」是一款温暖、有成长感的移动社交 APP，帮助用户基于共同兴趣和目标找到志同道合的伙伴。整体风格年轻、轻松、有温度，避免传统 Dating App 的过度暧昧化。我们希望用户在「搭子」中感受到的不是"刷人"的焦虑，而是"找伙伴"的期待和"共成长"的温暖。

## 2. 设计语言

### 美学方向
温暖成长系 — 柔和的渐变背景、圆润的卡片、舒适的颜色搭配，让人联想到阳光、成长、陪伴。避免过于粉嫩或过于冷淡的色调。

### 配色方案
```css
--primary: #FF6B6B;        /* 珊瑚红 - 主操作色，温暖但不张扬 */
--primary-light: #FFE8E8;   /* 浅珊瑚 - 卡片背景 */
--secondary: #4ECDC4;      /* 青绿色 - 成长、活力 */
--secondary-light: #E8F8F7; /* 浅青绿 */
--accent: #FFE66D;         /* 暖黄色 - 高亮、默契值 */
--accent-light: #FFF9E6;   /* 浅黄色 */
--background: #FFFBF7;      /* 暖白 - 主背景 */
--surface: #FFFFFF;         /* 纯白 - 卡片表面 */
--text-primary: #2D3436;    /* 深灰 - 主文字 */
--text-secondary: #636E72;  /* 中灰 - 次要文字 */
--text-muted: #B2BEC3;      /* 浅灰 - 占位文字 */
--border: #F0F0F0;          /* 边框色 */
--success: #00B894;         /* 成功绿 */
--shadow: rgba(45, 52, 54, 0.08); /* 柔和阴影 */
```

### 字体
- 主字体: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif
- 标题: 500-600 weight, 1.2 line-height
- 正文: 400 weight, 1.5 line-height

### 间距系统
- 基础单位: 4px
- 页面内边距: 16px (移动端)
- 卡片间距: 12px
- 组件内间距: 8px/12px/16px
- 底部安全区: 84px (包含底部导航)

### 动效哲学
- 入场: fade-in + translateY(10px), 300ms ease-out
- 页面切换: slide 300ms ease-in-out
- 按钮反馈: scale(0.97) 100ms
- 卡片悬停: translateY(-2px) + shadow 加深
- 弹窗: scale(0.9→1) + fade, 250ms spring
- 点赞: scale(1.3) + particle burst effect

### 视觉资源
- 图标: Lucide React (stroke-width: 2, 圆润风格)
- 头像: 圆形，4px 白色边框，柔和阴影
- 图片: 圆角 12px，懒加载占位
- 标签: pill 形状，背景渐变，文字 12px

## 3. 布局与结构

### 整体架构
```
┌─────────────────────────┐
│      Status Bar         │
├─────────────────────────┤
│                         │
│                         │
│      Content Area       │
│      (Scrollable)       │
│                         │
│                         │
├─────────────────────────┤
│      Bottom Tab Bar     │
│         (56px)          │
└─────────────────────────┘
```

### 底部导航 (5 tabs)
1. **首页** - Home icon - 兴趣内容流
2. **搭子** - Users icon - Match 发现
3. **圈子** - Grid icon - 兴趣社群
4. **消息** - Message icon - 聊天列表
5. **我的** - User icon - 个人主页

### 页面结构

#### 首页 (Home)
- 顶部: 固定 logo + 搜索入口
- 内容: 垂直滚动卡片流
- 卡片内: 头像/昵称/标签/图片/文案/互动栏

#### 搭子 (Match)
- 三个子 Tab: 发现 / 我的搭子 / 关系成长
- 发现: 堆叠卡片，中心大图，左右滑动
- 我的搭子: 列表视图
- 关系成长: 时间轴卡片

#### 圈子 (Circle)
- 搜索栏
- 分类横滑
- 我的圈子列表
- 活动卡片列表

#### 消息 (Message)
- 聊天列表
- 聊天详情 + Agent 侧边栏

#### 我的 (Profile)
- 头部统计
- 功能入口列表
- 编辑资料表单

## 4. 功能与交互

### 首页内容流
**卡片结构:**
- 用户信息栏: 圆形头像(48px) + 昵称 + 兴趣标签
- 内容区: 图片/视频占位 (16:9 或 1:1)
- 文案区: 用户发布的文字内容
- 目标区: 当前目标展示
- 互动栏: 点赞/评论/收藏/分享 + "想一起"按钮

**交互:**
- 点击头像: 跳转用户主页(占位)
- 点击图片: 全屏预览(占位)
- 点赞: 心形动画 + 数字+1
- 点击"想一起": 弹出邀请弹窗

**邀请弹窗:**
- 选择兴趣/目标发起搭子邀请
- 可选: 学习、健身、跳舞、语言等
- 确认后显示 toast 提示

### 搭子发现
**卡片结构:**
- 大图区: 用户主照片 (占满宽度，高度 60vh)
- 信息叠加: 昵称、年龄、距离
- 标签区: 共同兴趣、当前目标、可提供价值
- Agent 推荐理由: 斜体引用样式

**交互:**
- 左滑/点✕: 下一张卡片，带旋转动画
- 右滑/点♥: 如果命中匹配，弹出 Match 成功弹窗
- 查看详情: 跳转用户主页(占位)

**Match 成功弹窗:**
- 双方头像合并动画
- "匹配成功！"标题
- Agent 破冰建议
- 3 条可发送消息按钮
- "开始聊天"主按钮
- 关闭按钮

### 搭子列表
**列表项:**
- 圆形头像 + 在线状态点
- 昵称 + 最后互动时间
- 最近消息预览
- 默契值进度条
- 共同目标标签

**交互:**
- 点击进入关系详情页
- 长按快捷操作(占位)

### 关系成长
**关系卡片:**
- 搭子队名(可编辑)
- 双方头像
- 默契值大数字
- 附近排名百分比
- 关系阶段标签
- 时间轴入口
- 最近记忆缩略图

**共同记忆时间轴:**
- 竖向时间轴
- 记忆卡片: 日期 + 内容 + 图片
- "记录一下今天"按钮

### 圈子页
**兴趣分类:**
- 横向滚动 pill 标签
- 分类: 全部/健身/跳舞/学习/语言/桌游/户外等

**圈子卡片:**
- 圈子封面图
- 圈子名称 + 成员数
- 近期动态预览

**活动卡片:**
- 活动名称
- 类型标签 + 时间
- 地点 + 报名人数
- 发起人信息
- "报名"按钮

**报名交互:**
- 点击"报名": 按钮变为"已报名"
- 显示成功 toast
- 按钮变为禁用态

### 消息列表
**聊天项:**
- 圆形头像 + 未读数角标
- 昵称 + 时间
- 最后消息预览
- 默契值小标签

### 聊天详情页
**顶部:**
- 对方头像 + 昵称
- 默契值 + 共同兴趣

**消息区:**
- 对方消息: 左侧气泡，浅灰背景
- 我的消息: 右侧气泡，珊瑚红背景
- 系统消息: 居中灰色小字
- 邀约卡片: 特殊样式卡片

**Agent 建议面板 (可展开/收起):**
- 收起态: 显示"让 Agent 帮我说"按钮
- 展开态:
  - 温暖解读: 当前对话氛围分析
  - 推荐话题: 3 条可点击
  - 消息草稿: 3 条，点击填充输入框
  - 约见建议: 1 条特殊样式

**底部输入区:**
- 输入框(圆角)
- 发送按钮
- "约见面"按钮
- "Agent"快捷按钮

**约见面弹窗:**
- 活动类型选择
- 日期时间选择
- 地点输入
- 备注输入
- 发送邀约按钮

**发送后:**
- 聊天区生成邀约卡片
- 卡片显示: 时间/地点/活动/状态(待确认/已接受)

### 我的页面
**头部:**
- 头像 + 昵称 + 编辑入口
- 统计数据: 搭子数/默契值/成长值

**功能入口:**
- 编辑资料
- 我的兴趣
- 我的目标
- 我的特长
- 我的 Agent
- 关系状态设置
- 隐私与安全

**编辑资料页:**
- 头像上传区
- 昵称输入
- 性别选择
- 城市选择
- 自我介绍(多行)
- 兴趣标签(多选)
- 当前目标
- 可提供价值
- 保存按钮

## 5. 组件清单

### 基础组件
| 组件 | 状态 |
|------|------|
| Button | default/hover/active/disabled/loading |
| Avatar | sm(32px)/md(48px)/lg(64px)/xl(80px) + online dot |
| Card | default/shadow/elevated |
| Badge | primary/secondary/success |
| Tag/Pill | solid/gradient/outlined |
| Input | default/focus/error/disabled |
| Toast | success/error/info |
| Modal | centered, backdrop blur |
| BottomSheet | slide up, drag handle |
| Tab | underline/pill styles |
| ProgressBar | linear + percentage |
| Skeleton | 脉冲动画占位 |

### 业务组件
- ContentCard (首页卡片)
- MatchCard (搭子卡片)
- ChatBubble (消息气泡)
- AgentPanel (Agent 建议面板)
- MemoryTimeline (记忆时间轴)
- ActivityCard (活动卡片)
- CircleCard (圈子卡片)
- ProfileStats (个人统计)
- InviteModal (邀请弹窗)
- MatchSuccessModal (匹配成功弹窗)
- MeetupCard (邀约卡片)
- RecordModal (记录弹窗)

## 6. 技术方案

### 技术栈
- **框架**: React 18 + Vite
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **动画**: Framer Motion
- **路由**: 状态管理(简单 SPA，无路由库)
- **状态**: React useState/useContext

### 项目结构
```
src/
├── components/
│   ├── ui/           # 基础组件
│   ├── home/         # 首页相关
│   ├── match/        # 搭子相关
│   ├── circle/       # 圈子相关
│   ├── message/      # 消息相关
│   └── profile/      # 我的相关
├── hooks/            # 自定义 hooks
├── context/          # React Context
├── data/             # Mock data
├── styles/           # 全局样式
├── App.jsx
└── main.jsx
```

### Mock Data 结构
```javascript
// 用户数据
const currentUser = {
  id: 'u001',
  name: '小林',
  avatar: '...',
  interests: ['健身', 'AI编程', '摄影'],
  goals: ['坚持健身100天', '学完AI课程'],
  skills: ['健身指导', '摄影'],
  city: '上海',
  stats: { partners: 8, chemistry: 1280, growth: 520 }
}

// 内容卡片数据
const contentCards = [
  {
    id: 'c001',
    user: { id, name, avatar, interests },
    images: ['...'],
    text: '文案内容...',
    goal: '当前目标',
    likes: 128,
    comments: 23,
    likes: 45
  }
]

// 搭子卡片数据
const matchCards = [
  {
    id: 'm001',
    user: { id, name, avatar, age, distance },
    sharedInterests: ['健身', '摄影'],
    goal: '想坚持健身',
    canOffer: '健身指导',
    agentReason: '你们都有健身习惯...'
  }
]

// 聊天消息数据
const messages = [
  { id: 'msg001', from: 'them', text: '你好呀~' },
  { id: 'msg002', from: 'me', text: '嗨，你好！' }
]

// Agent 建议数据
const agentSuggestions = {
  warmthAnalysis: '对话氛围很好...',
  topics: ['聊聊最近的健身计划', '约一次线下健身'],
  drafts: [
    { text: '今天练得怎么样？', style: 'casual' },
    { text: '最近看到一个新的健身方法，想试试吗？', style: 'caring' }
  ],
  meetupSuggestion: '你们可以约一次健身房见面'
}
```

### 响应式策略
- 设计基准: 375px (iPhone SE/8)
- 最大宽度: 430px (iPhone Pro Max)
- 使用 vw 单位做容器宽度
- 固定底部导航 56px
- 安全区域: env(safe-area-inset-bottom)
