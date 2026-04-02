console.log("ml5 is:", typeof ml5);

window.handsData = [];

//canvas 1
function sketch1(p) {
  let handPose;
  let hands = [];
  let video;
  let wrist;
  let middleTip;
  let point;

  p.setup = function () {
    const c = p.createCanvas(600, 600);
    c.parent("canvas1");
    p.frameRate(30);

    video = p.createCapture(p.VIDEO);
    video.size(p.width, p.height);
    video.hide();

    handPose = ml5.handpose(video, gotHands);
  };

  function gotHands(results) {
    hands = results || [];
  }

  p.draw = function () {
    p.background(0);
    p.image(video, 0, 0, p.width, p.height);
    window.handsData.length = 0;

    wrist = undefined;
    middleTip = undefined;

    if (!Array.isArray(hands)) return;

    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      if (!hand || !hand.landmarks) continue;

      for (let j = 0; j < hand.landmarks.length; j++) {
        let keypoint = hand.landmarks[j];
        p.fill(0, 255, 0);
        p.noStroke();
        p.circle(keypoint[0], keypoint[1], 10);
      }

      let n = 0;
      while (n < hand.landmarks.length) {
        point = hand.landmarks[n];
        if (n === 0) wrist = { x: point[0], y: point[1] };
        if (n === 12) middleTip = { x: point[0], y: point[1] };
        n = n + 1;
      }

      if (wrist && middleTip) {
        let handSize = p.dist(
          wrist.x,
          wrist.y,
          middleTip.x,
          middleTip.y
        );
        window.handsData.push({
          x: wrist.x,
          y: wrist.y,
          size: handSize
        });
      }
    }

    p.fill(0, 150);
    p.rect(0, 0, 600, 60);
    p.rect(0, 550, 600, 60);
    p.fill(255);
    p.textSize(18);
    p.textAlign(p.LEFT, p.CENTER);
    p.textFont("Courier New", 18);
    p.textStyle(p.BOLD);
    p.text("Say hi to the camera with your hand~ >:3", 100, 30);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.text("Try opening and closing hand slowly?! :0", 300, 580);
  };
}

new p5(sketch1);

//canvas 2
function sketch2(p) {
  let flowers = [];

  p.setup = function () {
    const c = p.createCanvas(600, 600);
    c.parent("canvas2");
    p.frameRate(30);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    p.noFill();
    p.stroke(255);
    p.strokeWeight(2);
  };

  p.draw = function () {
    p.background(20);

    if (!Array.isArray(window.handsData)) return;

    let h = 0;
    while (h < window.handsData.length) {
      let hand = window.handsData[h];
      let hx = hand.x;
      let hy = hand.y;
      let hs = hand.size;

      let found = false;
      let f = 0;

      while (f < flowers.length) {
        let flower = flowers[f];
        let dx = flower.x - hx;
        let dy = flower.y - hy;

        if (p.abs(dx) < 10 && p.abs(dy) < 10) {
          flower.angle = flower.angle + 0.002;
          flower.layers = flower.layers + 0.5;
          found = true;
        }
        f = f + 1;
      }

      if (found == false) {
        let newFlower = {};
        newFlower.x = hx;
        newFlower.y = hy;
        newFlower.size = hs;
        newFlower.r = p.random(100, 255);
        newFlower.g = p.random(100, 255);
        newFlower.b = p.random(100, 255);
        newFlower.angle = 0;
        newFlower.layers = 1;

        flowers[flowers.length] = newFlower;
      }
      h = h + 1;
    }

    let drawCount = 0;
    while (drawCount < flowers.length) {
      let f = flowers[drawCount];

      p.push();
      p.translate(f.x, f.y);
      p.stroke(f.r, f.g, f.b);

      let layer = 0;
      while (layer < f.layers) {
        let triSize = f.size;
        let triHeight = triSize * 0.866;
        p.rotate(f.angle + layer * 5);
        p.triangle(
          0,
          -triHeight / 2,
          -triSize / 2,
          triHeight / 2,
          triSize / 2,
          triHeight / 2
        );
        layer = layer + 1;
      }
      p.pop();
      drawCount = drawCount + 1;
    }
  };
}

new p5(sketch2);
