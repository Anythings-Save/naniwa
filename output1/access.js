(function () {
    var userAgent = window.navigator.userAgent;
    var overlay = document.getElementById('overlay');
    var messageUnsupportedBrowser = document.getElementById('message-unsupported-browser');
    var messageUnsupportedDevice = document.getElementById('message-unsupported-device');
    var messageCountdown = document.getElementById('message-countdown');

    // ブラウザとスマートフォンのチェックおよびメッセージ表示e
    function checkBrowserAndDevice() {
        var userAgent = navigator.userAgent;
        var isEdge = userAgent.indexOf("Edg") > -1;
        var isChrome = userAgent.indexOf("Chrome") > -1;
        var isIPhone = userAgent.indexOf("iPhone") > -1;
        var isAndroid = userAgent.indexOf("Android") > -1;
    
        overlay.style.display = 'flex'; // オーバーレイを表示
    
        // EdgeまたはChromeでない場合
        if (!isEdge && !isChrome) {
            messageUnsupportedBrowser.textContent = "このサイトはMicrosoft EdgeまたはGoogle Chromeでのみアクセス可能です。";
            messageUnsupportedBrowser.style.display = 'block'; // メッセージを表示
            setTimeout(startCountdown, 2000); // 2秒後にカウントダウン開始
        } 
        // スマートフォンでない場合
        else if (!isIPhone && !isAndroid) {
            messageUnsupportedDevice.textContent = "このサイトはスマートフォンでのみアクセス可能です。";
            messageUnsupportedDevice.style.display = 'block'; // メッセージを表示
            setTimeout(startCountdown, 2000); // 2秒後にカウントダウン開始
        } 
        // サポートされている場合はボディを表示
        else {
            overlay.style.display = 'none'; // オーバーレイを非表示
        }
    }
    

    // カウントダウン開始関数
    function startCountdown() {
        messageUnsupportedBrowser.style.display = 'none'; // 他のメッセージを非表示
        messageUnsupportedDevice.style.display = 'none'; // 他のメッセージを非表示

        messageCountdown.style.display = 'block'; // カウントダウンメッセージを表示
        var countdown = 5;

        var countdownInterval = setInterval(function () {
            messageCountdown.textContent = '5秒後に画面が切り替わります... ' + countdown + '秒';
            countdown--;
            if (countdown < 0) {
                clearInterval(countdownInterval);
                // 指定したサイトに移動
                window.location.href = 'http://anythingsave.html.xdomain.jp/'; // 移動させたいURLを入力
            }
        }, 1000); // 1秒ごとに更新
    }

    // ページの読み込み完了時に実行する
    window.addEventListener('load', function() {
        overlay.style.display = 'flex'; // 初期状態でオーバーレイを表示
        checkBrowserAndDevice();
    });
})();
