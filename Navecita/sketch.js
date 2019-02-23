var jugador, x, y, disparo, imagen, index, energia, ran;
var score = 0;
var calculado = false;
var disparos = [];
var disparosE = [];
var enemigos = [];
var contador = [];

var caracteristicas = {
  velocidad : [],
  tipo      : [0,1,2,3]
}


function setup() {
  index = 0;// ES PARA SABER EL TIPO DE ENEMIGO A GENERAR
  createCanvas(1200,800);
  jugador = new jugador();
  imagen = new imagenes();
  noCursor();
  for (var i = 0; i < 10; i++) {//CREAR LOS ENEMIGOS
      enemigos[i] = new enemigo(i * 100 + 100, 25);
  }
  caracteristicas.velocidad.push(enemigos[1].vel.xDir);

    x = floor(random(width)); //HACER SET A LAS POSICIONES DONDE APARECERA EL BARRIL DE ENERGIA
    y = floor(random(height));
}



function draw() {
  var esquinaE = false; //VARIABLE QUE SE USA CUANDO ALGUN ENEMIGO TOCA UN BORDE, SERA VERDADERA SI CUALQUIER ENEMIGO TOCA ALGUNO

  background(51);
  image(imagen.e, x, y); //DIBUJAR EL BARRIL
  jugador.mover();


  //CUANDO EL JUGADOR MATA A TODOS LOS ENEMIGOS, GENERAR NUEVOS, DE OTRO TIPO Y MAS RAPIDOS
  if (enemigos.length == 0) {
      index++;
      if (index == caracteristicas.tipo.length-1) {
        for (var i = 0; i < 4; i++) {

          enemigos[i] = new enemigo(i * 200 + 150, 50);
            enemigos[i].vida = enemigos[i].vida +1;
          enemigos[i].vel.xDir = (caracteristicas.velocidad[length]) +1;
        }
      }else {
        for (var i = 0; i < 7; i++) {
          enemigos[i] = new enemigo(i * 150 + 150, 25);
          enemigos[i].vel.xDir = (caracteristicas.velocidad[length]) +1;
        }
      }
      if (index == caracteristicas.tipo.length) {
        index = 0;
      }
  }




  for (var i = 0; i < enemigos.length; i++) {
    /*
    HACER UNA COMPROBACION DE SI CUALQUIER ENEMIGO ESTA TOCANDO
    EL JUGADOR O EL BARRIL, PARA RESPECTIVAMENTE
    QUITAR UNA VIDA O MOVER EL BARRIL DE LUGAR
    */
    var dit = dist(jugador.pos.x, jugador.pos.y, enemigos[i].pos.x, enemigos[i].pos.y);
    var de = dist(x , y, enemigos[i].pos.x, enemigos[i].pos.y);
    if (de < 30) {
      x = floor(random(width));
      y = floor(random(height));
    }
    if(dit < 50){
      jugador.pos.y = jugador.pos.y +200;
      jugador.vidas = jugador.vidas -1;
    }
  }

  //INCREMENTAR UNA VIDA AL JUGADOR SI ES QUE TOCA UN BARRIL
  var d = dist(x, y, jugador.pos.x, jugador.pos.y);
  if (d < 30) {
    x = floor(random(width));
    y = floor(random(height));
    jugador.vidas += 1;
  }


  var xx = floor(random(enemigos.length+1));

  for (var i = 0; i < enemigos.length; i++) {
    ran = floor(random(enemigos.length+1));
    if(enemigos[i].pos.y >= height){ //SI ALGUN ENEMIGO SE PASA DE LA PANTALLA (POR ABAJO), RESTAR 1 VIDA POR CU
      jugador.vidas = jugador.vidas-1;
      enemigos.splice(i,1);// BORRAR AL ENEMIGO QUE SE PASO DEL ARREGLO
    }else if(enemigos[i].vida > 0){
      if (ran == i && xx == i){
        var disparo = new shoot(enemigos[i].pos.x, enemigos[i].pos.y, 0, 1);
        disparosE.push(disparo);
      }
      imageMode(CENTER);
      image(imagen.enemigos[caracteristicas.tipo[index]], enemigos[i].pos.x, enemigos[i].pos.y); //SI EL ENEMIGO AUN TIENE VIDA DIBUJARLO
      enemigos[i].mover();
      if (enemigos[i].pos.x > width -25 || enemigos[i].pos.x < 25) {//VERIFICAR SI UN ENEMIGO TOCA UNA ESQUINA
        esquinaE = true; //VOLVER VERDADERA LA VARIABLE QUE SE CREO
      }
    }else {//SI EL ENEMIGO HA MUERTO, BORRARLO DEL ARREGLO Y AGREGAR 1 AL CONTADOR DE ASESINATOS
      contador.push(index);
      enemigos.splice(i,1);
    }
  }

  //cambiar patrones de enemigos, barrera para no poder sobre pasarlos, enemigos abajo y arriba,
  for (var i = 0; i < disparosE.length; i++) {
    disparosE[i].mover();
    disparosE[i].show();
    if(disparosE[i].boom(jugador)){
        jugador.vidas = jugador.vidas-1;
        disparosE.splice(i, 1);
    }

    if (disparosE[i].pos.y > height) {
      disparosE.splice(i,1);
    }
  }

  if (esquinaE) {//CUANDO LA VARIABLE ES VERDADERA, BAJAR A TODOS LOS ENEMIGOS
    for (var i = 0; i < enemigos.length; i++) {
      enemigos[i].esquinas();
    }
  }


  for (var i = 0; i < jugador.vidas; i++) {// QUE SE DIBUJEN X CANTIDAD DE CORAZONES DEPENDIENDO LA VIDA DEL JUGADOR
    imageMode(CENTER);
    image(imagen.corazon, i*50 + 25 ,height -25);
  }



  //DIBUJAR Y COMPROBAR ESTADO DE CADA DISPARO
  for (var i = 0; i < disparos.length; i++) {
    disparos[i].show();
    disparos[i].mover();
    for (var j = 0; j < enemigos.length; j++) { //VERIFICAR SI EL DISPARO HA GOLPEADO A UN ENEMIGO
      if(disparos[i].boom(enemigos[j])){ // SI ES VERDADERO, RESTARLE 1 A LA VIDA DEL ENEMIGO
        enemigos[j].vida = enemigos[j].vida -1;
        disparos[i].detener();//DECLARA VERDADERO UNA VARIABLE PARA BORRAR EL DISPARO
      }
    }
    if (disparos[i].borrar) { // SI LA VARIABLE ES VERDADERA, BORRAR EL DISPARO
      disparos.splice(i,1);
    }
  }

  if(jugador.vidas > 0){// SI AUN TIENES VIDAS, QUE SE DIBUJE EL SPRITE DEL JUGADOR
    imageMode(CENTER);
    image(imagen.Player[jugador.estado], jugador.pos.x, jugador.pos.y);
  }else{
    if (calculado == false) {
      for (var i = 0; i < contador.length; i++) {
        score = score + ((contador[i] + 1) * 20);
      }
      calculado = true;
    }

    imageMode(CORNER);
    image(imagen.fin, 0, 0);
    fill(255);
    textSize(24);
    text("Tu Puntuacion es: " + score, width/2 -200, height/2+50, 240, 240);
  }
}

//PODER DEJAR LA TECLA PRESIONADA
function keyReleased(){
  jugador.setDir(0,0);
}

//ESCUCHAR CUANDO LA TECLA FUE PRESIONADA
function keyPressed(){
  if (keyCode == 68) {
    jugador.estado = 1;
    jugador.setDir(1, 0);
  }else if (keyCode == 65) {
    jugador.estado = 3;
    jugador.setDir(-1, 0);
  }else if (keyCode == 87) {
    jugador.estado = 0;
    jugador.setDir(0, -1);
  }else if (keyCode == 83) {
    jugador.estado = 2;
    jugador.setDir(0, 1);
  }else if(key == ' '){
    switch (jugador.estado) {
      case 0:
      var disparo = new shoot(jugador.pos.x, jugador.pos.y    , 0, -1);
      disparos.push(disparo);
        break;
      case 1:
      var disparo = new shoot(jugador.pos.x, jugador.pos.y, 1, 0);
      disparos.push(disparo);
        break;
      case 2:
      var disparo = new shoot(jugador.pos.x, jugador.pos.y, 0, 1);
      disparos.push(disparo);
        break;
      case 3:
      var disparo = new shoot(jugador.pos.x   , jugador.pos.y  , -1, 0 );
      disparos.push(disparo);
        break;
    }
  }
}
