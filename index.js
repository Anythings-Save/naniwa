let isPasswordCorrect = localStorage.getItem('isPasswordCorrect') === 'true'; // localStorageからフラグを取得

if (isPasswordCorrect) {
    // ページロード時に視聴済みメッセージを表示
    document.getElementById("watched-message").style.display = "block";
    document.getElementById("player-container").classList.remove("hide");
} 

document.getElementById("execute-button").addEventListener("click", function () {
    var password = document.getElementById("password-input").value;
    var encryptedPassword = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));

    // Base64でエンコードされた正しいパスワード
    var correctPassword = "MA=="; // 正しいパスワード（Base64）
    var base64VideoUrl = "aHR0cHM6Ly9hbnl0aGluZ3Mtc2F2ZS5naXRodWIuaW8vbnR0L291dHB1dC9pbmRleC5tcGQ="; // "http://localhost:8000/2/index.mpd"のBase64
    var videoUrl = atob(base64VideoUrl); // Base64をデコードしてURLを取得

    // パスワードチェック
    if (isPasswordCorrect) {
        // 既にパスワードが正しい場合は何もしない
        return;
    }

    if (encryptedPassword === correctPassword) {
        // パスワードが一致する場合
        isPasswordCorrect = true; // フラグを更新
        localStorage.setItem('isPasswordCorrect', 'true'); // localStorageにフラグを保存
        document.getElementById("password-container").classList.add("hide");
        document.getElementById("player-container").classList.remove("hide");
        document.getElementById("warning").style.display = "none";

        // Video.jsとShaka Playerを初期化
        var player = videojs('my-video', {
            techOrder: ['shaka', 'html5'],
            shaka: {
                drm: {
                    clearKeys: {
                        'aa40a4ddc7ab0ea77340975ccd230fc7': '359bce01a7527ed2bdf8870b88f4d0b6'
                    }
                }
            },
            fluid: false // 固定サイズにする
        });

        // 動画を再生
        player.src({ src: videoUrl, type: 'application/dash+xml' });
        player.load();
        player.play(); // 再生を開始
    } else {
        // パスワードが一致しない場合
        if (!isPasswordCorrect) { // フラグがfalseの場合のみ警告を表示
            document.getElementById("warning").innerText = "パスワードが間違っています。";
            document.getElementById("warning").style.display = "block";
        }
    }
});

// パスワード入力フィールドの変更イベントをリッスン
document.getElementById("password-input").addEventListener("input", function () {
    // 警告メッセージを非表示にする
    if (document.getElementById("warning").style.display === "block") {
        document.getElementById("warning").style.display = "none";
    }
});