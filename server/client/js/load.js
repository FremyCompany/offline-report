const html = document.documentElement;
const {$} = require('./utils.js');

module.exports = () => {
  const img = new Image;
  img.onload = () => {
    html.setAttribute('opacity', 1);
    if (
      'serviceWorker' in navigator &&
      // something is wrong with submit even tin firefox
      // it keeps reloading every single time.
      // TODO: fix Firefox whenever you have time
      !/Firefox/.test(navigator.userAgent)
    )
      navigator.serviceWorker.ready
        .then(() => fetch(img.src))
        .then(r => r.blob())
        .then(() => {
          if ($('input').value.replace(/\s+/, '').length)
            $('form').dispatchEvent(new CustomEvent('submit'));
        });
  };
  img.src = getComputedStyle(html, ':before')
              .getPropertyValue('background-image')
              .replace(/^url\((['"]?)(\S+?)\1\)$/, '$2');
};
