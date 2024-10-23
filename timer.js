window.onload = function () {
    var countdownElement = document.getElementById('timer');

    // 終了日時の設定
    var endTime = new Date();
    endTime.setFullYear(2024); // 終了年（例: 2024年）
    endTime.setMonth(9); // 終了月（0から始まるので、6は7月を表します）
    endTime.setDate(23); // 終了日（例: 7日）
    endTime.setHours(20); // 終了時間の時（例: 21時）
    endTime.setMinutes(0); // 終了時間の分
    endTime.setSeconds(0); // 終了時間の秒

    function updateTimer() {
        var currentTime = new Date();

        // 残り時間を計算
        var remainingTime = endTime - currentTime;
        var seconds = Math.floor((remainingTime / 1000) % 60);
        var minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        var hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        // タイマーを表示
        countdownElement.innerHTML = hours + "時間 " + minutes + "分 " + seconds + "秒 ";

        // 指定の日時を過ぎていたらスキップ
        if (remainingTime < 0) {
            countdownElement.style.display = "none";
            window.location.href = 'http://anythingsave.html.xdomain.jp/'; // リダイレクト先のURLを指定
            return;
        }
    }

    // タイマーの更新間隔を設定（1秒ごとに更新）
    setInterval(updateTimer, 1000);
};
