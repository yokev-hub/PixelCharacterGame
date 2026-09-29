const WEAPONS = [
  { id: 0, name: 'Rusty Sword', cost: 0, damage: 10, unlocked: true, tier: 1 },
  { id: 1, name: 'Flame Blade', cost: 35, damage: 18, unlocked: false, tier: 2 },
  { id: 2, name: 'Thunder Hammer', cost: 75, damage: 28, unlocked: false, tier: 3 },
  { id: 3, name: 'Arcane Scythe', cost: 120, damage: 38, unlocked: false, tier: 4 }
];

const ARMOR = [
  { id: 0, name: 'Leather Armor', cost: 20, block: 4, unlocked: true, tier: 1 },
  { id: 1, name: 'Steel Armor', cost: 55, block: 8, unlocked: false, tier: 2 },
  { id: 2, name: 'Royal Armor', cost: 110, block: 14, unlocked: false, tier: 3 }
];

const HEROES = [
  { id: 1, name: 'Shadow Mage', emoji: '🧙', health: 100, desc: 'Stealthy spellcaster.', official: true },
  { id: 2, name: 'Iron Knight', emoji: '🛡️', health: 130, desc: 'Tough defender.', official: true },
  { id: 3, name: 'Storm Ranger', emoji: '🏹', health: 110, desc: 'Swift attacker.', official: true }
];

const REGIONS = [
  { id: 1, name: 'Forest Path', enemy: 'Forest Beast', hp: 120, reward: 45, color: '#f97316' },
  { id: 2, name: 'Crystal Cave', enemy: 'Stone Wisp', hp: 150, reward: 65, color: '#22d3ee' },
  { id: 3, name: 'Sunken Ruins', enemy: 'Mire Guardian', hp: 185, reward: 90, color: '#a78bfa' },
  { id: 4, name: 'Sky Keep', enemy: 'Storm Seraph', hp: 220, reward: 120, color: '#facc15' },
  { id: 5, name: 'Volcanic Gate', enemy: 'Inferno Titan', hp: 260, reward: 150, color: '#fb7185' }
];

const QUESTS = [
  'Defeat 3 enemies to progress.',
  'Buy upgraded gear from the shop.',
  'Collect 200 coins for Royal Armor.',
  'Create your own hero (owner only).'
];

const INITIAL_STATE = {
  username: '',
  isOwner: false,
  coins: 50,
  health: 100,
  level: 1,
  bosses: 0,
  weaponIdx: 0,
  armorIdx: 0,
  heroIdx: 0,
  heroes: [...HEROES],
  custom: []
};

function loadState() {
  try {
    const raw = localStorage.getItem('pqState');
    if (!raw) return JSON.parse(JSON.stringify(INITIAL_STATE));
    const saved = JSON.parse(raw);
    return {
      ...JSON.parse(JSON.stringify(INITIAL_STATE)),
      ...saved,
      heroes: [...HEROES, ...(saved.custom || [])],
      custom: saved.custom || []
    };
  } catch (e) {
    return JSON.parse(JSON.stringify(INITIAL_STATE));
  }
}

function saveState(state) {
  localStorage.setItem('pqState', JSON.stringify(state));
}

function isOwner(state) {
  return state.isOwner;
}

function markOwner(state) {
  state.isOwner = true;
  saveState(state);
}
