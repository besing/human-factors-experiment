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

var countKeyPress = function(keyString) {
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


var soundBlock = {
  type: 'single-stim',
  timing_response: 1500,
  response_ends_trial: false,
  randomize_order: true,
  is_html: true,

  timeline: [
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
  ]
};



var timeline = [];

timeline.push(soundBlock);

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
