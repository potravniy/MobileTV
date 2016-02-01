'use strict'

window.onload = function () {
  window.viewerState = {
    'highQuality': false,
    'alignVertical': false,
    '$video': document.querySelector('#view')
  };
  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./fullscreen.js')
//  require('./alignSelector.js')
//  require('./hideShowMenu.js')
}
