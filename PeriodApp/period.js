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
  setupWheelPickers();
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
    e.preventDefault();
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    setPosition(e.clientY);
    e.preventDefault();
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
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

function setupWheelPickers() {
  const pickers = document.querySelectorAll(".wheel-picker");
  if (!pickers.length) return;

  pickers.forEach((picker, index) => {
    createWheelPicker(picker, index);
  });
}

function createWheelPicker(picker, index) {
  const min = parseInt(picker.dataset.min || "0", 10);
  const max = parseInt(picker.dataset.max || "10", 10);
  const step = parseInt(picker.dataset.step || "1", 10);
  const unit = picker.dataset.unit || "";
  const defaultValue = parseInt(picker.dataset.default || String(min), 10);

  const values = [];
  for (let v = min; v <= max; v += step) {
    values.push(v);
  }

  const itemHeight = 26;
  const visiblePadding = 2;
  let selectedIndex = values.indexOf(defaultValue);
  if (selectedIndex < 0) selectedIndex = 0;

  picker.innerHTML = `
    <div class="wheel-highlight"></div>
    <div class="wheel-window-fade-top"></div>
    <div class="wheel-window-fade-bottom"></div>
    <div class="wheel-column wheel-column-main"></div>
    <div class="wheel-column wheel-column-unit"></div>
    <input type="hidden" class="wheel-value-output" name="wheel-picker-${index}">
  `;

  const mainCol = picker.querySelector(".wheel-column-main");
  const unitCol = picker.querySelector(".wheel-column-unit");
  const output = picker.querySelector(".wheel-value-output");

  function formatUnit(value, unitText) {
    if (!unitText) return "";

    const lower = unitText.toLowerCase();

    if (lower === "hr") return "Hr";
    if (lower === "meal") return value === 1 ? "Meal" : "Meals";
    if (lower === "cup") return value === 1 ? "Cup" : "Cups";
    if (lower === "min") return "Min";
    return unitText;
  }

  const paddedValues = [
    ...Array(visiblePadding).fill(""),
    ...values.map(String),
    ...Array(visiblePadding).fill("")
  ];

  const paddedUnits = [
    ...Array(visiblePadding).fill(""),
    ...values.map(v => formatUnit(v, unit)),
    ...Array(visiblePadding).fill("")
  ];

  mainCol.innerHTML = paddedValues
    .map(v => `<div class="wheel-item">${v}</div>`)
    .join("");

  unitCol.innerHTML = paddedUnits
    .map(v => `<div class="wheel-item">${v}</div>`)
    .join("");

  let dragging = false;
  let dragStartY = 0;
  let startTranslate = 0;
  let translate = 0;

  function clampIndex(i) {
    return Math.max(0, Math.min(values.length - 1, i));
  }

  function getCenterOffset() {
    return (picker.clientHeight / 2) - (itemHeight / 2);
  }

  function getTranslateForIndex(i) {
    return getCenterOffset() - ((i + visiblePadding) * itemHeight);
  }

  function getIndexFromTranslate(t) {
    const raw = (getCenterOffset() - t) / itemHeight - visiblePadding;
    return clampIndex(Math.round(raw));
  }

  function applyTranslate() {
    mainCol.style.transform = `translateY(${translate}px)`;
    unitCol.style.transform = `translateY(${translate}px)`;
  }

  function updateVisuals() {
    const mainItems = mainCol.querySelectorAll(".wheel-item");
    const unitItems = unitCol.querySelectorAll(".wheel-item");

    mainItems.forEach((item, i) => {
      const realIndex = i - visiblePadding;
      const dist = Math.abs(realIndex - selectedIndex);
      item.classList.remove("active", "near");

      if (realIndex === selectedIndex) {
        item.classList.add("active");
      } else if (dist === 1) {
        item.classList.add("near");
      }
    });

    unitItems.forEach((item, i) => {
      const realIndex = i - visiblePadding;
      const dist = Math.abs(realIndex - selectedIndex);
      item.classList.remove("active", "near");

      if (realIndex === selectedIndex) {
        item.classList.add("active");
      } else if (dist === 1) {
        item.classList.add("near");
      }
    });

    output.value = values[selectedIndex];
    picker.dataset.value = String(values[selectedIndex]);
  }

  function snapToNearest() {
    selectedIndex = getIndexFromTranslate(translate);
    translate = getTranslateForIndex(selectedIndex);
    applyTranslate();
    updateVisuals();
  }

  function setByDrag(clientY) {
    const delta = clientY - dragStartY;
    translate = startTranslate + delta;

    const minTranslate = getTranslateForIndex(values.length - 1);
    const maxTranslate = getTranslateForIndex(0);

    if (translate < minTranslate) translate = minTranslate;
    if (translate > maxTranslate) translate = maxTranslate;

    applyTranslate();
  }

  selectedIndex = clampIndex(selectedIndex);
  translate = getTranslateForIndex(selectedIndex);
  applyTranslate();
  updateVisuals();

  picker.addEventListener("pointerdown", (e) => {
    dragging = true;
    dragStartY = e.clientY;
    startTranslate = translate;
    picker.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  picker.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    setByDrag(e.clientY);
    e.preventDefault();
  });

  picker.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    snapToNearest();
    e.preventDefault();
  });

  picker.addEventListener("pointercancel", () => {
    if (!dragging) return;
    dragging = false;
    snapToNearest();
  });

  picker.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
      selectedIndex = clampIndex(selectedIndex + 1);
    } else {
      selectedIndex = clampIndex(selectedIndex - 1);
    }

    translate = getTranslateForIndex(selectedIndex);
    applyTranslate();
    updateVisuals();
  }, { passive: false });

  picker.addEventListener("click", (e) => {
    if (dragging) return;

    const rect = picker.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const centerY = rect.height / 2;

    if (clickY < centerY - itemHeight / 2) {
      selectedIndex = clampIndex(selectedIndex - 1);
    } else if (clickY > centerY + itemHeight / 2) {
      selectedIndex = clampIndex(selectedIndex + 1);
    } else {
      return;
    }

    translate = getTranslateForIndex(selectedIndex);
    applyTranslate();
    updateVisuals();
  });

  window.addEventListener("resize", () => {
    translate = getTranslateForIndex(selectedIndex);
    applyTranslate();
  });
}
