(function() {
  soundManager.url = 'sm/swf/';

  soundManager.onready(function() {
    function makePause() {
      return $('<a href="#" class="pause">pause</a>').click(function() {
        soundscape.pause(); return false;
      });
    };

    function makePlay() {
      return $('<a href="#" class="play">play</a>').click(function() {
        soundscape.play(); return false;
      });
    };

    var pause = makePause().hide().appendTo('body');
    var play = makePlay().hide().appendTo('body');

    var soundscape =
      soundManager.createSound({
        id: 'soundscape', url: '/sounds/soundscape.mp3',
        onplay: function() { pause.show(); },
        onpause: function() { pause.hide(); play.show(); },
        onresume: function() { play.hide(); pause.show(); },
        onfinish: function() { pause.hide(); play.show(); }
      });

    soundscape.play({volume: 25});
  });
})();