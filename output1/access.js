// access.js
(function () {
    var userAgent = window.navigator.userAgent;

    // ブラウザとスマートフォンのチェックおよびメッセージ表示
    function checkBrowserAndDevice() {
        var isEdge = userAgent.indexOf("Edg") > -1;
        var isChrome = userAgent.indexOf("Chrome") > -1;
        var isIPhone = userAgent.indexOf("iPhone") > -1;
        var isAndroid = userAgent.indexOf("Android") > -1;

        if (!isEdge && !isChrome) {
            // EdgeまたはChromeでない場合
            document.body.innerHTML = '<h1 class="centered-text">このサイトはMicrosoft EdgeまたはGoogle Chromeでのみアクセス可能です。</h1>';
            startCountdown();
        } else if (!isIPhone && !isAndroid) {
            // iPhoneまたはAndroidでない場合
            document.body.innerHTML = '<h1 class="centered-text">このサイトはスマートフォンでのみアクセス可能です。</h1>';
            startCountdown();
        }
        // どちらの条件にも当てはまらない場合は、何もしない
    }

    // カウントダウン開始関数
    function startCountdown() {
        var countdown = 5;
        var countdownInterval = setInterval(function () {
            document.body.innerHTML = '<h1 class="centered-text">5秒後に画面が切り替わります... ' + countdown + '秒</h1>';
            countdown--;
            if (countdown < 0) {
                clearInterval(countdownInterval);
                // 移動する処理
                window.location.href = 'http://anythingsave.html.xdomain.jp/'; // 移動させたいURLを入力
            }
        }, 1000); // 1秒ごとに更新
    }

    // ページの読み込み完了時に実行する
    window.addEventListener('load', checkBrowserAndDevice);
})();
