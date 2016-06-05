$(document).ready(function () { // braucht keypress.js anscheinend

  // Count Keypresses via keypress.js
  var listener = new window.keypress.Listener();

  var countTotalUp = [];
  var countTotalDown = [];

  var countKeyPress = function (keyString) {
    listener.counting_combo(keyString, function () {

      if (keyString == 'up') {
        countTotalUp.push(keyString);
      } else if (keyString === 'down') {
        countTotalDown.push(keyString);
      }

      console.log('UP: ' + countTotalUp.length);
      console.log('DOWN: ' + countTotalDown.length);

    });
  };

  countKeyPress('up');
  countKeyPress('down');


  // show Visual Feedback +1/-1 (for a moment only)
  var visualFeedbackListener = new window.keypress.Listener();

  visualFeedbackListener.register_many([
    {
      'keys': 'up',
      'on_keydown': function () {
        $('.visual-feedback#up').addClass('visible');
      },
      'on_keyup': function() {
        $('.visual-feedback#up').removeClass('visible');
      }
    },
    {
      'keys': 'down',
      'on_keydown': function () {
        $('.visual-feedback#down').addClass('visible');
      },
      'on_keyup': function() {
        $('.visual-feedback#down').removeClass('visible');
      }
    }
  ]);



  var soundsDuration = 15; // TODO : pass sound sample duration (in s) here

  var soundsAndColors = [ // 6 samples with colors + sounds
    {
      stimulus: function() {
        playSinoid(soundsShuffled[0], soundsDuration);
      },
      prompt: colorsShuffled[0],
      data: {
        Color: colorsShuffled[0],
        Sound: soundsShuffled[0]
      }
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[1], soundsDuration);
      },
      prompt: colorsShuffled[1],
      data: {
        Color: colorsShuffled[1],
        Sound: soundsShuffled[1]
      }
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[2], soundsDuration);
      },
      prompt: colorsShuffled[2],
      data: {
        Color: colorsShuffled[2],
        Sound: soundsShuffled[2]
      }
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[3], soundsDuration);
      },
      prompt: colorsShuffled[3],
      data: {
        Color: colorsShuffled[3],
        Sound: soundsShuffled[3]
      }
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[4], soundsDuration);
      },
      prompt: colorsShuffled[4],
      data: {
        Color: colorsShuffled[4],
        Sound: soundsShuffled[4]
      }
    },
    {
      stimulus: function() {
        playSinoid(soundsShuffled[5], soundsDuration);
      },
      prompt: colorsShuffled[5],
      data: {
        Color: colorsShuffled[5],
        Sound: soundsShuffled[5]
      }
    }
  ];

  // console.log(soundsAndColors);


  var noSoundsAndColors = [ // 6 samples with colors + silence
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[0],
      data: {
        Color: colorsHtml[0],
        Sound: noSounds[0]
      }
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[1],
      data: {
        Color: colorsHtml[1],
        Sound: noSounds[0]
      }
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[2],
      data: {
        Color: colorsHtml[2],
        Sound: noSounds[0]
      }
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[3],
      data: {
        Color: colorsHtml[3],
        Sound: noSounds[0]
      }
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[4],
      data: {
        Color: colorsHtml[4],
        Sound: noSounds[0]
      }
    },
    {
      stimulus: function() {
        playSinoid(noSounds[0], soundsDuration);
      },
      prompt: colorsHtml[5],
      data: {
        Color: colorsHtml[5],
        Sound: noSounds[0]
      }
    }
  ];


  var allSoundsAndColors = soundsAndColors.concat(noSoundsAndColors); // connect the two arrays
  // console.log('allSoundsAndColors: ', allSoundsAndColors);


  var allSoundsAndColorsShuffled = jsPsych.randomization.shuffle(allSoundsAndColors); // final trials array
  // console.log('Shuffled combinations: ', allSoundsAndColorsShuffled);


  var timeline = [];


  var inputSex = {
    type: 'survey-multi-choice',
    // horizontal: true,
    required: [true],
    questions: ['Bitte w&auml;hlen Sie zuerst Ihr Geschlecht aus'],
    options: [[
        ['M&auml;nnlich'],
        ['Weiblich']
      ]],
    preamble: ['Herzlich Willkommen zum Experiment!']
  };


  var inputAge = {
    type: 'survey-text',
    questions: ['Bitte geben Sie Ihr Alter an:'],

  };


  var startScreen = {
    type: 'instructions',
    pages: ['<p>Das Experiment kann beginnen. Wenn Sie soweit sind, dr&uuml;cken Sie auf der Tastatur "Y".</p><p>Das Experiment geht sofort danach los.</p>'],
    key_forward: 'y'
  };


  var colorsSoundStimuli = {
    type: 'single-stim',
    timing_response: 15000, // TODO : How long to wait for the subject to make a response before ending the trial (ms)
    // timing_response: -1, //
    response_ends_trial: false,
    is_html: true,
    timing_post_trial: 15000, // TODO : Pause between trials
    timeline: allSoundsAndColorsShuffled
  };


  timeline.push(inputSex);
  timeline.push(inputAge);
  timeline.push(startScreen);
  timeline.push(colorsSoundStimuli);


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
