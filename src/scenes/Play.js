class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
      // load images and tile sprites
      this.load.image('bird', './assets/bird.png');
      this.load.image('background', './assets/background.png');

      // load audio
      this.load.audio('bgm', './assets/clouded_skies_bgm.wav');
      this.load.audio('birdcall', './assets/birdcall.wav');
      // this.load.audio('impact', './assets/impact.wav'); 

      // add bird collision animation here
  }

  create() {
    // place tile sprite
    this.background = this.add.tileSprite(0, 0, 360, 640, 'background').setOrigin(0,0);

    //place bird
    this.player = new Bird(this, game.config.width/2, game.config.height - UISize - 45, 'bird').setOrigin(0.5, 0);

    //place UI bottom rectangle and separation line rectangle
    this.add.rectangle(0, game.config.height - UISize, game.config.width, UISize, 0x000080).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - UISize, game.config.width, 5, 0xF5F5DC).setOrigin(0, 0);

    // initialize sounds and play music
    this.birdcall = this.sound.add('birdcall');
    this.bgm = this.sound.add('bgm');
    this.bgm.play({loop: true});
    
    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    // score and display
    this.score = 0;
    let scoreConfig = {
      fontFamily: 'Georgia',
      fontSize: '35px',
      color: '#F5F5DC',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderSize, game.config.height - UISize + 20, this.score, scoreConfig);

    this.callTimer = this.time.addEvent({
      delay: Math.floor(Math.random() * 3000 + 2000), 
      callback: this.birdcall.play(), 
      callbackScope: thisArg, 
      loop: true
    })
  }

  update() {
    this.background.tilePositionY -= 1;
    this.player.update();
    this.score++;
    this.displayScore = Math.floor(this.score / 10);
    this.scoreLeft.text = this.displayScore;
  }
}