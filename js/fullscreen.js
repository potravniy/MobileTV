'use strict'

var $box = window.viewerState.$box
var $btnFullScr = window.viewerState.$btnFullScr
var $svgFullScrOn = document.querySelector('.fullscr_on')
var $svgFullScrOff = document.querySelector('.fullscr_off')
var $btnMenuOff = window.viewerState.$btnMenuOff

if ( window.viewerState.isFullScreenAllowed ) {
  $btnMenuOff.style.display = 'none'
  $btnFullScr.addEventListener('click', function () {
      if(window.viewerState.ask$boxInFullScreen()) {
          getOffFullscreen()
          $svgFullScrOn.classList.add("active")
          $svgFullScrOff.classList.remove("active")
      } else {
          goFullScreen()
          $svgFullScrOff.classList.add("active")
          $svgFullScrOn.classList.remove("active")
      }
  })
  
} else if (window.viewerState.is_iPad_iPhone &&
           !window.viewerState.is_iPad_iPhone_inFullScreen) {
    //  Tell him how to switch fulscreen on
    require('./buttonHideShowMenu.js')
} else if (window.viewerState.is_iPad_iPhone_inFullScreen ||
           !window.viewerState.isFullScreenAllowed) {
    $btnFullScr.style.display = 'none';
    require('./buttonHideShowMenu.js')
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
// document.addEventListener('fullscreenchange', fullScreenHandler)
// document.addEventListener('webkitfullscreenchange', fullScreenHandler)
// document.addEventListener('mozfullscreenchange', fullScreenHandler)
// document.addEventListener('MSFullscreenChange', fullScreenHandler)
