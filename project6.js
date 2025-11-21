let leftHand;
let rightHand;
let days = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
let activeDays = [false, false, false, false, false, false, false];

//no day MousePressed yet
let currentDay = -1;
//ring colors
let purpleColor = [150,80,200];
let yellowColor = [255,215,0];
let blueColor = [70,130,255];
let redColor = [255,80,80];


//ring positions
let ringPosP = [460,330];
let ringPosY= [160,390];
let ringPosB = [230,350];
let ringPosR = [530,250];

/*order
index 0 = P
index 1 = Y
index 2 = B
index 3 = R
*/
let ringData = [
  [8,5,2,0], //M
  [4,0,2,1],//Tues
  [6,0,0,5],//Weds
  [4,1,3,9],//Thurs
  [0,2,0,0],//Fri
  [3,0,0,2],//Sat
  [5,0,8,0],//Sun
  
];

function preload(){
  leftHand = loadImage('lefth.png')
  rightHand = loadImage('righth.png')
}


function setup() {
  createCanvas(600, 600);
    // attach the canvas to the div in your HTML

  canvas.parent("sketch-container");
  textAlign(CENTER,CENTER);
  textSize(14);
  angleMode(DEGREES);
}

function draw() {
  background(0);  
  
  //tiny me
 push();
  stroke(0,255,0)
  strokeWeight(3);
  noFill();
  
  quad(86,306,191,234,271,417,234,457,);
  quad(420,202,530,241,474,465,395,409)
  fill(0,255,0);
  circle(318,394,150);
  
  line(222,446,298,600);
  line(468,459,435,600);
  pop();
 //tiny me expressions 
  push();
  stroke(0);
  strokeWeight(5);
   line(275,407,300,422);
  line(336,418,354,393);
  line(322,433,311,447);
  line(322,433,336,442);
  
  pop();
  
  
  
  image(leftHand, 339, 153,250,350);
  image(rightHand, 50,150,250,350);

  
  //rectangle buttons
  for (let i=0; i<days.length; i = i+1){
    let x = 20 + i*80;
    let y = 30;
    
   if (activeDays[i] == true){
     fill(200,230,255);
   }else{
     fill(230);
   }
    
    stroke(153, 0, 0);

    rect(x,y,70,30);
    noStroke();
    fill(153, 0, 0);

    text(days[i],x+35,y+15);
    
  }
 
  //total rings for all days
 let totalPurple = 0;
  let totalYellow = 0;
  let totalBlue = 0;
  let totalRed = 0;
  
  for (let d = 0; d <days.length; d = d+1){
    if (activeDays[d] == true){
      let p = ringData[d][0];
      let y = ringData[d][1];
      let b = ringData[d][2];
      let r = ringData[d][3];
      
 totalPurple = totalPurple +p;
 totalYellow = totalYellow + y;
totalBlue = totalBlue + b;
    totalRed = totalRed + r;
    }
  }
  
  
 //ring data for selected day
  //glow!!
  blendMode(ADD);
  
for (let d = 0; d < days.length; d = d+1) {
  if (activeDays[d] == true){
    let gap = d*30
    let p = ringData[d][0];
    let y = ringData[d][1];
    let b = ringData[d][2];
    let r = ringData[d][3];
  
//purple ring right index
    stroke(purpleColor);
  strokeWeight(3);
    for(let k = 0; k< p; k = k+1){
    push(); 
      translate(ringPosP[0]-40,ringPosP[1]+100-k*5-gap);
      rotate(15);
      line(-15,0,15,0);
      
      pop();
    }
    
    //yellow left thumb
    stroke(yellowColor);
    strokeWeight(3);
    for(let k = 0; k< y; k = k+1){
       push();
      translate(260,230-k*5 - d*25);
      rotate(0);
      line(-10,0,10,0);
      pop();
    }
 
    //blue left middle
   stroke(blueColor);
    strokeWeight(3);
 for(let k = 0; k< b; k = k+1){
   push();
   translate(222,461-k*5-d*25);
   rotate(-15);
   line(-15,0,15,0);
   pop();
  }
    //red right ring
    stroke(redColor);
    strokeWeight(3);
    for(let k = 0; k<r; k = k+1){
 push()
      translate(ringPosR[0]-10,ringPosR[1]+250-k*5-gap);
      rotate(10);
      line(-15,0,15,0);
      pop();
    }
  }
}
    noStroke();
      blendMode(BLEND);
    
 fill(0,255,0) ;
  textSize(10);
  textAlign(CENTER);
  textFont('Courier New',10)
  text("Press the Day to See my Rings",width/2+60,height-50);

}

function mousePressed() {
  //button checker
  for(let i = 0; i<days.length; i = i+1){
    let x = 20 + i*80;
    let y = 30;
    
    //on and off active state
    if (mouseX > x && mouseX < x+70 && mouseY > y && mouseY < y+30){
      if(activeDays[i]== true){
        activeDays[i] = false;
      }else{
        activeDays[i]=true;
      }
    }
  }
 //console.log("Mouse clicked at:", mouseX, mouseY)
}

