window.onload = () => {
    setBoxes(4)
};
const sketch = document.querySelector('#sketch-box')
const defaults = document.querySelector('.defaults')
const custom = document.querySelector('form')
const colors = document.querySelectorAll('.color')
const reset = document.querySelector('.reset')
let randomColor, newBox, redValue, blueValue,greenValue, hoverColor, filterBrightness;
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
            if(!this.dataset.checked) {
                this.dataset.checked = 'true'
                this.dataset.filter = 1    
                redValue = getRandColor(361)
                blueValue = getRandColor(101)
                greenValue = getRandColor(101)
                hoverColor = `hsl(${redValue}, ${blueValue}%, ${greenValue}%)`
            }
            else {
               filterBrightness = this.dataset.filter 
               filterBrightness -= 0.1
               this.dataset.filter =  filterBrightness
               this.style.filter = `brightness(${filterBrightness})`
               return
            }
            break
        case 'white':
            hoverColor = 'white'
            this.style.filter = 'none'
            break
        }
        
        this.style.backgroundColor = hoverColor       
    }

function getRandColor(value){
    return Math.floor(Math.random() * value)
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