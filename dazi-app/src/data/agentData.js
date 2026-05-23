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

// 小搭私密对话数据
export const myAgentData = {
  name: '小搭',
  style: '温柔鼓励型',
  role: '你的私密关系好友',
  privacyNotice: '这里只有你能看到，可以和我说说最近的关系困惑。',
  lastUserThought: '我有点怕自己太主动，会不会显得打扰 TA。',
  lastAgentReply: '靠近不一定是打扰，可以先用轻一点的方式表达，让对方有回应空间。',
  inputPlaceholder: '把不好意思说出口的话先告诉我……'
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

// ========== AgentSideChatPanel 需要的函数 ==========

// 隐私声明
export const PRIVACY_NOTICE = '这里只有你能看到，任何问题都可以放心问我～'

// 快捷提示词
export const QUICK_PROMPTS = [
  '不知道怎么聊',
  '担心打扰TA',
  '想约见面',
  '理解TA的消息',
  '分析关系进展'
]

// 阶段判断
const stages = [
  { id: 'initial', title: '破冰阶段', minChemistry: 0, description: '你们刚开始认识，可以从共同兴趣开始聊天，保持轻松自然的节奏。' },
  { id: 'exploring', title: '了解阶段', minChemistry: 200, description: '开始熟悉彼此，可以分享更多个人经历和生活。' },
  { id: 'warming', title: '熟络阶段', minChemistry: 400, description: '你们已经比较熟悉了，可以尝试约线下见面加深关系。' },
  { id: 'buddy', title: '搭子阶段', minChemistry: 600, description: '你们已经成为搭子了！继续保持互动，维护这段关系。' },
  { id: 'close', title: '挚友阶段', minChemistry: 800, description: '你们是非常亲密的伙伴，可以分享更深入的话题。' }
]

export const judgeCurrentStage = (chat, messages) => {
  const chemistry = chat?.chemistry || 0
  return stages.find(s => chemistry >= s.minChemistry) || stages[0]
}

// 生成 Agent 回复
export const generateAgentResponse = (userInput, currentStage, chat) => {
  const input = userInput.toLowerCase()

  if (input.includes('不知道聊') || input.includes('尴尬')) {
    return '刚开始聊天可以从对方兴趣入手哦～比如问问最近在忙什么，或者分享一件有趣的事。有时候最简单的话题反而最容易打开话匣子～'
  }

  if (input.includes('担心打扰') || input.includes('太频繁')) {
    return '其实不用太担心！大多数人都喜欢被关心。选一个合适的时间，比如傍晚或者周末，用轻松的语气发一条消息就好。如果对方真的忙，也不会因为一条消息生气的～'
  }

  if (input.includes('约见面') || input.includes('见面') || input.includes('线下')) {
    return '约见面不用太刻意哦！可以先在聊天中自然地提到一个活动或者地点。比如：「最近天气真好，周末有什么计划吗？」这样自然地引入会更容易被接受～'
  }

  if (input.includes('理解') || input.includes('意思') || input.includes('心情')) {
    return '理解对方的情绪需要结合上下文哦～可以注意对方用了什么语气词、回复的频率、以及聊天内容的连贯性。如果不确定，可以试着问一些开放性的问题来了解TA的想法～'
  }

  if (input.includes('分析') || input.includes('进展')) {
    const chemistry = chat?.chemistry || 0
    const stage = currentStage?.title || '破冰阶段'
    return `根据你们的互动情况，目前处于「${stage}」。你们的默契值约 ${chemistry}，继续保持自然互动，关系会慢慢升温的～`
  }

  // 默认回复
  const responses = [
    '我理解你的想法～慢慢来，不要着急，关系需要时间培养。',
    '好的，我来帮你分析一下这种情况。',
    '有我在，不用担心～慢慢聊，关系自然会发展的。',
    '你的想法很棒！继续保持这种状态，TA会感受到你的真诚的。'
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

// 生成快捷提示词消息
export const generateQuickPromptMessage = (prompt) => {
  const messages = {
    '不知道怎么聊': '最近在忙什么呀？',
    '担心打扰TA': '今天怎么样？',
    '想约见面': '周末有空吗？',
    '理解TA的消息': '帮忙分析一下这段对话',
    '分析关系进展': '分析一下我们的关系进展'
  }
  return messages[prompt] || prompt
}

// 生成辅助聊天建议
export const generateAssistChat = (currentStage, chat) => {
  const stageId = currentStage?.id || 'initial'

  const directionMap = {
    initial: '刚刚认识，建议从轻松的话题开始',
    exploring: '开始熟悉，可以分享更多个人经历',
    warming: '比较熟悉了，可以尝试约线下见面',
    buddy: '已经是搭子了，保持规律互动',
    close: '关系很亲密，可以分享更深入的话题'
  }

  const messagesMap = {
    initial: ['最近在忙什么？', '你平时喜欢做什么？', '周末有什么计划？'],
    exploring: ['上次你说的那个项目怎么样了？', '最近有什么有趣的事吗？', '最近发现了一个好地方'],
    warming: ['最近天气不错，要不要出来坐坐？', '有家咖啡店很不错，要不要一起去？', '下周有空吗？'],
    buddy: ['这周一起做什么？', '上次那个活动你去了吗？', '有空出来聚聚'],
    close: ['有什么想分享的吗？', '最近怎么样？', '有什么需要帮忙的吗？']
  }

  return {
    direction: directionMap[stageId] || directionMap.initial,
    suggestedMessages: messagesMap[stageId] || messagesMap.initial
  }
}

// 生成下一步建议
export const generateNextStep = (currentStage, chat) => {
  const chemistry = chat?.chemistry || 0
  const meetupCount = chat?.meetupCount || 0

  // 根据阶段和默契值决定显示什么
  if (chemistry >= 600 && meetupCount === 0) {
    return {
      show: true,
      title: '约TA见面 💡',
      options: [
        { type: '约喝咖啡', suggestion: '最近天气不错，要不要一起去喝杯咖啡？' },
        { type: '约活动', suggestion: '发现附近有个很好玩的活动，要不要一起去？' },
        { type: '记录感受', suggestion: '先把这次聊天感受记录下来' }
      ]
    }
  }

  if (chemistry < 300 && !currentStage?.id?.includes('initial')) {
    return {
      show: true,
      title: '推进关系 🚀',
      options: [
        { type: '分享近况', suggestion: '最近发现了一个有趣的东西，想和你分享' },
        { type: '问问兴趣', suggestion: '你最近对什么比较感兴趣？' },
        { type: '约线上活动', suggestion: '有个线上活动很适合我们，要不要一起参加？' }
      ]
    }
  }

  if (meetupCount >= 1) {
    return {
      show: true,
      title: '维护关系 ✨',
      options: [
        { type: '跟进活动', suggestion: '上次活动感觉怎么样？' },
        { type: '计划下次', suggestion: '下次我们再约个时间？' },
        { type: '记录回忆', suggestion: '记录一下我们的这次活动' }
      ]
    }
  }

  return { show: false }
}

// 生成消息解读
export const generateInterpretation = (messages, chat) => {
  if (!messages || messages.length === 0) {
    return '还没有足够的聊天记录来分析。不过根据你们目前的默契值，继续保持自然互动就好～'
  }

  const lastMsg = messages[messages.length - 1]
  if (!lastMsg) return '分析中...'

  // 简单的情绪分析
  const text = lastMsg.text || lastMsg.content || ''
  const lowerText = text.toLowerCase()

  if (lowerText.includes('好') || lowerText.includes('嗯') || lowerText.includes('行')) {
    return '对方似乎表示同意或认可。可以继续这个话题，或者自然地推进下一步。如果之前聊到活动，可以顺势约具体时间～'
  }

  if (lowerText.includes('哈哈') || lowerText.includes('笑')) {
    return '对方心情不错！继续保持这种轻松的聊天氛围，可以适当开些小玩笑或者分享有趣的事。'
  }

  if (lowerText.includes('忙') || lowerText.includes('累')) {
    return '对方可能比较忙或者有些疲惫。可以适当表达关心，但不要追问太多。给彼此一些空间，晚点再聊～'
  }

  if (lowerText.includes('？') || lowerText.includes('什么') || lowerText.includes('怎么')) {
    return '对方可能在追问或者有些困惑。可以把话说得更清楚一些，也可以多分享一些背景信息。'
  }

  return '从这条消息来看，对方的态度比较中性。继续保持自然聊天，慢慢了解对方的风格～'
}