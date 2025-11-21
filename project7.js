const MOUSE_BASE = "assets/mouse/"; // mouse images live here
const INTRO_MS = 6000; // for the intro vid

let scene = 0;
let startButton;
let acceptPops = [];
let denyPop;
let monster = null; //CHANGE
let scene3StartTime = 0;
let restartButton;
let openMouth, closeMouth; //since they go together
let mouseAnim;
let denyImg;
let desktopImg;
//let startButtonJustClicked = false;
let blurRecipeImg;
let clearRecipeImg;
let munchSound;
let windowsDownSound;
let windowsStartSound;
let bgMusic;
let lastScene = -1;
let playedScene3Sound = false;
let playedScene4Sound = false;
let powerOnImg;
let restartImg;
let startX, startY, startW, startH;
let restartX, restartY, restartW, restartH;

let computerZoom;
 let computerZoomPlaying = false;
 let computerReady = false;
let cookieVideo;
let cookiePlaying = false;
let cookieReady = false;
//Changed these a bit
let acceptTextsAI = [
  "We use cookies to remember your preferences. You can choose which cookies to allow in settings.",
  "Accepting cookies helps us improve YOUR experience.",
  "Click 'Accept All' to enjoy faster loading and personalized content!",
  "Essential and performance cookies are pre-selected for the BEST EXPERIENCE. CLICK NOW.",
  "'Accept All' is a bright button; 'Manage Settings' is a small gray text link.",
  "To continue browsing, please choose an option.",
  "Declining cookies may reduce site functionality and personalization",
  "Some cookies are essential for the site to work. ACCEPT ALL to proceed.",
  "We care about YOUR privacy --- that's why we need your consent. Accept cookies to stay safe and connected!",
  "By continuing to use this site, you consent to all cookies."
];
let denyClickCount = 0;
let restartCount = 0;

function preload() {
  //monster chase animation
  openMouth = loadImage("assets/openMouth.png");
  closeMouth = loadImage("assets/closeMouth.png");
  //recipe background
  blurRecipeImg = loadImage("assets/blurRecipe.png");
  clearRecipeImg = loadImage("assets/clearRecipe.png");

  //mouse being eaten 
  mouseAnim = new MouseEaten();
  mouseAnim.preload();
  denyImg = loadImage("assets/dC.png");
  desktopImg = loadImage("assets/desktop.png");
  
  //start and restart buttons
  powerOnImg = loadImage("assets/button/powerOn.png");
  restartImg = loadImage("assets/button/restart.png");
  
 soundFormats('wav','mp3');
  
 //munchSound = loadSound("assets/audio/monsterMunch.wav");
  munchSound = loadSound("assets/audio/monsterMunch.mp3")
 windowsDownSound = loadSound("assets/audio/windowsDown.wav");
 windowsStartSound = loadSound("assets/audio/windowsStart.wav");
  bgMusic = loadSound("assets/audio/backgroundMusic.wav");
}

function setup() {
  createCanvas(600, 400);
    // attach the canvas to the div in your HTML

  canvas.parent("sketch-container");
  textAlign(CENTER, CENTER);
 
  //buttons
  startW = 100;
  startH = 100;
  startX = width/2 - startW/2-238;
  startY = height/2- startH/2+150;
  
  restartW = 40;
  restartH = 60;
  restartX = width/2-restartW/2;
  restartY = height/2-10-restartH/2+125;
  
  //sound effects
  if(munchSound) munchSound.setVolume(0.7);
  if (windowsDownSound) windowsDownSound.setVolume(0.5);
  if (windowsStartSound) windowsStartSound.setVolume(0.5);

  //videos
  computerZoom = createVideo("assets/computerZoom.mp4");
  computerZoom.hide();
  computerZoom.volume(0);
  computerZoom.elt.muted = true; //CHANGE - important for autoplay to work
  computerZoom.elt.playsInline = true; //CHANGE - important for autoplay to work
  computerZoom.elt.addEventListener(
    "canplay",
    () => {
      computerReady = true;
    },
    { once: true }
  );
  //CHANGE - important for autoplay to work

  cookieVideo = createVideo(["assets/cookieMonster.mp4"]);
  cookieVideo.hide();
  cookieVideo.volume(0);
  cookieVideo.elt.muted = true;
  cookieVideo.elt.playsInline = true;
  cookieVideo.elt.addEventListener(
    "canplay",
    () => {
      cookieReady = true;
    },
    { once: true }
  );

 // makeStartButton(); // calling function here to fix reload problem
}


/*function makeStartButton() {
  if (startButton) startButton.remove();
  startButton = createButton("START");
  startButton.position(width / 2 - 50, height / 2);
  startButton.size(100, 50);
  startButton.mousePressed(() => {
    scene = 1;
    startButton.remove();
    startButton = null;
  startButtonJustClicked = true;
  });
}*/

function draw() {
  
  if(scene!== lastScene){
    if(lastScene ==3){
      munchSound.stop();
    }
    if(scene ==1){
      windowsStartSound.play();
    }
    if (scene==4 && !playedScene4Sound){
      windowsDownSound.play();
      playedScene4Sound = true;
    }
  lastScene = scene;
    
    if(scene ==3 && !playedScene3Sound){
      munchSound.play();
      playedScene3Sound = true;
   
    }
    if(scene ==0 ||scene ==2){
      if(bgMusic && !bgMusic.isPlaying()){
        bgMusic.setVolume(0.4);
        bgMusic.loop();
      }
    }else{
      if(bgMusic && bgMusic.isPlaying()){
        bgMusic.stop();
      }
    }
    lastScene = scene;
  }

  
  background(220);
  switch (scene) {
    case 0:
      scene0(); break;
    case 1:
      scene1(); break;
    case 2:
      scene2(); break;
    case 3:
      scene3();break;
    case 4:
      scene4();break;
  }
}


//2000s computer scene 0
function scene0() {
  cursor(); // regular cursor on the title

  
  if (!computerZoomPlaying && computerReady) {
    computerZoom.time(0);
    computerZoom.loop();
    computerZoomPlaying = true;
  } //changed a little to match previous code
  image(computerZoom, 0, 0, width, height);

  image(powerOnImg, startX, startY, startW, startH);
//  if (restartButton) { restartButton.remove(); restartButton = null; }
//  if (!startButton) makeStartButton();
} //changed bc start button was having issue


//desktop scene 1
function scene1() {
  cursor(); // system cursor is fine here
  image(desktopImg,0,0,width,height);
   drawClockBar();
  
}

//recipes scene 2

function scene2() {
  noCursor(); // hide system cursor; we draw our mouse image instead
 
 //background switch 
  if(denyClickCount >=8){
    image(clearRecipeImg,0,0,width,height);
  }else{
    image(blurRecipeImg,0,0,width,height);
  }
   drawClockBar();

  //popups only if not cleared
if(denyClickCount <8){
  for(let i = 0; i<acceptPops.length; i++) acceptPops[i].display();
  if(denyPop) denyPop.display();
    
  }
  // always draw the mouse image over the UI
  mouseAnim.show();
  //change made to fix eating mouse issue
}
  


//scene 3 cookie eating you

function scene3() {
  noCursor();
  background(255, 0, 0, 210);
 
 
/*  cookieVideo.hide();
  cookieVideo.loop();
  cookieVideo.time(0);
  setTimeout(()=>{
    cookieVideo.stop();
    
  },INTRO_MS);*/

  // During intro, show video and our mouse image on top
  if (millis() - scene3StartTime < INTRO_MS) {
    image(cookieVideo, 0, 0, width, height);
    mouseAnim.show();
    return;
  }

  // after intro, stop/hide video once
  if (cookiePlaying) {
    cookieVideo.stop();
    cookieVideo.hide();
    cookiePlaying = false;
  }

  if (!monster) monster = new CookieMonster(openMouth, closeMouth);
  monster.update();
  monster.display();

  // mouse image (idle follows mouse; playing locks & animates)
  mouseAnim.show();

  // trigger eat if close enough
  let d = dist(monster.x, monster.y, mouseX, mouseY);
  if (d < 50 && !mouseAnim.isPlaying) mouseAnim.play();

  if (mouseAnim.done()) scene = 4;
}

//scene 4 blue screen of death
function scene4() {
  cursor(); // system cursor is fine again
  background(0, 0, 200);
 
  fill(255);
  textSize(16);
  text(":( Your system has crashed due to excessive cookie consumption. Sorry! You died.", width / 2, height / 2 - 40);
  textSize(14);
  text("Please restart your computer to try again.", width / 2, height / 2 + 10);
  textSize(12);
  let percent = min(restartCount * 10, 100);
  text("Collecting data:"+ percent+"%", width / 2, height / 2 + 50);
  image(restartImg, restartX, restartY, restartW, restartH);

 /* if (!restartButton) {
    restartButton = createButton("RESTART");
    restartButton.position(width / 2 - 50, height / 2 + 80);
    restartButton.size(100, 40);
    restartButton.mousePressed(() => {
      restartCount++;
      hardReset();
      scene = 0;
    });
  }*/
}

function mousePressed() { //added swction
 /*if (startButtonJustClicked){
   startButtonJustClicked = false;
   return;
 }*/
  if(scene ==0){
    if( mouseX > startX&& mouseX<startX + startW && mouseY > startY && mouseY < startY + startH){
      scene = 1;
      return;
    }
  }
   if(scene==4){
        if(mouseX> restartX && mouseX < restartX + restartW && mouseY > restartY && mouseY< restartY+ restartH){
          restartCount++;
          hardReset();
          scene =0;
          return;
        }
      }
  if (scene === 1) {
    if (computerZoomPlaying) { 
      computerZoom.stop();                   
      computerZoom.hide();                  
      computerZoomPlaying = false; 
 
 }
    scene = 2;
    setupScene2();
    return;
  }

  if (scene === 2) {
   
    // Deny shrinks & moves
    if (denyPop && denyPop.isClicked(mouseX, mouseY)) {
      denyPop.shrink(); 
      denyClickCount++;
      
      if(denyClickCount >=8){
        acceptPops =[];
        denyPop = null;
        return;
      }
 
     
      let index = denyClickCount % acceptTextsAI.length;
     let newLabel = acceptTextsAI[index];  
      let lastOne = acceptPops[acceptPops.length-1];
      
      let newPop = new AcceptCookies(lastOne.x, lastOne.y, lastOne.w, lastOne.h, newLabel);
      
      newPop.grow();
      acceptPops.push(newPop);
      if(acceptPops.length>10){
        acceptPops.shift();
      }
    }

    // Allow → Scene 3
    for (let i = 0; i < acceptPops.length; i++) {
      if (acceptPops[i].isClicked()) {
        scene = 3;
        monster = null;
        scene3StartTime = millis();

        // Start intro video ONCE here (user gesture)
        if (cookieReady) {
          startCookieIntro();
        } else {
          cookieVideo.elt.addEventListener("canplay", () => {
            if (scene === 3 && !cookiePlaying) startCookieIntro();
          }, { once: true });
        }

        // clear scene-2 UI
        acceptPops = [];
        denyPop = null;
        break;
      }
    }
  }
}

//setup scene2
function setupScene2() {
  denyClickCount = 0;
  acceptPops = [];
  let firstPopup = new AcceptCookies(150,150, 320, 200,"Allow All Cookies");
  acceptPops.push(firstPopup);
  denyPop = new DenyCookies(denyImg);

  // reset the mouse animation so idle art shows under cursor
  if (mouseAnim) mouseAnim.reset();
}

function startCookieIntro() {
  //cookieVideo.show();
  cookieVideo.time(0);
  cookieVideo.loop();
  cookiePlaying = true;
}

function hardReset() {
  if (computerZoomPlaying) computerZoom.stop();
  computerZoomPlaying = false;

  if (cookiePlaying) cookieVideo.stop();
  cookieVideo.hide();
  cookiePlaying = false;

  monster = null;
  acceptPops = [];
  denyPop = null;

  // reset mouse animation state so it doesn't start as "eaten"
  if (mouseAnim) mouseAnim.reset();

  if (startButton) { startButton.remove(); startButton = null; }
  if (restartButton) { restartButton.remove(); restartButton = null; }
  
  playedScene3Sound = false;
  playedScene4Sound = false;
  lastScene = -1;
}

//time
function drawClockBar(){
  push();
  fill(180);
  noStroke();

  rect(0,height-20,width,30);
  
  let h = hour();
  let m = minute();
  let s = second();
  
  fill(0);
  textSize(15);
  textStyle(BOLD)
  textAlign(RIGHT,CENTER);
text("Time: " + nf(h,2) + ":" + nf(m,2) + ":" + nf(s,2), 580, 390); 
  pop();
}

class AcceptCookies{
  constructor(x,y,w,h,label){
    this.x = x;
    this.y= y;
    this.w=w;
    this.h= h;
    this.label = label;
  }
  display(){
    push();
    //accept design
    rectMode(CENTER);
    fill(205,205,205);
    strokeWeight(3);
    stroke(50);
    rect(this.x,this.y,this.w,this.h);
   
    //title
    fill(0, 0, 153);
    noStroke();
    rect(this.x,this.y-this.h/2 + 20, this.w, 40);
    
    fill(225);
    textSize(14);
    textAlign(LEFT, CENTER);
    text("Security Warning", this.x - this.w/2+15, this.y - this.h/2+20);
    fill(205,205,205);
    rect(this.x, this.y+10, this.w-20, this.h-80);
    
    //AI text
    fill(0);
    noStroke();
    textSize(18);
    textAlign(CENTER,CENTER);
    text(this.label, this.x, this.y,this.w-20,this.h-20);
   
    this.drawAcceptButton();
    pop();
  }
  drawAcceptButton(){
    push();
    let btnW = this.w*0.45;
    let btnH = 40;
    let btnX = this.x;
    let btnY = this.y + this.h/2 - 40;
    
    stroke(13,13,13);
    strokeWeight(1);
    fill(0, 255, 0);
    rect(btnX,btnY,btnW,btnH);
    
    
    fill(179, 179, 179);
  strokeWeight(1);
    fill(13,13,13);
    textSize(15);
    textAlign(CENTER,CENTER);
    text("Accept All Cookies",btnX,btnY);
    pop();
  
  }
  isClicked(){
    //accept button in popup only
    let btnW = this.w*0.45;
    let btnH = 40;
    let btnX = this.x;
    let btnY = this.y + this.h/2 - 40;
    
    return(mouseX > btnX - btnW/2&& mouseX < btnX + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2);
    
  }
  grow(){
    this.w*= 1.09;
    this.h *= 1.09;
    
    this.x += 30;
    this.y +=30;
  }
 
}

class CookieMonster {
  constructor(openImg, closeImg) {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 220;
    this.speed = 0.06; // quick enough to catch the cursor
    this.openImg = openImg;
    this.closeImg = closeImg;
    this.mouthOpen = false;
    this.lastSwitch = millis();
    this.lastGrowTime = millis();
  }
  update() {
    if (millis() - this.lastSwitch > 300) {
      this.mouthOpen = !this.mouthOpen;
      this.lastSwitch = millis();
    }
    let dx = mouseX - this.x,
      dy = mouseY - this.y;
    this.x += dx * this.speed;
    this.y += dy * this.speed;
    
    if(millis()- this.lastGrowTime >2000){
      this.size +=30;
      this.speed += 0.04;
      this.lastGrowTime = millis();
      this.size = min(this.size,570);
    }
    
  }
  display() {
    const img = this.mouthOpen ? this.openImg : this.closeImg;
    image(
      img,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

class DenyCookies {
  constructor(img) { 
    this.img = img;
    this.x = random(100, 500); 
    this.y = random(100, 300); 
    this.d = 200;
    this.hitSize = 60;
  }

  display() {
    push();
   imageMode(CENTER);
    image(this.img,this.x,this.y,this.d,this.d);
    pop();
  }
  
  isClicked(mx, my) { 
    return dist(mx, my, this.x, this.y) < this.hitSize/2; }
  
  shrink() {
    this.d = max(25, this.d * 0.8);
    
  let safe = false, attempts = 0;
    
    while (!safe && attempts < 30) {
      this.x = random(50, width - 50); this.y = random(50, height - 50);
      safe = true;
      
      for (let i = 0; i < acceptPops.length; i++) 
        if(this.checkOverlap(acceptPops[i])) { safe = false; 
                                          break; }
      attempts++;
    }
  }
  
  checkOverlap(popup) {
 let closestX = constrain(this.x, popup.x - popup.w/2, popup.x + popup.w/2);
    
 let closestY = constrain(this.y, popup.y - popup.h/2, popup.y + popup.h/2);
    
    let distX = this.x - closestX;
    let distY = this.y - closestY;
    let distanceSq = distX* distX + distY*distY;
    
    return distanceSq <(this.d/2)*(this.d/2);
    
  }
}

class MouseEaten {
  constructor() {
    this.x = mouseX; this.y = mouseY;
    this.images = [];
    this.currentFrame = 0;
    this.startTime = 0;
    this.isPlaying = false;
    this.durationMs = 3000;
    this.allLoaded = false;
  }
  preload() {
    const toLoad = [];
    for (let i = 1; i <= 4; i++) {
      const url = `${MOUSE_BASE}mouse${i}.png`;
      console.log("Loading mouse art:", url);
      toLoad.push(url);
    }

    let loadedCount = 0;
    let failed = false;

    for (let i = 0; i < toLoad.length; i++) {
      this.images[i] = loadImage(
        toLoad[i],
        () => {
          loadedCount++;
          if (loadedCount === toLoad.length && !failed) this.allLoaded = true;
        },
        (err) => {
          console.error("Failed to load:", toLoad[i], err);
          failed = true; // still allow sketch to run; show fallback
        }
      );
    }
  }
  show() {
    if (!this.allLoaded) {
      // fallback so your sketch keeps running if images are missing
      push();
      noStroke();
      fill(255, 0, 0);
      ellipse(mouseX, mouseY, 16, 16);
      pop();
      return;
    }

    if (!this.isPlaying) {
      this.x = mouseX; this.y = mouseY;
      image(this.images[0], this.x - 30, this.y - 30, 60, 60);
      return;
    }
    let elapsed = millis() - this.startTime;
    let idx = floor(map(elapsed, 0, this.durationMs, 0, this.images.length));
    this.currentFrame = constrain(idx, 0, this.images.length - 1);
    image(this.images[this.currentFrame], this.x - 30, this.y - 30, 60, 60);
  }
  play() {
    if (!this.isPlaying && this.allLoaded) {
      this.isPlaying = true;
      this.startTime = millis();
      this.x = mouseX; this.y = mouseY; // lock where it was eaten
      this.currentFrame = 0;
    }
  }
  done() { return this.isPlaying && (millis() - this.startTime) >= this.durationMs; }

  // reset animation so a restart shows idle cursor-art again
  reset() {
    this.isPlaying = false;
    this.currentFrame = 0;
    this.startTime = 0;
    this.x = mouseX;
    this.y = mouseY;
  }
}
