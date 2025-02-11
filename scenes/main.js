class MainScene extends Phaser.Scene {
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