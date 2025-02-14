class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    // inicializa as variáveis que serão usadas para as mecanicas da cena
    this.canDash = true;
    this.isDashing = false;
    this.dashCooldown = 0;
    this.wallJumpCooldown = 0;
    this.isTouchingWall = false;
    this.lastWallDirection = 0;
    this.jumpTimer = 0;
    this.JUMP_DURATION = 200;
    this.dashTimer = 0;
    this.DASH_DURATION = 150;
    this.wallSlideSpeed = 50;
    this.wallJumpTimer = 0;
    this.WALL_JUMP_GRACE_PERIOD = 100;
    this.DASH_SPEED = 600;
  }

  preload() {
    // pré carrega as imagens que serão usadas
    this.load.image('bg', 'assets/bg/bg.svg');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.svg');
    this.load.spritesheet('player', 'assets/player-spritesheet.png', { frameWidth: 46, frameHeight: 50 });
  }

  create() {
    // adiciona a imagem de fundo
    this.add.image(960, 540, 'bg');

    // adiciona um grupo estático com colisão para as plataformas
    this.platforms = this.physics.add.staticGroup();
    for (let x = 330; x < 1120; x += 360) { // adiciona plataformas horizontalmente do inicio ao fim da tela
      this.platforms.create(x, 580, 'platform').refreshBody();
    }

    // adiciona o sprite do chão na tela
    this.platforms.create(960, 1080 - 32, 'ground');

    // adiciona os sprites das plataformas na tela
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(300, 320, 'platform');
    this.platforms.create(700, 200, 'platform');
    this.platforms.create(400, 800, 'platform');

    // adiciona o player, sua física, faz com que não ultrapasse os limites da tela
    this.player = this.physics.add.sprite(100, 450, 'player').setScale(2);
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setDragX(500);
    this.player.setMaxVelocity(300, 600);

    // adiciona colisão e evento de colisão no player com plataformas
    this.physics.add.collider(this.player, this.platforms, this.handlePlatformCollision, null, this);

    // define as teclas padrões e personalizadas que serão usadas nessa cena (personalizadas: X)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.dashKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    // cria a animação de correr
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
      frameRate: 12,
      repeat: -1
    });
  }

  handlePlatformCollision(player, platform) { // define o que deve acontecer quando o player colidir com as paredes ou o chão
    // redefine essas variáveis quando o player estiver tocando no chão
    if (player.body.touching.down) {
      this.canDash = true;
      this.isDashing = false;
      this.jumpTimer = 0;
      this.wallJumpTimer = 0;
    }

    // atualiza o estado de idle para quando o player estiver tocando numa parede
    if (player.body.touching.left || player.body.touching.right) {
      this.isTouchingWall = true;
      this.lastWallDirection = player.body.touching.right ? -1 : 1;
      this.wallJumpTimer = 0;

      if (!player.body.touching.down) {
        if (player.body.velocity.y > this.wallSlideSpeed) {
          player.setVelocityY(player.body.velocity.y * 0.5);
        }
      }
    } else {
      this.isTouchingWall = false;
    }
  }

  handleDash() { // define a mecanica de dash do player
    if (!this.canDash || this.isDashing) return;

    this.isDashing = true;
    this.canDash = false;
    this.dashTimer = 0;

    let dashDirection = new Phaser.Math.Vector2(0, 0);
    if (this.cursors.left.isDown) dashDirection.x = -1;
    if (this.cursors.right.isDown) dashDirection.x = 1;
    if (this.cursors.up.isDown) dashDirection.y = -1;
    if (this.cursors.down.isDown) dashDirection.y = 1;
    // os ifs acima definem para onde no plano cartesiano o player deverá ser jogado

    if (dashDirection.x === 0 && dashDirection.y === 0) {
      dashDirection.x = this.player.flipX ? -1 : 1;
    }

    dashDirection.normalize();
    this.player.setVelocity(dashDirection.x * this.DASH_SPEED, dashDirection.y * this.DASH_SPEED);
    // basicamente define uma força maior que a padrão para lançar o player na mesma direção que ele já estava indo
  }

  handleWallJump() { // define a mecanica de pular enquanto estiver numa parede
    if ((!this.isTouchingWall && this.wallJumpTimer > this.WALL_JUMP_GRACE_PERIOD) || this.wallJumpCooldown > 0) return;

    const WALL_JUMP_FORCE = 450;
    const WALL_JUMP_HORIZONTAL_FORCE = 400;

    // adiciona uma força de pulo + uma força contrária da direção da parede
    this.player.setVelocityY(-WALL_JUMP_FORCE);
    this.player.setVelocityX(this.lastWallDirection * WALL_JUMP_HORIZONTAL_FORCE);
    this.wallJumpCooldown = 10;
    this.jumpTimer = 0;
    this.wallJumpTimer = 0;
  }

  update(time, delta) {
    if (this.dashCooldown > 0) this.dashCooldown--;
    if (this.wallJumpCooldown > 0) this.wallJumpCooldown--;
    if (!this.isTouchingWall) this.wallJumpTimer += delta;

    // garante que o dash tenha a duração correta (150ms)
    if (this.isDashing) {
      this.dashTimer += delta;
      if (this.dashTimer >= this.DASH_DURATION) {
        this.isDashing = false;
        this.player.setDragX(500);
      }
    }

    // se ele não estiver dando dash, o personagem anda normalmente
    if (!this.isDashing) {
      const RUNNING_SPEED = 200;
      if (this.cursors.left.isDown) { // movimentação para a esquerda
        this.player.setVelocityX(-RUNNING_SPEED);
        this.player.setFlipX(true);
        this.player.anims.play('run', true);
      } else if (this.cursors.right.isDown) { // movimentação para a direita
        this.player.setVelocityX(RUNNING_SPEED);
        this.player.setFlipX(false);
        this.player.anims.play('run', true);
      } else { // quando o player não estiver andando
        this.player.setVelocityX(this.player.body.velocity.x * 0.85);
        this.player.anims.stop('run', true);
        this.player.setFrame(0);
      }
    }

    // executa o pulo ou o pulo na parede
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.player.body.touching.down) {
        this.jumpTimer = 0;
        this.player.setVelocityY(-450);
      }
      // executa o pulo na parede
      else if (this.isTouchingWall || this.wallJumpTimer <= this.WALL_JUMP_GRACE_PERIOD) {
        this.handleWallJump();
      }
    }

    // se a tecla de seta para cima estiver sendo pressionada e o timer de pulo estiver dentro do tempo de duração do pulo
    if (this.cursors.up.isDown && this.jumpTimer < this.JUMP_DURATION) {
      this.jumpTimer += delta;
      // garante que a velocidade vertical do player não exceda -200
      if (this.player.body.velocity.y > -200) {
        this.player.setVelocityY(-200);
      }
    }

    // quando apertar X, o player dá dash
    if (Phaser.Input.Keyboard.JustDown(this.dashKey)) {
      this.handleDash();
    }

    // define a gravidade do player para que a "escalada de parede" seja possível
    this.player.setGravityY(this.isTouchingWall && this.player.body.velocity.y > 0 ? 100 : 600);
  }
}
