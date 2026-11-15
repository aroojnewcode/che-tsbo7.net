export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
  extraBody?: string[];
}): ForumPost {
  const { answer, detail, tip, extraBody, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    flair: 'Guide Q&A',
    body: [answer, detail, ...(extraBody ?? [])],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'esp-include', title: 'What does Player ESP include before I buy?', upvotes: 73,
    excerpt: 'Player ESP breakdown: boxes, loot, salvage nodes and radar covered in the ESP buy guide before checkout.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'ESP and radar setup for Escape from Tarkov', sourcePath: '/blog/esp/',
    answer: 'The guide covers player boxes, names, health and distance, skeleton ESP, loot and resource markers, and the radar overlay. The exact options depend on the selected product tier.',
    detail: 'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a fight at a POI or on a compound wall.',
    tip: 'Keep the overlay uncluttered: begin with players and the nearest loot, then adjust the distance filters one at a time.',
  }),
  guideDiscussion({
    slug: 'esp-setup', title: 'How should I set up ESP overlay the first time?', upvotes: 58,
    excerpt: 'First-time ESP overlay setup: enable basics, confirm on a quiet test session, then tune one setting at a time.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'ESP and radar setup for Escape from Tarkov', sourcePath: '/blog/esp/',
    answer: 'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover your hotbar, health bars or the crosshair.',
    detail: 'Test your layout on a low-population or Hideout shooting range or an offline raid before relying on it in a busy one. A simple configuration is easier to read than turning on every option immediately.',
    tip: 'If the screen feels crowded, lower the loot distance and hide low-value items before changing colors or sizes.',
  }),
  guideDiscussion({
    slug: 'fov-settings', title: 'What FOV hack settings feel comfortable in PvP?', upvotes: 44,
    excerpt: 'FOV hack tips: widen awareness without stretching the screen or making distant targets hard to track.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'FOV hack guide for Escape from Tarkov', sourcePath: '/blog/fov/',
    answer: 'There is no single ideal FOV for every player. The guide recommends adjusting gradually and checking that you can still judge distance, recoil and enemy movement at range.',
    detail: 'Keep a quick reset hotkey to the default FOV available so you can compare the wider view with familiar framing, especially for base fights.',
    tip: 'Change one step at a time and spend a short session on a quiet test session before settling on a new value.',
  }),
  guideDiscussion({
    slug: 'aim-smooth', title: 'How do Aimbot smoothing settings change soft aim?', upvotes: 32,
    excerpt: 'Aimbot smoothing, FOV circles and why the PvP buy guide recommends conservative soft-aim tuning.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Aimbot and recoil scripts for PvP', sourcePath: '/blog/aimbot/',
    answer: 'Smoothing controls how quickly the crosshair moves toward a target. The guide recommends higher smoothing, a small FOV circle and a short test session before making any changes.',
    detail: 'Changing one value at a time is easier to review than adjusting FOV, smoothing and bone selection together.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
  }),
  guideDiscussion({
    slug: 'recoil-drill', title: 'Best way to test No-recoil weapon profiles?', upvotes: 29,
    excerpt: 'Practice recoil profiles one weapon at a time on a quiet test session wall before live PvP.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Aimbot bone select and recoil scripts for Escape from Tarkov', sourcePath: '/blog/bones/',
    answer: 'Choose one weapon and one profile to test at a time. The guide walks through example profiles for the M4A1, AK-74, MP7 and DVL-10 rifle, and explains how bone selection fits with recoil compensation.',
    detail: 'A Hideout shooting range or an offline raid lets you repeat the same spray at a wall and see which values need adjustment without risking your kit.',
    tip: 'Learn the manual spray pattern first; that makes it much easier to spot when a profile is over-compensating.',
  }),
  guideDiscussion({
    slug: 'elite-tools', title: 'What extra tools ship with Elite tier cheats?', upvotes: 67,
    excerpt: 'Elite tier vs Lite/Pro: Loot Route Assist, Skin Changer, priority patches and the full ESP suite.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Elite tier guide: when to upgrade your cheat tools', sourcePath: '/blog/elite/',
    answer: 'The guide describes Elite as including the Lite and Pro feature sets plus additional utilities such as Loot Route Assist, the full radar suite, priority patch delivery and Skin Changer.',
    detail: 'It also covers who may benefit from the extra modules and why it makes sense to understand the simpler feature set first.',
    tip: 'Compare the included features against your needs before choosing a tier; the full comparison is linked in the guide.',
  }),
  guideDiscussion({
    slug: 'lite-pro', title: 'How do Lite tier and Pro hack tiers differ?', upvotes: 53,
    excerpt: 'Lite tier is ESP and radar; Pro adds aimbot and no recoil. Short buyer comparison before checkout.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Lite tier vs Pro: which tier fits you', sourcePath: '/blog/lite-vs-pro/',
    answer: 'The comparison guide describes Lite as focused on awareness tools such as player ESP, loot ESP, radar and FOV. Pro adds Aimbot, Soft Aim and No Recoil on top of that foundation.',
    detail: 'The right choice depends on whether you need map information alone or also want the aim assist modules described in the comparison.',
    tip: 'Use the full side-by-side comparison to check specific modules before making a decision.',
  }),
  guideDiscussion({
    slug: 'skin-info', title: 'What should I know before buying Skin Changer?', upvotes: 38,
    excerpt: 'Skin Changer / Unlock All: local weapon and clothing previews, limits, and what other players see.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Skin changer and Unlock All for Escape from Tarkov', sourcePath: '/blog/skins/',
    answer: 'The guide describes Skin Changer as a local cosmetic preview utility for weapon skins, clothing and workshop items. It explains setup, supported options, and how to restore your default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews that other players do not see; check the guide for current limitations and setup steps.',
  }),
  guideDiscussion({
    slug: 'be-init', title: 'BattlEye failed to initialize—what should I try first?', upvotes: 24,
    excerpt: 'BattlEye failed to initialize: verify Steam files and reinstall BattlEye before assuming a ban.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'BattlEye failed to initialize in Escape from Tarkov', sourcePath: '/blog/be-error/',
    answer: 'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First verify game files through Steam.',
    detail: 'It also recommends fully exiting Steam, reinstalling BattlEye from the game install folder, restarting the PC, and checking for conflicting overlays or drivers before trying more disruptive steps.',
    tip: 'Test a normal Steam launch before starting other software so you can narrow down the cause.',
  }),
  guideDiscussion({
    slug: 'ext-loader', title: 'What does an External cheat loader mean?', upvotes: 46,
    excerpt: 'External cheat loader explained: separate process, overlay UI, portal updates vs risky injectors.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov external cheat guide', sourcePath: '/blog/external/',
    answer: 'The article uses “external” to describe software that runs separately from the game process and presents its interface as an overlay.',
    detail: 'It discusses the architecture at a high level and explains setup, patch updates, and the differences described between external and internal tools.',
    tip: 'Check compatibility and current status information whenever the game or BattlEye receives an update.',
  }),
  guideDiscussion({
    slug: 'stream-check', title: 'How do I check Stream-proof overlay in OBS?', upvotes: 21,
    excerpt: 'Stream-proof setup: record an OBS test so ESP overlays stay off your VOD before you go live.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for Escape from Tarkov', sourcePath: '/blog/stream-proof/',
    answer: 'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail: 'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
  }),
  guideDiscussion({
    slug: 'hwid-check', title: 'After an BattlEye ban, what should I check on HWID?', upvotes: 33,
    excerpt: 'HWID Spoofer vs new account after a BattlEye hardware flag—checks before Discord support.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'HWID spoofer vs new account after an BattlEye ban', sourcePath: '/blog/hwid/',
    answer: 'Start by checking the account and device instructions for your product. The guide explains common HWID questions, when a new Tarkov account is enough, and when a reset request may be needed.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated third-party tools.',
  }),
  guideDiscussion({
    slug: 'pre-install', title: 'What to review before installing cheat tools?', upvotes: 18,
    excerpt: 'Before installing cheat tools: status banner, Windows/Steam notes, and official setup on hackstarkov.com.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'Escape from Tarkov hack features: aimbot, ESP, no recoil and more', sourcePath: '/blog/features/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update and status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
  }),
  guideDiscussion({
    slug: 'choose-tier', title: 'How do I choose the right hack tier to buy?', upvotes: 48,
    excerpt: 'Pick Lite, Pro or Elite hack tools by feature set, then follow secure checkout on hackstarkov.com.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy Escape from Tarkov hacks in 2026', sourcePath: '/blog/buy-guide/',
    answer: 'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching the game.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
    extraBody: [
      'List the modules you use in a normal week and pick the smallest tier that still covers them. You can ask in Discord before upgrading.',
    ],
  }),
];

const playerDiscussionThreads: ForumPost[] = [
  {
    slug: 'esp-vs-radar',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'ESP vs Radar – Which One Do Players Prefer?',
    excerpt:
      "I've been looking into different Tarkov tools lately. I see a lot of discussions about ESP and radar. What are the main differences between them, and which one do players generally find easier to understand?",
    author: 'RogueHunter',
    age: '5 hours ago',
    commentsCount: 11,
    upvotes: 88,
    flair: 'Discussion',
    body: [
      "I've been looking into different Tarkov tools lately. I see a lot of discussions about ESP and radar. What are the main differences between them, and which one do players generally find easier to understand?",
    ],
    comments: [
      { author: 'LootGoblin', age: '4 hours ago', score: 21, body: 'ESP is usually more straightforward because information appears directly on your screen. Radar is a different approach, depending on the setup.' },
      { author: 'PMC_Zero', age: '3 hours ago', score: 16, body: "I'd say it depends on what you're looking for. Always check compatibility and security before trying any third-party software." },
    ],
  },
  {
    slug: 'tarkov-update-tool-compatibility',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Does Tarkov Update Break Third-Party Tools?',
    excerpt:
      'Every major update seems to change something. Do third-party tools usually need updates after a new Tarkov patch?',
    author: 'NightRaid',
    age: 'Yesterday',
    commentsCount: 14,
    upvotes: 72,
    body: [
      'Every major update seems to change something. Do third-party tools usually need updates after a new Tarkov patch?',
    ],
    comments: [
      { author: 'HeadEyes', age: 'Yesterday', score: 19, body: 'Definitely worth checking. Some tools stop working after game updates, so I always look for recent compatibility information first.' },
      { author: 'ScavMain', age: 'Yesterday', score: 14, body: "Same here. I'd rather wait for a confirmed update than risk using something outdated." },
    ],
  },
  {
    slug: 'best-tarkov-maps-for-beginners',
    category: 'Community',
    categoryTone: 'green',
    title: 'Best Maps for Beginners in Escape from Tarkov',
    excerpt: "I'm relatively new to Tarkov and still struggle with learning maps. Which map should I focus on first?",
    author: 'NewPMC',
    age: 'Yesterday',
    commentsCount: 10,
    upvotes: 55,
    flair: 'New players',
    body: [
      "I'm relatively new to Tarkov and still struggle with learning maps. Which map should I focus on first?",
    ],
    comments: [
      { author: 'CustomsEnjoyer', age: 'Yesterday', score: 18, body: 'Customs is a good starting point. Learn the extracts, loot locations, and common player routes.' },
      { author: 'OldScav', age: 'Yesterday', score: 12, body: "I'd also recommend learning Woods. Take your time and don't worry about losing gear while you're learning." },
    ],
  },
  {
    slug: 'tarkov-account-security',
    category: 'General',
    categoryTone: 'purple',
    title: 'How Do You Keep Your Tarkov Account Secure?',
    excerpt: "I've seen people lose accounts because they downloaded suspicious files. What precautions should everyone take?",
    author: 'LootRunner',
    age: '2 days ago',
    commentsCount: 9,
    upvotes: 63,
    body: [
      "I've seen people lose accounts because they downloaded suspicious files. What precautions should everyone take?",
    ],
    comments: [
      { author: 'SafeExtract', age: '2 days ago', score: 22, body: 'Only download software from sources you trust. Avoid unknown executables and never share your account credentials.' },
      { author: 'PMC_Zero', age: '2 days ago', score: 15, body: 'Good advice. Account security should always come before trying new tools.' },
    ],
  },
  {
    slug: 'tarkov-tool-features-discussion',
    category: 'General',
    categoryTone: 'purple',
    title: 'What Features Matter Most When Comparing Tarkov Tools?',
    excerpt:
      'When comparing different Tarkov tools, what do you usually check first? Compatibility, performance, features, or support?',
    author: 'DarkForest',
    age: '2 days ago',
    commentsCount: 13,
    upvotes: 49,
    flair: 'Discussion',
    body: [
      'When comparing different Tarkov tools, what do you usually check first? Compatibility, performance, features, or support?',
    ],
    comments: [
      { author: 'HeadEyes', age: '2 days ago', score: 17, body: "For me, stability and regular updates matter most. A long feature list doesn't mean much if the software doesn't work properly." },
      { author: 'RaidReady', age: '2 days ago', score: 13, body: "Customer support is important too. It's better to know that someone can help if you run into problems." },
    ],
  },
  {
    slug: 'favorite-map',
    category: 'General',
    categoryTone: 'purple',
    title: 'Which Tarkov map do you enjoy playing the most?',
    excerpt:
      "Customs is still my go-to because I know most of the routes, but Streets has some really interesting fights. What map do you guys prefer and why?",
    author: 'RaidRunner',
    age: '2 hours ago',
    commentsCount: 18,
    upvotes: 94,
    flair: 'Active',
    body: [
      "I've been playing Tarkov for a while now, and I'm curious about everyone's favorite map. Customs is still my go-to because I know most of the routes, but Streets has some really interesting fights. What map do you guys prefer and why?",
    ],
    comments: [
      { author: 'LootGoblin', age: '1 hour ago', score: 22, body: "Customs for quests, Reserve for loot. Can't go wrong with either." },
      { author: 'HeadEyes', age: '55 min. ago', score: 15, body: 'Streets is great, but the performance can be rough sometimes.' },
      { author: 'SoloPMC', age: '40 min. ago', score: 11, body: 'Woods all day. Sometimes I just want a peaceful raid!' },
    ],
  },
  {
    slug: 'budget-weapons',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: "What's your favorite budget weapon build right now?",
    excerpt:
      "Not everyone wants to spend a fortune on every raid. I've been experimenting with cheaper AK builds and getting surprisingly good results.",
    author: 'AKEnjoyer',
    age: '5 hours ago',
    commentsCount: 12,
    upvotes: 67,
    flair: 'Discussion',
    body: [
      "Not everyone wants to spend a fortune on every raid. I've been experimenting with cheaper AK builds and getting surprisingly good results. What weapons are you guys running when you want to save some roubles?",
    ],
    comments: [
      { author: 'BudgetHunter', age: '4 hours ago', score: 19, body: 'A basic AK-74 build works well enough for me.' },
      { author: 'TarkovVeteran', age: '3 hours ago', score: 14, body: "Don't underestimate the PP-19 early in a wipe." },
      { author: 'NewPMC', age: '2 hours ago', score: 8, body: 'Looking for some affordable builds. Definitely saving this thread.' },
    ],
  },
  {
    slug: 'esp-radar-basics',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'What should players know about ESP and radar features?',
    excerpt:
      "I've seen a lot of discussions about ESP and radar tools lately. I'm interested in understanding the differences between these features, how they generally work, and what risks come with third-party software.",
    author: 'CuriousPMC',
    age: 'Yesterday',
    commentsCount: 9,
    upvotes: 52,
    flair: 'Discussion',
    body: [
      "I've seen a lot of discussions about ESP and radar tools lately. I'm interested in understanding the differences between these features, how they generally work, and what risks come with third-party software. Anyone have useful information?",
    ],
    comments: [
      { author: 'TechRaider', age: 'Yesterday', score: 16, body: "Start by understanding what each feature actually displays. They aren't all the same." },
      { author: 'SafeExtract', age: 'Yesterday', score: 12, body: 'Always check compatibility and account risks before using third-party tools.' },
      { author: 'RaidReady', age: 'Yesterday', score: 9, body: "I'd also like to see a proper breakdown of the different features." },
    ],
  },
  {
    slug: 'fps-drops-patch',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Anyone else experiencing FPS drops after the latest update?',
    excerpt: "My game was running pretty smoothly before the recent update. Now I'm getting random FPS drops, especially in busy areas.",
    author: 'FPSHunter',
    age: 'Yesterday',
    commentsCount: 15,
    upvotes: 78,
    body: [
      "My game was running pretty smoothly before the recent update. Now I'm getting random FPS drops, especially in busy areas. I've tried lowering some settings, but it hasn't completely fixed the issue. Is anyone else experiencing this?",
    ],
    comments: [
      { author: 'PixelPMC', age: 'Yesterday', score: 18, body: 'Try checking your background applications first.' },
      { author: 'NightRaider', age: 'Yesterday', score: 11, body: 'Streets has always been demanding on my system.' },
      { author: 'OneTap', age: 'Yesterday', score: 10, body: 'Updating drivers helped me with similar performance issues.' },
    ],
  },
  {
    slug: 'beginner-mistakes',
    category: 'Community',
    categoryTone: 'green',
    title: 'What are the biggest mistakes new Tarkov players make?',
    excerpt:
      "I recently started playing and honestly, there's a lot to learn. Between quests, ammunition, maps, traders, and extraction points, it can get overwhelming.",
    author: 'FirstWipe',
    age: '2 days ago',
    commentsCount: 11,
    upvotes: 61,
    flair: 'New players',
    body: [
      "I recently started playing and honestly, there's a lot to learn. Between quests, ammunition, maps, traders, and extraction points, it can get overwhelming. What advice would you give someone starting their first wipe?",
    ],
    comments: [
      { author: 'OldScav', age: '2 days ago', score: 20, body: 'Learn one map properly before jumping between all of them.' },
      { author: 'PMCGuide', age: '2 days ago', score: 15, body: "Don't spend all your money on expensive gear." },
      { author: 'LootAndRun', age: '2 days ago', score: 13, body: 'Learn ammunition types. They matter more than people think.' },
    ],
  },
];

const communityThreads: ForumPost[] = [
  {
    slug: 'overlay-too-busy',
    category: 'Community',
    categoryTone: 'green',
    title: 'Overlay feels crowded — what do you turn off first?',
    excerpt: 'Loot distance and team colors usually fix a messy HUD faster than shrinking boxes.',
    author: 'quiet_pmc',
    age: '3 hours ago',
    commentsCount: 3,
    upvotes: 41,
    flair: 'Setup',
    body: [
      'I enabled everything on day one and could not see stamina. Halving loot distance, hiding grey-tier crates, and keeping skeletons only inside 80 meters fixed it.',
      'I bumped text size one step and gave teammates a cooler color so scavs still read in warm tones.',
    ],
    comments: [
      { author: 'loot_rat_91', age: '2 hours ago', score: 14, body: 'Two presets: “Factory” minimal and “Woods” with more loot lines. Switch before you queue.' },
      { author: 'guide_team', age: '1 hour ago', score: 9, body: 'The ESP guide has a starter layout—change one slider per raid.' },
      { author: 'night_owl', age: '45 min. ago', score: 6, body: 'Night raids need dimmer boxes before you touch distance filters.' },
    ],
  },
  {
    slug: 'smartscreen-loader',
    category: 'General',
    categoryTone: 'purple',
    title: 'SmartScreen blocked the loader on first download',
    excerpt: 'Unsigned builds often trip Windows once; verify the hash in the portal first.',
    author: 'fresh_install',
    age: '5 hours ago',
    commentsCount: 2,
    upvotes: 36,
    flair: 'Support',
    body: [
      'Blue warning on first run. I matched the file hash in the portal, then used More info → Run anyway.',
      'If it still fails, note the exact error for a ticket—screenshots of the whole desktop are not much help.',
    ],
    comments: [
      { author: 'guide_team', age: '4 hours ago', score: 11, body: 'Hash check first. Staff can confirm if a new build just shipped.' },
      { author: 'dual_boot', age: '3 hours ago', score: 4, body: 'Whitelisting the loader folder stopped repeat prompts for me.' },
    ],
  },
  {
    slug: 'patch-wait-time',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'How long do you wait after a big patch?',
    excerpt: 'A rough rhythm when the status banner is still yellow.',
    author: 'patient_scav',
    age: '8 hours ago',
    commentsCount: 3,
    upvotes: 52,
    flair: 'Patch day',
    body: [
      'Small fixes sometimes land in a few hours; larger anti-cheat bumps can take most of a day. I do not take geared kits live until Discord posts a green build note.',
      'Use the downtime to export configs and reread patch notes instead of relaunching on hope.',
    ],
    comments: [
      { author: 'ops_watcher', age: '7 hours ago', score: 16, body: 'Text file of last-good settings makes patch day copy-paste.' },
      { author: 'guide_team', age: '6 hours ago', score: 12, body: 'Patch-day checklist on the blog is the full routine.' },
      { author: 'duo_queue', age: '5 hours ago', score: 5, body: 'We agree in Discord before either of us loads in.' },
    ],
  },
  {
    slug: 'share-presets',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Sharing configs with a friend — safe way?',
    excerpt: 'Export files, not portal passwords.',
    author: 'duo_icarus',
    age: '11 hours ago',
    commentsCount: 2,
    upvotes: 28,
    body: [
      'Licenses stay tied to one portal account. We export JSON from the portal and import on our own machines.',
      'Trim modules your friend’s tier does not include or their loader will show disabled toggles.',
    ],
    comments: [
      { author: 'guide_team', age: '10 hours ago', score: 8, body: 'Never share login credentials—tickets are the path for license questions.' },
      { author: 'squad_lead', age: '9 hours ago', score: 5, body: 'Versioned exports in Discord after each patch saved our squad.' },
    ],
  },
  {
    slug: 'labs-preset',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Separate preset for Labs vs Woods?',
    excerpt: 'Tighter ESP indoors; wider context outside.',
    author: 'key_runner',
    age: '14 hours ago',
    commentsCount: 2,
    upvotes: 33,
    flair: 'Presets',
    body: [
      'Labs: short player distance, fewer loot pings, louder grenade cues. Woods: wider radar and more container tags.',
      'Naming presets clearly saves panic clicks mid-raid.',
    ],
    comments: [
      { author: 'map_owl', age: '12 hours ago', score: 9, body: 'Bind preset swap before you are under pressure.' },
      { author: 'guide_team', age: '11 hours ago', score: 6, body: 'Lite vs Pro guide lists which modules each preset can use.' },
    ],
  },
  {
    slug: 'discord-ticket-speed',
    category: 'Community',
    categoryTone: 'green',
    title: 'What gets tickets answered faster?',
    excerpt: 'Order email, error text, steps you already tried.',
    author: 'ticket_newbie',
    age: '1 day ago',
    commentsCount: 2,
    upvotes: 22,
    body: [
      'First ticket was a wall of pictures and no order ID. Second try: checkout email, Windows version, loader message copy-paste—reply the same evening.',
    ],
    comments: [
      { author: 'guide_team', age: '22 hours ago', score: 10, body: 'Support page lists required fields.' },
      { author: 'returning_buyer', age: '20 hours ago', score: 4, body: 'One issue per ticket keeps threads readable.' },
    ],
  },
  {
    slug: 'scav-radar-tip',
    category: 'Community',
    categoryTone: 'green',
    title: 'Radar settings for scav runs',
    excerpt: 'Smaller dots, lower refresh, trust audio too.',
    author: 'scav_life',
    age: '1 day ago',
    commentsCount: 2,
    upvotes: 19,
    body: [
      'For scavs I shrink the radar and lean on footsteps. PMC dots stay on; loot chirps stay off so the corner stays calm.',
    ],
    comments: [
      { author: 'solo_main', age: '18 hours ago', score: 7, body: 'Still run an OBS test if you stream—wrong capture source leaks overlays.' },
      { author: 'guide_team', age: '16 hours ago', score: 5, body: 'Stream-proof article covers capture modes.' },
    ],
  },
  {
    slug: 'aim-smoothing-start',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Starter smoothing that still looks natural',
    excerpt: 'High smoothing, tight FOV circle, one gun at a time.',
    author: 'pro_day_one',
    age: '2 days ago',
    commentsCount: 3,
    upvotes: 37,
    flair: 'Pro tier',
    body: [
      'Cranked smoothing, small aim FOV, practiced on an AK in offline mode until flicks looked human.',
      'Chest bone only until recoil felt controlled without the assist fighting me.',
    ],
    comments: [
      { author: 'recoil_nerd', age: '1 day ago', score: 12, body: 'Write down each tweak. Easy to forget after a break.' },
      { author: 'guide_team', age: '1 day ago', score: 8, body: 'Aim guide has conservative defaults—start there.' },
      { author: 'labs_duelist', age: '20 hours ago', score: 4, body: 'SMG profiles are not DMR profiles. Separate files.' },
    ],
  },
  {
    slug: 'dual-monitor-overlay',
    category: 'General',
    categoryTone: 'purple',
    title: 'Overlay offset on dual monitors',
    excerpt: 'Wrong display scaling made ESP sit half a screen to the right.',
    author: 'two_screen',
    age: '2 days ago',
    commentsCount: 2,
    upvotes: 26,
    body: [
      'Primary game monitor was 1440p but Windows scaling was 125%. Set game to borderless, matched scaling to 100% on that display, then recalibrated overlay in offline mode.',
    ],
    comments: [
      { author: 'dpi_fixer', age: '36 hours ago', score: 9, body: 'Also check which GPU drives which cable—sounds dumb but it mattered for me.' },
      { author: 'guide_team', age: '30 hours ago', score: 5, body: 'Re-run alignment any time you change resolution or scaling.' },
    ],
  },
  {
    slug: 'backup-before-update',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Back up presets before Windows updates',
    excerpt: 'Feature updates reset more than you expect.',
    author: 'sysadmin_pmc',
    age: '2 days ago',
    commentsCount: 2,
    upvotes: 31,
    flair: 'Tip',
    body: [
      'Monthly Windows cumulative update wiped a custom profile path. Now I export from the portal and keep a dated folder in Documents before any OS patch Tuesday.',
    ],
    comments: [
      { author: 'cloud_sync', age: '40 hours ago', score: 8, body: 'Portal cloud sync helps but local export is my insurance.' },
      { author: 'guide_team', age: '38 hours ago', score: 4, body: 'Note OS build number in the ticket if something breaks after update.' },
    ],
  },
  {
    slug: 'lite-upgrade-path',
    category: 'Community',
    categoryTone: 'green',
    title: 'Upgrading Lite to Pro mid-season',
    excerpt: 'Do presets carry over?',
    author: 'awareness_only',
    age: '3 days ago',
    commentsCount: 2,
    upvotes: 34,
    body: [
      'Bought Lite for ESP only, added Pro a month later. Portal showed an upgrade option—configs stayed, new combat tab appeared. Had to tune aim modules from scratch though.',
    ],
    comments: [
      { author: 'guide_team', age: '2 days ago', score: 11, body: 'Ask Discord before paying if upgrade pricing is unclear.' },
      { author: 'mid_season', age: '2 days ago', score: 6, body: 'Export before upgrade anyway. Peace of mind.' },
    ],
  },
  {
    slug: 'ugc-timeline',
    category: 'General',
    categoryTone: 'purple',
    title: 'How long does UGC paperwork usually take?',
    excerpt: 'Expect weeks, not hours—and not every case succeeds.',
    author: 'appeal_wait',
    age: '3 days ago',
    commentsCount: 3,
    upvotes: 29,
    flair: 'UGC',
    body: [
      'Submitted evidence through UGC workflows, tracked status in the dashboard. First reply from platform support took eleven days. Final outcome was a partial lift, not a full wipe.',
      'The tool organized emails better than a random spreadsheet—not a magic button.',
    ],
    comments: [
      { author: 'guide_team', age: '3 days ago', score: 9, body: 'UGC product page explains limits up front.' },
      { author: 'new_account', age: '2 days ago', score: 5, body: 'Sometimes a clean account plus spoofer is faster than appeal.' },
      { author: 'paper_trail', age: '2 days ago', score: 4, body: 'Keep PDFs of purchase receipts with dates.' },
    ],
  },
  {
    slug: 'camo-local-only',
    category: 'Community',
    categoryTone: 'green',
    title: 'Camouflage preview — do friends see it?',
    excerpt: 'Local client only; squad still sees your real kit.',
    author: 'dress_up',
    age: '3 days ago',
    commentsCount: 2,
    upvotes: 21,
    body: [
      'Tried camouflage skins for clips. Looked great on my screen; duo said I still had default armor on their view. Article on the skins blog explains it clearly.',
    ],
    comments: [
      { author: 'stream_clip', age: '2 days ago', score: 7, body: 'Fine for content, not for flexing in lobby voice.' },
      { author: 'guide_team', age: '2 days ago', score: 5, body: 'Unlock All page has the limits section.' },
    ],
  },
  {
    slug: 'cloud-dma-question',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Cloud DMA vs external tier — overlap?',
    excerpt: 'Hardware add-on does not replace combat modules.',
    author: 'hardware_curious',
    age: '4 days ago',
    commentsCount: 2,
    upvotes: 27,
    flair: 'Cloud DMA',
    body: [
      'Thought Cloud DMA included ESP. It does not—portal onboarding is for the DMA path. Still needed Pro for the modules I wanted in raid.',
    ],
    comments: [
      { author: 'guide_team', age: '3 days ago', score: 10, body: 'Cloud DMA product page separates scope from Lite/Pro/Elite.' },
      { author: 'build_planner', age: '3 days ago', score: 5, body: 'Read both pages before checkout so you are not double-paying by surprise.' },
    ],
  },
  {
    slug: 'fps-drop-long-session',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'FPS dips after three-hour sessions',
    excerpt: 'Restart loader and game; check overlay logging.',
    author: 'long_raid',
    age: '4 days ago',
    commentsCount: 2,
    upvotes: 23,
    body: [
      'Third hour stutters. Full restart of loader + Tarkov fixes it temporarily. Disabled verbose debug logging in portal and it helped a bit.',
    ],
    comments: [
      { author: 'vram_watch', age: '3 days ago', score: 8, body: 'Also lower texture settings if you run HD packs.' },
      { author: 'guide_team', age: '3 days ago', score: 4, body: 'Ticket with approximate session length if it keeps happening.' },
    ],
  },
  {
    slug: 'keybind-clash',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Menu key stole my lean bind',
    excerpt: 'Remap loader menu away from Q/E.',
    author: 'bind_chaos',
    age: '4 days ago',
    commentsCount: 2,
    upvotes: 18,
    body: [
      'Default menu hotkey overlapped lean. Moved menu to Home key, kept game binds untouched. Small thing but it ruined two raids before I noticed.',
    ],
    comments: [
      { author: 'lefty', age: '3 days ago', score: 6, body: 'Left-handed mice users: check side buttons too.' },
      { author: 'guide_team', age: '3 days ago', score: 3, body: 'Export binds after you settle on a layout.' },
    ],
  },
  {
    slug: 'insurance-timing',
    category: 'Community',
    categoryTone: 'green',
    title: 'When do you pop radar after insurance return?',
    excerpt: 'Wait until you are actually back in raid.',
    author: 'insurance_main',
    age: '5 days ago',
    commentsCount: 2,
    upvotes: 16,
    body: [
      'Used to toggle everything in stash screen. Now I enable full overlay only after spawn—less visual noise while sorting kits.',
    ],
    comments: [
      { author: 'stash_rat', age: '4 days ago', score: 5, body: 'Same. Stash preset is separate from raid preset.' },
      { author: 'guide_team', age: '4 days ago', score: 3, body: 'Preset naming in portal helps separate those modes.' },
    ],
  },
  {
    slug: 'wrong-tier-refund',
    category: 'General',
    categoryTone: 'purple',
    title: 'Bought Elite but only needed Lite — options?',
    excerpt: 'Discord ticket with order email; do not chargeback blindly.',
    author: 'buyer_regret',
    age: '5 days ago',
    commentsCount: 2,
    upvotes: 20,
    body: [
      'Misread comparison table. Support asked for order ID and explained downgrade policy. Took a few days but we moved to Pro instead of eating Elite cost.',
    ],
    comments: [
      { author: 'guide_team', age: '4 days ago', score: 8, body: 'Read comparison and FAQ before paying when unsure.' },
      { author: 'patient_buyer', age: '4 days ago', score: 4, body: 'Chargebacks burn portal access—ticket first.' },
    ],
  },
  {
    slug: 'factory-night-colors',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Color palette for Factory night',
    excerpt: 'Neon greens blow out on dark metal maps.',
    author: 'cqb_eyes',
    age: '5 days ago',
    commentsCount: 2,
    upvotes: 24,
    flair: 'ESP',
    body: [
      'Switched player boxes to soft cyan, distance text to off-white, loot to amber under 40m. Readable without blooming on night lighting.',
    ],
    comments: [
      { author: 'color_blind', age: '4 days ago', score: 7, body: 'Protanopia-friendly palettes exist in the ESP guide.' },
      { author: 'guide_team', age: '4 days ago', score: 4, body: 'Save a night preset; do not tweak mid-fight.' },
    ],
  },
  {
    slug: 'mac-parallels-no',
    category: 'General',
    categoryTone: 'purple',
    title: 'Anyone run this on Mac via Parallels?',
    excerpt: 'Official requirements are Windows native.',
    author: 'mac_try',
    age: '6 days ago',
    commentsCount: 2,
    upvotes: 15,
    body: [
      'Tried anyway—launcher errors and BE never happy. Built a small Windows box instead. Compatibility page matches what I saw.',
    ],
    comments: [
      { author: 'guide_team', age: '5 days ago', score: 6, body: 'Windows 10/11 only per product requirements.' },
      { author: 'linux_dual', age: '5 days ago', score: 3, body: 'Dual boot is the cheaper fix if you already have the license.' },
    ],
  },
  {
    slug: 'audio-vs-esp',
    category: 'Community',
    categoryTone: 'green',
    title: 'Relying on ESP instead of sound — bad habit?',
    excerpt: 'I turned footsteps up again and played better.',
    author: 'ear_training',
    age: '6 days ago',
    commentsCount: 3,
    upvotes: 38,
    body: [
      'Stopped wearing good headphones for a month, leaned on radar only. Deaths up. Back to proper audio, radar as backup—not replacement.',
    ],
    comments: [
      { author: 'audio_nerd', age: '5 days ago', score: 11, body: 'EQ profile for footsteps helped more than another ESP line.' },
      { author: 'guide_team', age: '5 days ago', score: 5, body: 'Awareness tier shines when it adds to info you already use.' },
      { author: 'solo_trio', age: '5 days ago', score: 4, body: 'Comms > extra loot ESP for our trio.' },
    ],
  },
  {
    slug: 'wifi-vs-ethernet',
    category: 'Community',
    categoryTone: 'green',
    title: 'Loader downloads fine on Wi‑Fi but feels laggy in raid',
    excerpt: 'Switched to ethernet for the gaming PC only.',
    author: 'wifi_life',
    age: '6 days ago',
    commentsCount: 2,
    upvotes: 22,
    body: [
      'Portal downloads were slow but okay. In-raid micro-stutter on wireless. Cable to the router fixed latency jitter—not magic, just stable ping.',
    ],
    comments: [
      { author: 'mesh_hater', age: '5 days ago', score: 6, body: 'Mesh extenders added lag for me too.' },
      { author: 'guide_team', age: '5 days ago', score: 3, body: 'Mention connection type in tickets if status is green but play feels off.' },
    ],
  },
  {
    slug: 'quest-item-clutter',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Hiding quest items I do not need this week',
    excerpt: 'Filter by category instead of turning all loot off.',
    author: 'quest_runner',
    age: '7 days ago',
    commentsCount: 2,
    upvotes: 19,
    body: [
      'Everything glowed during collector week. I hid generic barter and kept meds plus quest tags. Radar still showed players without the candy store effect.',
    ],
    comments: [
      { author: 'minimal_esp', age: '6 days ago', score: 5, body: 'Saved as “quest week” preset.' },
      { author: 'guide_team', age: '6 days ago', score: 4, body: 'ESP guide has filter examples.' },
    ],
  },
  {
    slug: 'duo-comms-overlay',
    category: 'Community',
    categoryTone: 'green',
    title: 'Do you callouts match your overlay?',
    excerpt: 'We synced names for directions vs radar pings.',
    author: 'duo_calls',
    age: '7 days ago',
    commentsCount: 2,
    upvotes: 27,
    body: [
      'Buddy said “north red” while my radar color key used blue for north. Small thing but we made a shared legend in Discord pins.',
    ],
    comments: [
      { author: 'igl_main', age: '6 days ago', score: 8, body: 'IGL writes callouts on paper once per wipe.' },
      { author: 'random_solo', age: '6 days ago', score: 3, body: 'Solo players can ignore this drama.' },
    ],
  },
  {
    slug: 'interim-wipe-patience',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Wipe day — loader status flipped three times',
    excerpt: 'Wait for a stable green note, not the first green.',
    author: 'wipe_veteran',
    age: '8 days ago',
    commentsCount: 2,
    upvotes: 44,
    flair: 'Wipe',
    body: [
      'Banner went green, then yellow, then green again within an hour. Staff posted a “stable build” message after—learned to wait for that second note.',
    ],
    comments: [
      { author: 'guide_team', age: '7 days ago', score: 12, body: 'Pin #status during wipe weekends.' },
      { author: 'loot_rush', age: '7 days ago', score: 6, body: 'I lost a kit rushing the first green.' },
    ],
  },
  {
    slug: 'thermal-map-colors',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'ESP colors on thermal-heavy maps',
    excerpt: 'Thin outlines beat thick boxes in heat haze.',
    author: 'thermal_maps',
    age: '8 days ago',
    commentsCount: 2,
    upvotes: 21,
    body: [
      'Thick boxes blended into bloom. Outline + distance text only, sat closer to crosshair comfortably.',
    ],
    comments: [
      { author: 'labs_rat', age: '7 days ago', score: 5, body: 'Same tweak on Streets at night.' },
      { author: 'guide_team', age: '7 days ago', score: 3, body: 'Save per-map presets when you rotate often.' },
    ],
  },
  {
    slug: 'shared-family-pc',
    category: 'General',
    categoryTone: 'purple',
    title: 'Family PC — separate Windows user for playing?',
    excerpt: 'Second account keeps profiles isolated.',
    author: 'family_gamer',
    age: '9 days ago',
    commentsCount: 2,
    upvotes: 17,
    body: [
      'Kid uses same tower for homework. Made a Windows user just for gaming, portal login only there. Fewer random shutdowns mid-download.',
    ],
    comments: [
      { author: 'guide_team', age: '8 days ago', score: 6, body: 'Do not share portal email across people.' },
      { author: 'dad_raid', age: '8 days ago', score: 4, body: 'Password manager entry for order email helps.' },
    ],
  },
  {
    slug: 'chargeback-warning',
    category: 'General',
    categoryTone: 'purple',
    title: 'Chargeback locked portal — how to fix?',
    excerpt: 'Ticket with payment proof beats disputing with bank.',
    author: 'bank_dispute',
    age: '9 days ago',
    commentsCount: 2,
    upvotes: 31,
    flair: 'Billing',
    body: [
      'Disputed with card issuer before emailing support. Portal locked until support verified the sale manually. Took a week and patience.',
    ],
    comments: [
      { author: 'guide_team', age: '8 days ago', score: 14, body: 'Always ticket first for billing issues.' },
      { author: 'patient_buyer', age: '8 days ago', score: 5, body: 'Learned the hard way.' },
    ],
  },
  {
    slug: 'scav-karma-overlay',
    category: 'Community',
    categoryTone: 'green',
    title: 'Scav runs — radar off, audio up?',
    excerpt: 'Lighter overlay on quick fence trips.',
    author: 'fence_runner',
    age: '10 days ago',
    commentsCount: 2,
    upvotes: 18,
    body: [
      'Full radar on scav felt like cheating myself—PMC sound cues matter. I run a “scav light” preset with player ESP only.',
    ],
    comments: [
      { author: 'rat_pack', age: '9 days ago', score: 4, body: 'Factory rat pack still uses full radar. Personal taste.' },
      { author: 'guide_team', age: '9 days ago', score: 3, body: 'Named presets swap faster than toggling fifteen checkboxes.' },
    ],
  },
  {
    slug: 'second-monitor-map',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Wiki map on second monitor — legal enough?',
    excerpt: 'Community maps alongside overlay are fine; trust your comfort level.',
    author: 'map_notes',
    age: '10 days ago',
    commentsCount: 2,
    upvotes: 25,
    body: [
      'Browser map on iPad beside monitor. Overlay on game screen only. No conflict, just personal workflow.',
    ],
    comments: [
      { author: 'old_school', age: '9 days ago', score: 6, body: 'Paper map era nostalgia.' },
      { author: 'guide_team', age: '9 days ago', score: 3, body: 'Workflow tips are personal—focus on what you can read mid-fight.' },
    ],
  },
  {
    slug: 'vpn-portal-login',
    category: 'General',
    categoryTone: 'purple',
    title: 'VPN on when opening the portal?',
    excerpt: 'Some buyers toggle VPN off for downloads.',
    author: 'vpn_user',
    age: '11 days ago',
    commentsCount: 3,
    upvotes: 20,
    body: [
      'Corporate VPN blocked portal CDN. Paused VPN for download, re-enabled after. Home users say split tunneling works too.',
    ],
    comments: [
      { author: 'corp_laptop', age: '10 days ago', score: 7, body: 'IT whitelist might be needed on work machines.' },
      { author: 'guide_team', age: '10 days ago', score: 5, body: 'Paste VPN provider in ticket if downloads fail intermittently.' },
      { author: 'no_vpn', age: '10 days ago', score: 2, body: 'Never needed VPN here.' },
    ],
  },
  {
    slug: 'bulkhead-timing',
    category: 'Community',
    categoryTone: 'green',
    title: 'Timing extracts with radar distance ticks',
    excerpt: 'Countdown plus player dots reduced extract camping surprises.',
    author: 'extract_timer',
    age: '11 days ago',
    commentsCount: 2,
    upvotes: 23,
    body: [
      'Watch dots inside 150m when extract timer starts. If empty for twenty seconds, I commit. Saved me from sitting on D-2 with company.',
    ],
    comments: [
      { author: 'late_spawn', age: '10 days ago', score: 6, body: 'Still check corners—dots are not wall hacks.' },
      { author: 'guide_team', age: '10 days ago', score: 3, body: 'Pair awareness tools with normal extract habits.' },
    ],
  },
];

export const forumPosts: ForumPost[] = [
  ...playerDiscussionThreads,
  ...communityThreads,
  {
    slug: 'admin-official', category: 'General', categoryTone: 'purple',
    title: 'Do modules work on live raids after setup?',
    excerpt: 'Yes—through the external loader. There is no in-game console for live matchmaking.',
    author: 'guide_team', age: '2 hours ago', commentsCount: 3, upvotes: 128, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov hacks guide: loader setup in Hideout range or offline raids', sourcePath: '/blog/cheat-codes/',
    body: [
      'Live raids use normal matchmaking—you are not hosting a private server. Tools run through the loader from your portal, not in-game codes.',
      'Test in offline or a low-stakes run first: import a conservative preset, verify alignment, then go live when the status banner is green.',
    ],
    comments: [
      { author: 'base_builder_42', age: '1 hour ago', score: 24, body: 'Hideout range first saved me—caught overlay scaling issues before I took loot to a live raid.' },
      { author: 'm4_main', age: '48 min. ago', score: 11, body: 'Status banner is non-negotiable after Tarkov patches. Wait for the build note in Discord #status.' },
      { author: 'scrap_collector', age: '35 min. ago', score: 8, body: 'Loader is the product. Random console lists from other games do not apply to Escape from Tarkov.' },
    ],
  },
  {
    slug: 'f1-console', category: 'General', categoryTone: 'purple',
    title: 'How do I install the loader after checkout?',
    excerpt: 'Use the Hideout range first. Here is the quick setup from our walkthrough, including how to test modules before live raids.',
    author: 'guide_team', age: '4 hours ago', commentsCount: 2, upvotes: 86, flair: 'Guide Q&A',
    sourceTitle: 'How to use your loader after checkout', sourcePath: '/blog/use-codes/',
    body: ['Escape from Tarkov Hacks run through the external loader—not in-game console codes. On a Hideout shooting range or an offline raid, install the loader, import a conservative preset, and verify ESP before you queue for Customs or Labs runs.', 'If a module does nothing, confirm the live status banner is online, restart the loader after patches, and open a Discord ticket with your order ID.'],
    comments: [
      { author: 'raid_runner', age: '3 hours ago', score: 17, body: 'Portal → download loader → run as admin once → load preset. That order is in the use-codes guide.' },
      { author: 'carry_curious', age: '2 hours ago', score: 9, body: 'If Windows SmartScreen blocks the loader, use the hash from the portal and allow through Discord ticket steps.' },
    ],
  },
  {
    slug: 'spray-safe', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'Safest way to Practice recoil patterns?',
    excerpt: 'Practice spray control on a Hideout shooting range or an offline raid with a target wall before live seasons.',
    author: 'guide_team', age: '6 hours ago', commentsCount: 2, upvotes: 64, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov aim and recoil practice tips', sourcePath: '/blog/console-tips/',
    body: ['Practice on your own Hideout shooting range or an offline raid. Give yourself the weapon and ammo, spray at a wall from a fixed distance, and compare each burst so you can see how the pattern climbs and drifts.', 'The guide also covers tools like the training range and spectator camera, which help you inspect sight lines and compound layouts without waiting for real in-game progress.'],
    comments: [
      { author: 'stack_and_pull', age: '5 hours ago', score: 13, body: 'I mark the wall after every magazine to see the shape. It makes controlling a M4A1 spray much easier to learn.' },
      { author: 'map_reader', age: '4 hours ago', score: 6, body: 'And the debug camera is handy when you want to check angles on your stash route before a major patch.' },
    ],
  },
  {
    slug: 'after-patch', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after a BattlEye or game patch?',
    excerpt: 'The patch-day checklist recommends checking build status, updating, and testing on a quiet test session before a real session.',
    author: 'guide_team', age: '9 hours ago', commentsCount: 2, upvotes: 42, flair: 'Guide Q&A',
    sourceTitle: 'BattlEye patch day checklist for Escape from Tarkov hacks', sourcePath: '/blog/be-patch/',
    body: ['Check the current build and status notice first. After a game or BattlEye update, wait for a compatible build, update the loader, then verify the setup on a quiet or Hideout shooting range or an offline raid before returning to busy Customs raids.', 'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies. The checklist covers the patch-day routine in more detail.'],
    comments: [
      { author: 'patch_day_vet', age: '8 hours ago', score: 12, body: 'Testing after the update before a real session is the part I used to skip. Now I check the build note and run a quick private test.' },
      { author: 'roamer_main_5', age: '7 hours ago', score: 7, body: 'Agree. If the status has not caught up, wait. A checklist is better than guessing.' },
    ],
  },
  {
    slug: 'lite-or-pro', category: 'Community', categoryTone: 'green',
    title: 'Lite tier or Pro: which tier includes aim assist?',
    excerpt: 'Lite tier is vision tools; Pro adds aimbot and recoil. See which hack tier to buy for your PvP style.',
    author: 'guide_team', age: '12 hours ago', commentsCount: 1, upvotes: 31, flair: 'Guide Q&A',
    sourceTitle: 'Lite tier vs Pro: which tier fits you', sourcePath: '/blog/lite-vs-pro/',
    body: ['According to the comparison guide, Lite centers on awareness features such as player ESP, loot and resource ESP, radar, FOV and stream-proof options. Pro includes those features and adds Aimbot, Soft Aim, Bone Select, Trigger Bot and No Recoil.', 'The best fit depends on which features you need. Read the full comparison before choosing.'],
    comments: [
      { author: 'one_more_raid', age: '10 hours ago', score: 10, body: 'The comparison page is useful because it shows which modules are included in each tier instead of only listing headlines.' },
    ],
  },
  {
    slug: 'spray-server', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'Practice spray control without risking kit?',
    excerpt: 'Create a Hideout shooting range or an offline raid, spawn a target and use offline recoil drills for M4A1 and MP7 recoil.',
    author: 'guide_team', age: '1 day ago', commentsCount: 2, upvotes: 27, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov hacks guide: loader setup in Hideout range or offline raids', sourcePath: '/blog/cheat-codes/',
    body: ['Use the Hideout shooting range or an offline raid with the same weapon and ammo each attempt. Spray at a wall from a fixed distance and compare bursts so you see climb and horizontal drift.', 'When values feel stable, copy the profile into the loader before Customs or Labs. The linked loader guide covers conservative presets and post-patch checks.'],
    comments: [
      { author: 'm4_main', age: '20 hours ago', score: 10, body: 'Start with a wall target and repeat the same spray until the pattern feels automatic.' },
      { author: 'base_builder_42', age: '18 hours ago', score: 5, body: 'Enable damage when you want to practice with normal damage and healing constraints.' },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
