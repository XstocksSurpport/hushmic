import type { Locale } from './locales'

type Dict = Readonly<Record<string, string>>

const en: Dict = {
  uiLanguage: 'Language',
  logoAlt: 'PROJECT HUSHMIC',
  ticker0: 'PROJECT HUSHMIC',
  ticker1: 'GOTHIC BLACK & VIOLET',
  ticker2: 'ETHEREUM MAINNET',
  ticker3: '2000 · LIMITED',
  ticker4: '0.1 ETH · MINT',
  ticker5: 'CONNECT · MINT',
  errorWalletNoBrowser:
    'No browser wallet found. Install MetaMask or another EIP-1193 compatible wallet.',
  errorConnect: 'Connect your wallet first',
  errorMainnet: 'Switch to Ethereum mainnet to continue',
  txSent: 'Transaction sent. {eth} ETH transfer — hash: {hash}',
  mintSuccessLocked:
    'Eligibility locked. Your mint slot is saved on-chain. Tx: {hash}',
  connect: 'Connect wallet',
  reconnect: 'Reconnect',
  noWallet: 'No wallet detected',
  walletHintMainnet: 'Connected · Ethereum mainnet',
  walletHintWrong: 'Wrong network · switch to Ethereum mainnet',
  aboutTitle: 'ABOUT HUSHMIC',
  aboutP1:
    'They say sound gets intercepted by a purple filter before it ever reaches the ear. HUSHMIC is the outline left on the far side: it does not speak, it stands watch—hood and neon sketching a small no-noise zone.',
  aboutP2:
    'Some call it a lost station ID in the metaverse, others a chibi sentinel hatched in a server dream. Do not ask for off-chain meaning; the answer is “encrypted.” Do not ask for the timeline; the answer is “napping in the gap between the next block.”',
  aboutP3:
    'The collection is strictly limited to {count} pieces. No extras—not scarcity theatre, the universe fumbled the stamp once and the cap is set in stone.',
  mintLockDesc: 'Pay {eth} ETH to lock your NFT eligibility in advance.',
  minting: 'Processing…',
  mintLockCta: 'Lock now',
  footerTitle: 'Community & contact',
  footerX: 'X',
  footerTg: 'Telegram',
  footerDc: 'Discord',
} as const

const ko: Dict = {
  uiLanguage: '언어',
  logoAlt: 'PROJECT HUSHMIC',
  ticker0: 'PROJECT HUSHMIC',
  ticker1: '고딕 블랙 & 바이올렛',
  ticker2: '이더리움 메인넷',
  ticker3: '2000 · 한정',
  ticker4: '0.1 ETH · 민트',
  ticker5: 'CONNECT · MINT',
  errorWalletNoBrowser:
    '브라우저 지갑을 찾을 수 없습니다. MetaMask 등 EIP-1193 호환 지갑을 설치하세요.',
  errorConnect: '먼저 지갑을 연결하세요',
  errorMainnet: '이더리움 메인넷으로 전환하세요',
  txSent: '트랜잭션 전송됨. {eth} ETH — 해시: {hash}',
  mintSuccessLocked: '자격이 잠겼습니다. 온체인에 반영되었습니다. Tx: {hash}',
  connect: '지갑 연결',
  reconnect: '다시 연결',
  noWallet: '지갑 없음',
  walletHintMainnet: '연결됨 · 이더리움 메인넷',
  walletHintWrong: '잘못된 네트워크 · 메인넷으로 전환',
  aboutTitle: 'HUSHMIC 소개',
  aboutP1:
    '소리가 귀에 닿기 전, 보라 필터에 가로막힌다는 말이 있다. HUSHMIC는 그 바깥에 남은 실루엣—말은 안 하고, 감시만 한다. 후드와 네온이 작은 조용한 구역을 그린다.',
  aboutP2:
    '메타버스에서 길 잃은 로고라는 사람도, 서버 꿈에서 부화한 치비 감시병이라는 사람도 있다. 체인 밖 의미는 묻지 말고, “암호화”라고 답하라. 타임라인은 묻지 말고, “다음 블록 틈에서 잠”이라고.',
  aboutP3:
    '총 {count}장만 발행. 추가 없음—희소성 연기가 아니라, 우주가 찍다 손떨어 상한이 박힌 것뿐.',
  mintLockDesc: '{eth} ETH를 지불해 NFT 자격을 사전에 잠가 둡니다.',
  minting: '처리 중…',
  mintLockCta: '지금 잠금',
  footerTitle: '연락 · 커뮤니티',
  footerX: 'X',
  footerTg: '텔레그램',
  footerDc: 'Discord',
}

const zh: Dict = {
  uiLanguage: '语言',
  logoAlt: 'PROJECT HUSHMIC',
  ticker0: 'PROJECT HUSHMIC',
  ticker1: '哥特黑紫',
  ticker2: '以太坊主网',
  ticker3: '2000 · 限定',
  ticker4: '0.1 ETH · MINT',
  ticker5: 'CONNECT · MINT',
  errorWalletNoBrowser: '未检测到钱包扩展，请安装 MetaMask 等兼容 EIP-1193 的浏览器钱包',
  errorConnect: '请先连接钱包',
  errorMainnet: '请切换到以太坊主网',
  txSent: '已发起 {eth} ETH 转账，交易哈希：{hash}',
  mintSuccessLocked: '已锁定资格。交易哈希：{hash}',
  connect: '连接钱包',
  reconnect: '重新连接',
  noWallet: '未检测到钱包',
  walletHintMainnet: '已连接 · 以太坊主网',
  walletHintWrong: '网络错误 · 请切换到以太坊主网',
  aboutTitle: '关于 HUSHMIC',
  aboutP1:
    '据说声音在抵达耳朵之前，会先被某种紫色滤波截胡——HUSHMIC 就是留在滤波外侧的那团轮廓：不说话，只站岗，用兜帽和霓虹画出一小块禁止喧哗的结界。',
  aboutP2:
    '有人说这是元宇宙里走失的台标，有人说是服务器梦里孵化的 Q 版哨兵。别问链下含义，问就是「已加密」；别问时间线，问就是「在下一个区块的缝隙里打盹」。',
  aboutP3: '全系列仅发行 {count} 张。多一张都没有——不是饥饿营销，是宇宙熵在盖章时手抖了，盖出一个上限就再也改不动。',
  mintLockDesc: '支付 {eth} ETH，提前锁定 NFT 资格',
  minting: '处理中…',
  mintLockCta: '立即锁定',
  footerTitle: '联系方式',
  footerX: 'X (推特)',
  footerTg: '电报',
  footerDc: 'Discord',
}

const ja: Dict = {
  uiLanguage: '言語',
  logoAlt: 'PROJECT HUSHMIC',
  ticker0: 'PROJECT HUSHMIC',
  ticker1: 'ゴシック ブラック & バイオレット',
  ticker2: 'イーサリアムメインネット',
  ticker3: '2000 · 限定',
  ticker4: '0.1 ETH · MINT',
  ticker5: 'CONNECT · MINT',
  errorWalletNoBrowser:
    'ブラウザウォレットが見つかりません。MetaMask など EIP-1193 対応のウォレットをインストールしてください。',
  errorConnect: '先にウォレットを接続してください',
  errorMainnet: 'イーサリアムメインネットに切り替えてください',
  txSent: 'トランザクション送信済み。{eth} ETH—ハッシュ: {hash}',
  mintSuccessLocked: '参加資格をロック済み。オンチェーンに反映。Tx: {hash}',
  connect: 'ウォレット接続',
  reconnect: '再接続',
  noWallet: 'ウォレット未検出',
  walletHintMainnet: '接続済み · イーサリアムメインネット',
  walletHintWrong: 'ネットワーク不一致 · メインネットへ切替',
  aboutTitle: 'HUSHMIC について',
  aboutP1:
    '音は耳に届く前、紫のフィルタに奪われると言う。HUSHMIC は外側に残る輪郭—しゃべらず、ただ立つ。フードとネオンが小さな静粛ゾーンを描く。',
  aboutP2:
    'メタバースで迷子の局ロゴだと言う人も、サーバーの夢から孵ったデフォルメ哨兵だと言う人も。オフチェーンの意味は聞かないで。答えは「暗号化」。タイムラインも聞かないで。答えは「次のブロックの隙で仮眠」。',
  aboutP3:
    'シリーズは {count} 枚限定。上乗せなし。希少演出ではなく、宇宙が捺印で手を滑らせ一度きりの上限が決まっただけ。',
  mintLockDesc: '{eth} ETH を支払い、NFT の参加資格を事前にロックします。',
  minting: '処理中…',
  mintLockCta: '今すぐロック',
  footerTitle: '連絡 · コミュニティ',
  footerX: 'X',
  footerTg: 'Telegram',
  footerDc: 'Discord',
}

const ar: Dict = {
  uiLanguage: 'اللغة',
  logoAlt: 'مشروع HUSHMIC',
  ticker0: 'PROJECT HUSHMIC',
  ticker1: 'قوطي · أسود · بنفسجي',
  ticker2: 'شبكة إيثريوم الرئيسية',
  ticker3: '2000 · محدود',
  ticker4: '0.1 ETH · MINT',
  ticker5: 'CONNECT · MINT',
  errorWalletNoBrowser:
    'لم يُعثر على محفظة في المتصفح. ثبّت MetaMask أو محفظة مطابقة لـ EIP-1193.',
  errorConnect: 'اربط محفظتك أولاً',
  errorMainnet: 'انتقل إلى الشبكة الرئيسية لإيثريوم',
  txSent: 'أُرسلت المعاملة. {eth} ETH — الهاش: {hash}',
  mintSuccessLocked: 'تم قفل الأهلية. سجّل على السلسلة. Tx: {hash}',
  connect: 'ربط المحفظة',
  reconnect: 'إعادة الربط',
  noWallet: 'لا توجد محفظة',
  walletHintMainnet: 'متصل · شبكة إيثريوم الرئيسية',
  walletHintWrong: 'شبكة خاطئة · انتقل إلى الرئيسية',
  aboutTitle: 'عن HUSHMIC',
  aboutP1:
    'يُقال إنّ الصوت يُعترض بمرشحٍ أرجواني قبل الأذن. HUSHMIC هو المخطط خارج ذلك: لا ينطق، يقف. القلنسوة والنيون ترسمان بؤرة صامتة.',
  aboutP2:
    'بعضهم يراها شعار قناةٍ ضالّة، وبعضها حارساً صغيراً وُلد في حلم خادم. لا تسأل عن المعنى خارج السلسلة—الإجابة: «مشفّر». ولا تسأل عن الزمن—الإجابة: «قيلولة بين الكتل».',
  aboutP3:
    'الإصدار {count} قطعة فقط. لا زيادة—ليست مسرحية ندرة، بل قفلٌ وُضع مرة باهتزاز الكون.',
  mintLockDesc: 'ادفع {eth} ETH لقفل أهلية الـ NFT مسبقًا.',
  minting: 'جارٍ المعالجة…',
  mintLockCta: 'اقفل الآن',
  footerTitle: 'التواصل والمجتمع',
  footerX: 'X',
  footerTg: 'تيليغرام',
  footerDc: 'ديسكورد',
}

export const messages: Record<Locale, Dict> = { en, ko, zh, ja, ar }

export function translate(
  locale: Locale,
  key: keyof typeof en,
  params?: Record<string, string>
): string {
  const table = messages[locale] ?? en
  const fallback = (messages.en as Dict)[key] ?? String(key)
  let s = (table[key] as string | undefined) ?? fallback
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.replaceAll(`{${k}}`, v)
    }
  }
  return s
}

export type MessageKey = keyof typeof en
