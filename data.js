<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pixel Quest Arena</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: linear-gradient(180deg, #0b1220, #111827);
      color: #f8fafc;
      font-family: Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .arena-shell {
      width: min(980px, 100%);
      background: rgba(15, 23, 42, 0.8);
      border: 2px solid rgba(125, 211, 252, 0.4);
      border-radius: 18px;
      padding: 20px;
      box-shadow: 0 20px 50px rgba(14, 116, 144, 0.25);
    }
    .hud {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      font-size: 1.05rem;
    }
    .stats-inline {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .bar-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .bar {
      width: 160px;
      height: 14px;
      border-radius: 10px;
      background: rgba(148, 163, 184, 0.18);
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #ef4444, #22c55e);
      transition: width 0.2s ease;
    }
    canvas {
      display: block;
      width: 100%;
      max-width: 820px;
      height: auto;
      margin: 0 auto;
      border-radius: 14px;
      border: 4px solid rgba(56, 189, 248, 0.7);
      background: #0f172a;
      box-shadow: 0 20px 40px rgba(14, 116, 144, 0.3);
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 12px;
      margin-top: 14px;
      align-items: center;
    }
    .message {
      color: #fbbf24;
      font-weight: bold;
      min-height: 24px;
    }
    button {
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      border: none;
      border-radius: 10px;
      padding: 10px 16px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="arena-shell">
    <div class="hud">
      <div class="stats-inline">
        <div class="bar-wrap"><strong>Health</strong> <div class="bar"><div id="healthBar" class="bar-fill" style="width: 100%"></div></div> <span id="healthValue">100</span></div>
        <div class="bar-wrap"><strong>Enemy</strong> <div class="bar"><div id="enemyBar" class="bar-fill" style="width: 100%"></div></div> <span id="enemyValue">120</span></div>
      </div>
      <div class="stats-inline">
        <span>💎 <strong id="coinsValue">50</strong></span>
        <span>⚔ <strong id="weaponValue">Rusty Sword</strong></span>
      </div>
    </div>

    <div class="controls">
      <div class="message" id="messageBox">Forest trial begins!</div>
      <button onclick="nextLevel()">Next Region</button>
      <button onclick="restartBattle()">Restart</button>
    </div>

    <canvas id="gameCanvas" width="820" height="450"></canvas>
  </div>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const healthBar = document.getElementById('healthBar');
    const enemyBar = document.getElementById('enemyBar');
    const healthValue = document.getElementById('healthValue');
    const enemyValue = document.getElementById('enemyValue');
    const coinsValue = document.getElementById('coinsValue');
    const weaponValue = document.getElementById('weaponValue');
    const messageBox = document.getElementById('messageBox');

    const LEVELS = [
      { name: 'Forest Path', enemy: 'Forest Beast', hp: 120, reward: 45, color: '#f97316' },
      { name: 'Crystal Cave', enemy: 'Stone Wisp', hp: 150, reward: 65, color: '#22d3ee' },
      { name: 'Sunken Ruins', enemy: 'Mire Guardian', hp: 185, reward: 90, color: '#a78bfa' },
      { name: 'Sky Keep', enemy: 'Storm Seraph', hp: 220, reward: 120, color: '#facc15' },
      { name: 'Volcanic Gate', enemy: 'Inferno Titan', hp: 260, reward: 150, color: '#fb7185' }
    ];

    const WEAPONS = [
      { name: 'Rusty Sword', damage: 10 },
      { name: 'Flame Blade', damage: 18 },
      { name: 'Thunder Hammer', damage: 28 },
      { name: 'Arcane Scythe', damage: 38 }
    ];

    const ARMOR = [
      { name: 'Leather Armor', block: 4 },
      { name: 'Steel Armor', block: 8 },
      { name: 'Royal Armor', block: 14 }
    ];

    const saved = JSON.parse(localStorage.getItem('pixelQuestState') || '{}');
    const startingWeaponIndex = Number(saved.weaponIndex || 0);
    const startingArmorIndex = Number(saved.armorIndex || 0);
    const startingCoins = Number(saved.coins || 50);
    const savedHealth = Number(saved.health || 100);
    const savedLevel = Number(saved.level || 1);

    const player = {
      x: 110,
      y: 220,
      w: 26,
      h: 26,
      speed: 3.5,
      health: savedHealth,
      maxHealth: 100,
      coins: startingCoins,
      attackCooldown: 0,
      hitFlash: 0,
      facing: 1,
      damage: WEAPONS[startingWeaponIndex].damage,
      armorIndex: startingArmorIndex,
      weaponIndex: startingWeaponIndex
    };

    let levelIndex = Math.min(savedLevel - 1, LEVELS.length - 1);
    let boss = createBoss(levelIndex);
    const keys = {};

    function createBoss(index) {
      const level = LEVELS[index];
      return {
        name: level.enemy,
        x: 640,
        y: 200,
        w: 44,
        h: 44,
        health: level.hp,
        maxHealth: level.hp,
        alive: true,
        attackCooldown: 0,
        color: level.color
      };
    }

    function saveProgress() {
      const state = JSON.parse(localStorage.getItem('pixelQuestState') || '{}');
      state.coins = player.coins;
      state.health = player.health;
      state.weaponIndex = player.weaponIndex;
      state.armorIndex = player.armorIndex;
      state.level = levelIndex + 1;
      localStorage.setItem('pixelQuestState', JSON.stringify(state));
    }

    function syncStats() {
      const hpRatio = Math.max(0, Math.min(1, player.health / player.maxHealth));
      const enemyRatio = Math.max(0, Math.min(1, boss.health / boss.maxHealth));
      healthBar.style.width = `${hpRatio * 100}%`;
      enemyBar.style.width = `${enemyRatio * 100}%`;
      healthValue.textContent = Math.max(0, Math.ceil(player.health));
      enemyValue.textContent = Math.max(0, Math.ceil(boss.health));
      coinsValue.textContent = player.coins;
      weaponValue.textContent = WEAPONS[player.weaponIndex].name;
    }

    function nextLevel() {
      if (boss.alive) {
        messageBox.textContent = 'Defeat the current enemy before moving on.';
        return;
      }

      if (levelIndex < LEVELS.length - 1) {
        levelIndex += 1;
        boss = createBoss(levelIndex);
        messageBox.textContent = `Entered ${LEVELS[levelIndex].name}!`;
      } else {
        levelIndex = 0;
        boss = createBoss(levelIndex);
        messageBox.textContent = 'You completed the world and started again!';
      }

      saveProgress();
      syncStats();
    }

    function restartBattle() {
      player.health = player.maxHealth;
      player.attackCooldown = 0;
      player.hitFlash = 0;
      boss = createBoss(levelIndex);
      messageBox.textContent = `${LEVELS[levelIndex].name} reset!`;
      saveProgress();
      syncStats();
    }

    function attack() {
      if (player.attackCooldown > 0 || !boss.alive) return;

      const dx = boss.x - player.x;
      const dy = boss.y - player.y;
      if (Math.abs(dx) > 90 || Math.abs(dy) > 80) {
        messageBox.textContent = 'Move closer to attack!';
        return;
      }

      const dmg = player.damage;
      boss.health -= dmg;
      player.attackCooldown = 0.45;
      messageBox.textContent = `${boss.name} takes ${dmg} damage!`;

      if (boss.health <= 0) {
        boss.health = 0;
        boss.alive = false;
        const reward = LEVELS[levelIndex].reward;
        player.coins += reward;
        messageBox.textContent = `${boss.name} defeated! You earned ${reward} coins.`;
        saveProgress();
      }

      syncStats();
    }

    function updatePlayer() {
      const left = keys.a || keys.ArrowLeft;
      const right = keys.d || keys.ArrowRight;
      const up = keys.w || keys.ArrowUp;
      const down = keys.s || keys.ArrowDown;

      if (left) { player.x -= player.speed; player.facing = -1; }
      if (right) { player.x += player.speed; player.facing = 1; }
      if (up) player.y -= player.speed;
      if (down) player.y += player.speed;

      player.x = Math.max(20, Math.min(canvas.width - player.w - 20, player.x));
      player.y = Math.max(20, Math.min(canvas.height - player.h - 20, player.y));

      if (player.attackCooldown > 0) player.attackCooldown -= 1 / 60;
      if (player.hitFlash > 0) player.hitFlash -= 1 / 60;
    }

    function updateBoss() {
      if (!boss.alive) return;

      const dx = player.x - boss.x;
      const dy = player.y - boss.y;
      if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
        boss.x += Math.sign(dx) * 1.6;
        boss.y += Math.sign(dy) * 1.2;
      }

      if (boss.attackCooldown > 0) boss.attackCooldown -= 1 / 60;

      const inRange = Math.abs(dx) < 30 && Math.abs(dy) < 30;
      if (inRange && boss.attackCooldown <= 0) {
        const block = ARMOR[player.armorIndex]?.block || 0;
        const reduced = Math.max(0, 12 - block);
        player.health -= reduced;
        player.hitFlash = 0.45;
        boss.attackCooldown = 0.9;
        messageBox.textContent = `${boss.name} hit you for ${reduced}!`;

        if (player.health <= 0) {
          player.health = 0;
          messageBox.textContent = 'You were defeated! Press restart.';
        }

        saveProgress();
        syncStats();
      }
    }

    function drawGround() {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 14; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#1e293b' : '#111827';
        ctx.fillRect(i * 60, 0, 60, canvas.height);
      }

      ctx.fillStyle = '#14532d';
      ctx.fillRect(0, canvas.height - 38, canvas.width, 38);
    }

    function drawPlayer() {
      ctx.fillStyle = player.hitFlash > 0 ? '#fca5a5' : '#38bdf8';
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(player.x + (player.facing > 0 ? player.w : -6), player.y + 7, 6, 6);
    }

    function drawBoss() {
      if (!boss.alive) return;
      ctx.fillStyle = boss.color;
      ctx.fillRect(boss.x, boss.y, boss.w, boss.h);

      ctx.fillStyle = '#111827';
      ctx.fillRect(boss.x - 5, boss.y - 12, boss.w + 10, 7);
      ctx.fillStyle = '#22c55e';
      const ratio = boss.health / boss.maxHealth;
      ctx.fillRect(boss.x - 5, boss.y - 12, (boss.w + 10) * ratio, 7);
    }

    function render() {
      drawGround();
      drawPlayer();
      drawBoss();
    }

    function gameLoop() {
      updatePlayer();
      updateBoss();
      render();
      requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      keys[key] = true;
      if (event.code === 'Space') {
        event.preventDefault();
        attack();
      }
    });

    window.addEventListener('keyup', (event) => {
      const key = event.key.toLowerCase();
      keys[key] = false;
    });

    syncStats();
    requestAnimationFrame(gameLoop);
  </script>
</body>
</html>
