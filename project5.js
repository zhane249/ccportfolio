console.log("ml5 is:", typeof ml5);

window.handsData = [];

// canvas 1
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

    handPose = ml5.handpose(video, () => {
      console.log("Handpose model loaded");
    });

    handPose.on("predict", gotHands);
  };

  function gotHands(results) {
    hands = results || [];
  }

  p.draw = function () {
    p.background(0);
    p.image(video, 0, 0, p.width, p.height);

    let newHandsData = [];
        newHandsData.push({
          x: wrist.x,
          y: wrist.y,
          size: handSize
        });
      }
    }

    window.handsData = newHandsData;

    p.fill(0, 150);
    p.noStroke();
    p.rect(0, 0, 600, 60);
    p.rect(0, 550, 600, 60);

    p.fill(255);
    p.textSize(18);
    p.textAlign(p.LEFT, p.CENTER);
    p.textFont("Courier New");
    p.textStyle(p.BOLD);
    p.text("Say hi to the camera with your hand~ >:3", 100, 30);

    p.textAlign(p.CENTER, p.BOTTOM);
    p.text("Try opening and closing hand slowly?! :0", 300, 580);
  };
}

new p5(sketch1);

// canvas 2
          flower.angle = flower.angle + 0.2;
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

        flowers.push(newFlower);
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

        p.push();
        p.rotate(f.angle + layer * 5);
        p.triangle(
          0,
          -triHeight / 2,
          -triSize / 2,
          triHeight / 2,
          triSize / 2,
          triHeight / 2
        );
        p.pop();

        layer = layer + 1;
      }

      p.pop();
      drawCount = drawCount + 1;
    }
  };
}

new p5(sketch2);
