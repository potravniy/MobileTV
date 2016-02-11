'use strict'

var $box = window.viewerState.$box
var $video = window.viewerState.$video
var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var $footer__center = document.querySelector('.footer__center') 
var $btnMenuOff = window.viewerState.$btnMenuOff
var ask$boxInFullScreen = window.viewerState.ask$boxInFullScreen
var durationFooterAsCtrl = window.viewerState.durationFooterAsCtrl
var id = undefined

//  Hides/showes $sideMenuBox and $footer
//  
//                                      <-- State | Action -->
//  If -->     $btnMenuOff   $footer   FullScreen |  EventSource   EventType/state   EventAction         Handler                Additionaly
//          1.    shown       shown        any    |   $btnMenuOff   click/none        hide both           btnHadler                         
//          2.    hidden      shown        any    |   $btnMenuOff   click/none        show both           btnHadler              
//          3.    hidden      hidden       off    |   $box          click/none        show both           boxHandler                        
//          4.    hidden      hidden       on     |   $box          click/none        show $footerAsCtrl  boxHandler             shows $footer for 5sec as VideoCtrlPanel                          
//          5.    hidden      shown Ctrl   on     |   $footer       click/none        reset timer         footerHandler          click resets 5sec countdown (for any footer button except $btnMenuOff and $btnFullScr)
//          6.    any         any          off    |   FullScreen    event/on          hide both           fullScreenHandler       
//          7.    any         any          on     |   FullScreen    event/off         show both           fullScreenHandler       

$btnMenuOff.addEventListener('click', btnHandler)
$footer.object.addEventListener('click', footerHandler)
$box.addEventListener('click', boxHandler)
document.addEventListener('fullscreenchange', fullScreenHandler)
document.addEventListener('webkitfullscreenchange', fullScreenHandler)
document.addEventListener('mozfullscreenchange', fullScreenHandler)
document.addEventListener('MSFullscreenChange', fullScreenHandler)

function btnHandler(e) {
    e.stopPropagation()
    if(!window.viewerState.is$sideMenuBoxHidden && !window.viewerState.is$footerHidden) {
        $sideMenuBox.hide()
        $footer.hide()
    } else if(window.viewerState.is$sideMenuBoxHidden) {
        $sideMenuBox.show()
        if(id){
            $footer.object.classList.remove('ctrl')
            clearTimeout(id)
            $box.addEventListener('click', boxHandler)
        }
    }
}
function footerHandler(e) {
    e.stopPropagation()
    if(ask$boxInFullScreen() && id){
        clearTimeout(id)
        id = setTimeout( function(){
            hideControls()
            $box.addEventListener('click', boxHandler)
        } , durationFooterAsCtrl)
    }
}
function boxHandler(e) {
    e.stopPropagation()
    if(ask$boxInFullScreen()) {
        if(true) {
            $box.removeEventListener('click', boxHandler)
            showControls()
            id = setTimeout( function(){
                hideControls()
                $box.addEventListener('click', boxHandler)
            } , durationFooterAsCtrl)
        }
    } else {
        if(window.viewerState.is$sideMenuBoxHidden) $sideMenuBox.show()
        if(window.viewerState.is$footerHidden) $footer.show()
    }
}
function fullScreenHandler() {
    if(ask$boxInFullScreen()){
        if(!window.viewerState.is$sideMenuBoxHidden) $sideMenuBox.hide()
        if(!window.viewerState.is$footerHidden) $footer.hide()
    } else {
        if(window.viewerState.is$sideMenuBoxHidden) $sideMenuBox.show()
        if(window.viewerState.is$footerHidden) $footer.show()
        if(id){
            $footer.object.classList.remove('ctrl')
            clearTimeout(id)
            $box.addEventListener('click', boxHandler)
        }
    }
}
function showControls() {
    $footer.object.classList.add('ctrl')
    $footer.show()
}
function hideControls() {
    $footer.hide()
    setTimeout(function(){
        $footer.object.classList.remove('ctrl')
    }, window.viewerState.durationShowHideMenu)
}
