function shoot(x, y, dirX, dirY) {

  this.pos = {
    x : x,
    y : y
  }

  this.r = 4;
  this.borrar = false;

  this.vel = {
    dirX : dirX,
    dirY : dirY
  }

  //HACER LA BOLITA
    this.show = function () {
      fill(255,255,255);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    //REVISAR SI LA BOLITA HA GOLPEADO ALGUN OBJETIVO USANDO DIFERENCIA DEL R DE LA BOLITA CON RESPECTO AL ANCHO DEL ENEMIGO
    this.boom = function (objeto) {
      var d = dist(this.pos.x, this.pos.y, objeto.pos.x, objeto.pos.y);
      if (d < this.r + objeto.w) {
        return true
      }else{
        return false
      }
    }

    //DECLARAR VERDADERA SI ES QUE CHOCO LA ESFERA PARA BORRARLA EN EL SKETCH
    this.detener = function () {
      this.borrar = true;
    }


  //MOVER LA ESFERA Y SI SE SALE DE LA PANTALLA, LLAMAR EL METODO PARA BORRAR LA BOLITA
    this.mover = function(){
      this.pos.y += this.vel.dirY*8;
      this.pos.x += this.vel.dirX*8;
        if (this.pos.y == height) {
          this.detener();
        }
    }
}
