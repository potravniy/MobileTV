'use strict'

var $btnFullScr = window.viewerState.$btnFullScr
var $box = window.viewerState.$box

if ( window.viewerState.isFullScreenAllowed ) {
  $btnFullScr.addEventListener('click', function () {
      if(window.viewerState.ask$boxInFullScreen()) getOffFullscreen()
      else goFullScreen()
  })
  document.addEventListener('fullscreenchange', modifyMenuLook)
  document.addEventListener('webkitfullscreenchange', modifyMenuLook)
  document.addEventListener('mozfullscreenchange', modifyMenuLook)
  document.addEventListener('MSFullscreenChange', modifyMenuLook)
} else {
//    $btnFullScr.style.display = 'none'
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
function modifyMenuLook () {
  if (window.viewerState.ask$boxInFullScreen()) {
    console.log('Modify btnFullScr look!!!')
    console.log('Get Menu off!!!')
  } else {
    console.log('Modify btnFullScr look!!!')
    console.log('Get Menu back!!!')
  }
}
