function jugador() {

  this.pos = {
    x : width/2,
    y : height - 50
  }

  this.vel = {
    xDir : 0,
    yDir : 0
  }

  this.estado = 0; // VARIABLE PARA DIBUJAR EL SPRITE CORRESPONDIENTE A LA ORIENTACION DEL JUEGADOR
  this.vidas = 5;
  this.w = 25;

    this.setDir = function(dirX, dirY){
      this.vel.xDir = dirX;
      this.vel.yDir = dirY;
    }

    this.mover = function(){
      //CONDICIONALES POR SI ESTAS EN UN BORDE
      if((this.vel.xDir > 0 && this.pos.x == width-this.w) || (this.vel.xDir < 0 && this.pos.x == this.w)){
        this.vel.xDir = 0;
      }else if((this.vel.yDir < 0 && this.pos.y == this.w) || (this.vel.yDir > 0 && this.pos.y == height-this.w)){
        this.vel.yDir = 0;
      }
      //SI LA VELOCIDAD ES 0, AL MOMENTO DE QUERER MOVERSE SE MOVERA 0 PIXELES
      //DESPUES MOVER LA NAVE
      this.pos.x += this.vel.xDir*5;
      this.pos.y += this.vel.yDir*5;
    }

}
