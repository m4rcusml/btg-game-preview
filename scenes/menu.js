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