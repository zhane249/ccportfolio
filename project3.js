let total
let midX
let hipY
let rectTopY
let s, grow, t;
let maxHeight, minHeight, spineHeight, spacing
let spineTopY, baseshoulderY, offsetY
let dayBlue
let nightBlue;
let backgroundColor;
let nightCloud
let cloudColor
let y1
let y2
let y3
let y4
let y5
let y6
let y7
let y8
let y9
let y10
let h
let m

  
function setup() {
  createCanvas(600, 600);  
    // attach the canvas to the div in your HTML

  canvas.parent("sketch-container");
  rectMode(CENTER);
  angleMode(DEGREES);
  
  total=10
  midX=337
  hipY=537
  rectTopY=140
  baseShoulderY=429
  
  dayBlue = color(102,204,255);
  nightBlue=color(0,51,102);
  


}

function draw() {
  
  s = second();
  if(s<30){
    grow = true
  }else{
    grow = false;
  }
  
  if (grow){
    t = map(s, 0, 29, 0, 1);
    
  }else{
    t = map(s, 30, 59, 1, 0)
  }
  
  
  backgroundColor = lerpColor(nightBlue,dayBlue,t)
  
  background(backgroundColor);
  
   dayCloud=color(255,255,255)
  nightCloud = color(100,100,120)
  cloudColor = lerpColor(nightCloud, dayCloud, t);
  
  
  
//cloud
  push();
  fill(cloudColor);
  blendMode(ADD);
  circle(159,51,50);
  circle(139,48,50);
  circle(120,50,50);
  circle(92,54,50)
  fill(255, 255, 255);
 
  fill(cloudColor);
circle(256,96,50);
  circle(279,93,50);
  circle(303,93,50);
  circle(324,105,50);
  circle(301,113,50);
  circle(276,116,50);
  circle(248,115,50);
  
circle(57,200,50)
  circle(98,201,50)
  circle(25,226,50)
  circle(3,265,50)
  circle(116,220,50)
  circle(78,241,50)
  circle(44,268,50)
  circle(50,237,50)
  
  circle(92,420,50)
  circle(48,424,50)
  circle(117,435,50)
  circle(63,448,50)
  circle(104,458,50)
  
  circle(32,571,50)
  circle(72,577,50)
  circle(9,595,50)
  circle(53,594,50)
  
  circle(495,28,50)
  circle(531,45,50)
  circle(572,39,50)
  circle(575,20,50)
  circle(527,10,50)
  
  circle(524,148,50)
  circle(560,168,50)
  circle(476,171,50)
  circle(507,168,50)
  circle(567,490,50)
  circle(564,522,50)
  
  
  
  blendMode(ADD);
  pop();
 
//x-ray background  
push()  
  translate(1,90)
  rotate(5)
  fill(13, 13, 13);
  stroke(217, 217, 217)
  strokeWeight(10)
rect(371,267,440,440);  
  pop()
 
maxHeight = 270
  minHeight = 180;
  spineHeight = minHeight + (maxHeight - minHeight)*t;
  
  if (hipY - spineHeight < rectTopY){
    
    
    spineHeight = hipY - rectTopY
  }
  spacing = spineHeight / (total - 1)
  
  //spine
  push()
  translate(30,-50)
  rotate(3)
  stroke(230,0,0,)
  strokeWeight(5)
  y1=hipY;
  y2 = y1- spacing;
  y3=y2-spacing;
  y4=y3-spacing
  y5=y4-spacing
  y6=y5-spacing
  y7=y6-spacing
  y8=y7-spacing
  y9=y8-spacing
  y10=y9-spacing
  
  line(midX-5,y1,midX+5,y1);
  line(midX-6,y2,midX+6,y2)
  line(midX-7,y3,midX+7,y3)
  line(midX-8,y4,midX+8,y4)
  line(midX-9,y5,midX+9,y5)
  line(midX-10,y6,midX+10,y6)
  line(midX-11,y7,midX+11,y7)
  line(midX-12,y8,midX+12,y8)
  line(midX-13,y9,midX+13,y9)
  line(midX-14,y10,midX+14,y10)
  
  spineTopY = y10+20;
  pop();
  
  
  
  
  push()
  translate(30,-50)
  rotate(5)
  
  offsetY = spineTopY-baseShoulderY;
  translate(0,offsetY);
  
  
 //skeleton head
  fill(191, 191, 191)
  noStroke()
  ellipse(351,387,70)
  quad(317,393,332,427,362,430,378,408)
 //eyes
  fill(0,0,0)
  ellipse(332,393,10)
  ellipse(362,393,10)
  //upperbody
  stroke(191, 191, 191)
  strokeWeight(6)
  line(347,429,344,446);
  line(300,450,400,453);
  //arms
  line(285,450,262,491)
  line(232,474,252,510)
  line(417,450,440,491);
  line(470,474,450,510);
  //r hand
  ellipse(212,451,20);
line(212,421, 212,406);   
line(199,422, 185,400);   
line(228,432, 234,418);  
line(192,456, 178,442);  
line(232,456, 246,442);   
  //l hand
  ellipse(490,451,20);
line(490,421, 490,406);  
line(503,412, 497,428);  
line(474,432, 468,418);   
line(510,456, 524,442);   
line(470,456, 456,442);   
  
  //ribs
  stroke(191);
  strokeWeight(6);
  noFill();
  arc(320,470,40,40,0,180);
  arc(320,490,45,45,0,180);
  arc(320,510,50,50,0,180);
  arc(380,470,40,40,0,180);
  arc(380,490,45,45,0,180);
  arc(380,510,50,50,0,180);
  pop();
  
  //r hip
  push()
   translate(30,-50)
  rotate(5)
  //hip
  fill(191, 191, 191)
  translate(-260,350)
  rotate(-40)
  ellipse(303,541,25,50)
  pop();
  //l hip
  push()
  fill(191,191,191);
  translate(399,541)
  rotate(40)
  ellipse(-20,30,25,50)
  pop();
  
  
  push()
  noStroke();
   fill(191,191,191);
    ellipse(333,537,100,30)
  pop()
  
  //leg
  push()
    stroke(191);
  strokeWeight(10);
line(290,568,300,597)
  line(368,578,360,597)
  pop();
  
//text time
  h = hour();
  m = minute()
  s = second();
 
  push()
  translate(230,170)
  rotate(5)
 fill(0, 255, 0);
textSize(20);
  textStyle(BOLD)
  textAlign(CENTER,CENTER)
text("Time: " + nf(h,2) + ":" + nf(m,2) + ":" + nf(s,2), 20, 20); 
  pop();
  
  
    //show coordinates with mouse
  //push();
 // fill(0);
 // text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  //stroke(255, 0, 0);
  //pop();
  
  
}


