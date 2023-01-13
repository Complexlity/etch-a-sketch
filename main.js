// Creates default box size
window.onload = () => {
  setBoxes(8);
};

// Gets the sketch box as well as all the settings from the dom
const sketch = document.querySelector("#sketch-box");
const meter = document.querySelector(".meter");
const custom = document.querySelector("form");
const customInput = custom.querySelector("input");
const colors = document.querySelectorAll(".color");
const reset = document.querySelector(".reset");

// Creates all universally used variables
let randomColor,
  newBox,
  redValue,
  blueValue,
  greenValue,
  hoverColor,
  filterBrightness,
  colorChange;

// Makes the default setting black. Other value would be white, rainbow, lighten and darken
let brushColor = "black";

// Changes the size of the box when the meter is changed as well as when custom value is entered and submitted
meter.addEventListener("change", getMultiplier);
custom.addEventListener("submit", getMultiplier);

// Adds bounce animation to the settings using animate.css
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    brushColor = e.target.dataset.color;
    animateIt(e.target, "bounce");
  });
});

// Fires function to take sketch box to default
reset.addEventListener("click", resetSketch);

// This function takes in a multiplier and creates a square number of boxes in the sketch box
function setBoxes(multiplier) {
  document.documentElement.style.setProperty("--box-number", `${multiplier}`);
  let text = meter.parentElement.querySelector("span");
  text.textContent = `${multiplier} x ${multiplier}`; // Shows the number of boxes per row on the page
  sketch.innerHTML = "";

  // Loop to creae and apppend the boxes
  for (let j = 0; j < multiplier; j++) {
    for (let i = 0; i < multiplier; i++) {
      newBox = document.createElement("div");
      newBox.classList.add("box");
      sketch.append(newBox);
    }
  }

  // Adds the listenener to show color when each box is hovered
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.style.backgroundColor = "white";
    box.dataset.filter = 1;
    box.addEventListener("mouseover", setColor);
  });
}

// Collects the input for the meter or form and changes the number of boxews
function getMultiplier(e) {
  multiplierValue = e.target.value;
  // Checks the type to be form and removes the default reload on form submit
  if (e.target.name == "form") {
    e.preventDefault();
    multiplierValue = Number(e.srcElement[0].value);
  }

  if (multiplierValue == 0)
    multiplierValue = 1; // Ensures there is at least one box on the screen
  else if (multiplierValue > 32) meter.value = 32; // updates the value of the meter element
  setBoxes(multiplierValue); // Updates the boxes number
  customInput.value = "";
}

// This function changes the box color depending on the current state of the brush color (default is black as stated above)
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
      redValue = getRandColor();
      blueValue = getRandColor();
      greenValue = getRandColor();
      // hoverColor = `(${redValue}, ${blueValue}%, ${greenValue}%)`;
      hoverColor = `rgb(${redValue},${blueValue},${greenValue})`;
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

  // Does not fire if the lighten or darken setting is used
  if (colorChange) this.style.backgroundColor = hoverColor;
}

// This function gets the random rgb value
function getRandColor() {
  return Math.floor(Math.random() * 256);
}

// Loops to remove all box color
function resetSketch() {
  const boxes = document.querySelectorAll(".box");
  animateIt(this, "flash");
  boxes.forEach((box) => {
    box.style.transition = `background-color 1.8s ease-in-out, filter 1.8s ease-in-out`;
    box.style.backgroundColor = "white";
    box.style.filter = "none";
    this.dataset.filter = 1;
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
