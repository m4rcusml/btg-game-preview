/**
 * EM CONSTRUÇÃO (ignore)
 */
class OptionsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'options' });
  }

  preload() {
    this.load.image('bg-menu', 'assets/bg-menu.jpg');
  }

  create() {
    this.add.image(960, 540, 'bg-menu');
    this.add.rectangle(960, 540, 1800, 900, 0x000000).setAlpha(0.5);
  }
}

