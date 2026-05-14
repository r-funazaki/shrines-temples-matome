# 全国神社仏閣まとめ｜モックサイト

Node.jsで動く、静的HTMLを配信するモックサーバーです。
**外部依存なし**（Node.js標準モジュールのみ使用）なので、`npm install` は不要です。

---

## 📁 ファイル構成

```
shrines-temples-mock/
├── server.js          ← Node.js サーバー本体 (標準モジュールのみ)
├── package.json       ← プロジェクト定義 (npm start で起動可能に)
├── README.md          ← このファイル
└── public/
    └── index.html     ← 配信するHTML (アップロードされたファイル)
```

---

## 🚀 起動手順

### 1. Node.js が入っているか確認
```bash
node -v
```
> v14 以上であればOK。未インストールの場合は https://nodejs.org/ から導入してください。

### 2. このフォルダに移動
```bash
cd shrines-temples-mock
```

### 3. サーバー起動
以下のどちらでもOKです:
```bash
node server.js
```
または
```bash
npm start
```

### 4. ブラウザでアクセス
起動メッセージが出たら、以下のURLをクリック（またはコピーしてブラウザへ）:

👉 **http://localhost:3000**

### 停止
ターミナルで `Ctrl + C`

---

## 🔧 ポート変更

3000番が使われている場合は環境変数 `PORT` で変えられます:

```bash
# macOS / Linux
PORT=8080 node server.js

# Windows (PowerShell)
$env:PORT=8080; node server.js

# Windows (コマンドプロンプト)
set PORT=8080 && node server.js
```

---

## 📝 補足

- HTMLは自己完結型（CSS・JSすべて埋め込み済み）なので、`public/index.html` を差し替えるだけで内容更新できます。
- 画像やCSS等の追加ファイルが必要になった場合も `public/` 配下に置けば自動で配信されます。
- 本番運用する場合は Express + helmet + compression 等の導入を推奨。
