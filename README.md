:root {
  --bg-dark: #0b1120;
  --bg-panel: rgba(15, 23, 42, 0.82);
  --bg-soft: rgba(30, 41, 59, 0.9);
  --line: rgba(148, 163, 184, 0.3);
  --text: #e2e8f0;
  --muted: #94a3b8;
  --gold: #fbbf24;
  --green: #22c55e;
  --blue: #38bdf8;
  --purple: #a78bfa;
  --red: #ef4444;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg, #020817 0%, #111827 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, textarea {
  font: inherit;
}

.screen {
  display: none;
  min-height: 100vh;
  padding: 24px;
}

.screen.active {
  display: block;
}

.auth-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 24px;
}

.brand-block {
  text-align: center;
}

h1, h2, h3, h4, p {
  margin-top: 0;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 4rem);
  margin-bottom: 8px;
}

.tagline {
  color: var(--muted);
  font-size: 1.1rem;
}

.auth-card,
.panel,
.item-card,
.character-card,
.map-card {
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 20px 40px rgba(14, 116, 144, 0.15);
}

.auth-card {
  width: min(420px, 92vw);
  padding: 24px;
}

.auth-card h2 {
  margin-bottom: 18px;
}

.auth-card input,
.add-character input,
.add-character textarea {
  width: 100%;
  margin-bottom: 14px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.8);
  color: white;
}

small {
  display: block;
  color: var(--muted);
  margin-bottom: 14px;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.btn-primary {
  background: linear-gradient(135deg, var(--green), #16a34a);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #334155, #475569);
  color: white;
}

.btn-small {
  padding: 8px 12px;
}

.topbar {
  max-width: 1200px;
  margin: 0 auto 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.brand-mini {
  font-size: 1.7rem;
  font-weight: bold;
}

.user-panel {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 8px 12px;
}

.nav {
  max-width: 1200px;
  margin: 0 auto 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.nav-btn {
  background: rgba(15, 23, 42, 0.7);
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
}

.nav-btn.active {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(168, 85, 247, 0.25));
  border-color: rgba(56, 189, 248, 0.7);
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-panel {
  padding: 22px;
  margin-bottom: 18px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.stat-card {
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px 12px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: clamp(1.8rem, 2vw, 2.2rem);
  font-weight: bold;
  color: var(--gold);
}

.stat-label {
  color: var(--muted);
}

.panel {
  padding: 22px;
  margin-bottom: 18px;
}

.feature-grid,
.item-grid,
.character-grid,
.map-grid {
  display: grid;
  gap: 16px;
}

.feature-grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.feature-box {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.quest-panel {
  background: rgba(15, 23, 42, 0.8);
}

.quest-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(30, 41, 59, 0.8);
  margin-bottom: 8px;
}

.quest-item.highlight {
  border: 1px solid rgba(251, 191, 36, 0.6);
}

.quest-item p {
  margin: 0;
}

.action-row {
  display: flex;
  justify-content: center;
  margin: 24px 0 10px;
}

.large {
  padding: 14px 28px;
  font-size: 1.1rem;
}

.section-header {
  max-width: 1200px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.game-frame {
  display: block;
  width: min(1200px, 100%);
  height: 80vh;
  margin: 0 auto;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 16px;
  background: #020817;
}

.narrow-content {
  max-width: 900px;
}

.item-grid,
.character-grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.item-card,
.character-card,
.map-card {
  padding: 18px;
}

.item-card.selected,
.character-card.selected,
.map-card.active {
  border-color: rgba(56, 189, 248, 0.8);
  box-shadow: 0 20px 35px rgba(56, 189, 248, 0.15);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.rarity {
  color: var(--gold);
  font-size: 0.75rem;
  text-transform: uppercase;
}

.character-card {
  text-align: center;
}

.character-emoji {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.owner-panel {
  margin-top: 18px;
}

.add-character {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.inline-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.shop-panel h2 {
  margin-bottom: 8px;
}

.shop-section {
  margin-top: 20px;
}

.map-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.map-card {
  background: rgba(15, 23, 42, 0.75);
}

.map-card .difficulty {
  color: var(--gold);
  font-weight: bold;
}

@media (max-width: 640px) {
  .screen {
    padding: 16px;
  }

  .nav {
    justify-content: center;
  }

  .topbar,
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

README.md
