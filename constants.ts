

export const ASSETS = {
  // Provided assets
  SEED_IMAGE: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF34Ii0plS7mdXWwWl1j-6Hu6oO6VoP8ARIDrctcTCFpMwHWs0Btgpd9w-V3RA8F0uh2BXPy1epLCRc7MnYZ68_a7eYRBr2a0rlHsjbFRuHq5AvhI9eWORCXHZUC2kNzcjCJ2dMmbIDmfTRB5Z7bz0eessgS-Nf-dqUbqc4Y6MEl1Y73eb8rBQaNAqrTbwnJSoOmWFYRniZfHqw2QDLTMaGubBwvLpLwl6e9W5c5mIotl4JXm6_nEzhH0IZnPIQctUDeiWVkEXNLw9",
  CACTUS_IMAGE: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEM-qbcyRXYlPXv93XmvhABcYik8DYRUaPUkq2FlA35zC0P_2kDl_hwA0XejOtXs5IHehdi6btKbV2fUFfg60bUW2_bCsz8QTMqMo1ENfFV-i0TtLHW7mwaAqLPDZshCMiItKb1OHcXJKPusqElJijOGcQ1zKmgHytJxK6sQX4CmjdnhS-iE9lUQrvf_WzcMO1PX2-InpajrbGn0saeJfL9OSOfxf2EzvnUhAq3zeFjcbbQ_amA-klbHIdcrHVSMVZenHaCbid50Tz",
  
  // New assets for other plants (sourced from Unsplash for demo purposes)
  ALOE_IMAGE: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80",
  SUNFLOWER_IMAGE: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
  MOSS_IMAGE: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&w=600&q=80",
  FLYTRAP_IMAGE: "https://images.unsplash.com/photo-1550953686-e8d91c2b534d?auto=format&fit=crop&w=600&q=80",

  // Audio Assets
  SOUND_CLICK: "https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3",
  SOUND_WATER: "https://assets.mixkit.co/sfx/preview/mixkit-liquid-bubble-3000.mp3", 
  SOUND_SHUTTER: "https://assets.mixkit.co/sfx/preview/mixkit-camera-shutter-click-1133.mp3"
};

export const TEXTS = {
  APP_NAME: "绿洲 APP",
  START_TITLE: "绿洲 · 今日光合作用",
  START_HEADLINE: "今日缺水？缺阳光？\n还是缺个朋友？",
  START_SUBTITLE: "运势正在土壤中酝酿...",
  BUTTON_GENERATE: "浇水唤醒",
  BUTTON_SUB: "生成 · GENERATE",
  RESULT_TITLE: "Daily Vegetation",
  COLLECTION: "Oasis 绿洲",
  SPECIMEN_NO: "0824"
};

export interface SpecimenPreset {
  name: string;
  image: string;
  tagType: string;
  tagText: string;
  quote: string;
  cta: string;
  isIllustration?: boolean; // Flag to handle blend modes differently
}

export const PRESETS: SpecimenPreset[] = [
  {
    name: "反卷芦荟",
    image: ASSETS.ALOE_IMAGE, 
    tagType: "宜",
    tagText: "物理断网",
    quote: "今天你的角质层很厚，外界的焦虑无法渗透你。适合做一个安静的美容博主，或者单纯发呆。",
    cta: "去绿洲发一张“天空”的照片 ☁️"
  },
  {
    name: "暴躁仙人掌",
    image: ASSETS.CACTUS_IMAGE,
    tagType: "忌",
    tagText: "随便抱抱",
    quote: "浑身是刺不是你的错，是世界太拥挤。保持距离产生美，今天谁惹你，扎谁便是。",
    cta: "去绿洲给陌生人点一个“赞” 👍",
    isIllustration: true
  },
  {
    name: "社牛向日葵",
    image: ASSETS.SUNFLOWER_IMAGE,
    tagType: "宜",
    tagText: "光合作用",
    quote: "你的能量过剩，急需释放！别憋在工位上，去晒太阳，去见人，去成为人群中的光源。",
    cta: "在绿洲带话题 #今日穿搭 发帖 👗"
  },
  {
    name: "佛系苔藓",
    image: ASSETS.MOSS_IMAGE,
    tagType: "宜",
    tagText: "阴暗爬行",
    quote: "今天不宜出头，适合在角落里静静生长。虽不起眼，但你不仅绿，而且绿得很有层次感。",
    cta: "浏览绿洲“萌宠”频道 10 分钟 🐱"
  },
  {
    name: "熬夜捕蝇草",
    image: ASSETS.FLYTRAP_IMAGE,
    tagType: "忌",
    tagText: "通宵冲浪",
    quote: "嘴巴张得太大容易吃进脏东西。闭嘴，闭眼，该消化一下最近的情绪了。",
    cta: "搜索绿洲里的“助眠白噪音” 💤"
  }
];