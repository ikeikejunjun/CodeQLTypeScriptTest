"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.urlencoded({ extended: true }));
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
    // XSS脆弱性: ユーザー入力をエスケープせずにHTMLへ埋め込む
    res.send(`
    <html>
      <body>
        <h1>あなたの入力: ${msg}</h1>
        <a href="/">戻る</a>
      </body>
    </html>
  `);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
