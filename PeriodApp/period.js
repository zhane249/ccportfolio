function formatCurrentDate() {
  const today = new Date();

  const options = {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric"
  };

  return today.toLocaleDateString("en-US", options);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
  const currentDateEl = document.getElementById("currentDate");
  const statusNumberEl = document.getElementById("statusNumber");
  const nextCycleNumberEl = document.getElementById("nextCycleNumber");

  if (currentDateEl) {
    currentDateEl.textContent = formatCurrentDate();
  }

  if (statusNumberEl) {
    statusNumberEl.textContent = randomInt(1, 28);
  }

  if (nextCycleNumberEl) {
    nextCycleNumberEl.textContent = `${randomInt(20, 40)} days`;
  }

  setupPainSlider();
});

function setupPainSlider() {
  const track = document.getElementById("painTrack");
  const knob = document.getElementById("painKnob");
  const fill = document.getElementById("painFill");

  if (!track || !knob || !fill) return;

  let isDragging = false;

  function setSliderPosition(clientY) {
    const trackRect = track.getBoundingClientRect();
    const knobHeight = knob.offsetHeight;

    let newTop = clientY - trackRect.top - knobHeight / 2;
    const maxTop = track.offsetHeight - knobHeight;

    if (newTop < 0) newTop = 0;
    if (newTop > maxTop) newTop = maxTop;

    knob.style.top = `${newTop}px`;

    const fillHeight = track.offsetHeight - (newTop + knobHeight / 2);
    fill.style.height = `${fillHeight}px`;
  }

  knob.addEventListener("pointerdown", (e) => {
    isDragging = true;
    knob.setPointerCapture(e.pointerId);
  });

  knob.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientY);
  });

  knob.addEventListener("pointerup", () => {
    isDragging = false;
  });

  knob.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  track.addEventListener("pointerdown", (e) => {
    setSliderPosition(e.clientY);
  });
}
