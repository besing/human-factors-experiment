$(document).ready(function () { // braucht keypress.js anscheinend


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

// playSinoid();



// Count keypress via keypress.js
var listen = new window.keypress.Listener();

listen.counting_combo('up', function (e, count) {
  console.log('Pfeil hoch ' + count + 'x gedrueckt');
});
listen.counting_combo('down', function (e, count) {
  console.log('Pfeil runter ' + count + 'x gedrueckt');
});




// Count keypress
/*
var count;
var keypress_count = function() {
  $('body').keyup(function () {
    // count++;
    // console.log(count);
    count = keypress_count.key_press;
    jsPsych.data.addDataToLastTrial({key_count: count});
  })
};
*/


var soundBlock = {
  type: 'single-audio',
  timing_response: 2000,
  response_ends_trial: false,
  randomize_order: true,

  // on_finish: keypress_count(),

  // on_finish: function (keypress_count) {
  //   var count = keypress_count.key_press;
  //   jsPsych.data.addDataToLastTrial({key_count: count})
  // },
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
