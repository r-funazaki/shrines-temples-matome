# 全国神社仏閣まとめ — Node.js モックサーバー

添付HTMLをローカルでブラウザ表示するための、最小構成のExpressサーバーです。

---

## 📁 ファイル構成

```
shrines-temples-mock/
├── package.json          # 依存定義（express のみ）
├── server.js             # Expressサーバー本体（静的配信 + モックAPI）
├── public/
│   └── index.html        # 添付HTML（そのまま配置）
└── README.md             # このファイル
```

---

## 🛠 前提

- Node.js **18 以上** がインストール済みであること（推奨: 20.x / 22.x LTS）
- 確認コマンド:
  ```bash
  node -v
  npm -v
  ```
- 未インストールの場合は <https://nodejs.org/ja> から入手、または `nvm` 等で導入してください。

---

## 🚀 起動手順（3ステップ）

### 1. プロジェクトフォルダへ移動
```bash
cd shrines-temples-mock
```

### 2. 依存パッケージをインストール
```bash
npm install
```
→ `node_modules/` と `package-lock.json` が生成されます。

### 3. サーバー起動
```bash
npm start
```
コンソールに以下が表示されればOKです:
```
==============================================
  🏯  全国神社仏閣まとめ - モックサーバー起動
==============================================
  ローカルURL : http://localhost:3000/
```

### 4. ブラウザでアクセス

👉 **<http://localhost:3000/>** をクリック（またはコピペ）

---

## 🔌 提供エンドポイント

| URL | 内容 |
|---|---|
| `/` | 添付HTML（`public/index.html`）を表示 |
| `/api/health` | ヘルスチェック（JSON） |
| `/api/ranking` | 総合ランキング上位（モック JSON） |
| `/api/sns` | SNS指標（モック JSON） |
| `/api/merch` | 物販在庫（モック JSON） |
| `/api/next-update` | 次回更新時刻（深夜2:00 JST） |

> モックAPIは将来HTMLを動的化する際の足掛かりです。現状の `index.html` は静的なのでAPIを呼ばなくても表示できます。

---

## ⚙ 任意設定

### ポート番号を変える
```bash
# Mac / Linux
PORT=8080 npm start

# Windows (PowerShell)
$env:PORT=8080; npm start
```

### ファイル更新で自動再起動（Node 18+）
```bash
npm run dev
```
`--watch` フラグで `server.js` 変更時に自動再起動します。

---

## 🐳（オプション）Dockerで動かす場合

`Dockerfile` を作成:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

ビルド・実行:
```bash
docker build -t shrines-mock .
docker run -p 3000:3000 shrines-mock
```

---

## 🌐（オプション）外部からアクセスできるようにする

- **同一LAN内の別端末から**: PC の IP（例: `192.168.1.10`）に対し `http://192.168.1.10:3000/` でアクセス
- **インターネット公開（一時的）**: `ngrok` などのトンネリングツール
  ```bash
  npx ngrok http 3000
  ```
- **本番デプロイ**: Render / Railway / Fly.io / Vercel 等のホスティングへデプロイ（無料枠あり）

---

## 🧯 トラブル時

| 症状 | 対処 |
|---|---|
| `EADDRINUSE` ポート使用中 | `PORT=8080 npm start` で別ポート指定 |
| `command not found: npm` | Node.js が未インストール → 上の前提セクション参照 |
| 画面が真っ白 | `public/index.html` が配置されているか確認 |
| 文字化け | HTML が UTF-8 で保存されているか確認 |

---

## 📝 ライセンス

MIT
