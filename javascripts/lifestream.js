$("#lifestream .events").lifestream({
  limit: 100,
  feedloaded: function() {
    $('#lifestream .events .lifestream-tumblr').truncate({max_length: 150});
  },
  list: [
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
    { service: "flickr", user: "55946662@N00",
      template: {
        posted: '<a href="${link}"><img width="75" src="${$item.data.media.m}" /></a>'
      }
    },
    { service: "forrst", user: "erikostrom",
      template: {
        posted: '<a href="${post_url}">${title}</a>'
      }
    },
    { service: "github", user: "eostrom" },
    { service: "googlereader", user: "17157162622863173265",
      template: {
        starred: '&hearts; <a href="${link.href}">${title.content}</a>'
      }
    },
    { service: "lastfm", user: "eostrom",
      template: {
        loved: '&hearts; <a href="${url}">${name}</a> by <a href="${artist.url}">${artist.name}</a>'
      }
    },
    { service: "stackoverflow", user: "124116" },
    { service: "twitter", user: "erikostrom" },
    { service: "youtube", user: "eostrom",
      template: {
        favorited: '&hearts; <a href="${video.player.default}" title="${video.description}">${video.title}</a>'
      }
    }
  ]
});
