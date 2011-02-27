(function() {
  if (!window.console) {
    console = { log: function() {} }
  }

  soundManager.url = 'sm/swf/';

  soundManager.onready(function() {
    function makeControl(action) {
      return $('<a href="#" class="' + action + ' control">' +
               action + '</a>').click(function() {
                 soundscape[action](); return false;
               });
    };

    var pause = makeControl('pause').hide().appendTo('body');
    var play = makeControl('play').hide().appendTo('body');
    var controls = play.add(pause);

    var soundscape =
      soundManager.createSound({
        id: 'soundscape', url: '/sounds/soundscape.mp3',
        onplay: function() { pause.show(); },
        onpause: function() { pause.hide(); play.show(); },
        onresume: function() { play.hide(); pause.show(); },
        onfinish: function() { pause.hide(); play.show(); }
      });

    soundscape.play({volume: 25});

    var dataKey = 'com.erikostrom.soundfactory';

    function step() {
      if (Math.random() < (1.0/50)) {
        $(controls).filter(':visible').clone().insertAfter(pause);
      }

      var movers = $('.control:visible').not(controls);

      movers.each(function() {
        var mover = $(this);
        var data = mover.data(dataKey)
        if (!data) {
          data = {
            left: parseInt(mover.css('left')),
            bottom: parseInt(mover.css('bottom')),
            vx: 20,
            vy: 0
          };
          mover.data(dataKey, data);
        }

        data.left += data.vx;
        data.bottom += data.vy;
        data.xy -= .1;
        data.vy -= .08;

        if (data.bottom < -mover.outerHeight()) {
          mover.remove();
          return;
        }

        mover.css({left: data.left + 'px', bottom: data.bottom + 'px'});
      });
    };

    setInterval(step, 50);
  });
})();