function setup() {
  createCanvas(400, 400);
    rectMode(CENTER);
  angleMode(DEGREES);
  //attach canvas to div in html
  canvas.parent("sketch-container");
}

function draw() {
  background(102, 255, 255);
  circle(345, 42, 65);
  fill(255, 255, 204);
   noStroke();
  blendMode(ADD);
  fill(255,255,0,80);
  circle(345,42,120);
  circle(345,42,90);
  blendMode(BLEND);
  fill(255,255,0);
  circle(345,42,65);
  blendMode(BLEND);
  
push();
  blendMode(ADD);
  fill(255, 255, 255);
  circle(159,51,33);
  circle(139,48,33);
  circle(120,50,33);
  fill(255, 255, 255);
  rect(138,64,60,5);
circle(256,96,30);
  circle(279,93,30);
  circle(303,93,30);
  circle(324,105,30);
  circle(301,113,30);
  circle(276,116,30);
  circle(248,115,30);
  blendMode(BLEND);
  pop();
  

push();
  rotate(-89);
  fill(0, 102, 0);
  rect(-370,183,60,500);
  pop();
  
  push();
  translate(1,270);
   rotate(-89);
 fill(0, 102, 0);
  rect(12,233,80,500);
pop();  

  
  
push();
  fill(128, 128, 128);
  rect(98,308,800,100);
  pop();
 
 push()
  fill(20, 5, 5)
  rect(6,205,10,80)
  pop()
push();

  
push();
  fill(128, 0, 0);
  rect(31,217,50,50);
    fill(204, 0, 0);
  rect(33,199,47,15);
  stroke(0, 0, 0);
  circle(27, 224, 15);
 circle(37, 224, 15);
  fill(0, 153, 51);
  rect(31,211,12,3);
  pop();
  
push();
  fill(102, 0, 51);
  rect(108,217,50,50);
  fill(153, 51, 102);
rect(108,199,47,15);
  fill(204, 0, 153);
  circle(101,220,10);
  circle(110,220,10);
    circle(119,220,10);
    circle(110,230,10);
    circle(100,228,10);
   fill(0, 153, 51);
  rect(105,210,12,3);
  pop();
  
push();
  fill(255, 102, 0);
 rect(190,217,50,50);
  fill(255, 153, 51);
  rect(190,199,47,15);
  fill(255, 0, 0);
  circle(190,222,20);
 pop();
 
  push();
  translate(275,-62);
  rotate(59);
    fill(0, 153, 51);
  rect(190,217,12,3);
  pop();

push();
  fill(255, 102, 153);
 rect(275,217,50,50);
  fill(255, 153, 153);
  rect(275,200,47,15);
  triangle(275,210,283,227,264,228);
  circle(270,228,10);
  circle(279,228,10);
    fill(0, 153, 51);
  rect(271,235,12,3);
  rect(277,235,12,3);
  pop();
  
push();
  fill(102, 0, 204);
 rect(363,217,50,50);
  fill(153, 102, 255);
 rect(363,200,45,15);
  fill(102, 102, 255);
  circle(363,222,20);
  pop();

push();
  fill(81, 21, 21);
   rect(33,375,50,50);
  fill(245, 245, 220);
  rect(33,360,45,15);
  fill(191, 128, 64);
  rect(33,386,17,25);
  fill(77, 51, 25);
  rect(33,386,17,10);
  pop();
  
 push();
  fill(20,5,5);
  rect(86,370,10,80);
rect(144,210,10,80);
  rect(234,212,10,80);
  rect(323,211,10,80);
  pop();
  
 push();
  fill(20,5,5);
  rect(199,363,10,80);
  rect(284,368,10,80);
  rect(385,368,10,80);
  pop();
  
 stroke(100,50,0);
  strokeWeight(2);
line(11,175,86,332);
  line(146,173,199,323);
  line(236,177,284,331);
  line(324,176,385,328);
  
  push();
  fill(255, 255, 204);
  circle(25,205,10);
  circle(45,247,10);
  circle(61,281,10);
circle(81,312,10);
  circle(155,200,10);
  circle(166,233,10);
  circle(180,271,10);
  circle(194,305,10);
  circle(244,197,10);
  circle(254,226,10);
  circle(265,263,10);
  circle(273,293,10);
  circle(331,201,10);
  circle(348,238,10);
  circle(359,263,10);
  circle(370,300,10);
  pop();
  
  
  noStroke();
  
  
push();
  fill(153, 102, 51);
  rect(65,236,40,10);
  fill(102, 51, 0);
  rect(65,250,15,20);
  rect(111,237,8,20);
  rect(103,246,25,8);
  rect(113,252,5,10);
  rect(93,252,5,10);
  
  rect(220,233,45,25);
  rect(236,251,10,10);
  rect(205,250,10,10);
  fill(153, 102, 51);
  rect(220,243,45,8);
  pop();
  
push();
  fill(255, 0, 102);
  rect(151,380,70,45);
  fill(255, 102, 153);
  rect(151,360,70,15);
  fill(255, 255, 0);
    circle(151,380,25);
  fill(255, 204, 0);
  triangle(125,375,125,388,141,378);
  triangle(175,367,175,385,155,381);
  pop();
  
push();
  fill(0, 51, 0);
  rect(241,371,55,55);
  fill(0, 153, 51);
  rect(241,351,55,20);
  fill(51, 204, 51);
  circle(243,373,25);
  pop();
push();
  translate(243,373);
  rotate(-45);
  stroke(0);
  strokeWeight(3);
  line(-12,0,12,0);
  pop();
push();
  fill(51, 204, 51);
  triangle(268,351,244,362,256,371);
  pop();
  
 push();
  fill(102, 51, 0);
  rect(333,370,65,40);
  fill(179, 89, 0);
  rect(333,370,65,10);
  rect(333,390,65,10);
  fill(20, 5, 5);
  rect(356,396,20,5);
    rect(310,396,20,5);
  pop();
  
  
    //show coordinates with mouse
  push();
  fill(0);
  text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  stroke(0);
  pop();
}

//
