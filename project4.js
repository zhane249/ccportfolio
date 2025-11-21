let size = 50;
let centerX = 200.5;
let centerY = 299;
let outerT = 130;
let inner = 70;
let tubeY;
let widthT;
let heightT;
let pieceW;
let sproutColor;
let flowerX;
let flowerY;

function setup() {
  createCanvas(400, 600);
    // attach the canvas to the div in your HTML

  canvas.parent("sketch-container");
  rectMode(CENTER);
  angleMode(DEGREES);
  sproutColor = color(0, 153, 0);
  flowerX = 200;
  flowerY = 102;
}

function draw() {
  background(220);
  checkerBoard(0, size);
  checkerBoard(50, size);
  checkerBoard(100, size);
  checkerBoard(150, size);
  checkerBoard(200, size);
  checkerBoard(250, size);
  checkerBoard(300, size);
  checkerBoard(350, size);
  checkerBoard(400, size);
  checkerBoard(450, size);
  checkerBoard(500, size);
  checkerBoard(500, size);
  checkerBoard(550, size);
  monster();
  //  showMouse();
  armpitFlowers(255, 254, 0, 10);
  armpitFlowers(146, 254, 180, 10);
  sprouts();

  if (mouseIsPressed) {
    drawFlower(mouseX, mouseY);
  } else {
    drawFlower(flowerX, flowerY);
  }

  fill(255, 255, 255, 200);
  rect(196, 578, 300, 50, 50);
  //text with instructions
  fill(255, 0, 0);
  textSize(18);
  textAlign(CENTER, BOTTOM);
  text("Press Key and Hold down Mouse", width / 2, height - 5);
}

function checkerBoard(y, size) {
  //column 1
  if ((0 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(0 * size + size / 2, y + size / 2, size, size);
  //column2
  if ((1 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(1 * size + size / 2, y + size / 2, size, size);
  //columb3
  if ((2 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(2 * size + size / 2, y + size / 2, size, size);

  //column4
  if ((3 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(3 * size + size / 2, y + size / 2, size, size);
  //column5
  if ((4 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(4 * size + size / 2, y + size / 2, size, size);
  //column6
  if ((5 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(5 * size + size / 2, y + size / 2, size, size);
  //column7
  if ((6 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(6 * size + size / 2, y + size / 2, size, size);
  //column8
  if ((7 + y / size) % 2 == 0) {
    fill(0, 85, 128);
  } else {
    fill(153, 221, 255);
  }
  rect(7 * size + size / 2, y + size / 2, size, size);
}

function monster() {
  //head,neck,body(gray areas)
  push();
  stroke(0, 0, 0);
  strokeWeight(0);
  fill(128, 128, 128);
  arc(200, 271, 70, 70, 180, 0);
  rect(201, 236, 35, 70, 40);
  rect(200, 175, 125, 110, 40);
  rect(200.5, 299, 69.5);
  pop();

  //other armpit hairs
  push();
  translate(5);
  rotate(55);
  fill(51, 204, 51);
  rect(157, 245, 40, 5);

  pop();

  //tube
  push();
  noStroke();
  tubeY = centerY + 10;
  widthT = 160;
  heightT = 50;
  pieceW = widthT / 4;

  fill(255);
  arc(centerX - widthT / 2, tubeY, heightT, heightT, 90, 270);

  fill(255, 0, 0);
  rect(centerX - widthT / 2 + pieceW / 2, tubeY, pieceW, heightT);

  fill(255);
  rect(centerX - widthT / 2 + pieceW * 1.5, tubeY, pieceW, heightT);

  fill(255, 0, 0);
  rect(centerX - widthT / 2 + pieceW * 2.5, tubeY, pieceW, heightT);

  fill(255);
  rect(centerX - widthT / 2 + pieceW * 3.5, tubeY, pieceW, heightT);

  fill(255, 0, 0);
  arc(centerX + widthT / 2, tubeY, heightT, heightT, 270, 90);

  pop();

  //chickenleg
  noStroke();
  fill(255, 204, 102);
  rect(204, 360, 15, 60);
  circle(204, 393, 17);
  fill(255, 153, 51);
  arc(204, 333, 70, 50, 0, 180);
  fill(255, 102, 0);
  rect(204, 365, 15, 4);
  rect(204, 375, 15, 4);
  rect(204, 385, 15, 4);
  triangle(202, 398, 186, 406, 197, 392);
  triangle(195, 393, 180, 392, 196, 388);

  //eyes
  push();
  noStroke();
  blendMode(BLEND);
  fill(0);
  circle(171, 175, 15);
  fill(51, 51, 51, 120);
  circle(171, 175, 30);
  fill(51, 51, 51, 60);
  circle(171, 175, 50);
  fill(51, 51, 51, 30);
  circle(171, 175, 70);

  fill(0);
  circle(231, 175, 15);
  fill(51, 51, 51, 120);
  circle(231, 175, 30);
  fill(51, 51, 51, 60);
  circle(231, 175, 50);
  fill(51, 51, 51, 30);
  circle(231, 175, 70);
  pop();

  //mouth
  fill(51, 51, 51);
  rect(200, 203, 36, 15);
  fill(255);
  triangle(182, 196, 191, 196, 186.5, 203);
  triangle(191, 196, 200, 196, 195.5, 203);
  triangle(200, 196, 209, 196, 204.5, 203);
  triangle(209, 196, 218, 196, 213.5, 203);
  //bottom row of teeeeeeth
  triangle(182, 210, 191, 210, 186.5, 203);
  triangle(191, 210, 200, 210, 195.5, 203);
  triangle(200, 210, 209, 210, 204.5, 203);
  triangle(209, 210, 218, 210, 213.5, 203);
  //face
  fill(89, 89, 89);
  circle(182, 267, 5);
  circle(219, 267, 5);
  fill(0);
  circle(192, 183, 5);
  circle(208, 183, 5);
  fill(255, 153, 204);
  ellipse(163, 198, 20, 10);
  ellipse(236, 198, 20, 10);
}

function armpitFlowers(x, y, angle, petals) {
  push();

  translate(x, y);
  rotate(angle);
  fill(0, 204, 0);
  rect(0, 0, 50, 5);
  fill(255, 0, 102);
  ellipse(-petals, 0, 12, 12);
  ellipse(petals, 0, 12, 12);
  ellipse(0, -petals, 12, 12);
  ellipse(0, petals, 12, 12);

  fill(255, 204, 0);
  circle(0, 0, 10);

  pop();
}

function sprouts() {
  push();
  fill(sproutColor);
  noStroke();
  rect(129, 179, 25, 5);
  rect(270, 177, 25, 5);

  ellipse(114, 169, 10, 30);
  ellipse(114, 190, 10, 30);
  ellipse(284, 162, 10, 30);
  ellipse(287, 182, 10, 30);

  pop();
}

function keyPressed() {
  sproutColor = color(random(255), random(255), random(255));
}

function drawFlower(x, y) {
  push();
  translate(x, y);
  noStroke();

  fill(0, 204, 0);
  rect(-2, 10, 4, 30);
  fill(204, 0, 255);
  ellipse(-10, 0, 15, 15);
  ellipse(10, 0, 15, 15);
  ellipse(0, -10, 15, 15);
  ellipse(0, 10, 15, 15);

  fill(255, 204, 0);
  circle(0, 0, 10);
  pop();
}

/* 
  function showMouse(){
     //show coordinates with mouse
  push();
 fill(0);
  text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  stroke(255, 0, 0);
  pop();
  
  
  
}
*/

