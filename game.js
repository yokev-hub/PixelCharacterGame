const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const healthEl = document.getElementById('health');
const coinsEl = document.getElementById('coins');
const weaponEl = document.getElementById('weapon');
const heroEl = document.getElementById('hero');
const messageEl = document.getElementById('message');

const weapons = [
  { name: 'Rusty Sword', cost: 0, damage: 10 },
  { name: 'Flame Blade', cost: 35, damage: 18 },
  { name: 'Thunder Hammer', cost: 75, damage: 28 }
];

const armors = [
  { name: 'Leather Armor', cost: 20, block: 4 },
  { name: 'Steel Armor', cost: 55, block: 8 },
  { name: 'Royal Armor', cost: 110, block: 14 }
];

const player = {
  x: 120,
  y: 220,
  w: 24,
  h: 24,
  speed: 3.3,
  health: 100,
  maxHealth: 100,
  coins: 50,
  weaponIndex: 0,
  armorIndex: 0,
  attackCooldown: 0,
  hitFlash: 0,
  facing: 1,
  bossUnlocked: false,
  damage: 10
};

const boss = {
  name: 'Forest Beast',
  x: 610,
  y: 210,
  w: 40,
  h: 40,
  health: 120,
  maxHealth: 120,
  alive: true,
  attackCooldown: 0,
  state: 'idle'
};

const keys = {};

function syncStats() {
  healthEl.textContent = Math.max(0, Math.ceil(player.health));
  coinsEl.textContent = player.coins;
  weaponEl.textContent = weapons[player.weaponIndex].name;
}

function buyWeapon(index) {
  const weapon = weapons[index];

  if (player.weaponIndex === index) {
    messageEl.textContent = `${weapon.name} is already equipped.`;
    return;
  }

  if (player.coins >= weapon.cost) {
    player.coins -= weapon.cost;
    player.weaponIndex = index;
    player.damage = weapon.damage;
    messageEl.textContent = `${weapon.name} equipped!`;
    weaponEl.textContent = weapon.name;
    syncStats();
    return;
  }

  messageEl.textContent = `You need ${weapon.cost - player.coins} more coins.`;
}

function buyArmor(index) {
  const armor = armors[index];

  if (player.coins >= armor.cost) {
    player.coins -= armor.cost;
    player.armorIndex = index;
    messageEl.textContent = `${armor.name} equipped!`;
    syncStats();
    return;
  }

  messageEl.textContent = `You need ${armor.cost - player.coins} more coins.`;
}

function attack() {
  if (player.attackCooldown > 0 || !boss.alive) {
    return;
  }

  const dx = boss.x - player.x;
  const dy = boss.y - player.y;

  if (Math.abs(dx) > 90 || Math.abs(dy) > 80) {
    messageEl.textContent = 'Move closer to attack the boss!';
    return;
  }

  const dmg = player.damage;
  boss.health -= dmg;
  player.attackCooldown = 0.45;
  messageEl.textContent = `You hit the boss for ${dmg}!`;

  if (boss.health <= 0) {
    boss.health = 0;
    boss.alive = false;
    player.coins += 45;
    player.bossUnlocked = true;
    heroEl.textContent = '✅ Shadow Mage — Defeat the boss to unlock';
    messageEl.textContent = 'Forest Beast defeated! Shadow Mage unlocked!';
    heroEl.textContent = '✅ Shadow Mage — Unlocked';
    syncStats();
  }
}

function updatePlayer() {
  const left = keys['a'] || keys['ArrowLeft'];
  const right = keys['d'] || keys['ArrowRight'];
  const up = keys['w'] || keys['ArrowUp'];
  const down = keys['s'] || keys['ArrowDown'];

  if (left) {
    player.x -= player.speed;
    player.facing = -1;
  }
  if (right) {
    player.x += player.speed;
    player.facing = 1;
  }
  if (up) {
    player.y -= player.speed;
  }
  if (down) {
    player.y += player.speed;
  }

  player.x = Math.max(20, Math.min(canvas.width - player.w - 20, player.x));
  player.y = Math.max(20, Math.min(canvas.height - player.h - 20, player.y));

  if (player.attackCooldown > 0) {
    player.attackCooldown -= 1 / 60;
  }

  if (player.hitFlash > 0) {
    player.hitFlash -= 1 / 60;
  }
}

function updateBoss() {
  if (!boss.alive) {
    return;
  }

  const dx = player.x - boss.x;
  const dy = player.y - boss.y;

  if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
    boss.x += Math.sign(dx) * 1.5;
    boss.y += Math.sign(dy) * 1.2;
  }

  if (boss.attackCooldown > 0) {
    boss.attackCooldown -= 1 / 60;
  }

  const inRange = Math.abs(dx) < 30 && Math.abs(dy) < 30;
  if (inRange && boss.attackCooldown <= 0) {
    const reduced = Math.max(0, 12 - armors[player.armorIndex].block);
    player.health -= reduced;
    player.hitFlash = 0.4;
    boss.attackCooldown = 0.9;
    messageEl.textContent = `The boss hit you for ${reduced}!`;

    if (player.health <= 0) {
      player.health = 0;
      messageEl.textContent = 'You were defeated! Press F5 to try again.';
    }

    syncStats();
  }
}

function drawGround() {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 15; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#1e293b' : '#111827';
    ctx.fillRect(i * 60, 0, 60, canvas.height);
  }

  ctx.fillStyle = '#14532d';
  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
}

function drawPlayer() {
  ctx.fillStyle = player.hitFlash > 0 ? '#fca5a5' : '#38bdf8';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(player.x + (player.facing > 0 ? player.w : -6), player.y + 6, 6, 6);
}

function drawBoss() {
  if (!boss.alive) {
    return;
  }

  ctx.fillStyle = '#f97316';
  ctx.fillRect(boss.x, boss.y, boss.w, boss.h);

  ctx.fillStyle = '#111827';
  ctx.fillRect(boss.x - 5, boss.y - 10, boss.w + 10, 6);
  ctx.fillStyle = '#22c55e';
  const hpRatio = boss.health / boss.maxHealth;
  ctx.fillRect(boss.x - 5, boss.y - 10, (boss.w + 10) * hpRatio, 6);
}

function drawUI() {
  ctx.fillStyle = '#f8fafc';
  ctx.font = '16px Arial';
  ctx.fillText('Health', 20, 25);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(90, 12, 150, 12);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(90, 12, 150 * (player.health / player.maxHealth), 12);

  ctx.fillStyle = '#f8fafc';
  ctx.fillText('Boss', canvas.width - 190, 25);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(canvas.width - 120, 12, 100, 12);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(canvas.width - 120, 12, 100 * (boss.health / boss.maxHealth), 12);
}

function render() {
  drawGround();
  drawPlayer();
  drawBoss();
  drawUI();
}

function gameLoop() {
  updatePlayer();
  updateBoss();
  render();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
  keys[event.key.toLowerCase()] = true;

  if (event.code === 'Space') {
    event.preventDefault();
    attack();
  }
});

window.addEventListener('keyup', (event) => {
  keys[event.key.toLowerCase()] = false;
});

syncStats();
messageEl.textContent = 'Defeat the Forest Beast!';
player.damage = weapons[player.weaponIndex].damage;
requestAnimationFrame(gameLoop);
