const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: [MenuScene, MainScene],
};

const game = new Phaser.Game(config);