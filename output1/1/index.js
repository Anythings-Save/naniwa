document.oncontextmenu = function () { return false; }

let ready = (callbackFunc) => {
    if (document.readyState !== 'loading') {
        callbackFunc();
    } else {
        document.addEventListener('DOMContentLoaded', callbackFunc);
    }
}

ready(() => {
    let video = videojs('video1', {
        width: 734,
        height: 413,
        autoplay: false,
        loop: false,
        controls: true,
        preload: 'auto',
        techOrder: ["html5", "flash"], // 必要に応じてテクノロジーの順序を指定
    });

    video.src({
        type: 'application/x-mpegURL',
        src: 'https://anythings-save.github.io/naniwa/output1/1//m3u8/sample/index.m3u8',
    });

    video.on(['loadstart', 'loadedmetadata', 'loadeddata', 'play', 'playing', 'pause', 'suspend', 'seeking', 'seeked', 'waiting', 'canplay', 'canplaythrough', 'ratechange', 'ended', 'emptied', 'error', 'abort'], (e) => {
        console.log(`EVENT: ${e.type}`);
    });

    video.on('loadeddata', () => {
        console.debug('########## VideoInfo [start] ##########');
        console.debug(`>> source: ${video.currentSrc()}`);
        console.debug(`>> duration: ${video.duration()}`);
        console.debug(`>> videoSize(WxH): ${video.videoWidth()}px x ${video.videoHeight()}px`);
        console.debug(`>> readyState: ${video.readyState()}`);
        console.debug(`>> networkState: ${video.networkState()}`);
        console.debug('########## VideoInfo [end] ##########');
    });
});
