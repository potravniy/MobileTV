'use strict'

var $btnFullScr = window.viewerState.$btnFullScr
var $box = window.viewerState.$box

if ( window.viewerState.isFullScreenAllowed ) {
  $btnFullScr.addEventListener('click', function () {
      if(window.viewerState.ask$boxInFullScreen()) getOffFullscreen()
      else goFullScreen()
  })
}

function goFullScreen() {
    if ($box.requestFullscreen) {
        $box.requestFullscreen()
    } else if ($box.mozRequestFullScreen) {
        $box.mozRequestFullScreen()
    } else if ($box.webkitRequestFullscreen) {
        $box.webkitRequestFullscreen()
    } else if ($box.msRequestFullscreen) {
        $box.msRequestFullscreen()
    }
}
function getOffFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }else if (document.msExitFullscreen) {
	document.msExitFullscreen();
  }
}
