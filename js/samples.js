


// Create WebAudio Context + Play Function
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator;

  var playSinoid = function playSinoid(freq, duration) { // (Hz, sec)
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // TODO
    oscillator.frequency.value = freq;
    oscillator.connect(audioContext.destination);
    var currentTime = audioContext.currentTime;
    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration); // after certain duration
  };
  

  var colorsHtml = [
    ['1a', '<div class="color-box" id="color-1-a">color1a</div>'],
    ['1b', '<div class="color-box" id="color-1-b">color1b</div>'],
    ['2a', '<div class="color-box" id="color-2-a">color2a</div>'],
    ['2b', '<div class="color-box" id="color-2-b">color2b</div>'],
    ['3a', '<div class="color-box" id="color-3-a">color3a</div>'],
    ['3b', '<div class="color-box" id="color-3-b">color3b</div>']
  ];


  var sinoids = [
    [120, 'playSinoid(120, 1)'],
    [150, 'playSinoid(150, 1)'],
    [0, 'playSinoid(0, 1)']
  ];

