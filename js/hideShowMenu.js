'use strict'

var $box = window.viewerState.$box
var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var $btnMenuOff = window.viewerState.$btnMenuOff
var ask$boxInFullScreen = window.viewerState.ask$boxInFullScreen

//  If -->     $btnMenuOff   $footer   FullScreen   EventSource   EventType/state   EventAction      Handler                Additionaly      
//  States:                                                                                                                 
//          1.    shown       shown        off      $btnMenuOff     click/none      hide both        $btnHadler             
//          2.    hidden      hidden       off      $box            click/none      show both        $boxHandler            
//          3.    hidden      hidden       on       $box            click/none      show $footer     $boxHandler            show $footer for 5sec
//                                                                                                                          click any footer button
//                                                                                                                          resets 5sec countdown from beginning
//          5.    hidden      shown        on       $box            click/none      hide $footer     $boxHandler            
//          6.    shown       shown        off      $btnMenuOff     click/none      hide both        $btnHadler             
//          7.    hidden      hidden       off      FullScreen      event/on        show both        fullScreenHandler      
//          8.    shown       shown        on       FullScreen      event/off       hide both        fullScreenHandler      
//          9.    hidden      hidden       on       FullScreen      event/off       show both        fullScreenHandler      
//         10.    shown       shown        off      FullScreen      event/on        hide both        fullScreenHandler      

$btnMenuOff.addEventListener('click', menuHide)
$box.addEventListener('click', menuShow)
document.addEventListener('fullscreenchange', modifyMenuHideShowOption)
document.addEventListener('webkitfullscreenchange', modifyMenuHideShowOption)
document.addEventListener('mozfullscreenchange', modifyMenuHideShowOption)
document.addEventListener('MSFullscreenChange', modifyMenuHideShowOption)

function menuHide() {
    $sideMenuBox.hide()
    $footer.hide()
    $btnMenuOff.removeEventListener('click', menuHide)
}
function menuShow(e) {
    var srcElement = event.srcElement || event.target
    if(srcElement === $box) {
        $sideMenuBox.show()
        $footer.show()
    }
}
function modifyMenuHideShowOption() {
    if(ask$boxInFullScreen()){
        
    }
}