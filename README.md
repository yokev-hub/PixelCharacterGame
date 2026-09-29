const appState = loadProgress();

function setScreenVisibility() {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  const active = document.getElementById('authScreen');
  if (appState.username && document.getElementById('homeScreen')) {
    document.getElementById('homeScreen').classList.add('active');
  } else if (document.getElementById('authScreen')) {
    document.getElementById('authScreen').classList.add('active');
  }
}

function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeNav = Array.from(document.querySelectorAll('.nav-btn')).find(btn => btn.textContent.includes(screenId.replace('Screen', '').replace('home', 'Home')));
  if (activeNav) activeNav.classList.add('active');
}

function renderHomeStats() {
  const coinsEl = document.getElementById('homeCoins');
  const levelEl = document.getElementById('homeLevel');
  const bossEl = document.getElementById('homeBossesDefeated');
  const heroEl = document.getElementById('homeCharactersOwned');
  const nameEl = document.getElementById('playerName');
  const userLabel = document.getElementById('currentUserLabel');

  if (coinsEl) coinsEl.textContent = appState.coins;
  if (levelEl) levelEl.textContent = appState.level;
  if (bossEl) bossEl.textContent = appState.bossesDefeated;
  if (heroEl) heroEl.textContent = appState.characters.length;
  if (nameEl) nameEl.textContent = appState.username || 'Adventurer';
  if (userLabel) userLabel.textContent = appState.username || 'Guest';
}

function renderInventory() {
  const weaponList = document.getElementById('weaponsList');
  const armorList = document.getElementById('armorList');

  if (weaponList) {
    weaponList.innerHTML = WEAPONS.map(item => {
      const owned = appState.weaponIndex === item.id || item.unlocked;
      const selected = appState.weaponIndex === item.id;
      return `
        <div class="item-card ${selected ? 'selected' : ''}">
          <div class="item-header">
            <h3>${item.name}</h3>
            <span class="rarity">${item.rarity}</span>
          </div>
          <p>Damage: ${item.damage}</p>
          <p>Cost: ${item.cost} coins</p>
          <button class="btn ${owned ? 'btn-secondary' : 'btn-primary'}" onclick="buyWeapon(${item.id})">
            ${selected ? 'Equipped' : owned ? 'Equip' : 'Buy'}
          </button>
        </div>
      `;
    }).join('');
  }

  if (armorList) {
    armorList.innerHTML = ARMOR.map(item => {
      const selected = appState.armorIndex === item.id;
      const owned = item.unlocked;
      return `
        <div class="item-card ${selected ? 'selected' : ''}">
          <div class="item-header">
            <h3>${item.name}</h3>
            <span class="rarity">${item.rarity}</span>
          </div>
          <p>Block: ${item.block}</p>
          <p>Cost: ${item.cost} coins</p>
          <button class="btn ${owned ? 'btn-secondary' : 'btn-primary'}" onclick="buyArmor(${item.id})">
            ${selected ? 'Equipped' : owned ? 'Equip' : 'Buy'}
          </button>
        </div>
      `;
    }).join('');
  }
}

function renderShop() {
  const shopWeapons = document.getElementById('shopWeapons');
  const shopArmor = document.getElementById('shopArmor');
  const shopCoins = document.getElementById('shopCoins');

  if (shopCoins) shopCoins.textContent = appState.coins;

  if (shopWeapons) {
    shopWeapons.innerHTML = WEAPONS.map(item => {
      const owned = item.unlocked || appState.weaponIndex === item.id;
      return `
        <div class="item-card">
          <h3>${item.name}</h3>
          <p>Damage: ${item.damage}</p>
          <p>Cost: ${item.cost}</p>
          <button class="btn ${owned ? 'btn-secondary' : 'btn-primary'}" onclick="buyWeapon(${item.id})">
            ${owned ? 'Owned' : 'Buy'}
          </button>
        </div>
      `;
    }).join('');
  }

  if (shopArmor) {
    shopArmor.innerHTML = ARMOR.map(item => {
      const owned = item.unlocked || appState.armorIndex === item.id;
      return `
        <div class="item-card">
          <h3>${item.name}</h3>
          <p>Block: ${item.block}</p>
          <p>Cost: ${item.cost}</p>
          <button class="btn ${owned ? 'btn-secondary' : 'btn-primary'}" onclick="buyArmor(${item.id})">
            ${owned ? 'Owned' : 'Buy'}
          </button>
        </div>
      `;
    }).join('');
  }
}

function renderCharacters() {
  const charactersList = document.getElementById('charactersList');
  const ownerSection = document.getElementById('ownerSection');

  if (charactersList) {
    charactersList.innerHTML = appState.characters.map((character, idx) => {
      const selected = appState.selectedCharacter === idx;
      return `
        <div class="character-card ${selected ? 'selected' : ''}">
          <div class="character-emoji">${character.emoji}</div>
          <h3>${character.name}</h3>
          <p>${character.description}</p>
          <div class="inline-actions">
            <button class="btn ${selected ? 'btn-secondary' : 'btn-primary'}" onclick="selectCharacter(${idx})">
              ${selected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  if (ownerSection) {
    ownerSection.style.display = appState.isOwner ? 'block' : 'none';
  }
}

function authenticate() {
  const usernameInput = document.getElementById('usernameInput');
  const username = (usernameInput?.value || '').trim();

  if (!username) {
    alert('Please enter a username.');
    return;
  }

  appState.username = username;
  appState.isOwner = isOwnerUsername(username);
  saveProgress(appState);

  renderHomeStats();
  renderInventory();
  renderShop();
  renderCharacters();
  showScreen('homeScreen');
}

function logout() {
  appState.username = '';
  appState.isOwner = false;
  saveProgress(appState);
  const input = document.getElementById('usernameInput');
  if (input) input.value = '';
  document.getElementById('authScreen')?.classList.add('active');
  document.getElementById('homeScreen')?.classList.remove('active');
  document.getElementById('gameScreen')?.classList.remove('active');
  document.getElementById('inventoryScreen')?.classList.remove('active');
  document.getElementById('charactersScreen')?.classList.remove('active');
  document.getElementById('shopScreen')?.classList.remove('active');
}

function buyWeapon(index) {
  const item = WEAPONS[index];
  if (!item) return;

  if (appState.weaponIndex === index) {
    appState.weaponIndex = index;
    saveProgress(appState);
    renderInventory();
    renderShop();
    return;
  }

  if (item.cost <= appState.coins) {
    appState.coins -= item.cost;
    appState.weaponIndex = index;
    item.unlocked = true;
    saveProgress(appState);
    renderHomeStats();
    renderInventory();
    renderShop();
  } else {
    alert(`You need ${item.cost - appState.coins} more coins`);
  }
}

function buyArmor(index) {
  const item = ARMOR[index];
  if (!item) return;

  if (appState.armorIndex === index) {
    appState.armorIndex = index;
    saveProgress(appState);
    renderInventory();
    renderShop();
    return;
  }

  if (item.cost <= appState.coins) {
    appState.coins -= item.cost;
    appState.armorIndex = index;
    item.unlocked = true;
    saveProgress(appState);
    renderHomeStats();
    renderInventory();
    renderShop();
  } else {
    alert(`You need ${item.cost - appState.coins} more coins`);
  }
}

function selectCharacter(index) {
  appState.selectedCharacter = index;
  saveProgress(appState);
  renderCharacters();
}

function showAddCharacterForm() {
  const form = document.getElementById('addCharacterForm');
  if (form) form.style.display = 'block';
}

function hideAddCharacterForm() {
  const form = document.getElementById('addCharacterForm');
  if (form) form.style.display = 'none';
}

function addCharacter() {
  if (!appState.isOwner) {
    alert('Only the owner can add characters.');
    return;
  }

  const nameInput = document.getElementById('newCharName');
  const emojiInput = document.getElementById('newCharEmoji');
  const healthInput = document.getElementById('newCharHealth');
  const descInput = document.getElementById('newCharDesc');

  const name = (nameInput?.value || '').trim();
  const emoji = (emojiInput?.value || '').trim() || '⚔️';
  const health = Number(healthInput?.value || 100);
  const description = (descInput?.value || '').trim() || 'A new hero created by the owner.';

  if (!name) {
    alert('Character name is required.');
    return;
  }

  const newCharacter = {
    id: Date.now(),
    name,
    emoji,
    health,
    description,
    unlocked: true,
    isDefault: false
  };

  appState.characters.push(newCharacter);
  appState.customCharacters.push(newCharacter);
  saveProgress(appState);
  renderCharacters();
  hideAddCharacterForm();
}

function initApp() {
  renderHomeStats();
  renderInventory();
  renderShop();
  renderCharacters();
  setScreenVisibility();

  const usernameInput = document.getElementById('usernameInput');
  if (usernameInput && appState.username) {
    usernameInput.value = appState.username;
  }

  if (appState.username) {
    showScreen('homeScreen');
  }
}

window.addEventListener('DOMContentLoaded', initApp);
