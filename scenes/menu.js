class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  preload() {
    // pré carrega as imagens que serão usadas
    this.load.image('bg-menu', 'assets/bg/bank.jpeg');
    this.load.image('logo', 'assets/logo.svg');
    this.load.image('bg-btn', 'assets/play-button.png');
  }

  create() {
    // adiciona a imagem de fundo
    this.add.image(880, 540, 'bg-menu').setScale(1.7);
    this.add.rectangle(960, 540, 1920, 1080, 0x000000).setAlpha(0.5);

    // adiciona a logo
    let logo = this.add.image(960, 235, 'logo');
    logo.setOrigin(0.5);

    // define textos, coordenadas e eventos dos botões do menu
    let buttons = [{ text: 'Jogar', y: 540, callback: () => this.scene.start('main') }];

    // adiciona os botões na tela
    buttons.forEach(button => {
      let buttonImage = this.add.image(960, button.y, 'bg-btn')
        .setScale(0.7)
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', button.callback);

      // let buttonText = this.add.text(buttonImage.x, buttonImage.y, button.text, { fontSize: '38px', fill: '#ffffff' });
      // buttonText.setOrigin(0.5, 0.5);
    });
  }
}

