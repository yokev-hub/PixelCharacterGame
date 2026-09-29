<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Battle Arena</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="arena-body">
  <div class="arena-container">
    <div class="arena-hud">
      <div class="hud-left">
        <div class="bar-group">
          <label>Health</label>
          <div class="bar"><div id="playerHealthBar" class="bar-fill"></div></div>
          <span id="playerHealthText">100</span>
        </div>
        <div class="bar-group">
          <label>Enemy</label>
          <div class="bar"><div id="enemyHealthBar" class="bar-fill"></div></div>
          <span id="enemyHealthText">120</span>
        </div>
      </div>
      <div class="hud-right">
        <div>💎 <span id="coinsText">50</span></div>
        <div>⚔️ <span id="weaponText">Rusty Sword</span></div>
      </div>
    </div>

    <canvas id="battleCanvas" width="820" height="450"></canvas>

    <div class="arena-footer">
      <div id="battleMessage" class="message">Prepare for battle!</div>
      <div class="controls">
        <button class="btn btn-secondary" onclick="nextRegion()">Next Region</button>
        <button class="btn btn-secondary" onclick="restartRegion()">Restart</button>
      </div>
    </div>
  </div>

  <script src="data.js"></script>
  <script src="arena.js"></script>
</body>
</html>
