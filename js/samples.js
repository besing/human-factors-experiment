// Create WebAudio Context + Play Function
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var oscillator;

var playSinoid = function playSinoid(freq, duration) { // (Hz, sec)
  oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // TODO
  oscillator.frequency.value = freq;
  oscillator.connect(audioContext.destination);
  var currentTime = audioContext.currentTime;
  oscillator.start(currentTime);
  oscillator.stop(currentTime + duration); // after certain duration
};


var colorsHtml = [
  // ['1a', '<div class="color-box" id="color-1-a">color1a</div>'], // why 1st array value?
  // ['1b', '<div class="color-box" id="color-1-b">color1b</div>'],
  // ['2a', '<div class="color-box" id="color-2-a">color2a</div>'],
  // ['2b', '<div class="color-box" id="color-2-b">color2b</div>'],
  // ['3a', '<div class="color-box" id="color-3-a">color3a</div>'],
  // ['3b', '<div class="color-box" id="color-3-b">color3b</div>']
  '<div class="color-box" id="color-1-a">color1a</div>',
  '<div class="color-box" id="color-1-b">color1b</div>',
  '<div class="color-box" id="color-2-a">color2a</div>',
  '<div class="color-box" id="color-2-b">color2b</div>',
  '<div class="color-box" id="color-3-a">color3a</div>',
  '<div class="color-box" id="color-3-b">color3b</div>'
];


var sinoids = [ // don't reorder!
  // [0, 'playSinoid(0, 1)'], // why 1st array value?
  // [150, 'playSinoid(150, 1)'],
  // [200, 'playSinoid(200, 1)']
  'playSinoid(0, 1)',
  'playSinoid(150, 1)',
  'playSinoid(200, 1)'
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


console.log('sounds: ' + sounds);
console.log('noSounds: ' + noSounds);


var soundsShuffled = jsPsych.randomization. shuffle(sounds);
console.log('soundsShuffled: ' + soundsShuffled);


var colorsShuffled = jsPsych.randomization.shuffle(colorsHtml);
console.log('colorsShuffled: ' + colorsShuffled);