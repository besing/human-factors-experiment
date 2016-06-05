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



  var shuffleAudio = jsPsych.randomization.shuffle(sinoids);
  console.log(shuffleAudio);
  var shuffleColors = jsPsych.randomization.shuffle(colorsHtml);
  console.log(shuffleColors);



  var soundsAndColors = [
    {
      stimulus: soundsShuffled[0],
      prompt: colorsShuffled[0]
    },
    {
      stimulus: soundsShuffled[1],
      prompt: colorsShuffled[1]
    },
    {
      stimulus: soundsShuffled[2],
      prompt: colorsShuffled[2]
    },
    {
      stimulus: soundsShuffled[3],
      prompt: colorsShuffled[3]
    },
    {
      stimulus: soundsShuffled[4],
      prompt: colorsShuffled[4]
    },
    {
      stimulus: soundsShuffled[5],
      prompt: colorsShuffled[5]
    }
  ];

  // console.log(soundsAndColors);


  var noSoundsAndColors = [
    {
      stimulus: noSounds[0],
      prompt: colorsHtml[0]
    },
    {
      stimulus: noSounds[1],
      prompt: colorsHtml[1]
    },
    {
      stimulus: noSounds[2],
      prompt: colorsHtml[2]
    },
    {
      stimulus: noSounds[3],
      prompt: colorsHtml[3]
    },
    {
      stimulus: noSounds[4],
      prompt: colorsHtml[4]
    },
    {
      stimulus: noSounds[5],
      prompt: colorsHtml[5]
    }
  ];


  var allSoundsAndColors = soundsAndColors.concat(noSoundsAndColors); // connect the two arrays


  var allSoundsAndColorsShuffled = jsPsych.randomization.shuffle(allSoundsAndColors); // final trials array
  console.log(allSoundsAndColorsShuffled);


  var timeline = [];

    var combinedStimuli = {
      type: 'single-stim',
      timing_response: 1500,
      response_ends_trial: false,
      // randomize_order: true,
      is_html: true,
      stimulus: shuffleAudio[i][1],
      // prompt: [colorsHtml]
    };

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
  ;


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
      jsPsych.data.displayData()
    }
  });

});
