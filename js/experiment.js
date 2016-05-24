$(document).ready(function () { // braucht keypress.js anscheinend


/*
var playSinoid = function playSinoid() {

  // create web audio api context
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = 100; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  $('.sound1.sound-start').on('click', function() {
    oscillator.start();
  });

  $('.sound1.sound-stop').on('click', function() {
    oscillator.stop();
  });

};

playSinoid();
*/



// Count keypress via keypress.js
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
  type: 'single-audio',
  timing_response: 1000,
  response_ends_trial: false,
  randomize_order: true,

  timeline: [
    {
      stimulus: './audio/440Hz-5sec.mp3',
      prompt: '<div class="color-box" id="color-1-a">color1a</div>'
    },
    {
      stimulus: './audio/1000Hz-5sec.mp3',
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
    jsPsych.data.addDataToLastTrial({key_count_UP: countTotalUp.length});
    jsPsych.data.addDataToLastTrial({key_count_DOWN: countTotalDown.length})
  },

  on_finish: function() {
    jsPsych.data.displayData()
  }
});



});
