// 当前用户
export const currentUser = {
  id: 'u001',
  name: '小林',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  age: 26,
  gender: '男',
  city: '上海',
  bio: '热爱健身和摄影，正在学习 AI 编程，希望能找到志同道合的伙伴一起成长~',
  interests: ['健身', 'AI编程', '摄影', '咖啡'],
  goals: ['坚持健身100天', '学完AI课程', '每月读两本书'],
  skills: ['健身指导', '摄影', '咖啡拉花'],
  stats: {
    partners: 8,
    chemistry: 1280,
    growth: 520
  }
}

// 首页内容卡片数据
export const contentCards = [
  {
    id: 'c001',
    user: {
      id: 'u002',
      name: '小美',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
      interests: ['健身', '跳舞', '旅行']
    },
    images: ['https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop'],
    text: '今天完成了 5 公里跑步，感觉整个人都轻盈了很多！坚持打卡第 23 天~ 健身真的能让心情变好 💪',
    goal: '坚持跑步100天',
    likes: 128,
    comments: 23,
    collects: 45,
    liked: false,
    collected: false,
    timestamp: '2小时前'
  },
  {
    id: 'c002',
    user: {
      id: 'u003',
      name: '阿杰',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      interests: ['AI编程', '读书', '桌游']
    },
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=600&fit=crop'],
    text: '终于把机器学习的基础过了一遍！分享一个超好用的学习资源给想入门 AI 的朋友。一起加油~',
    goal: '3个月内入门机器学习',
    likes: 89,
    comments: 31,
    collects: 67,
    liked: true,
    collected: false,
    timestamp: '4小时前'
  },
  {
    id: 'c003',
    user: {
      id: 'u004',
      name: '婷婷',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      interests: ['跳舞', '瑜伽', '摄影']
    },
    images: ['https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=600&fit=crop'],
    text: '周末舞蹈班的同学们一起拍的照片～每次跳舞都是最快乐的时光！有没有上海的朋友想一起学？',
    goal: '学会街舞基础',
    likes: 203,
    comments: 45,
    collects: 89,
    liked: false,
    collected: true,
    timestamp: '昨天'
  },
  {
    id: 'c004',
    user: {
      id: 'u005',
      name: 'Leo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      interests: ['英语', '健身', '篮球']
    },
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop'],
    text: 'Gym session completed! 力量训练真的会上瘾。现在卧推终于突破 80kg 了，继续加油 💪🏋️',
    goal: '增肌到 75kg',
    likes: 156,
    comments: 28,
    collects: 52,
    liked: false,
    collected: false,
    timestamp: '昨天'
  },
  {
    id: 'c005',
    user: {
      id: 'u006',
      name: '小雨',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      interests: ['读书', '咖啡', '写作']
    },
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop'],
    text: '今天读完了《原子习惯》，太棒了！分享一个核心观点：每天进步 1%，一年后会强大 37 倍。大家一起养成好习惯吧~',
    goal: '每月读两本书',
    likes: 234,
    comments: 67,
    collects: 123,
    liked: true,
    collected: true,
    timestamp: '2天前'
  }
]

// 搭子匹配卡片数据
export const matchCards = [
  {
    id: 'm001',
    user: {
      id: 'u007',
      name: '小雅',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face',
      age: 24,
      distance: '1.2km',
      city: '上海',
      bio: '健身小白求带！平时喜欢跳舞和拍照，希望能找到一起运动的伙伴~'
    },
    sharedInterests: ['健身', '摄影'],
    goal: '坚持健身 30 天',
    canOffer: '舞蹈教学',
    agentReason: '你们都在坚持健身，也都喜欢摄影。TA 可以教你跳舞，你可以陪 TA 一起做训练记录，很适合从共同目标开始。',
    willMatch: true
  },
  {
    id: 'm002',
    user: {
      id: 'u008',
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
      age: 28,
      distance: '2.5km',
      city: '上海',
      bio: 'Full-stack 开发者，对 AI 很感兴趣。想找志同道合的朋友一起学习交流~'
    },
    sharedInterests: ['AI编程'],
    goal: '完成 AI 项目实战',
    canOffer: '编程指导',
    agentReason: '你们都在学 AI，有共同语言！他是开发者，可以给你很多实战建议，是个很好的学习搭子选择。',
    willMatch: false
  },
  {
    id: 'm003',
    user: {
      id: 'u009',
      name: '琪琪',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face',
      age: 25,
      distance: '3.1km',
      city: '上海',
      bio: '咖啡爱好者，喜欢探索各种咖啡店。也喜欢健身和户外活动～'
    },
    sharedInterests: ['健身', '咖啡'],
    goal: '学会手冲咖啡',
    canOffer: '咖啡知识',
    agentReason: '你们都喜欢咖啡和健身，共同话题很多！她对咖啡很有研究，可以带你探索上海的咖啡店～',
    willMatch: true
  },
  {
    id: 'm004',
    user: {
      id: 'u010',
      name: '阿Ken',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
      age: 27,
      distance: '1.8km',
      city: '上海',
      bio: '业余摄影师，擅长人像和街头摄影。希望找一起拍照的搭子📸'
    },
    sharedInterests: ['摄影', '健身'],
    goal: '完成 50 组人像拍摄',
    canOffer: '摄影指导',
    agentReason: '你们都是摄影爱好者！他可以帮你拍出好看的健身照片，你也可以做他的健身模特，互惠互利～',
    willMatch: false
  }
]

// 我的搭子列表
export const myPartners = [
  {
    id: 'p001',
    user: {
      id: 'u011',
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
      online: true
    },
    chemistry: 860,
    sharedGoal: '一起学英语',
    lastInteraction: '刚刚',
    lastMessage: '那我们明天英语角见～',
    meetupStatus: '本周已见面',
    meetupCount: 3
  },
  {
    id: 'p002',
    user: {
      id: 'u012',
      name: '阿Ken',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
      online: false
    },
    chemistry: 720,
    sharedGoal: '每周健身两次',
    lastInteraction: '2小时前',
    lastMessage: '今天练什么部位？',
    meetupStatus: '下周约练',
    meetupCount: 5
  },
  {
    id: 'p003',
    user: {
      id: 'u013',
      name: '小雨',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      online: true
    },
    chemistry: 580,
    sharedGoal: '每月读两本书',
    lastInteraction: '昨天',
    lastMessage: '《原子习惯》真的很不错！',
    meetupStatus: '上次见面 5 天前',
    meetupCount: 2
  }
]

// 关系成长数据 - 每个关系绑定聊天对象
export const relationships = [
  {
    id: 'r001',
    partnerId: 'p001',
    buddyUserId: 'u011',  // 对应 chat001 的 partner.id
    teamName: '英语冲鸭',
    chemistry: 860,
    rank: 'Top 12%',
    stage: '好朋友',
    memories: [
      {
        id: 'mem1',
        date: '3月15日',
        text: '第一次线下英语角，见面超开心！',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop'
      },
      {
        id: 'mem2',
        date: '3月22日',
        text: '一起看了英文电影，练了口语',
        image: null
      },
      {
        id: 'mem3',
        date: '4月1日',
        text: '周末咖啡馆英语对话 2 小时',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop'
      }
    ],
    meetups: 3
  },
  {
    id: 'r002',
    partnerId: 'p002',
    buddyUserId: 'u012',  // 对应 chat002 的 partner.id
    teamName: '健身搭子',
    chemistry: 720,
    rank: 'Top 24%',
    stage: '搭子',
    memories: [
      {
        id: 'mem4',
        date: '2月1日',
        text: '健身房第一次见面，卧推教学',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop'
      },
      {
        id: 'mem5',
        date: '2月15日',
        text: '一起做了体测，进步明显',
        image: null
      }
    ],
    meetups: 5
  }
]

// 圈子数据
export const circles = [
  {
    id: 'cir001',
    name: '上海健身交流群',
    cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    members: 1289,
    recentActivity: '阿杰刚刚分享了健身计划'
  },
  {
    id: 'cir002',
    name: 'AI 学习小组',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    members: 856,
    recentActivity: 'David 发起了新话题'
  },
  {
    id: 'cir003',
    name: '上海咖啡探店',
    cover: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
    members: 2341,
    recentActivity: '小雅推荐了一家新店'
  },
  {
    id: 'cir004',
    name: '读书会',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    members: 678,
    recentActivity: '本月共读《思考快与慢》'
  }
]

// 活动数据
export const activities = [
  {
    id: 'act001',
    name: '周末健身打卡',
    type: '健身',
    date: '5月25日 周六 10:00',
    location: '静安区某健身房',
    participants: 12,
    maxParticipants: 20,
    host: {
      name: '阿Ken',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face'
    },
    registered: false
  },
  {
    id: 'act002',
    name: 'AI 编程交流会',
    type: '学习',
    date: '5月26日 周日 14:00',
    location: '徐汇区创业园区',
    participants: 28,
    maxParticipants: 50,
    host: {
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    },
    registered: true
  },
  {
    id: 'act003',
    name: '咖啡品鉴会',
    type: '社交',
    date: '5月27日 周一 19:00',
    location: '愚园路某咖啡馆',
    participants: 8,
    maxParticipants: 15,
    host: {
      name: '小雅',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
    },
    registered: false
  }
]

// 兴趣分类
export const interestCategories = [
  { id: 'all', name: '全部' },
  { id: 'fitness', name: '健身' },
  { id: 'dance', name: '跳舞' },
  { id: 'ai', name: 'AI编程' },
  { id: 'language', name: '语言' },
  { id: 'boardgame', name: '桌游' },
  { id: 'outdoor', name: '户外' },
  { id: 'reading', name: '读书' },
  { id: 'coffee', name: '咖啡' }
]

// 消息列表
export const chatList = [
  {
    id: 'chat001',
    partner: {
      id: 'u011',
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face'
    },
    chemistry: 860,
    sharedInterest: '英语',
    lastMessage: '那我们明天英语角见～',
    lastTime: '刚刚',
    unread: 0,
    messages: [
      { id: 'msg001', from: 'them', text: '嗨，小林！看到你也想练英语，太巧了！' },
      { id: 'msg002', from: 'me', text: '哈哈是呀！我想提高口语，但一个人练总是坚持不下来' },
      { id: 'msg003', from: 'them', text: '我也是！要不我们组队？互相监督～' },
      { id: 'msg004', from: 'me', text: '好主意！你一般什么时间有空？' },
      { id: 'msg005', from: 'them', text: '周末下午可以约图书馆或者咖啡馆' },
      { id: 'msg006', from: 'me', text: '没问题！有个英语角活动你要不要一起？' },
      { id: 'msg007', from: 'them', text: '好啊！什么时候？' },
      { id: 'msg008', from: 'me', text: '周六下午两点，在静安区的那个咖啡馆' },
      { id: 'msg009', from: 'them', text: '那我们明天英语角见～' }
    ]
  },
  {
    id: 'chat002',
    partner: {
      id: 'u012',
      name: '阿Ken',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face'
    },
    chemistry: 720,
    sharedInterest: '健身',
    lastMessage: '今天练什么部位？',
    lastTime: '2小时前',
    unread: 2,
    messages: [
      { id: 'msg010', from: 'them', text: '上周练的背，今天该练胸了' },
      { id: 'msg011', from: 'me', text: '对对对！我卧推好久没进步了' },
      { id: 'msg012', from: 'them', text: '教你好方法，试试递减组' },
      { id: 'msg013', from: 'me', text: '好！明天健身房见～' },
      { id: 'msg014', from: 'them', text: '今天练什么部位？' }
    ]
  },
  {
    id: 'chat003',
    partner: {
      id: 'u013',
      name: '小雨',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face'
    },
    chemistry: 580,
    sharedInterest: '读书',
    lastMessage: '《原子习惯》真的很不错！',
    lastTime: '昨天',
    unread: 0,
    messages: [
      { id: 'msg015', from: 'them', text: '你最近在读什么书呀？' },
      { id: 'msg016', from: 'me', text: '在读《深度工作》，提高专注力的' },
      { id: 'msg017', from: 'them', text: '哇，我也想读！能借我吗？' },
      { id: 'msg018', from: 'me', text: '没问题，下次见面给你带' },
      { id: 'msg019', from: 'them', text: '《原子习惯》真的很不错！' }
    ]
  }
]

// 互动通知数据
export const interactionNotifications = [
  {
    id: 'int001',
    user: {
      id: 'u021',
      name: '小雅',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
    },
    type: 'like',
    target: '你的健身动态',
    content: '今天完成了 5 公里跑步打卡',
    time: '2小时前'
  },
  {
    id: 'int002',
    user: {
      id: 'u022',
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    type: 'comment',
    target: '你的 AI 学习记录',
    content: '这个工具我也在用！互相监督一下～',
    time: '3小时前'
  },
  {
    id: 'int003',
    user: {
      id: 'u023',
      name: '婷婷',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face'
    },
    type: 'collect',
    target: '你的摄影作品',
    content: '构图很棒！想学习一下',
    time: '昨天'
  },
  {
    id: 'int004',
    user: {
      id: 'u024',
      name: 'Leo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    },
    type: 'follow',
    target: '你',
    content: '关注了你',
    time: '昨天'
  },
  {
    id: 'int005',
    user: {
      id: 'u025',
      name: '阿杰',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
    },
    type: 'like',
    target: '你的读书笔记',
    content: '《深度工作》确实很值得读！',
    time: '2天前'
  }
]

// 请求通知数据
export const requestNotifications = [
  {
    id: 'req001',
    user: {
      id: 'u031',
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face'
    },
    type: 'match',
    reason: '英语学习搭子',
    sharedInterest: '英语学习',
    content: '你们都把英语学习列为了目标，很适合组队！',
    time: '刚刚'
  },
  {
    id: 'req002',
    user: {
      id: 'u032',
      name: '阿Ken',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face'
    },
    type: 'invite',
    reason: '周末一起健身',
    content: '发现你们都在坚持健身，想约你一起去健身房！',
    location: '附近健身房',
    time: '1小时前'
  },
  {
    id: 'req003',
    user: {
      id: 'u033',
      name: '小雨',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face'
    },
    type: 'invite',
    reason: '一起参加读书会',
    content: '周末有个读书会，想约你一起去！',
    location: '静安区图书馆',
    time: '昨天'
  },
  {
    id: 'req004',
    user: {
      id: 'u034',
      name: '小美',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'
    },
    type: 'meetup',
    reason: '约线下见面',
    content: '感觉我们很合拍，要不要线下见一面？',
    time: '2天前'
  }
]

// Agent 建议数据
export const agentSuggestions = {
  warmthAnalysis: '对话氛围很好！Emma 对你印象不错，她主动提出组队练英语说明很有合作意愿。可以继续约线下见面加深关系。',
  topics: [
    '聊聊你们各自学英语的目标',
    '分享最近用英语做了什么事',
    '问问她喜欢什么类型的英文内容'
  ],
  drafts: [
    { text: '我们约个固定时间练英语怎么样？', style: 'casual' },
    { text: '除了英语角，平时你喜欢看什么英文内容吗？', style: 'caring' },
    { text: '想不想试试用英语聊天？这样进步更快～', style: 'active' }
  ],
  meetupSuggestion: '你们已经聊得很好了，可以约一次线下英语角见面，巩固关系！'
}

// 约见邀约数据
export const meetupInvites = [
  {
    id: 'inv001',
    chatId: 'chat001',
    type: '英语角',
    date: '5月24日 周六',
    time: '14:00',
    location: '静安区南京西路咖啡馆',
    note: '穿舒适的衣服哦～',
    status: 'pending',
    from: 'me'
  }
]