var welcome = {
  type: 'text',
  text: 'Hallo zum Experiment. Drueck einen Knopf zum Fortfahren.'
};

var instructions = {
  type: 'text',
  text: "<p>In this experiment, a circle will appear in the center " +
  "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
  "press the letter F on the keyboard as fast as you can.</p>" +
  "<p>If the circle is <strong>orange</strong>, do not press " +
  "any key.</p>" +
  "<div class='left center-content'><img src='img/blue.png'></img>" +
  "<p class='small'><strong>Press the F key</strong></p></div>" +
  "<div class='right center-content'><img src='img/orange.png'></img>" +
  "<p class='small'><strong>Do not press a key</strong></p></div>" +
  "<p>Press any key to begin.</p>",
  timing_post_trial: 1000 // Pause after trial
};


var test_stimuli = [
  {
    stimulus: 'img/blue.png',
    data: { response: 'go' }
  },
  {
    stimulus: 'img/orange.png',
    data: { response: 'no-go' }
  }
];

var all_trials = jsPsych.randomization.repeat(test_stimuli, 2);

var test_block = {
  type: 'single-stim',
  choices: ['F'],
  timing_response: 1500,
  on_finish: function(data){
    var correct = false;
    if(data.response == 'go' && data.rt > -1){
      correct = true;
    } else if(data.response == 'no-go' && data.rt == -1){
      correct = true;
    }
    jsPsych.data.addDataToLastTrial({correct: correct});
  },
  timeline: all_trials
};


var timeline = [];
timeline.push(welcome);
timeline.push(instructions);
// timeline.push(blue_trial, orange_trial);
timeline.push(test_block);


jsPsych.init({
  timeline: timeline,
  on_finish: function () {
    jsPsych.data.displayData();
  }
});
