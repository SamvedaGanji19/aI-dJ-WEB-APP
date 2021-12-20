leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
ScoreLeftWrist="";
ScoreRightWrist="";
song="";
function preload(){
  song=loadSound("music.mp3");  
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.size(600,500);
    video.hide();
    poseNet=ml5.poseNet(video,ModelLoaded);
     poseNet.on("pose",gotPoses);
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    ScoreLeftWrist = results[0].pose.keypoints[9].score;
    ScoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreLeftWrist = " + ScoreLeftWrist+"ScoreRightWrist= "+ScoreRightWrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWrist_X= "+leftWristX+"leftWrist_Y=  "+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWrist_X= "+rightWristX+"rightWrist_Y=  "+rightWristY);
}
}
function ModelLoaded(){
    console.log("Model Loaded");
}
function draw(){
    image(video,0,0,600,500);
    fill("#f7adec");
    stroke("#f7adec");
    if(ScoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume= "+volume;
        song.setVolume(volume);
    }
    if(ScoreRightWrist >0.2){
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<= 100){
        document.getElementById("speed").innerHTML="Speed= 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<= 200){
        document.getElementById("speed").innerHTML="Speed= 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<= 300){
        document.getElementById("speed").innerHTML="Speed= 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<= 400){
        document.getElementById("speed").innerHTML="Speed= 2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<= 500){
        document.getElementById("speed").innerHTML="Speed= 2.5x";
        song.rate(2.5);
    }  
}
}
function play_btn(){
    song.play();
    song.volume(1);
    song.rate(1);
}
function stop_btn(){
    song.stop();
}
