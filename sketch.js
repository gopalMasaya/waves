var imageScaleFactor = 1;
var outputStride = 32;
var flipHorizontal = false;
 var maxPoseDetections = 4;
var imageElement;
var getColor1;
var getColor2;
var detected = 0;

var c;
var img = new Array(10);
var index = 1;
var poses;
var up,down;
var b_img;

var poseX1 = new Array(17);
var poseY1 = new Array(17);
var poseX2 = new Array(17);
var poseY2 = new Array(17);
var poseX3 = new Array(17);
var poseY3 = new Array(17);

var score1 = new Array(17);
var score2 = new Array(17);

var leftAnkle = new Array(5);
var rightAnkle = new Array(5);
var leftAnkle1 = new Array(5);
var rightAnkle1 = new Array(5);
var side = new Array(5);
var back = new Array(5);

for(let i=0;i< 5;i++){side[i]="";back[i]="";}


var leftScore1=0;
var rightScore1 = 0;
var leftScore2=0;
var rightScore2 = 0;
var oreintation = "";
var oreintation2 = "";

for(let i= 0;i< poseX1.length;i++){
	poseX1[i]=0;	poseY1[i]=0;
  poseX2[i]=0;	poseY2[i]=0;
  poseX3[i]=0;  poseY3[i]=0;
}

function preload(){
  b_img = loadImage('assets/button1.PNG');
for(let i= 1; i< 20;i++){
img[i] = new Image();
img[i] =  document.getElementById("images"+i);
img[i].src = 'images/surf'+i+'.JPG';
}
imageElement = loadImage('images/surf'+index+'.JPG');

}

function setup() {

	const ctx = createCanvas(displayWidth, displayHeight);
down = new Button("down",220,370,90,30,18);
up = new Button("up",340,370,90,30,18);
	posenet.load().then(function(net){
		return net.estimateMultiplePoses(img[1], imageScaleFactor, flipHorizontal, outputStride,maxPoseDetections)
	}).then(function(poses){
detected = poses.length;
			console.log(detected);

		for(let i=0;i< 17;i++){
		 poseX1[i] = poses[0].keypoints[i].position.x;
		 poseY1[i] = poses[0].keypoints[i].position.y;
     score1[i] = poses[0].keypoints[i].score;
leftAnkle[1] = poseX1[15]; rightAnkle[1] = poseX1[16];
   }
if(poses.length > 1){
  for(let i=0;i< 17;i++){
   poseX2[i] = poses[1].keypoints[i].position.x;
   poseY2[i] = poses[1].keypoints[i].position.y;
   score2[i] = poses[1].keypoints[i].score;
}
leftAnkle[2] = poseX2[15]; rightAnkle[2] = poseX2[16];
}

//console.log(score2[1]+"  "+score2[2])
//console.log(leftAnkle[2]+"  /  "+rightAnkle[2])
for(let x=1;x<16;x+=2){
leftScore1 = leftScore1 +score1[x];
leftScore2 = leftScore2 +score2[x];
//console.log("leftScore:  "+ leftScore);
}

for(let x=2;x<17;x+=2){
rightScore1 = rightScore1 +score1[x];
rightScore2 = rightScore2 + score2[x];
//console.log("rightScore:  "+ rightScore1);
}

if(leftScore1 > rightScore1 + 0.2){
  oreintation = "left ";console.log("left")
  if(leftAnkle[1]> rightAnkle[1]){side[1] = "regular";console.log(side[1]+"!")}
  if(rightAnkle[1]> leftAnkle[1]){side[1] = "Gufi";console.log(side[1]+"!")}
}
else if(rightScore1 > leftScore1 + 0.2){
oreintation = "Right ";console.log("right")
if(leftAnkle[1]> rightAnkle[1]){side[1] = "left";console.log(side[1]+"!")}
else if(rightAnkle[1]> leftAnkle[1]){side[1] = "regular";console.log(side[1]+"!")}

}

if(leftScore2 > rightScore2 + 0.5){
  oreintation2 = "left ";console.log("left")
  if(leftAnkle[2]> rightAnkle[2]){side[2] = "regular";console.log(side[2]+"!")}
  if(rightAnkle[2]> leftAnkle[2]){side[2] = "Gufi";console.log(side[2]+"!")}
}
if(rightScore2 > leftScore2 + 0.5){
oreintation2 = "Right ";console.log("right")
if(leftAnkle[2]> rightAnkle[2]){side[2] = "Gufi";console.log(side[2]+"!")}
if(rightAnkle[2]> leftAnkle[2]){side[2] = "regular";console.log(side[2]+"!")}

}

if(score1[1]< 0.2 && score1[2] < 0.2){back[1] = "back Image";}
if(score2[1]< 0.2 && score2[2] < 0.2){back[2] = "back Image";}else back[2]="front Image";




})
}

function draw() {
  let backgroundColor = color(100, 50, 150);
   backgroundColor.setRed(250 + 8 * sin( 1000));
    backgroundColor.setGreen(10 + 8 * sin( 100000));
     backgroundColor.setBlue(150 + 128 * sin( 1000));
	background(200,200,220);
  noStroke();
  fill(160,160,250);rect(5,351,640,80)
  stroke(217,179,16);noFill();rect(5,0,640,350);
  up.Draw();down.Draw();
image(imageElement,5,0,640,350)
noFill();stroke(0,255,0);
for(let i=0;i< 17;i++){
ellipse( poseX1[i]+5, poseY1[i],4,4);
ellipse( poseX2[i]+5, poseY2[i],4,4);
}
stroke(255,0,0);
// ellipse( 191+5, 190,4,4);//left hip 11
// ellipse( 215+5, 202,4,4);//left knee 13
// stroke(0,0,255);
// ellipse( 167+5, 184,4,4);
// ellipse( 186+5, 211,4,4);
getColor1 = get( poseX1[11],  poseY1[11]);
getColor2 = get( poseX2[11],  poseY2[11]);


fill(150,70,5,160);rect(width-300,10,250,200);
rect(width-600,10,250,200);
textAlign(LEFT);noStroke();textSize(24);fill(250,200,20);
text("surfer2",width-230,30);text("surfer1",width-530,30);
textSize(20);fill(21,255,16);
text("angle:  "+ oreintation,width-590,70);
text("oreintation:  "+ side[1],width-590,100)
text("back-front:  "+ back[1],width-590,130)
text("suitColor :" +getColor1,width-590,170);

if(detected > 1){
text("angle:  "+ oreintation2,width-290,70);
text("oreintation:  "+ side[2],width-290,100)
text("back-front:  "+ back[2],width-290,130)
text("suitColor :" +getColor2,width-290,170);
}else {
  text("angle:  ",width-290,70);
  text("oreintation:  ",width-290,100)
  text("back-front:  ",width-290,130)
  text("suitColor :",width-290,170);

}
}


function mousePressed(){
if(up.MouseIsOver()){if(index < 20){ index++;}}
if(down.MouseIsOver()){if(index > 1){ index--;}}
console.log(index);

if(up.MouseIsOver() || down.MouseIsOver()){
console.log("processing...")
  for(let i= 0; i< 17;i++){
  poseX1[i] = 0; poseY1[i] = 0;
  poseX2[i] = 0; poseY2[i] = 0;
leftScore1 = 0; leftScore2 = 0;
rightScore1 = 0; rightScore2 = 0;
back[1] = "";back[2] = "";score1[1] = 0;score1[2] = 0;
oreintation =""; oreintation2 = "";
detected = 0;
  }

//img =  document.getElementById("images");
//img.src = 'images/surf'+index+'.jpg';
imageElement = loadImage('images/surf'+index+'.jpg');
//setTimeout(3000);
posenet.load().then(function(net){
  return net.estimateMultiplePoses(img[index], imageScaleFactor, flipHorizontal, outputStride,maxPoseDetections)
}).then(function(poses){
detected = poses.length;
    console.log(poses);

  for(let i=0;i< 17;i++){
   poseX1[i] = poses[0].keypoints[i].position.x;
   poseY1[i] = poses[0].keypoints[i].position.y;
   score1[i] = poses[0].keypoints[i].score;
leftAnkle[1] = poseX1[15]; rightAnkle[1] = poseX1[16];
 }
if(poses.length > 1){
for(let i=0;i< 17;i++){
 poseX2[i] = poses[1].keypoints[i].position.x;
 poseY2[i] = poses[1].keypoints[i].position.y;
 score2[i] = poses[1].keypoints[i].score;
}
leftAnkle[2] = poseX2[15]; rightAnkle[2] = poseX2[16];
}


//console.log(leftAnkle[2]+"  /  "+rightAnkle[2])
for(let x=1;x<16;x+=2){
leftScore1 = leftScore1 +score1[x];
leftScore2 = leftScore2 +score2[x];
//console.log("leftScore:  "+ leftScore);
}

for(let x=2;x<17;x+=2){
rightScore1 = rightScore1 +score1[x];
leftScore2 = leftScore2 + score2[x];
//console.log("rightScore:  "+ rightScore);
}

console.log("rightSide"+rightScore1+"  left "+leftScore1)
//console.log(score1[1]);

if(leftScore1 > rightScore1 + 0.1){
oreintation = "left ";console.log("left")
if(leftAnkle[1]> rightAnkle[1]){side[1] = "regular";console.log(side[1]+"!")}
if(rightAnkle[1]> leftAnkle[1]){side[1] = "Gufi";console.log(side[1]+"!")}
}
else if(rightScore1 > leftScore1 + 0.1){
oreintation = "right ";console.log("right")
if(leftAnkle[1]> rightAnkle[1]){side[1] = "Gufi";console.log(side[1]+"!")}
if(rightAnkle[1]> leftAnkle[1]){side[1] = "regular";console.log(side[1]+"!")}

}

if(leftScore2 > rightScore2 + 0.2){
oreintation2 = "left ";console.log("left")
if(leftAnkle[2]> rightAnkle[2]){side[2] = "regular";console.log(side[2]+"!")}
if(rightAnkle[2]> leftAnkle[2]){side[2] = "Gufi";console.log(side[2]+"!")}
}
if(rightScore2 > leftScore2 + 0.2){
oreintation = "right ";console.log("right")
if(leftAnkle[2]> rightAnkle[2]){side[2] = "Gufi";console.log(side[2]+"!")}
if(rightAnkle[2]> leftAnkle[2]){side[2] = "regular";console.log(side[2]+"!")}

}

if(score1[1]< 0.2 && score1[2] < 0.2){back[1] = "back Image";} else back[1]="front Image";
if(score2[1]< 0.2 && score2[2] < 0.2){back[2] = "back Image";}//else back[2]="front Image";



console.log("done!!!")
})
}

}
