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

    this.add.text(850, 20, 'Movimentação\n\n<-, ->: andar\nA, D: andar\nShift: caminhar\nSpace: pular', { fontSize: '24px', fill: '#ffffff' });

    this.player = this.physics.add.sprite(50, 440, 'player').setDisplaySize(64, 64);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.vel = 6;
    this.extraVel = 8;
    this.jumpCount = 0;

    this.physics.world.setBounds(0, 0, 1100, 600);
    this.player.setGravityY(300);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(550, 575, 'bg-task').setDisplaySize(1100, 40).refreshBody();

    this.physics.add.collider(this.player, this.ground);
  }

  update() {
    let isRunning = !this.cursors.shift.isDown;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(isRunning ? -(this.vel + this.extraVel) * 20 : -this.vel * 20);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(isRunning ? (this.vel + this.extraVel) * 20 : this.vel * 20);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.jumpCounting < 2) {
      this.player.setVelocityY(-350);
      this.jumpCounting++;
    }

    if (this.player.body.blocked.down) {
      this.jumpCounting = 0;
    }

  }
}

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 600,
  scene: [MenuScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);