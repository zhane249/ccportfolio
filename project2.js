let eyeColor;
let faceWidth;
let faceHeight;
  let headX;
let headY ;
let pupilColor;
let pupilSize;
let mouthW;
let mouthH;
let backgroundColor;


function randomizeEyes()
 {eyeColor = color(random(255), random(255), random(255))
 
 }


function setup() {
  createCanvas(400, 400);
   // attach the canvas to the div in your HTML

  canvas.parent("sketch-container");
faceWidth = 350;
  eyeColor = color(255,0,0);
  faceHeight = 30;
  headX = 100;
  headY = 100;
  pupilSize = 20;
  pupilColor = color(255,0,0)
backgroundColor = color(220)

}

function draw() {
  background(backgroundColor);

  faceWidth = map(mouseX,0,width, 150,250)
  faceHeight = map(mouseY,0,height,150,250)
 let headW = faceWidth
  let headH = faceHeight
  
//face  
 fill(255, 255, 153)
  rect(headX, headY, faceWidth, faceHeight); 
  
 //ears 
let leftEarX = headX - map(mouseX, 0, width, 30, 50);
  let leftEarY = headY + headH * 0.4;
  let leftEarW = map(mouseX, 0, width, 40, 60)
  let leftEarH = map(mouseY, 0, height, 50,70);
  rect(leftEarX, leftEarY, leftEarW, leftEarH)
  
let rightEarX = headX + headW;
  let rightEarY = headY +headH * 0.4
  let rightEarW = map(mouseX, 0, width, 40,60);
  let rightEarH = map(mouseY, 0, height, 50, 70);
  rect(rightEarX, rightEarY, rightEarW, rightEarH)
  
  
//eyes  
  fill(255, 255, 255)
  

let leftEyeX = headX + headW * 0.25;
  let rightEyeX = headX + headW * 0.65;
  let eyeY = headY + headH * 0.4;
  circle(leftEyeX, eyeY, 50)
  circle(rightEyeX, eyeY, 50);
  
  
  
//eyeballs  
  fill(pupilColor)
  quad(leftEyeX, eyeY-25, leftEyeX - 25, eyeY + 1, leftEyeX, eyeY + 24, leftEyeX + 25, eyeY+1)
  quad(rightEyeX, eyeY - 25, rightEyeX - 25, eyeY - 1, rightEyeX, eyeY + 25, rightEyeX + 25, eyeY - 1)
 //quad(145,156,120,182,145,205,170,182)
 //quad(244,156,219,180,243,206,269,181)
  
 //nostrils 
  
  fill(255, 255, 102)
circle(headX + faceWidth * 0.35, headY + faceHeight * 0.525, 10);
  circle(headX + faceWidth * 0.65, headY + faceHeight * 0.525, 10)
  //circle(184,205,10)
  //circle(208,205,10)
  
  
  
//smile  
  
  noFill()
  strokeWeight(3)
  stroke(0)
  let mouthX = headX + headW * 0.475
  let mouthY = headY + headH * 0.69
  let mouthW = 140
  let mouthH = 80

   mouthW = headW* 0.7
 mouthH = headH * 0.4
    arc(mouthX, mouthY, mouthW, mouthH, 0,PI)
  

  //arc(195,238,140,80,0,PI)
 
  
  push() 
//tongue
  fill(255,100,150);
  let tongueX = headX + headW *0.5
  let tongueY = headY + headH * 0.865
  
  tongueW = headW * 0.3
  tongueH = headH * 0.5
  arc (tongueX, tongueY, tongueW, tongueH, PI, TWO_PI, CHORD)
 // arc(200,273,60,100,PI,TWO_PI,CHORD);
  pop();
  
  
  
 //hair 
 let hairY1 = headY - headH * 0.035
 let hairY2 = headY + headH * 0.065
 
line(headX + headW * 0.3, headY + 5, headX + headW * 0.3, headY + headH * 0.25);
line(headX + headW * 0.5, headY + 5, headX + headW * 0.5, headY + headH * 0.25);
line(headX + headW * 0.7, headY + 5, headX + headW * 0.7, headY + headH * 0.25);
  
  
  
  //line(155,93,155,113)
 // line(195,93,195,113)
 // line(236,93,236,113)
  
  push();
  fill(0);
  text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  stroke(0);
  pop();
 }

  
  function keyPressed() {
 if (key === 'c' || key === 'C') {
    pupilColor = color(random(255), random(255), random(255));
   
   
   }
   
 }
function mousePressed() {
     backgroundColor = color(random(255), random(255), random(255));
}


