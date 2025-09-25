import express from "express";
const app = express();
const port = 3000;

// HTML escaping function to prevent XSS attacks
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>脆弱なXSSテストページ</h1>
        <form method="POST">
          <input name="msg" placeholder="何か入力してください" />
          <button type="submit">送信</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/", (req, res) => {
  const msg = req.body.msg || "";
  // XSS脆弱性を修正: ユーザー入力をエスケープしてからHTMLへ埋め込む
  const escapedMsg = escapeHtml(msg);
  res.send(`
    <html>
      <body>
        <h1>あなたの入力: ${escapedMsg}</h1>
        <a href="/">戻る</a>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
