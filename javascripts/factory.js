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
        onplay: function() { play.hide(); pause.show(); startAnimation(); },
        onpause: function() { pause.hide(); play.show(); },
        onresume: function() { play.hide(); pause.show(); },
        onfinish: function() { pause.hide(); play.show(); }
      });

    soundscape.play({volume: 25});

    var dataKey = 'com.erikostrom.soundfactory';

    var steppers = {
      play: {
        start: function(mover, data) {
          data.vx = 20 + Math.random() * 2 - 1;
          data.vy = 0;
        },
        step: function(mover, data) {
          data.xy -= .05;
          data.vy -= .08;
        }
      },

      pause: {
        start: function(mover, data) {
          data.vx = 0;
          data.vy = 3;
        },
        step: function(mover, data) {
          if (data.vx < 5) { data.vx += .1; }
          if (Math.random() < 1.0/20) {
            data.vx += (Math.random() < 0.5 ? .1 : -.1);
          }

          data.vy -= .08;
          if (data.vy < 1 && Math.random() < 1.0/10) {
            data.vy += .7;
          } else if (data.vy < -1 && Math.random() < -data.vy*.1) {
            data.vy += 1.5;
          } else if (data.vy > 5 && Math.random() < .1) {
            data.vy -= 1;
          }
        }
      }
    };

    function stopped() {
      return soundscape.playState == 0 && !soundscape.paused;
    }

    function step() {
      if (Math.random() < (1.0/65) && !stopped()) {
        $(controls).filter(':visible').clone().insertAfter(pause);
      }

      var movers = $('.control:visible').not(controls);

      if (stopped() && movers.length == 0) {
        stopAnimation();
      }

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

        if (data.bottom < -mover.outerHeight(true) ||
            data.left > $(window).width()) {
          mover.remove();
          return;
        }

        mover.css({left: data.left + 'px', bottom: data.bottom + 'px'});
      });
    };

    var animation;
    function startAnimation() { animation = setInterval(step, 50); }
    function stopAnimation() { animation && clearInterval(animation); }
  });
})();