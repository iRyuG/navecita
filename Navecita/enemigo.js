function enemigo(posx, posy){

  this.borde = false;
  this.pos = {
    x: posx,
    y: posy
  }

  this.vida = 2;
  this.tipo = 2;;
  this.w = 25;

  this.vel = {
    xDir :1,
    yDir : 0
  }

    this.mover = function () {
      this.pos.x += this.vel.xDir;
      this.pos.y += this.vel.yDir;

    }

    this.esquinas = function () { //EFECTO DE BAJAR E INVERTIR DIRECCION
      this.vel.xDir *= -1;
      this.pos.y += 50;
    }
    this.equina = function () {
      this.vel.xDir *= -1;
      this.vel.yDir *= -1;
    }

}
