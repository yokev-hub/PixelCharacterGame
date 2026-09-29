let state = loadState();
let currentTab = 'home';

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const target = document.getElementById(tab + 'Tab');
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const clicked = document.querySelector(`.nav-item:nth-child(${tab === 'home' ? 1 : tab === 'battle' ? 2 : tab === 'inventory' ? 3 : tab === 'heroes' ? 4 : tab === 'shop' ? 5 : 6})`);
  if (clicked) clicked.classList.add('active');
}

function authenticate() {
  const input = document.getElementById('usernameInput').value.trim();
  if (!input) {
    alert('Enter a username');
    return;
  }

  if (!state.username) {
    state.isOwner = true;
    markOwner(state);
  }

  state.username = input;
  saveState(state);
  showHome();
}

function logout() {
  state.username = '';
  state.isOwner = false;
  saveState(state);
  document.getElementById('usernameInput').value = '';
  document.getElementById('authScreen').classList.add('active');
  document.getElementById('homeScreen').classList.remove('active');
}

function showHome() {
  document.getElementById('authScreen').classList.remove('active');
  document.getElementById('homeScreen').classList.add('active');
  updateStats();
  renderAll();
}

function updateStats() {
  document.getElementById('currentUser').textContent = state.username || 'Guest';
  document.getElementById('heroName').textContent = state.username || 'Adventurer';
  document.getElementById('coinCount').textContent = state.coins;
  document.getElementById('levelCount').textContent = state.level;
  document.getElementById('bossCount').textContent = state.bosses;
  document.getElementById('heroCount').textContent = state.heroes.length;
  document.getElementById('shopCoins').textContent = state.coins;

  const ownerPanel = document.getElementById('ownerTools');
  const ownerHeroTools = document.getElementById('ownerHeroTools');
  if (isOwner(state)) {
    ownerPanel.style.display = 'block';
    ownerHeroTools.style.display = 'block';
  } else {
    ownerPanel.style.display = 'none';
    ownerHeroTools.style.display = 'none';
  }
}

function renderAll() {
  renderWeapons();
  renderArmor();
  renderHeroes();
  renderShop();
  renderMap();
  renderQuests();
}

function renderWeapons() {
  const container = document.getElementById('weaponsList');
  container.innerHTML = WEAPONS.map(w => `
    <div class="item ${state.weaponIdx === w.id ? 'selected' : ''}">
      <h4>${w.name}</h4>
      <p>Dmg: ${w.damage}</p>
      <p>${w.cost} 💎</p>
      <button class="btn btn-small" onclick="buyWeapon(${w.id})">
        ${state.weaponIdx === w.id ? 'Equipped' : w.unlocked ? 'Equip' : 'Buy'}
      </button>
    </div>
  `).join('');
}

function renderArmor() {
  const container = document.getElementById('armorList');
  container.innerHTML = ARMOR.map(a => `
    <div class="item ${state.armorIdx === a.id ? 'selected' : ''}">
      <h4>${a.name}</h4>
      <p>Block: ${a.block}</p>
      <p>${a.cost} 💎</p>
      <button class="btn btn-small" onclick="buyArmor(${a.id})">
        ${state.armorIdx === a.id ? 'Equipped' : a.unlocked ? 'Equip' : 'Buy'}
      </button>
    </div>
  `).join('');
}

function renderHeroes() {
  const container = document.getElementById('heroesList');
  container.innerHTML = state.heroes.map((h, i) => `
    <div class="hero-card ${state.heroIdx === i ? 'active' : ''}">
      <div class="hero-emoji">${h.emoji}</div>
      <h4>${h.name}</h4>
      <p>${h.desc}</p>
      <button class="btn btn-small" onclick="selectHero(${i})">
        ${state.heroIdx === i ? 'Selected' : 'Select'}
      </button>
    </div>
  `).join('');
}

function renderShop() {
  const weapons = document.getElementById('shopWeapons');
  const armor = document.getElementById('shopArmor');

  weapons.innerHTML = WEAPONS.map(w => `
    <div class="item">
      <h4>${w.name}</h4>
      <p>Dmg: ${w.damage}</p>
      <p>${w.cost} 💎</p>
      <button class="btn btn-small" onclick="buyWeapon(${w.id})">
        ${w.unlocked ? 'Owned' : 'Buy'}
      </button>
    </div>
  `).join('');

  armor.innerHTML = ARMOR.map(a => `
    <div class="item">
      <h4>${a.name}</h4>
      <p>Block: ${a.block}</p>
      <p>${a.cost} 💎</p>
      <button class="btn btn-small" onclick="buyArmor(${a.id})">
        ${a.unlocked ? 'Owned' : 'Buy'}
      </button>
    </div>
  `).join('');
}

function renderMap() {
  const container = document.getElementById('mapList');
  container.innerHTML = REGIONS.map((r, i) => `
    <div class="map-item ${i < state.level ? 'unlocked' : 'locked'}">
      <h4>${r.name}</h4>
      <p>${r.enemy}</p>
      <p>Reward: ${r.reward} 💎</p>
    </div>
  `).join('');
}

function renderQuests() {
  const container = document.getElementById('questContainer');
  container.innerHTML = QUESTS.map(q => `
    <div class="quest-item">
      <span>✦</span> ${q}
    </div>
  `).join('');
}

function buyWeapon(id) {
  const w = WEAPONS[id];
  if (state.weaponIdx === id) return;

  if (w.cost > state.coins) {
    alert(`Need ${w.cost - state.coins} more coins`);
    return;
  }

  state.coins -= w.cost;
  state.weaponIdx = id;
  w.unlocked = true;
  saveState(state);
  updateStats();
  renderWeapons();
  renderArmor();
  renderShop();
}

function buyArmor(id) {
  const a = ARMOR[id];
  if (state.armorIdx === id) return;

  if (a.cost > state.coins) {
    alert(`Need ${a.cost - state.coins} more coins`);
    return;
  }

  state.coins -= a.cost;
  state.armorIdx = id;
  a.unlocked = true;
  saveState(state);
  updateStats();
  renderWeapons();
  renderArmor();
  renderShop();
}

function selectHero(idx) {
  state.heroIdx = idx;
  saveState(state);
  renderHeroes();
}

function showCreateHero() {
  document.getElementById('createHeroForm').style.display = 'block';
}

function hideCreateHero() {
  document.getElementById('createHeroForm').style.display = 'none';
}

function createHero() {
  if (!isOwner(state)) {
    alert('Owner only');
    return;
  }

  const name = document.getElementById('heroName').value.trim();
  const emoji = document.getElementById('heroEmoji').value.trim() || '⚔️';
  const health = Number(document.getElementById('heroHealth').value) || 100;
  const desc = document.getElementById('heroDesc').value.trim() || 'Custom hero';

  if (!name) {
    alert('Enter hero name');
    return;
  }

  const hero = { id: Date.now(), name, emoji, health, desc, official: false };
  state.custom.push(hero);
  state.heroes.push(hero);
  saveState(state);
  renderHeroes();
  hideCreateHero();
  document.getElementById('heroName').value = '';
  document.getElementById('heroDesc').value = '';
  document.getElementById('heroHealth').value = '100';
}

window.addEventListener('DOMContentLoaded', () => {
  if (state.username) {
    showHome();
  }
});
