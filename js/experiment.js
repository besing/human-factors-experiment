$(document).ready(function () { // braucht keypress.js anscheinend


// Create WebAudio Context + Play Function
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var oscillator;

var playSinoid = function playSinoid(freq, duration) { // (Hz, sec)
  oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.connect(audioContext.destination);
  var currentTime = audioContext.currentTime;
  oscillator.start(currentTime);
  oscillator.stop(currentTime + duration); // after certain duration
};


// Count Keypresses via keypress.js
var listener = new window.keypress.Listener();

var countTotalUp = [];
var countTotalDown = [];

var countKeyPress = function (keyString) {
  listener.counting_combo(keyString, function () {

    if (keyString === 'up') { // TODO
      countTotalUp.push(keyString);
    }
    else if (keyString === 'down') {
      countTotalDown.push(keyString);
    }

    console.log('UP: ' + countTotalUp.length);
    console.log('DOWN: ' + countTotalDown.length);

  });
};

countKeyPress('up');
countKeyPress('down');


// Color HTML snippets for "prompt"
var colorsHtml = [
  ['0a', '<div class="color-box" id="color-0-a">color0a</div>'],
  ['0b', '<div class="color-box" id="color-0-b">color0b</div>'],
  ['1a', '<div class="color-box" id="color-1-a">color1a</div>'],
  ['1b', '<div class="color-box" id="color-1-b">color1b</div>'],
  ['1c', '<div class="color-box" id="color-1-c">color1c</div>'],
  ['2a', '<div class="color-box" id="color-2-a">color2a</div>'],
  ['2b', '<div class="color-box" id="color-2-b">color2b</div>'],
  ['2c', '<div class="color-box" id="color-2-c">color2c</div>'],
  ['3a', '<div class="color-box" id="color-3-a">color3a</div>'],
  ['3b', '<div class="color-box" id="color-3-b">color3b</div>'],
  ['3c', '<div class="color-box" id="color-3-c">color3c</div>']
];


var sinoids = [
  [80, 'playSinoid(80, 1)'],
  [120, 'playSinoid(120, 1)'],
  [150, 'playSinoid(150, 1)']
];


var shuffleAudio = jsPsych.randomization.shuffle(sinoids);
console.log(shuffleAudio);
var shuffleColors = jsPsych.randomization.shuffle(colorsHtml);
console.log(shuffleColors);



// TODO : for-Schleife noch mal überarbeiten .. evtl. statt i < 33 (geht das mit untersch. großen Arrays? Vielleicht gibts ne bessere Random-Funktion, die genaue Anzahl von Array-Items erstellt (mit Duplikaten dann eben)



var timeline = [];

for (var i = 0; i < 3; i++) { // TODO : i < 33
  var combinedStimuli = {
    type: 'single-stim',
    timing_response: 1500,
    response_ends_trial: false,
    // randomize_order: true,
    is_html: true,
    stimulus: shuffleAudio[i][1],
    // prompt: [colorsHtml]
  }

  timeline.push(combinedStimuli);

  /*timeline: [
   {
   stimulus: function () {
   playSinoid(80, 1);
   },
   prompt: '<div class="color-box" id="color-1-a">color1a</div>'
   },
   {
   stimulus: function () {
   playSinoid(120, 1);
   },
   prompt: '<div class="color-box" id="color-1-b">color1b</div>'
   }
   ]*/
};





jsPsych.init({
  timeline: timeline,
  on_trial_start: function () {
    countTotalUp = []; // empty arrays for next trial
    countTotalDown = [];
  },

  on_trial_finish: function () {
    oscillator = ''; // reset for next trial (needs always new Object - http://wp.me/pvLeJ-5y)
    jsPsych.data.addDataToLastTrial({key_count_UP: countTotalUp.length});
    jsPsych.data.addDataToLastTrial({key_count_DOWN: countTotalDown.length})
  },

  on_finish: function() {
    jsPsych.data.displayData()
  }
});



});
