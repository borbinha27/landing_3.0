if (window.location.hash) {
    const noHashURL = window.location.href.replace(/#.*$/, '');
    history.replaceState(null, '', noHashURL);
  }