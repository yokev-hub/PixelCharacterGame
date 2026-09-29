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

const DEFAULT_CHARACTERS = [
  { id: 0, name: 'Shadow Mage', emoji: '🧙', health: 100, description: 'A stealthy spellcaster with strong burst damage.', unlocked: true, isDefault: true },
  { id: 1, name: 'Iron Knight', emoji: '🛡️', health: 130, description: 'A fearless tank built for survival.', unlocked: false, isDefault: true },
  { id: 2, name: 'Storm Ranger', emoji: '🏹', health: 110, description: 'A high-speed hunter with precise attacks.', unlocked: false, isDefault: true }
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
  characters: [...DEFAULT_CHARACTERS],
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
        ...DEFAULT_CHARACTERS.map(char => ({ ...char })),
        ...((saved.customCharacters || []).map(ch => ({ ...ch })))
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

function ensureOwnedItem(itemList, index) {
  if (!itemList[index]) return false;
  itemList[index].unlocked = true;
  return true;
}

function addCoins(amount) {
  const state = loadProgress();
  state.coins += amount;
  saveProgress(state);
}
