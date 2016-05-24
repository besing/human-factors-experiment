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
var listen = new window.keypress.Listener();

var keyCountUp;
var keyCountDown;

var countKeyPress = function(keyString) {
  listen.counting_combo(keyString, function (e, count) {
    console.log(count + 'x ' + keyString);
    if (keyString === 'up') { // TODO
      keyCountUp = count;
    }
    else if (keyString === 'down') {
      keyCountDown = count;
    }
    // return count + 'x up';
    // jsPsych.data.addDataToLastTrial({key_count_up: count})
  });
};



var soundBlock = {
  type: 'single-audio',
  timing_response: 1000,
  response_ends_trial: false,
  randomize_order: true,

  on_finish: function () {
    // var keys = 'ABC';
    jsPsych.data.addDataToLastTrial({key_count_up: keyCountUp});
    jsPsych.data.addDataToLastTrial({key_count_down: keyCountDown})
  },

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
    countKeyPress('up');
    countKeyPress('down');
  },
  on_finish: function() {
    jsPsych.data.displayData()
  }
});




/*
var soundBlock = {
  type: 'multi-stim-multi-response',
  stimuli: [
    'playSinoid()',
  ],
  is_html: true,
  choices: [[89, 78]],
  timing_stim: [1000],
  // prompt: 'Wie fuehlst du dich?'
};


var imgBlock = {
  type: 'multi-stim-multi-response',
  stimuli: [
    '<div class="color-box" id="color-1-a">color1a</div>',
    '<div class="color-box" id="color-1-b">color1b</div>',
  ],
  is_html: true,
  choices: [[89, 78]],
  timing_stim: [1000],
  prompt: 'Wie fuehlst du dich?'
};
*/

});
