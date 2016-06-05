$(document).ready(function () { // braucht keypress.js anscheinend


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


  var soundsDuration = 1; // TODO : pass sound sample duration (in s) here

  var soundsAndColors = [ // 6 samples with colors + sounds
    {
      stimulus: function() {
        playSinoid(soundsShuffled[0], soundsDuration);
      },
      prompt: colorsShuffled[0]
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[1], soundsDuration);
      },
      prompt: colorsShuffled[1]
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[2], soundsDuration);
      },
      prompt: colorsShuffled[2]
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[3], soundsDuration);
      },
      prompt: colorsShuffled[3]
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[4], soundsDuration);
      },
      prompt: colorsShuffled[4]
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[5], soundsDuration);
      },
      prompt: colorsShuffled[5]
    }
  ];

  // console.log(soundsAndColors);


  var noSoundsAndColors = [ // 6 samples with colors + silence
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[0]
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[1]
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[2]
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[3]
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[4]
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[5]
    }
  ];


  var allSoundsAndColors = soundsAndColors.concat(noSoundsAndColors); // connect the two arrays
  console.log('allSoundsAndColors: ', allSoundsAndColors);


  var allSoundsAndColorsShuffled = jsPsych.randomization.shuffle(allSoundsAndColors); // final trials array
  console.log('Shuffled combinations: ', allSoundsAndColorsShuffled);


  var timeline = [];

  var combinedStimuli = {
    type: 'single-stim',
    timing_response: 1500,
    response_ends_trial: false,
    is_html: true,
    timeline: allSoundsAndColorsShuffled
  };

  timeline.push(combinedStimuli);


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

    on_finish: function () {
      jsPsych.data.displayData('json');
      jsPsych.data.localSave('experiment_results.csv', 'csv');
    }
  });

});
