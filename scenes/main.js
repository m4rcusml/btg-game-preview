class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.image('bg-main', 'assets/peakpx2.jpg');
    this.load.image('bg-task', 'assets/taskbar/bg-taskbar.png');
    this.load.spritesheet('player', 'assets/player-spritesheet.png', { frameWidth: 46, frameHeight: 50 });
  }

  create() {
    this.add.image(960, 540, 'bg-main').setDisplaySize(1920, 1080);

    this.add.text(1670, 20, 'Movimentação\n\n<-, ->: andar\nA, D: andar\nShift: caminhar\nSpace: pular', { fontSize: '24px', fill: '#ffffff' });

    this.player = this.physics.add.sprite(50, 440, 'player').setScale(3).setOrigin(0.5);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.cursors.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.cursors.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.cursors.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.vel = 10;
    this.extraVel = 12;
    this.jumpCounting = 0;
    this.isClimbing = false;

    this.physics.world.setBounds(0, 0, 1920, 1080);
    this.player.setGravityY(1500);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(960, 1080 - 62, 'bg-task').setDisplaySize(1920, 125).refreshBody();

    this.wall = this.physics.add.staticGroup();
    this.wall.create(350, 500, null).setDisplaySize(40, 500).refreshBody();
    this.wall.create(700, 400, null).setDisplaySize(40, 500).refreshBody();

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.wall, () => {
      this.isClimbing = true;
      this.isJumping = false;
      this.jumpCounting = 0;
      this.player.setVelocityY(10);
    }, () => {
      this.isClimbing = true;
      this.player.setGravityY(1500);
    }, this);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1
    });

  }

  update() {
    let isRunning = !this.cursors.shift.isDown;

    // Animação ao se mover
    if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.a.isDown || this.cursors.d.isDown) {
      this.player.anims.play('run', true);
    } else {
      this.player.anims.stop();
      this.player.setTexture('player', 0);
    }

    // Movimento horizontal
    if (this.cursors.left.isDown || this.cursors.a.isDown) {
      this.player.setVelocityX(isRunning ? -(this.vel + this.extraVel) * 20 : -this.vel * 20);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown || this.cursors.d.isDown) {
      this.player.setVelocityX(isRunning ? (this.vel + this.extraVel) * 20 : this.vel * 20);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }

    // Pulo normal
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.jumpCounting < 1) {
      this.player.setVelocityY(-600);
      this.jumpCounting++;
      this.player.anims.play('run');
    }

    // Pulo celeste
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.isClimbing) {
      let pushDirection = this.player.body.blocked.left ? 1 : -1;
      this.player.setVelocity(pushDirection * 800, -600);
      this.isClimbing = false;
      this.jumpCounting = 1;

      this.time.delayedCall(50, () => {
        if (!this.player.body.blocked.down) {
          this.player.setVelocityX(pushDirection * 600)
        }
      });
    }

    if (this.player.body.blocked.down) {
      this.jumpCounting = 0;
    }
  }
}

