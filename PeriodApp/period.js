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

  const itemHeight = 28;
  const visibleRows = 5;
  const centerRow = 2;

  let selectedIndex = Math.max(0, values.indexOf(defaultValue));
  if (selectedIndex === -1) selectedIndex = 0;

  picker.innerHTML = `
    <div class="wheel-highlight"></div>
    <div class="wheel-center-guide"></div>
    <div class="wheel-column wheel-column-main"></div>
    <div class="wheel-column wheel-column-unit"></div>
    <input type="hidden" class="wheel-value-output" name="wheel-picker-${index}" />
  `;

  const mainCol = picker.querySelector(".wheel-column-main");
  const unitCol = picker.querySelector(".wheel-column-unit");
  const output = picker.querySelector(".wheel-value-output");

  let translateY = 0;
  let startY = 0;
  let startTranslateY = 0;
  let dragging = false;

  function buildColumnContent(column, contentArray) {
    column.innerHTML = "";
    contentArray.forEach((text) => {
      const item = document.createElement("div");
      item.className = "wheel-item";
      item.textContent = text;
      column.appendChild(item);
    });
  }

  function getPaddedValueItems() {
    const padded = ["", "", ...values.map(String), "", ""];
    return padded;
  }

  function getPaddedUnitItems() {
    const padded = ["", "", ...values.map((v) => formatUnit(v, unit)), "", ""];
    return padded;
  }

  function formatUnit(value, unitText) {
    if (!unitText) return "";

    const lower = unitText.toLowerCase();

    if (lower === "hr") {
      return value === 1 ? "Hr" : "Hr";
    }
    if (lower === "meal") {
      return value === 1 ? "Meal" : "Meals";
    }
    if (lower === "cup") {
      return value === 1 ? "Cup" : "Cups";
    }
    if (lower === "min") {
      return "Min";
    }

    return unitText;
  }

  buildColumnContent(mainCol, getPaddedValueItems());
  buildColumnContent(unitCol, getPaddedUnitItems());

  function getSnapTranslate(indexValue) {
    return -(indexValue * itemHeight);
  }

  function clampIndex(indexValue) {
    if (indexValue < 0) return 0;
    if (indexValue > values.length - 1) return values.length - 1;
    return indexValue;
  }

  function updateWheelVisuals() {
    mainCol.style.transform = `translateY(${translateY}px)`;
    unitCol.style.transform = `translateY(${translateY}px)`;

    const allMainItems = mainCol.querySelectorAll(".wheel-item");
    const allUnitItems = unitCol.querySelectorAll(".wheel-item");

    allMainItems.forEach((item, i) => {
      item.classList.remove("active", "faded");
      const actualIndex = i - 2;
      const distance = Math.abs(actualIndex - selectedIndex);

      if (actualIndex < 0 || actualIndex >= values.length) {
        item.classList.add("faded");
      } else if (distance === 0) {
        item.classList.add("active");
      } else {
        item.classList.add("faded");
      }
    });

    allUnitItems.forEach((item, i) => {
      item.classList.remove("active", "faded");
      const actualIndex = i - 2;
      const distance = Math.abs(actualIndex - selectedIndex);

      if (actualIndex < 0 || actualIndex >= values.length) {
        item.classList.add("faded");
      } else if (distance === 0) {
        item.classList.add("active");
      } else {
        item.classList.add("faded");
      }
    });

    output.value = values[selectedIndex];
    picker.dataset.value = String(values[selectedIndex]);
  }

  function snapToNearest() {
    const rawIndex = Math.round(-translateY / itemHeight);
    selectedIndex = clampIndex(rawIndex);
    translateY = getSnapTranslate(selectedIndex);
    updateWheelVisuals();
  }

  function setFromClientY(clientY) {
    const delta = clientY - startY;
    translateY = startTranslateY + delta;

    const minTranslate = getSnapTranslate(values.length - 1);
    const maxTranslate = getSnapTranslate(0);

    if (translateY < minTranslate) translateY = minTranslate;
    if (translateY > maxTranslate) translateY = maxTranslate;

    mainCol.style.transform = `translateY(${translateY}px)`;
    unitCol.style.transform = `translateY(${translateY}px)`;
  }

  translateY = getSnapTranslate(selectedIndex);
  updateWheelVisuals();

  picker.addEventListener("pointerdown", (e) => {
    dragging = true;
    startY = e.clientY;
    startTranslateY = translateY;
    picker.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  picker.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    setFromClientY(e.clientY);
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

    translateY = getSnapTranslate(selectedIndex);
    updateWheelVisuals();
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

    translateY = getSnapTranslate(selectedIndex);
    updateWheelVisuals();
  });
}
