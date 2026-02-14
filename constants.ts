

export const ASSETS = {
  // Provided assets
  // 首页中间的种子图片 (请将下方链接替换为您上传图片的 URL)
  SEED_IMAGE: "https://cdn.jsdelivr.net/gh/zhuz4272-jpg/-Oasis--Images/img/%E9%A6%96%E9%A1%B5%E8%B5%84%E6%BA%90.png",
  CACTUS_IMAGE: "https://cdn.jsdelivr.net/gh/zhuz4272-jpg/-Oasis--Images/img/%E6%9A%B4%E8%BA%81%E4%BB%99%E4%BA%BA%E6%8E%8C.png",
  
  // New assets for other plants
  ALOE_IMAGE: "https://cdn.jsdelivr.net/gh/zhuz4272-jpg/-Oasis--Images/img/%E5%8F%8D%E5%8D%B7%E8%8A%A6%E8%8D%9F.png",
  SUNFLOWER_IMAGE: "https://cdn.jsdelivr.net/gh/zhuz4272-jpg/-Oasis--Images/img/%E7%A4%BE%E7%89%9B%E4%BB%99%E4%BA%BA%E6%8E%8C.png",
  MOSS_IMAGE: "https://cdn.jsdelivr.net/gh/zhuz4272-jpg/-Oasis--Images/img/%E4%BD%9B%E7%B3%BB%E8%8B%94%E8%97%93.png",
  FLYTRAP_IMAGE: "https://cdn.jsdelivr.net/gh/zhuz4272-jpg/-Oasis--Images/img/%E7%86%AC%E5%A4%9C%E6%8D%95%E8%9D%87%E8%8D%89.png",

  // Audio Assets
  SOUND_CLICK: "https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3",
  SOUND_WATER: "https://assets.mixkit.co/sfx/preview/mixkit-liquid-bubble-3000.mp3", 
  SOUND_SHUTTER: "https://assets.mixkit.co/sfx/preview/mixkit-camera-shutter-click-1133.mp3",
  SOUND_GROW: "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3"
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

export const LOADING_TEXTS = [
  "正在吸收清晨露水...",
  "正在捕获第一缕阳光...",
  "正在舒展叶脉...",
  "正在从土壤汲取养分...",
  "正在分析今日气场..."
];

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
    cta: "去绿洲发一张“天空”的照片 ☁️",
    isIllustration: true
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
    name: "社牛仙人掌",
    image: ASSETS.SUNFLOWER_IMAGE,
    tagType: "宜",
    tagText: "光合作用",
    quote: "你的能量过剩，急需释放！别憋在工位上，去晒太阳，去见人，去成为人群中的光源。",
    cta: "在绿洲带话题 #今日穿搭 发帖 👗",
    isIllustration: true
  },
  {
    name: "佛系苔藓",
    image: ASSETS.MOSS_IMAGE,
    tagType: "宜",
    tagText: "阴暗爬行",
    quote: "今天不宜出头，适合在角落里静静生长。虽不起眼，但你不仅绿，而且绿得很有层次感。",
    cta: "浏览绿洲“萌宠”频道 10 分钟 🐱",
    isIllustration: true
  },
  {
    name: "熬夜捕蝇草",
    image: ASSETS.FLYTRAP_IMAGE,
    tagType: "忌",
    tagText: "通宵冲浪",
    quote: "嘴巴张得太大容易吃进脏东西。闭嘴，闭眼，该消化一下最近的情绪了。",
    cta: "搜索绿洲里的“助眠白噪音” 💤",
    isIllustration: true
  }
];
