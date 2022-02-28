stat = "";
objects = [];
video = "";
function preload() {
    video= createVideo("video.mp4");

}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (stat != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("stat").innerHTML= "Status : Objects Dectected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects dectect are: "+ objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }            
        }
    }
    function gotResult(error, results) {
        if (error) {
            console.log(error)
        }
        console.log(results);
        objects = results;
    }


function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stat").innerHTML = "Status: dectecting objects";
}
function modelLoaded() {
    console.log("model loaded! :)")
    stat = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}