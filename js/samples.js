// Create WebAudio Context + Play Function
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var oscillator;

var playSinoid = function (freq, duration) { // (Hz, sec)
  oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.connect(audioContext.destination);
  var currentTime = audioContext.currentTime;
  oscillator.start(currentTime);
  oscillator.stop(currentTime + duration); // after certain duration
};


var colorsHtml = [
  '<div class="color-box" id="grey"></div>',
  '<div class="color-box" id="white"></div>',
  '<div class="color-box" id="amber"></div>',
  '<div class="color-box" id="malachite"></div>',
  '<div class="color-box" id="navy-blue"></div>',
  '<div class="color-box" id="hot-magenta"></div>'
];


var sinoids = [ // don't reorder!
  0, // function gets called in experiment-timeline, only passing frequency arguments here
  150, // TODO: edit frequencies
  200
];

var noSounds = [];
noSounds.push(
  sinoids[0],
  sinoids[0],
  sinoids[0],
  sinoids[0],
  sinoids[0],
  sinoids[0]
);

var sounds = [];
sounds.push(
  sinoids[1],
  sinoids[1],
  sinoids[1],
  sinoids[2],
  sinoids[2],
  sinoids[2]
);


// console.log('sounds: ' + sounds);
// console.log('noSounds: ' + noSounds);


var soundsShuffled = jsPsych.randomization. shuffle(sounds);
// console.log('soundsShuffled: ' + soundsShuffled);


var colorsShuffled = jsPsych.randomization.shuffle(colorsHtml);
// console.log('colorsShuffled: ' + colorsShuffled);
