"use strict"

var $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    $slider = window.viewerState.$slider,
    $sideMenuBox = window.viewerState.$sideMenuBox,
    classList = window.viewerState.classList,
    link = ''
window.Hls = null
window.hls = null

$slider.addEventListener('click', function(e){
    var ch = ''
    if(e.target.tagName === 'INPUT'){
        if(window.viewerState.active$input === e.target) {
            window.viewerState.active$input.checked = false
            window.viewerState.active$input = null
            
            if(window.Hls && window.Hls.isSupported()) {
                window.hls.destroy()
            } else {
                $video.setAttribute('src', '')
                $source.setAttribute('src', '')
            }

            $video.style.backgroundSize = ""
            classList.remove($sideMenuBox, 'show_footer')
            $video.removeEventListener('error', failed)
            $video.style.width = '100%'
            $video.style.height = 'auto'
        } else {
            window.viewerState.active$input = e.target
            window.viewerState.highQuality = false
            ch = e.target.getAttribute('id')
            link = window.viewerState.chList[ch].lq
            
            if(window.Hls && window.Hls.isSupported()) {
                if(window.hls) window.hls.destroy()
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

            $video.style.backgroundSize = "0 0"
            $video.addEventListener('error', failed)
            if($video.play) $video.play();
            else alert ('video cannot play')
            classList.add($sideMenuBox, 'show_footer')
        }
    }
})

function failed(e) {
   // video playback failed - show a message saying why     - from https://dev.w3.org/html5/spec-author-view/video.html#video
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       alert('Воспроизведение видео прервано.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       alert('Ошибка сети привела к нарушению загрузки видео');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       alert('Воспроизведение видео прекращено из-за искажений при передаче или потому, что видео использует недоступные в Вашем браузере функции.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       if (window.Hls && window.Hls.isSupported()){
           alert('Видео не может быть загружено из-за сбоя в в доступе к серверу или этот видеоформат не поддерживается Вашим браузером.');
       } else {
            $video.removeEventListener('error', failed)
            console.log('hls loading start ' + Date.now())
            var script = document.createElement("script")
            script.type = "text/javascript"
            if (script.readyState){  //IE
                script.onreadystatechange = function(){
                    if (script.readyState == "loaded" ||
                            script.readyState == "complete"){
                        script.onreadystatechange = null;
                        runHls()
                    }
                };
            } else {  //Others
                script.onload = function(){
                    console.log('hls loaded ' + Date.now())
                    runHls()
                }
            }
            script.src = './js/hls.min.js'
            document.getElementsByTagName("head")[0].appendChild(script)
       }
       break;
     default:
       alert('Произошла ошибка. Попробуйте еще.');
       break;
   }
}
function runHls() {
    $video.setAttribute('src', '')
    $source.setAttribute('src', '')
    console.log('calling window.hls ' + Date.now())
    window.hls = new window.window.Hls();
    window.hls.attachMedia(window.viewerState.$video);
    window.hls.on(window.Hls.Events.MEDIA_ATTACHED, function() {
        console.log("video and window.hls.js are now bound together !");
        window.hls.loadSource(link);
        window.hls.on(window.Hls.Events.MANIFEST_PARSED, function(event,data) {
            for(var i=0; i<window.hls.levels.length; i++){
                console.log( i + '\tbitrate:' + window.hls.levels[i].bitrate + '\th:' + window.hls.levels[i].height + '\tw:' + window.hls.levels[i].width + '\n')
            }
        })
    });
    if($video.play) $video.play();
    else alert ('video cannot play')

    window.hls.on(window.Hls.Events.ERROR,function(event,data) {
        if(data.fatal) {
            switch(data.type) {
                case window.Hls.ErrorTypes.NETWORK_ERROR:
                // try to recover network error
                    console.log("fatal network error encountered, try to recover");
                    window.hls.startLoad();
                    break;
                case window.Hls.ErrorTypes.MEDIA_ERROR:
                    console.log("fatal media error encountered, try to recover");
                    window.hls.recoverMediaError();
                    break;
                default:
                // cannot recover
                    window.hls.destroy();
                    break;
            }
        }
    })
}