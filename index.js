document.getElementById("execute-button").addEventListener("click", async function () {
    var password = document.getElementById("password-input").value;
    var encryptedPassword = btoa(password); // パスワードをBase64でエンコード

    // 暗号化された動画のURL
    var etchAndDecryptVideo = "aHR0cHM6Ly9zMy5hcC1ub3J0aGVhc3QtMS1udHQud2FzYWJpc3lzLmNvbS9hazE1MjBkLWZpbGVub3ctNi9maWxlcy8yMDI0MTAxOS0wNDA2X2IzNDE3MTBjYmY2NDE3Mjk3ZWM3MjMyMWFkNGU0MjhhLm1wNA==";

    // パスワードチェック
    if (encryptedPassword === "TmlzaGloYXRhXzAxMDk=") {
        // パスワードが一致する場合
        document.getElementById("password-container").classList.add("hide");
        document.getElementById("player-container").classList.remove("hide");
        document.getElementById("warning").style.display = "none";

        // 動画をフェッチして復号化
        await fetchAndDecryptVideo(atob(etchAndDecryptVideo)); // Base64でエンコードされたURLをデコードして渡す
    } else {
        // パスワードが一致しない場合
        document.getElementById("warning").style.display = "block";
    }
});

async function fetchAndDecryptVideo(videoUrl) {
    try {
        const response = await fetch(videoUrl);
        if (!response.ok) {
            throw new Error("動画の取得に失敗しました: " + response.statusText);
        }

        const data = await response.arrayBuffer();
        const iv = new Uint8Array(data.slice(0, 16));
        const ciphertext = new Uint8Array(data.slice(16));

        const key = CryptoJS.enc.Hex.parse('dd34716876364a02d0195e2fb9ae2d1b');

        const cipherBytes = CryptoJS.lib.WordArray.create(ciphertext);
        const ivHex = CryptoJS.enc.Hex.parse(Array.from(iv).map(b => ('0' + b.toString(16)).slice(-2)).join(''));

        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: cipherBytes },
            key,
            {
                iv: ivHex,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        // Blobの作成とURLの生成
        const decryptedArray = new Uint8Array(decrypted.words.map(word => [
            word >> 24, (word >> 16) & 0xff, (word >> 8) & 0xff, word & 0xff
        ]).flat());
        const decryptedBlob = new Blob([decryptedArray], { type: 'video/mp4' });
        const url = URL.createObjectURL(decryptedBlob);

        document.getElementById('videoSource').src = url;
        document.getElementById('my-video').load();
    } catch (error) {
        console.error("エラー:", error);
        document.getElementById("warning").innerText = "動画の復号化に失敗しました。";
        document.getElementById("warning").style.display = "block";
    }
}