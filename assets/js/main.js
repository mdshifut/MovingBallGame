const getId = id => {
    return document.getElementById(id);
}

let canvasWrapper = getId('canvas');
let ballWrapper = getId('ball');
let buttons = document.querySelectorAll('.button');


// Style for the canvas
let canvasStyle = {
    width: '306px',
    height: '306px',
    border: '3px solid red',
    position: 'relative',
    borderRadius: '5px',
    margin: '0 auto',
    boxSizing: 'border-box',
    marginTop: '50px'
}

// Style for ball
let ballStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'red',
    position: 'absolute',
    left: 0,
    top: 0
}

// Initiate ball top and left position
let topValue = 0;
let leftValue = 0;




// Apply Style to the canvas element
Object.assign(canvasWrapper.style, canvasStyle)

// Apply Style to the ball element
Object.assign(ballWrapper.style, ballStyle)

//  Reset the ball position if the ball touches any border
const resetBall = () => {
    topValue = 0;
    leftValue = 0;
    ballWrapper.style.left = `${leftValue}px`
    ballWrapper.style.top = `${topValue}px`
}

// Check if the ball has touched the border
const touchChecker = (positionValue, cb) => {
    // If ball posing value is less than or gater then the canvas 
    if (positionValue < 0 || positionValue > 270) {
        cb()
        resetBall()
        clearInterval(intervalID)
    }
}

// Show alert message to the user
const showAlert = borderName => {
    alert(`You are a loser. You touched the ${borderName} border. Try it again`)
}


const leftMove = () => {
    leftValue -= 30
    ballWrapper.style.left = `${leftValue}px`


    touchChecker(leftValue, () => {
        showAlert('left')
    })
}
const rightMove = () => {
    leftValue += 30
    ballWrapper.style.left = `${leftValue}px`
    touchChecker(leftValue, () => {
        showAlert('right')
    })
}
const topMove = () => { // decrement the value and update the ball style
    topValue -= 30
    ballWrapper.style.top = `${topValue}px`

    touchChecker(topValue, () => {
        showAlert('top')
    })
}
const bottomMove = () => { // increment the value and update the ball style
    topValue += 30
    ballWrapper.style.top = `${topValue}px`

    touchChecker(topValue, () => {
        showAlert('bottom')
    })
}
var intervalID;
// Ball moving functionality
const move = (e) => {
    // Assume that nothing is clicked
    let currentClick = 'Nothing is clicked'

    // capture  which button is clicked
    if (e.type === 'click') {
        currentClick = e.target.id.trim().toLowerCase()
    }

    // Capture which button or key is pressed and moved the ball
    if (currentClick === 'left' || e.keyCode === 37) {
        clearInterval(intervalID)
        intervalID = setInterval(function() {
            leftMove()
        }, 250)

        // decrement the value and update the ball style

    } else if (currentClick === 'right' || e.keyCode === 39) {
        clearInterval(intervalID)
        intervalID = setInterval(function() {
            rightMove()
        }, 250)

        // increment the value and update the ball style

    } else if (currentClick === 'top' || e.keyCode === 38) {
        clearInterval(intervalID)
        intervalID = setInterval(function() {
            topMove()
        }, 250)


    } else if (currentClick === 'bottom' || e.keyCode === 40) {
        clearInterval(intervalID)
        intervalID = setInterval(function() {
            bottomMove()
        }, 250)


    }





}




// Add click event into the buttons
buttons.forEach(element => {
    element.addEventListener('click', move)
});

// Add keyup event into the key
document.addEventListener('keyup', move);