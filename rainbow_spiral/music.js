var audio = new Audio();
var bass_audio = new Audio();
var other_audio = new Audio();
var drum_audio = new Audio();
var vocal_audio = new Audio();

audio.src = "look_at_the_sky.mp3"; // the source path

// audio.src = "stems/drums.mp3";

other_audio.src = "stems/other.mp3";
bass_audio.src = "stems/bass.mp3";
drum_audio.src = "stems/drums.mp3";
vocal_audio.src = "stems/vocals.mp3"


var first_time_playing = true;
var frequency_array;


 function playAudio() {
    if (!audio.paused) {
        // drum_audio.pause();
        audio.pause();
        drum_audio.pause();
        audio_level = 0;
        // pause_all_audio();
    } else {
        if (first_time_playing) {
            context = new (window.AudioContext || window.webkitAudioContext)();
            analyser = context.createAnalyser();
            source = context.createMediaElementSource(drum_audio);
            source.connect(analyser);
            analyser.connect(context.destination);
            frequency_array = new Uint8Array(analyser.frequencyBinCount);
            first_time_playing = false;
            // drum_audio.currentTime = 18;
        }
        // audio.crossOrigin = "anonymous";
        drum_audio.play();
        drum_audio.volume = 0.1;
        // drum_audio.muted = true;
        audio.play();
        
        // play_all_audio();
        // console.log(analyser.frequencyBinCount);
        
    }
}

function analyzeAudio() {    

    var array = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(array);

    var max = 0;
    for (var a of array) {
        a = Math.abs(a - 128);
        audio_level += a;
        max = Math.max(max, a);
    }

    // audio_level /= array.length;
    audio_level = (audio_level / array.length);


    console.log(audio_level);

    k = audio_level/2;


    // k = 
    // num_spirals = Math.floor(drum_level);


    // lightness = 0;
    // lightness = lightness + audio_level * 4;
    // console.log(lightness);

    // analyser.getByteFrequencyData(frequency_array);
    // console.log(frequency_array)
    // var sum = frequency_array.slice(0,100).reduce(function(a, b){
    //     return a + b;
    // }, 0);
    // console.log(sum);
    // if(sum >= 15000) {
    //     console.log(sum);
    // }
}

// function 