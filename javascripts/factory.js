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

    var steppers = {
      play: {
        start: function(mover, data) {
          data.vx = 20;
          data.vy = 0;
        },
        step: function(mover, data) {
          data.xy -= .1;
          data.vy -= .08;
        }
      },

      pause: {
        start: function(mover, data) {data.vy = -999},
        step: function(mover, data) {}
      }
    };

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
            bottom: parseInt(mover.css('bottom'))
          };
          data.stepper = steppers[mover.hasClass('play') ? 'play' : 'pause'];
          data.stepper.start(mover, data);
          mover.data(dataKey, data);
        }

        data.left += data.vx;
        data.bottom += data.vy;
        data.stepper.step(mover, data);

        // TODO: check other edges
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