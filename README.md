# ⛩ 全国神社仏閣まとめ｜モックサイト

Express ベースの簡易モックサーバ。`shrines-temples-matome.html` を `public/index.html` として配信します。

---

## 📁 ファイル構成

```
mock-site/
├── package.json        # 依存関係・npmスクリプト
├── server.js           # Expressサーバ本体
├── README.md           # このファイル
└── public/
    └── index.html      # 表示用HTML（shrines-temples-matome.html）
```

---

## 🚀 起動手順

### 1. Node.js のインストール確認

Node.js 18 以上が必要です。

```bash
node -v   # v18.x.x 以上であればOK
npm -v
```

未インストールの場合は [公式サイト](https://nodejs.org/) からLTS版を取得してください。

### 2. 依存関係のインストール

`mock-site/` ディレクトリで実行：

```bash
npm install
```

`node_modules/` に Express がインストールされます。

### 3. サーバ起動

```bash
npm start
```

または開発用（ファイル変更で自動再起動）：

```bash
npm run dev
```

### 4. ブラウザでアクセス

```
http://localhost:3000
```

停止するには **Ctrl + C** を押してください。

---

## 🔧 ポート番号の変更

環境変数 `PORT` で指定可能：

```bash
# Mac / Linux
PORT=8080 npm start

# Windows (PowerShell)
$env:PORT=8080; npm start

# Windows (cmd)
set PORT=8080 && npm start
```

---

## 📡 提供エンドポイント

| パス | 種別 | 内容 |
|---|---|---|
| `/` | HTML | トップページ（index.html） |
| `/api/status` | JSON | システム稼働状況のモック |
| `/api/shrines` | JSON | 神社仏閣データのモック |
| `/<静的ファイル>` | 各種 | `public/` 配下のファイル |

---

## 🎨 追加・反映済みの内容

このモックは以下の機能追加版HTMLを配信します：

- ✅ **「全社寺 完全比較表」に「地図」列を追加**：20社寺すべてにGoogleマップへのリンク
- ✅ **「ご利益」ナビゲーションタブ追加**：「📊 一覧比較」と「🔄 自動更新」の間に配置
- ✅ **「ご利益一覧」セクション追加**：20社寺のご利益・ご祭神（御本尊）をカード表示、神社／お寺で絞り込み可能

---

## 🛠 トラブルシュート

### `EADDRINUSE: address already in use :::3000`
別のアプリがポート3000を使用中です。別のポートで起動してください：

```bash
PORT=3001 npm start
```

### `npm install` が失敗する
プロキシ環境下の場合は npm のプロキシ設定が必要です。
社内ネットワークの場合は管理者にご確認ください。

### 文字化けする
HTMLは UTF-8 で保存されています。ブラウザの文字コード設定が「自動」または「UTF-8」になっているかご確認ください。

---

## 📝 ライセンス

MIT
