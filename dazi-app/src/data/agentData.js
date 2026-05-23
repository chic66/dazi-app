// Agent 角色配置
export const agentPersonas = [
  {
    id: 'gentle',
    name: '温柔鼓励型',
    description: '用温暖的方式支持你，给你信心和力量',
    emoji: '🌸',
    color: 'from-pink-400 to-rose-400',
    responseStyle: '温和、鼓励、正向'
  },
  {
    id: 'direct',
    name: '直接建议型',
    description: '直接给出明确的行动建议，简洁高效',
    emoji: '⚡',
    color: 'from-amber-400 to-orange-400',
    responseStyle: '直接、清晰、可操作'
  },
  {
    id: 'humorous',
    name: '幽默活泼型',
    description: '用轻松幽默的方式帮你化解尴尬',
    emoji: '🎭',
    color: 'from-purple-400 to-indigo-400',
    responseStyle: '轻松、有趣、自然'
  },
  {
    id: 'rational',
    name: '理性分析型',
    description: '深度分析帮你做出更好的决策',
    emoji: '🧠',
    color: 'from-blue-400 to-cyan-400',
    responseStyle: '理性、客观、有深度'
  },
  {
    id: 'romantic',
    name: '高情商恋爱军师型',
    description: '情感专家，帮你处理复杂的情感关系',
    emoji: '💕',
    color: 'from-red-400 to-pink-400',
    responseStyle: '情商高、体贴、周到'
  }
]

// 提醒频率配置
export const reminderLevels = [
  { id: 'quiet', name: '安静模式', description: '只在用户点击时出现' },
  { id: 'light', name: '轻提醒', description: '重要节点提醒' },
  { id: 'standard', name: '标准模式', description: '适度提供关系建议' },
  { id: 'active', name: '积极模式', description: '更频繁提醒互动和推进关系' }
]

// Agent 权限配置
export const agentPermissions = [
  { id: 'icebreaker', name: '推荐破冰话题', description: '基于资料推荐破冰话题', defaultEnabled: true },
  { id: 'reminder', name: '提醒联系搭子', description: '定时提醒你联系搭子', defaultEnabled: true },
  { id: 'memory', name: '整理共同记忆', description: '帮你整理与搭子的共同记忆', defaultEnabled: true },
  { id: 'chatAdvice', name: '聊天内容建议', description: '根据聊天内容提供建议', defaultEnabled: true },
  { id: 'safety', name: '线下安全提醒', description: '线下见面安全提醒', defaultEnabled: true }
]

// 当前用户 Agent 配置
export const defaultAgentConfig = {
  name: '小搭',
  persona: 'gentle',
  reminderLevel: 'standard',
  permissions: ['icebreaker', 'reminder', 'memory', 'chatAdvice', 'safety']
}

// 破冰话术
export const icebreakersByInterest = {
  'AI编程': [
    '最近在研究什么 AI 项目呀？',
    '你用什么框架比较多？',
    '想一起做个 AI 小项目吗？'
  ],
  '健身': [
    '你主要练什么部位？',
    '平时去哪个健身房？',
    '想一起约个健身吗？'
  ],
  '摄影': [
    '你用什么相机呀？',
    '喜欢拍什么风格？',
    '有空可以约着一起拍照～'
  ],
  '读书': [
    '最近在看什么书？',
    '有什么推荐的吗？',
    '喜欢纸质书还是电子书？'
  ],
  '语言交换': [
    '想练英语还是中文？',
    '水平怎么样啦？',
    '可以一起语言交换～'
  ],
  '咖啡': [
    '喜欢什么类型的咖啡？',
    '有推荐的好店吗？',
    '有空可以一起去探店～'
  ],
  '默认': [
    '你好呀，很高兴认识你！',
    '你好，看了你的介绍感觉很投缘～',
    '嗨，期待以后可以一起做有趣的事！'
  ]
}

// 破冰话术（Match 成功后）
export const matchSuccessBreakers = [
  { tone: '轻松', text: '哈喽，终于匹配成功啦！有什么想一起做的吗？' },
  { tone: '温柔', text: '你好呀～看了你的介绍很想认识你，希望我们能成为好搭子！' },
  { tone: '直接', text: '我们兴趣挺重合的，要不先聊聊最近在做什么？' }
]

// 聊天推荐话题
export const chatTopicsByRelationship = {
  new: [
    '最近在忙什么？',
    '有什么兴趣爱好呀？',
    '周末一般怎么过？'
  ],
  warming: [
    '上次聊的那个项目进展怎么样了？',
    '最近有什么有趣的事吗？',
    '你这周有什么计划？'
  ],
  stable: [
    '我们好像好久没聊了，最近怎么样？',
    '那个目标进行得怎么样了？',
    '有什么想分享的吗？'
  ]
}

// 消息草稿生成
export const draftTemplates = {
  casual: [
    '在干嘛呀？',
    '最近怎么样？',
    '有什么新鲜事吗？'
  ],
  caring: [
    '今天累不累？注意休息哦～',
    '最近事情多吗？别太辛苦了～',
    '有什么我能帮你的吗？'
  ],
  active: [
    '走！今天一起去...',
    '发现一个超棒的地方，要不要一起去？',
    '周末有空吗？一起...'
  ],
  humorous: [
    '哈哈哈哈笑死我了，你看到这个了吗？',
    '你是不是也是这样的人？（发链接）',
    '突然想到一个超好笑的段子...'
  ]
}

// 情绪解读
export const emotionInterpretations = [
  {
    keywords: ['好', '嗯', '行'],
    patterns: [
      {
        original: '好',
        possibleMeaning: '对方可能表示同意或认可',
        emotion: '中性偏正面',
        suggestion: '可以继续这个话题，或者推进下一步'
      }
    ]
  },
  {
    keywords: ['哈哈', '笑'],
    patterns: [
      {
        original: '哈哈',
        possibleMeaning: '对方可能觉得有趣或在活跃气氛',
        emotion: '开心、轻松',
        suggestion: '对方心情不错，可以继续聊下去'
      }
    ]
  },
  {
    keywords: ['？', '什么'],
    patterns: [
      {
        original: '？',
        possibleMeaning: '对方可能在追问或者有些困惑',
        emotion: '好奇或轻微困惑',
        suggestion: '可以解释得更清楚一些'
      }
    ]
  },
  {
    keywords: ['忙', '累'],
    patterns: [
      {
        original: '最近好忙',
        possibleMeaning: '对方可能在表达状态，也许有些疲惫',
        emotion: '可能有些疲惫或压力大',
        suggestion: '适当表达关心，但不要过度追问'
      }
    ]
  },
  {
    keywords: ['啊', '哦', '噢'],
    patterns: [
      {
        original: '哦',
        possibleMeaning: '对方可能只是在回应，需要更多信息来判断',
        emotion: '中性',
        suggestion: '可以换个话题或者提供更多内容'
      }
    ]
  }
]

// 约见建议
export const meetupSuggestions = {
  'AI编程': [
    '一起找个咖啡馆，各自写代码，累了就聊聊天',
    '去图书馆一起学习，互相监督',
    '参加一个 AI 技术meetup'
  ],
  '健身': [
    '约个时间去健身房一起练',
    '去公园跑步或者做户外运动',
    '找个时间一起上一节团课'
  ],
  '摄影': [
    '找个好天气出去拍照采风',
    '约着互相拍照，顺便交流技术',
    '去网红打卡点探店拍照'
  ],
  '读书': [
    '约个图书馆或者书店，各自看书交流',
    '参加读书会认识更多书友',
    '找个咖啡馆一起安静看书'
  ],
  '语言交换': [
    '约个咖啡馆，中文英文交替练习',
    '一起参加语言角活动',
    '找个安静的店互相练口语'
  ],
  '咖啡': [
    '一起去探店，寻找好喝的咖啡',
    '约个咖啡馆聊聊天',
    '参加咖啡品鉴活动'
  ],
  '默认': [
    '找个大家都方便的公共场所见面',
    '约个咖啡馆或者餐厅',
    '找个有趣的活动一起参加'
  ]
}

// 见面安全提示
export const safetyTips = [
  '首次见面建议选择公共场所，如咖啡馆、图书馆等',
  '见面时间尽量选择白天',
  '可以告诉朋友你的去向和预计返回时间',
  '保持手机电量充足，方便联系'
]

// 关系阶段描述
export const relationshipStages = [
  { id: 'new', name: '初识', minChemistry: 0, description: '刚建立联系，互相了解中' },
  { id: 'warming', name: '熟络', minChemistry: 300, description: '已经有一定默契，开始深入交流' },
  { id: 'buddy', name: '搭子', minChemistry: 600, description: '成为稳定搭子，有共同目标和记忆' },
  { id: 'close', name: '挚友', minChemistry: 900, description: '非常亲密的伙伴关系' }
]

// Agent 关系洞察生成
export const generateRelationshipInsight = (chemistry, meetupCount, lastInteraction, stage) => {
  const insights = []

  if (meetupCount >= 3) {
    insights.push('你们已经线下见面3次以上，默契正在升温！')
  } else if (meetupCount >= 1) {
    insights.push('完成了一次线下见面，关系更近了一步～')
  }

  if (chemistry >= 600) {
    insights.push('你们的默契值很高，已经进入稳定搭子阶段')
  } else if (chemistry >= 300) {
    insights.push('你们的默契在慢慢积累，继续保持互动')
  }

  if (lastInteraction.includes('5天') || lastInteraction.includes('更久')) {
    insights.push('你们已经有一段时间没互动了，要不要问问TA最近怎么样？')
  }

  return insights
}

// Agent 记忆编辑模板
export const memoryEditTemplates = {
  private: '这是我的私人日记：{content}',
  shared: '我们一起：{content}',
  post: '今天和搭子一起{activity}，感觉{category}。{highlight}',
  poetic: '那一天的{category}，像{simile}。{content}'
}

// 获取推荐破冰话题
export const getIcebreakers = (interests) => {
  const breakers = []
  interests.forEach(interest => {
    if (icebreakersByInterest[interest]) {
      breakers.push(...icebreakersByInterest[interest])
    }
  })
  if (breakers.length === 0) {
    breakers.push(...icebreakersByInterest['默认'])
  }
  return [...new Set(breakers)].slice(0, 5)
}

// 获取约见建议
export const getMeetupSuggestions = (interests) => {
  const suggestions = []
  interests.forEach(interest => {
    if (meetupSuggestions[interest]) {
      suggestions.push(...meetupSuggestions[interest])
    }
  })
  if (suggestions.length === 0) {
    suggestions.push(...meetupSuggestions['默认'])
  }
  return [...new Set(suggestions)].slice(0, 3)
}

// 生成消息草稿
export const generateDraft = (intent, tone = 'casual') => {
  const templates = {
    casual: [
      `好的，我来帮你说：${intent}`,
      `好的，我帮你组织一下语言`
    ],
    caring: [
      `好的，我帮你用关心的语气说`,
      `好的，温柔一点表达`
    ],
    active: [
      `好的，我帮你主动一点说`,
      `好的，直接一点表达`
    ]
  }

  return templates[tone] || templates.casual
}

// 情绪解读
export const interpretEmotion = (message) => {
  const lowerMsg = message.toLowerCase()

  for (const item of emotionInterpretations) {
    for (const keyword of item.keywords) {
      if (lowerMsg.includes(keyword)) {
        const matched = item.patterns.find(p =>
          lowerMsg.includes(p.original.toLowerCase())
        )
        if (matched) return matched
      }
    }
  }

  return {
    original: message,
    possibleMeaning: '仅从这条消息还很难判断对方的具体意图',
    emotion: '需要更多信息来判断',
    suggestion: '可以继续自然地聊天，慢慢了解对方的风格'
  }
}

// 私下问 Agent 回答
export const privateAgentResponses = [
  {
    question: '不知道该聊什么',
    answer: '可以从对方的兴趣或者你们共同的话题开始。比如问问最近在忙什么，或者分享一件有趣的事。有时候最简单的话题反而最容易打开话匣子～'
  },
  {
    question: '担心打扰对方',
    answer: '其实不用太担心！大多数人都喜欢被关心。选一个合适的时间，比如傍晚或者周末，用轻松的语气发一条消息就好。如果对方真的忙，也不会因为一条消息生气的～'
  },
  {
    question: '不知道怎么约见面',
    answer: '约见面不用太刻意。可以先在聊天中提到一个活动或者地点，问问对方有没有兴趣。比如说：「最近发现一个很棒的咖啡馆，你平时喜欢喝咖啡吗？」这样自然地引入会更容易被接受～'
  },
  {
    question: '感觉对方回复变慢了',
    answer: '这种情况其实很常见。有时候是因为对方确实忙，有时候只是巧合。不要过度解读，继续保持正常节奏的互动就好。如果真的很在意，可以试着发一条有趣的消息引起对方的兴趣～'
  }
]

// 沉默提醒
export const generateSilenceReminder = (days, partnerName, sharedInterest) => {
  if (days >= 7) {
    return `你们已经${days}天没有互动了。TA 可能也在等你消息呢，要不要主动联系一下？可以聊聊最近${sharedInterest || '共同兴趣'}的进展～`
  } else if (days >= 3) {
    return `已经${days}天没聊天了，可以问候一下TA最近的状况哦～`
  }
  return null
}

// 安全提醒
export const getSafetyReminder = (context) => {
  if (context === 'beforeMeetup') {
    return {
      title: '见面安全提醒',
      icon: '🛡️',
      tips: safetyTips,
      encouragement: '做好这些准备，你们的见面会更顺利愉快！'
    }
  }
  if (context === 'fastProgress') {
    return {
      title: '关系节奏提醒',
      icon: '💡',
      tips: ['慢慢来，让关系自然发展', '给彼此一些空间', '真诚的交流比速度更重要'],
      encouragement: '好的关系需要时间酝酿，不要着急哦～'
    }
  }
  return null
}

// Agent 欢迎语
export const generateWelcomeMessage = (persona, userName) => {
  const messages = {
    gentle: `嗨 ${userName}，我是小搭～以后我会一直陪在你身边，帮你在搭子的世界里找到方向。有什么困惑随时来找我聊聊哦 🌸`,
    direct: `你好 ${userName}，我是小搭。直接说重点：我会帮你找到合适的搭子，推进你们的关系，让你们的互动更高效。准备好了吗？`,
    humorous: `嘿 ${userName}～我是小搭，你的关系小助手！放心，有我在，聊天不再尴尬，破冰不再困难。来吧，让我们一起玩转搭子世界 😄`,
    rational: `你好 ${userName}，我是小搭。我会用理性的分析帮你理解关系，提供有数据支撑的建议。让我们一起建立一段有价值的关系吧。`,
    romantic: `${userName}～你好呀，我是小搭 💕 我会用我的情商帮你处理关系中的小细节，让你们的故事更温馨。你值得拥有一段美好的搭子关系～`
  }
  return messages[persona] || messages.gentle
}