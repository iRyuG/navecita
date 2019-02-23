function imagenes() {

  /*
  MANEJO LAS IMAGENES DE ESTA FORMA POR LA LIBRERIA
  BASICAMENTE 2 ARREGLOS CON LAS IMAGENES CORRESPONDIENTES
  A LOS ESTADOS DEL JUGADOR O LOS ENEMIGOS
  */
  this.fin =loadImage("src/GameOver.jpg");
  this.Player = [];
  this.enemigos = [];

  this.n1 = loadImage("src/j1.png");
  this.n2 = loadImage("src/j2.png");
  this.n3 = loadImage("src/j3.png");
  this.n4 = loadImage("src/j4.png");

  this.e = loadImage("src/e.png");

  this.Player.push(this.n1);
  this.Player.push(this.n2);
  this.Player.push(this.n3);
  this.Player.push(this.n4);

  this.corazon = loadImage("src/corazon.png");

  this.e1 = loadImage("src/e1.png");
  this.e2 = loadImage("src/e2.png");
  this.e3 = loadImage("src/e3.png");
  this.e4 = loadImage("src/e4.png");
  this.e5 = loadImage("src/e5.png");

  this.enemigos.push(this.e1);
  this.enemigos.push(this.e2);
  this.enemigos.push(this.e3);
  this.enemigos.push(this.e4);


}
