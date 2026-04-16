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
  setupSymptomButtons();
});

function setupPainSlider() {
  const track = document.getElementById("painTrack");
  const knob = document.getElementById("painKnob");
  const fill = document.getElementById("painFill");

  if (!track || !knob || !fill) return;

  let isDragging = false;

  function setPosition(clientY) {
    const rect = track.getBoundingClientRect();
    const knobHeight = knob.offsetHeight;

    let y = clientY - rect.top - knobHeight / 2;

    const max = track.offsetHeight - knobHeight;

    if (y < 0) y = 0;
    if (y > max) y = max;

    knob.style.top = `${y}px`;

    const fillHeight = track.offsetHeight - (y + knobHeight / 2);
    fill.style.height = `${fillHeight}px`;
  }

  track.addEventListener("pointerdown", (e) => {
    isDragging = true;
    setPosition(e.clientY);
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    setPosition(e.clientY);
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
  });
}
  function startDrag(e) {
    isDragging = true;
    if (e.pointerId !== undefined) {
      knob.setPointerCapture(e.pointerId);
    }
    setSliderPosition(e.clientY);
    e.preventDefault();
  }

  function moveDrag(e) {
    if (!isDragging) return;
    setSliderPosition(e.clientY);
    e.preventDefault();
  }

  function endDrag() {
    isDragging = false;
  }

  knob.addEventListener("pointerdown", startDrag);
  knob.addEventListener("pointermove", moveDrag);
  knob.addEventListener("pointerup", endDrag);
  knob.addEventListener("pointercancel", endDrag);

  track.addEventListener("pointerdown", (e) => {
    setSliderPosition(e.clientY);
    e.preventDefault();
  });
}

function setupSymptomButtons() {
  const symptomButtons = document.querySelectorAll(".symptom-pill");

  if (!symptomButtons.length) return;

  symptomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("selected");
    });
  });
}
