Webcam.set({
    height: 300,
    width: 300,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="captured_image">';
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/h9m0BRszp/model.json', modelLoaded);

function modelLoaded(){
    console.log("model is working");
}

prediction1 = "";
prediction2 = "";

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediciton is "+prediction1;
    speak_data2 = "and the second prediciton is "+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;

        speak();

        if(prediction1=="Happy"){
            document.getElementById("result_emoji").innerHTML = "&#128522";
        }

        if(prediction1=="Sad"){
            document.getElementById("result_emoji").innerHTML = "&#128532";
        }

        if(prediction1=="Angry"){
            document.getElementById("result_emoji").innerHTML = "&#128548";
        }


        if(prediction2=="Happy"){
            document.getElementById("result_emoji2").innerHTML = "&#128522";
        }

        if(prediction2=="Sad"){
            document.getElementById("result_emoji2").innerHTML = "&#128532";
        }

        if(prediction2=="Angry"){
            document.getElementById("result_emoji2").innerHTML = "&#128548";
        }
    }
}