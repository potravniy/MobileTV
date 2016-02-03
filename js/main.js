'use strict'

window.onload = function () {
  window.viewerState = {
    '$slider': document.querySelector(".sidebar__slider"),
    '$footer': document.querySelector(".footer"),
    '$video': document.querySelector('#view'),
    '$source': document.querySelector("#source"),
    'active$input': null,
    'highQuality': false,
    'alignVertical': false
  };
  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./alignSelector.js')
  require('./hideShowMenu.js')
//   require('./fullscreen.js')
}
