// configurações iniciais do phaser como resolução, gravidade, cenas, etc
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 800 },
      debug: false
    }
  },
  scene: [MenuScene, MainScene, OptionsScene],
};

const game = new Phaser.Game(config);