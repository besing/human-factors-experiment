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
  }
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
