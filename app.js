const WEAPONS = [
  { id: 0, name: 'Rusty Sword', cost: 0, damage: 10, unlocked: true, rarity: 'Starter' },
  { id: 1, name: 'Flame Blade', cost: 35, damage: 18, unlocked: false, rarity: 'Rare' },
  { id: 2, name: 'Thunder Hammer', cost: 75, damage: 28, unlocked: false, rarity: 'Epic' },
  { id: 3, name: 'Arcane Scythe', cost: 120, damage: 38, unlocked: false, rarity: 'Legendary' }
];

const ARMOR = [
  { id: 0, name: 'Leather Armor', cost: 20, block: 4, unlocked: true, rarity: 'Starter' },
  { id: 1, name: 'Steel Armor', cost: 55, block: 8, unlocked: false, rarity: 'Rare' },
  { id: 2, name: 'Royal Armor', cost: 110, block: 14, unlocked: false, rarity: 'Epic' }
];

const CHARACTERS = [
  { id: 0, name: 'Shadow Mage', emoji: '🧙', health: 100, description: 'A stealthy spellcaster with strong burst damage.', unlocked: true, isDefault: true },
  { id: 1, name: 'Iron Knight', emoji: '🛡️', health: 130, description: 'A fearless tank built for survival.', unlocked: false, isDefault: true },
  { id: 2, name: 'Storm Ranger', emoji: '🏹', health: 110, description: 'A high-speed hunter with precise attacks.', unlocked: false, isDefault: true }
];

const REGIONS = [
  { name: 'Forest Path', difficulty: 'Easy', reward: '45 coins', description: 'Calm woods with low danger.' },
  { name: 'Crystal Cave', difficulty: 'Medium', reward: '65 coins', description: 'Flickering crystals and hidden monsters.' },
  { name: 'Sunken Ruins', difficulty: 'Hard', reward: '90 coins', description: 'Ancient ruins filled with traps.' },
  { name: 'Sky Keep', difficulty: 'Elite', reward: '120 coins', description: 'A towering fortress in the sky.' },
  { name: 'Volcanic Gate', difficulty: 'Boss', reward: '150 coins', description: 'Legendary fire beast territory.' }
];

const QUESTS = [
  'Defeat 3 enemies to unlock the next region.',
  'Upgrade your weapon to increase damage output.',
  'Claim 150 coins to buy Royal Armor.',
  'Create a custom hero if you are the owner.'
];

const DEFAULT_STATE = {
  username: '',
  isOwner: false,
  coins: 50,
  health: 100,
  level: 1,
  bossesDefeated: 0,
  weaponIndex: 0,
  armorIndex: 0,
  selectedCharacter: 0,
  characters: [...CHARACTERS],
  customCharacters: []
};

function loadProgress() {
  try {
    const raw = localStorage.getItem('pixelQuestState');
    if (!raw) return structuredClone(DEFAULT_STATE);
    const saved = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...saved,
      characters: [
        ...CHARACTERS.map((char) => ({ ...char })),
        ...((saved.customCharacters || []).map((ch) => ({ ...ch })))
      ],
      customCharacters: saved.customCharacters || []
    };
  } catch (error) {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveProgress(state) {
  localStorage.setItem('pixelQuestState', JSON.stringify(state));
}

function isOwnerUsername(name) {
  return String(name || '').toLowerCase().includes('yo_kev');
}
