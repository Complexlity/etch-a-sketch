window.onload = () => {
  setBoxes(8);
};
const sketch = document.querySelector("#sketch-box");
const defaults = document.querySelector(".defaults");
const custom = document.querySelector("form");
const colors = document.querySelectorAll(".color");
const reset = document.querySelector(".reset");
let randomColor,
  newBox,
  redValue,
  blueValue,
  greenValue,
  hoverColor,
  filterBrightness,
  colorChange;
let brushColor = "black";

defaults.addEventListener("change", getMultiplier);
custom.addEventListener("submit", getMultiplier);

colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    brushColor = e.target.dataset.color;
    animateIt(e.target, "bounce");
  });
});
reset.addEventListener("click", resetSketch);

function setBoxes(multiplier) {
  document.documentElement.style.setProperty("--box-number", `${multiplier}`);
  let text = defaults.parentElement.querySelector("span");
  text.textContent = `${multiplier} x ${multiplier}`;
  sketch.innerHTML = "";
  for (let j = 0; j < multiplier; j++) {
    for (let i = 0; i < multiplier; i++) {
      newBox = document.createElement("div");
      newBox.classList.add("box");
      sketch.append(newBox);
    }
  }
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.style.backgroundColor = "white";
    box.dataset.filter = 1;
    box.addEventListener("mouseover", setColor);
  });
}

function getMultiplier(e) {
  multiplierValue = e.target.value;
  if (e.target.name == "form") {
    e.preventDefault();
    multiplierValue = Number(e.srcElement[0].value);
  }
  if (multiplierValue == 0) multiplierValue = 1;
  setBoxes(multiplierValue);
}

function setColor() {
  switch (brushColor) {
    case "black":
      hoverColor = "white";
      this.dataset.filter = 0;
      this.style.filter = `brightness(0)`;
      delete this.dataset.checked;
      colorChange = true;
      break;
    case "rainbow":
      this.style.filter = "none";
      this.dataset.filter = 1;
      this;
      this.dataset.checked = "true";
      redValue = getRandColor(361);
      blueValue = getRandColor(101);
      greenValue = getRandColor(101);
      hoverColor = `hsl(${redValue}, ${blueValue}%, ${greenValue}%)`;
      colorChange = true;
      break;
    case "white":
      hoverColor = "white";
      this.dataset.filter = 1;
      this.style.filter = "none";
      delete this.dataset.checked;
      colorChange = true;
      break;
    case "lighten":
      filterBrightness = Number(this.dataset.filter);
      filterBrightness += 0.2;
      this.dataset.filter = filterBrightness;
      this.style.filter = `brightness(${filterBrightness})`;
      if (this.dataset.filter > 2) {
        this.dataset.filter = 2;
        this.style.filter = `brightness(2)`;
      }
      colorChange = false;
      break;
    case "darken":
      filterBrightness = Number(this.dataset.filter);
      filterBrightness -= 0.2;
      this.dataset.filter = filterBrightness;
      this.style.filter = `brightness(${filterBrightness})`;
      if (this.dataset.filter < 0) {
        this.dataset.filter = 0;
        this.style.filter = `brightness(0)`;
      }
      colorChange = false;
      break;
  }

  if (colorChange) this.style.backgroundColor = hoverColor;
}

function getRandColor(value) {
  return Math.floor(Math.random() * value);
}

function resetSketch() {
  const boxes = document.querySelectorAll(".box");
  animateIt(this, "flash");
  boxes.forEach((box) => {
    box.style.transition = `background-color 1.8s ease-in-out, filter 1.8s ease-in-out`;
    box.style.backgroundColor = "white";
    box.style.filter = "none";
    setTimeout(() => {
      box.style.transition = `none`;
    }, 1500);
    delete box.dataset.checked;
  });
}

function animateIt(element, value) {
  if (element.dataset.inner == "true") {
    element = element.parentElement;
  }
  element.classList.add(`animate__${value}`);
  setTimeout(() => element.classList.remove(`animate__${value}`), 1000);
}
