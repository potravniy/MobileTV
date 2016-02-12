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
//                              <-- State | Action -->
//  If -->   $btnMenuOff   $footer        |  EventSource   EventType/state   EventAction                     Handler                Additionaly
//       1.    shown       shown          |   $btnMenuOff   click/none        hide both, set $footerAsCtrl   btnHadler                         
//       3.    hidden      hidden         |   $box          click/none        show $footerAsCtrl             boxHandler                        
//       2.    hidden      $footerAsCtrl  |   $btnMenuOff   click/none        show both                      btnHadler              
//       4.    hidden      $footerAsCtrl  |   none           in 5 sec         hide $footerAsCtrl             boxHandler             shows $footer for 5sec as VideoCtrlPanel                          
//       5.    hidden      $footerAsCtrl  |   $footer       click/none        prolong 5 sec timer            footerHandler          click resets 5sec countdown (for any footer button except $btnMenuOff and $btnFullScr)

$btnMenuOff.addEventListener('click', btnHandler)

function btnHandler(e) {
    e.stopPropagation()
    if(!window.viewerState.is$sideMenuBoxHidden && !window.viewerState.is$footerHidden) {
        $sideMenuBox.hide()
        $footer.hide()
        $box.addEventListener('click', boxHandler)
    } else {
        $sideMenuBox.show()
        $footer.object.classList.remove('ctrl')
        clearTimeout(id)
        $box.removeEventListener('click', boxHandler)
        $footer.object.removeEventListener('click', footerHandler)
    }
}
function boxHandler(e) {
    e.stopPropagation()
    $box.removeEventListener('click', boxHandler)
    showControls()
    id = setTimeout( function(){
             hideControls()
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function footerHandler(e) {
    e.stopPropagation()
    clearTimeout(id)
    id = setTimeout( function(){
             hideControls()
             $footer.object.removeEventListener('click', footerHandler)
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function showControls() {
    $footer.object.addEventListener('click', footerHandler)
    $footer.object.classList.add('ctrl')
    $footer.show()
}
function hideControls() {
    $footer.object.removeEventListener('click', footerHandler)
    $footer.hide()
    setTimeout(function(){
        $footer.object.classList.remove('ctrl')
    }, window.viewerState.durationShowHideMenu)
}
