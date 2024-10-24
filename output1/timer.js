window.onload = function () {
    var countdownElement = document.getElementById('timer');

    // サーバーから現在のUTC時間を取得
    fetch('https://worldtimeapi.org/api/timezone/Asia/Tokyo')
        .then(response => response.json())
        .then(data => {
            // サーバーのUTC時間を取得
            var serverDateTime = new Date(data.utc_datetime);
            var endTime = new Date(serverDateTime);
            endTime.setFullYear(2024);
            endTime.setMonth(9);
            endTime.setDate(25);
            endTime.setHours(1);
            endTime.setMinutes(0);
            endTime.setSeconds(0);

            function updateTimer() {
                // サーバーの現在の時間を再取得
                fetch('https://worldtimeapi.org/api/timezone/Asia/Tokyo')
                    .then(response => response.json())
                    .then(data => {
                        var currentTime = new Date(data.utc_datetime);

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
                            window.location.href = 'http://anythingsave.html.xdomain.jp/';
                            return;
                        }
                    });
            }

            // タイマーの更新間隔を設定（1秒ごとに更新）
            setInterval(updateTimer, 1000);
        })
        .catch(error => console.error('Error fetching time:', error));
};
