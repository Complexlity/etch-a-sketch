window.onload = () => {
    setBoxes(4)
};
const sketch = document.querySelector('#sketch-box')
const defaults = document.querySelector('.defaults')
const custom = document.querySelector('form')
const colors = document.querySelectorAll('.color')
console.log(colors)
const reset = document.querySelector('.reset')
let randomColor, newBox, redValue, blueValue,greenValue, hoverColor;
let brushColor = 'black'

defaults.addEventListener('change', getMultiplier)
custom.addEventListener('submit', getMultiplier)

colors.forEach((color) => {
color.addEventListener('click', (e) => {
     brushColor = e.target.dataset.color
     animateIt(e.target, 'bounce')
})
})
reset.addEventListener('click', resetSketch)

function setBoxes(multiplier) {
    sketch.innerHTML = ''
let size = 32/multiplier
document.documentElement.style.setProperty('--box-size', `${size}rem`);
    for(let j = 0; j < multiplier; j++){
for(let i = 0; i < multiplier; i++){
newBox = document.createElement('div')
newBox.classList.add('box')
sketch.append(newBox)
}
}
const boxes = document.querySelectorAll('.box')
boxes.forEach(box => {
    box.addEventListener('mouseover', setColor)
})
}


function getMultiplier(e){
    multiplierValue = e.target.value
    if(e.target.name == 'form'){
        e.preventDefault()  
        multiplierValue = Number(e.srcElement[0].value)
    }
    if(multiplierValue == 0) multiplierValue = 1
    setBoxes(multiplierValue)    

}

function setColor(){
    switch(brushColor){
        case 'black':
            hoverColor = 'black'
            break
        case 'rainbow':
            redValue = getRandColor()
            blueValue = getRandColor()
            greenValue = getRandColor()
            hoverColor = `rgb(${redValue}, ${blueValue}, ${greenValue})`
            break
        case 'white':
            hoverColor = 'white'
            break
        }
        this.style.backgroundColor = hoverColor       
    }

function getRandColor(){
    return Math.floor(Math.random() * 256)
}

function resetSketch(){
    const boxes = document.querySelectorAll('.box')
    boxes.forEach(box => box.style.backgroundColor = 'white')
    animateIt(this, 'flash')
    brushColor = 'black'

}


function animateIt(element, value){
    if(element.dataset.inner == 'true'){
        element = element.parentElement
    }
    element.classList.add(`animate__${value}`)
    setTimeout(() => element.classList.remove(`animate__${value}`), 1000)
}