var React = require('react');

var Favicon = React.createClass({
  displayName: 'Favicon',

  getDefaultProps: function() {
    return {
      animated: true,
      animationDelay: 500
    }
  },

  getInitialState: function() {
    return {
      animationIndex: 0,
      animationLoop: null,
      animationRunning: false,
      count: null
    }
  },

  statics: {
    mountedInstances: [],
    getActiveInstance: function() {
      return Favicon.mountedInstances[Favicon.mountedInstances.length-1];
    },
    getUrl: function() {
      var activeInstance = Favicon.getActiveInstance();
      if (activeInstance.props.url instanceof Array) {
        return activeInstance.props.url[activeInstance.state.animationIndex];
      } else {
        return activeInstance.props.url;
      }
    },
    stepAnimation: function() {
    },
    updateFavicon: function() {
      if (typeof document === 'undefined') return;

      var activeInstance = Favicon.getActiveInstance();
      var head = document.getElementsByTagName('head')[0];
      var newLink = document.createElement('link');
      newLink.type = 'image/x-icon';
      newLink.rel = 'icon';
      var isAnimated = activeInstance.props.url instanceof Array && activeInstance.props.animated;

      // clear any running animations
      var intervalId = null;
      clearInterval(activeInstance.state.animationLoop);

      if (isAnimated) {
        var animateFavicon = function animateFavicon() {
          var nextAnimationIndex = (activeInstance.state.animationIndex+1)%activeInstance.props.url.length
          newLink.href = Favicon.getUrl();
          activeInstance.setState({animationIndex: nextAnimationIndex});
        };
        intervalId = setInterval(animateFavicon, activeInstance.props.animationDelay);
        animateFavicon();
      } else {
        newLink.href = Favicon.getUrl();
      }
      activeInstance.setState({animationLoop:intervalId});

      // remove existing favicons
      var links = head.getElementsByTagName("link");
      for (var i = links.length; --i >= 0; /\bicon\b/i.test(links[i].getAttribute("rel")) && head.removeChild(links[i])) {}

      head.appendChild(newLink);
    }
  },

  componentWillMount: function() {
    Favicon.mountedInstances.push(this);
    Favicon.updateFavicon();
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.url !== this.props.url)
      Favicon.updateFavicon();
    if (prevProps.animated !== this.props.animated)
      Favicon.updateFavicon();
  },

  render: function () {
    return null;
  }
});

module.exports = Favicon;
