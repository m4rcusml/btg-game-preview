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
    this.add.image(960, 540, 'bg-menu');

    let logo = this.add.image(960, 235, 'logo').setScale(0.6);
    logo.setOrigin(0.5);

    let buttons = [
      { text: 'Jogar', y: 520, callback: () => this.scene.start('main') },
      { text: 'Opções', y: 650, callback: () => this.scene.start('options') },
      { text: 'Sair', y: 780, callback: () => {
        if (confirm('Deseja realmente sair?')) {
          window.close();
        }
      } },
    ];

    const buttonHeight = 120;

    buttons.forEach(button => {
      let buttonImage = this.add.image(960, button.y, 'bg-btn')
        .setScale(0.5)
        .setDisplaySize(500, buttonHeight)
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', button.callback);

      let buttonText = this.add.text(buttonImage.x, buttonImage.y, button.text, { fontSize: '38px', fill: '#ffffff' });
      buttonText.setOrigin(0.5, 0.5);
    });
  }
}

