song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

score_LeftWrist = 0;
score_RightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(300, 250);

    video = createCapture(VIDEO);
    video.hide();   
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);   
}

function modelLoaded()
{
   console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(score_LeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        in_number_leftWristY = Number(leftWristY);
        remove_Decimals = floor(in_number_leftWristY);
        volume = remove_Decimals / 500;
        document.getElementById("volume").innerHTML = volume;
        song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1); 
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_LeftWrist = results[0].pose.keypoints[9].score;    
        console.log(score_LeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + "RightWristY = " + rightWristY);
    }
}