// ページの上下スクロールを禁止する関数
function disableScroll() {
    // wheelイベントのデフォルトの動作をキャンセル
    window.addEventListener('wheel', preventDefault, { passive: false });
}

// wheelイベントのデフォルトの動作をキャンセルする関数
function preventDefault(e) {
    e.preventDefault();
}

// サイト読み込み時に上下スクロールを禁止
disableScroll();

//スペースキー押したら下にスクロール禁止
window.addEventListener("keydown", function (event) {
    if (event.code === "Space" && event.target === document.body) {
        event.preventDefault();
    }
});

//右クリックの無効化
window.oncontextmenu = function () {
    return false;
}
//F12 開発者ツール禁止
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 123) { // F12キーのキーコードは123
        event.preventDefault(); // デフォルトのイベント（デベロッパーツールの表示）を無効化する
    }
});

//ショートカット 開発者ツール禁止
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
    }

    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }
});

//ウィンドウの回転を禁止する
window.addEventListener('orientationchange', function () {
    // 画面が回転しようとした場合、元の向きに戻す
    if (window.orientation !== 0) {
        window.orientation = 0;
    }
});

//ウィンドウの拡大縮小を禁止する
window.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});



document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('my-video');
    var body = document.body;

    video.addEventListener('play', function () {
        body.style.opacity = '0.7'; // 動画再生時の透明度
    });

    video.addEventListener('pause', function () {
        body.style.opacity = '1'; // 動画が一時停止した場合は透明度を元に戻す
    });

    video.addEventListener('ended', function () {
        body.style.opacity = '1'; // 動画が終了した場合は透明度を元に戻す

        // Chrome castを無効にする
        videojs('my-video').ready(function () {
            var player = this;

            // Chrome castを無効にする
            player.ima.disableAds();

            // 自動的にChrome castデバイスに接続せず、設定のメニューを表示する
            player.ima.settings.disableControlWithClickThrough();

            // Chrome castに接続している場合にログメッセージを出力する
            player.ima.on('adsManagerLoaded', function (event) {
                var adsManager = event.data.adsManager;
                if (adsManager.getCuePoints().length > 0 && adsManager.getSettings().hasAutoCastSupport) {
                    console.log('Chrome cast is connected');
                }
            });
        });

    });
});



