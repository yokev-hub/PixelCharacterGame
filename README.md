:root {
  --dark: #020817;
  --bg: #0b1120;
  --card: rgba(15, 23, 42, 0.85);
  --border: rgba(148, 163, 184, 0.25);
  --text: #e2e8f0;
  --muted: #94a3b8;
  --green: #22c55e;
  --blue: #38bdf8;
  --gold: #fbbf24;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg, var(--dark) 0%, var(--bg) 100%);
  color: var(--text);
  min-height: 100vh;
}

button, input, textarea {
  font: inherit;
  color: inherit;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.btn-primary {
  background: linear-gradient(135deg, var(--green), #16a34a);
  color: white;
}

.btn-secondary {
  background: rgba(100, 116, 139, 0.8);
  color: white;
}

.btn-small {
  padding: 6px 10px;
  font-size: 0.9rem;
}

.full-width {
  width: 100%;
}

.screen {
  display: none;
}

.screen.active {
  display: block;
}

#authScreen {
  min-height: 100vh;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.auth-container {
  width: min(400px, 90vw);
}

.auth-box {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
}

.auth-box h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--muted);
  margin-bottom: 30px;
}

.form-section h2 {
  margin-bottom: 16px;
  font-size: 1.3rem;
}

.form-section input {
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
}

.form-section small {
  display: block;
  color: var(--muted);
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.header {
  max-width: 1200px;
  margin: 0 auto 20px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.header h1 {
  font-size: 2rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar {
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.nav-item {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.nav-item.active {
  background: rgba(56, 189, 248, 0.3);
  border-color: rgba(56, 189, 248, 0.7);
}

.content {
  max-width: 1200px;
  margin: 0 auto 30px;
  padding: 0 16px;
}

.tab {
  display: none;
}

.tab.active {
  display: block;
}

.hero-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.stat {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 8px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--gold);
}

.stat-label {
  color: var(--muted);
  font-size: 0.9rem;
}

.section {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
}

.section h3 {
  margin-bottom: 12px;
}

.section .btn {
  margin-right: 8px;
  margin-bottom: 8px;
}

.form-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.form-section h4 {
  margin-bottom: 12px;
}

.form-section input,
.form-section textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
}

.btn-group {
  display: flex;
  gap: 8px;
}

.btn-group .btn {
  flex: 1;
}

.quest-item {
  display: flex;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
}

.quest-item span {
  color: var(--gold);
}

.inventory-grid {
  display: grid;
  gap: 20px;
}

.inventory-section h3 {
  margin-bottom: 12px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.item {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
}

.item.selected {
  border-color: var(--blue);
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
}

.item h4 {
  margin-bottom: 8px;
}

.item p {
  font-size: 0.9rem;
  color: var(--muted);
  margin: 4px 0;
}

.heroes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.hero-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
}

.hero-card.active {
  border-color: var(--blue);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);
}

.hero-emoji {
  font-size: 3rem;
  margin-bottom: 8px;
}

.hero-card h4 {
  margin-bottom: 6px;
}

.hero-card p {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.shop-section {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
}

.shop-section h2 {
  margin-bottom: 20px;
}

.shop-grid {
  display: grid;
  gap: 20px;
}

.shop-category h3 {
  margin-bottom: 12px;
}

.map-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.map-item {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}

.map-item.unlocked {
  border-color: var(--green);
}

.map-item.locked {
  opacity: 0.5;
}

.map-item h4 {
  margin-bottom: 8px;
  color: var(--gold);
}

.map-item p {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 4px 0;
}

.arena-body {
  overflow: hidden;
}

.arena-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  gap: 12px;
}

.arena-hud {
  width: 100%;
  max-width: 820px;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
}

.hud-left,
.hud-right {
  display: flex;
  gap: 14px;
}

.bar-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bar-group label {
  font-size: 0.85rem;
}

.bar {
  width: 120px;
  height: 12px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444, var(--green));
  transition: width 0.2s;
}

#battleCanvas {
  border: 3px solid var(--blue);
  border-radius: 12px;
  background: #0f172a;
  display: block;
  max-width: 820px;
  width: 100%;
  height: auto;
}

.arena-footer {
  width: 100%;
  max-width: 820px;
  text-align: center;
}

.message {
  color: var(--gold);
  font-weight: bold;
  margin-bottom: 12px;
  min-height: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.iframe-container {
  width: 100%;
  height: 80vh;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
  }

  .navbar {
    justify-content: center;
  }

  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .item-grid,
  .heroes-grid,
  .map-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }

  .item-grid,
  .heroes-grid,
  .map-grid {
    grid-template-columns: 1fr;
  }

  .hud-left,
  .hud-right {
    flex-direction: column;
    gap: 8px;
  }
}
