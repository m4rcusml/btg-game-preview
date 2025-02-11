class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  preload() {
    this.load.image('bg-menu', 'assets/bg-menu.jpg');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('bg-btn', 'assets/button.png');
  }

  create() {
    this.add.image(550, 300, 'bg-menu').setScale(1.16);
    this.add.image(270, 135, 'logo').setScale(0.4);

    let playButton = this.add.image(270, 320, 'bg-btn')
      .setScale(0.5)
      .setDisplaySize(360, 85)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('main');
      });

    let playText = this.add.text(playButton.x, playButton.y, 'Jogar', { fontSize: '38px', fill: '#ffffff' });
    playText.setOrigin(0.5);

    let optionsButton = this.add.image(270, 405, 'bg-btn')
      .setScale(0.5)
      .setDisplaySize(360, 85)
      .setInteractive()
      .on('pointerdown', () => {
        alert('EM DESENVOLVIMENTO');
      });

    let optionsText = this.add.text(optionsButton.x, optionsButton.y, 'Opções', { fontSize: '38px', fill: '#ffffff' });
    optionsText.setOrigin(0.5);

    let exitButton = this.add.image(270, 490, 'bg-btn')
      .setScale(0.5)
      .setDisplaySize(360, 85)
      .setInteractive()
      .on('pointerdown', () => {
        if (confirm('Deseja realmente sair?')) {
          window.close();
        }
      });

    let exitText = this.add.text(exitButton.x, exitButton.y, 'Sair', { fontSize: '38px', fill: '#ffffff' });
    exitText.setOrigin(0.5);
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.image('bg-main', 'assets/bg-main.jpg');
    this.load.image('bg-task', 'assets/taskbar/bg-taskbar.png');
    this.load.image('logout-btn', 'assets/taskbar/logout-btn.png');
    this.load.image('player', 'assets/player.png');
  }

  create() {
    this.add.image(550, 260, 'bg-main');
    this.add.image(550, 560, 'bg-task');

    this.add.image(50, 560, 'logout-btn').setInteractive().on('pointerdown', () => {
      this.scene.start('menu');
    });

    this.add.text(850, 20, 'Movimentação:\nSetas -> andar\nShift -> correr', { fontSize: '24px', fill: '#ffffff' });

    player = this.add.image(50, 490, 'player').setDisplaySize(64, 64);
  }

  update() {
    let isRunning = this.input.keyboard.createCursorKeys().shift.isDown;
    
    if (this.input.keyboard.createCursorKeys().left.isDown && player.x > 25) {
      player.x -= isRunning ? vel + extraVel : vel;
      player.flipX = false;
    } else if (this.input.keyboard.createCursorKeys().right.isDown && player.x < 1075) {
      player.x += isRunning ? vel + extraVel : vel;
      player.flipX = true;
    }

    if (this.input.keyboard.createCursorKeys().up.isDown && player.y > 35) {
      player.y -= isRunning ? vel + extraVel : vel;
      player.flipY = false;
    } else if (this.input.keyboard.createCursorKeys().down.isDown && player.y < 490) {
      player.y += isRunning ? vel + extraVel : vel;
      player.flipY = true;
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 600,
  scene: [MenuScene, GameScene]
};

const game = new Phaser.Game(config);
const vel = 5;
const extraVel = 5;
var player = null;