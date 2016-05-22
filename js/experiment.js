var hello_trial = {
  type: 'text', // = plugin jspsych-text
  text: 'Hello world!'
};

jsPsych.init({
  timeline: [ hello_trial ] // see var above
});
