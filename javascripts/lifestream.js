$("#lifestream .events").lifestream({
  limit: 100,
  feedloaded: function() {
    $('#lifestream .events .lifestream-tumblr').truncate({max_length: 150});
  },
  list: [
    { service: "atom", user: "http://notebook.erikostrom.com/feed.xml" },
    { service: "tumblr", user: "erikostrom",
      template: {
        posted: '<a href="${url}">{{if image}}{{html image}}{{else}}${title}{{/if}}</a>'
      }
    },
    { service: "delicious", user: "eostrom",
      template: {
        bookmarked: '&hearts; <a href="${u}">${d}</a>'
      }
    },
    //{ service: "disqus", user: "eostrom" },
    { service: "flickr", user: "55946662@N00",
      template: {
        posted: '<a href="${link}"><img width="75" src="${$item.data.media.m}" /></a>'
      }
    },
    { service: "github", user: "eostrom" },
    { service: "lastfm", user: "eostrom",
      template: {
        loved: '&hearts; <a href="${url}">${name}</a> by <a href="${artist.url}">${artist.name}</a>'
      }
    },
    //{ service: "pocket", user: "erikostrom" },
    //{ service: "quora", user: "Erik-Ostrom" },
    { service: "stackoverflow", user: "124116" },
    { service: "twitter", user: "erikostrom" },
    //{ service: "wikipedia", user: "eostrom" },
    { service: "youtube", user: "eostrom",
      template: {
        favorited: '&hearts; <a href="${video.player.default}" title="${video.description}">${video.title}</a>',
        uploaded: 'uploaded <a href="${video.player.default}" '
        + 'title="${video.description}">'
        + '${video.title}<br>'
        + '<img src="${video.thumbnail.sqDefault}" alt="">'
        + '</a>'
      }
    }
  ]
});
