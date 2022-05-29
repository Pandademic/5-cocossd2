console.log("GOOD EVENING")

setStatus("starting up....")

let detections;

function getRandomInt(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

function setStatus(toWhat){
    document.getElementById("status").innerHTML = toWhat
}

function preload(){
    img = loadImage(Config.src) 
}
function setup(){
    canvas = createCanvas(600,400)
    canvas.center()
    canvas.parent('cvs')
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
}
function draw(){
    image(img,0,0,600,400)
    objectDetector.detect(img,gotResult);
    
}

function modelLoaded(){
    console.log("The model has loaded!")
    setStatus("Model loaded!")
}

function detect() {
    if(detections) {
	detections.forEach(detected =>{
	    stroke(getRandomInt(255),getRandomInt(255),getRandomInt(255))
	    strokeWeight(3)
	    noFill()
	    rect(detected.x,detected.y,detected.width,detected.height)
	    noStroke()
	    fill('black')
	    textSize(24)
	    text(detected.label,detected.x + 10, detected.y + 24)
	});
    }
    objectDetector.detect(img,gotResult) // loop for ever
}

function gotResult(err,results) {
    setStatus("Evalulating")
    if(err){
	setStatus("ERROR: "+err)
	return
    }
    if(results.length > 1) {
	console.log(results)
    }else{
	console.log(":( found an empty detections")
    }
    detections = results

    detect();
    
}
