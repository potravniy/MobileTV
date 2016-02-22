'use strict'

var $btnQuality = window.viewerState.$btnQuality,
    $svgQuality = document.querySelector('.btn_quality__icon'),
    $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    $btnMenuOff = window.viewerState.$btnMenuOff,
    classList = window.viewerState.classList,
    link = ''

$btnQuality.addEventListener('click', toggleQuality)
document.addEventListener("fullscreenchange", styleQualityButton)
document.addEventListener("webkitfullscreenchange", styleQualityButton)
document.addEventListener("mozfullscreenchange", styleQualityButton)
document.addEventListener("MSFullscreenChange", styleQualityButton)
$btnMenuOff.addEventListener('click', styleQualityButton)

function toggleQuality(){
    var ch = window.viewerState.active$input.getAttribute('id')
    if (window.viewerState.highQuality) {
        window.viewerState.highQuality = false
        link = window.viewerState.chList[ch].lq
    } else {
        window.viewerState.highQuality = true
        link = window.viewerState.chList[ch].hq
    }
    if(window.hls){
        window.hls.destroy()
        window.hls = new window.Hls();
        window.hls.attachMedia(window.viewerState.$video);
        window.hls.on(window.Hls.Events.MEDIA_ATTACHED,function() {
            console.log("video and window.hls.js are now bound together !");
            window.hls.loadSource(link);
            window.hls.on(window.Hls.Events.MANIFEST_PARSED, function(event,data) {
                for(var i=0; i<window.hls.levels.length; i++){
                    console.log( i + '\tbitrate:' + window.hls.levels[i].bitrate + '\th:' + window.hls.levels[i].height + '\tw:' + window.hls.levels[i].width + '\n')
                }
            })
        });
    } else {
        $video.setAttribute('src', link)
        $source.setAttribute('src', link)
    }
    $video.play()
    styleQualityButton()
}
function styleQualityButton() {
    if (window.viewerState.highQuality) {
        classList.remove($svgQuality, 'disabled')
    } else {
        classList.add($svgQuality, 'disabled')
    }
}