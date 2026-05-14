# 全国神社仏閣まとめ — Node.js モックサーバー

添付HTMLをローカルでブラウザ表示するための、最小構成のExpressサーバーです。
**起動後にブラウザを自動で開きます**（無効化も可能）。

---

## 📁 ファイル構成

```
shrines-temples-mock/
├── package.json          # 依存定義（express のみ）
├── server.js             # Expressサーバー本体
├── public/
│   └── index.html        # 添付HTML
└── README.md             # このファイル
```

---

## 🛠 前提

- Node.js **18 以上**（推奨: 20.x / 22.x LTS）
- 確認: `node -v` / `npm -v`
- 未導入なら <https://nodejs.org/ja> から入手

---

## 🚀 起動手順（3ステップ）

```bash
# 1. 解凍後フォルダへ移動
cd shrines-temples-mock

# 2. 依存インストール（初回のみ）
npm install

# 3. サーバー起動 → ブラウザ自動オープン
npm start
```

ターミナルに表示される **<http://localhost:3000/>** をクリック（または自動で開きます）。

> ブラウザを自動で開きたくない場合: `NO_OPEN=1 npm start`

---

## 🔌 提供エンドポイント

| URL | 内容 |
|---|---|
| <http://localhost:3000/> | 添付HTML表示 |
| <http://localhost:3000/api/health> | ヘルスチェック |
| <http://localhost:3000/api/ranking> | 総合ランキング（モックJSON） |
| <http://localhost:3000/api/sns> | SNS指標（モックJSON） |
| <http://localhost:3000/api/merch> | 物販在庫（モックJSON） |
| <http://localhost:3000/api/next-update> | 次回更新時刻 |

> モックAPIは将来HTMLを動的化する際の足掛かりです。
> 現状の `index.html` は静的なのでAPIを呼ばなくても表示できます。

---

## ⚙ 任意設定

```bash
# ポート変更
PORT=8080 npm start

# ブラウザ自動オープンを抑止
NO_OPEN=1 npm start

# ファイル変更で自動再起動（Node 18+）
npm run dev
```

---

## 🌐 外部URLでアクセスしたい場合

| 方法 | コマンド/手順 |
|---|---|
| 同一LAN内の別端末から | PCのIP直打ち 例: `http://192.168.1.10:3000/` |
| インターネット一時公開 | `npx ngrok http 3000` で公開URL発行 |
| 本番デプロイ（無料枠あり） | Render / Railway / Fly.io / Vercel など |

---

## 🐳 Docker（任意）

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t shrines-mock .
docker run -p 3000:3000 -e NO_OPEN=1 shrines-mock
```

---

## 🧯 トラブル時

| 症状 | 対処 |
|---|---|
| `EADDRINUSE` ポート使用中 | `PORT=8080 npm start` |
| `command not found: npm` | Node.js 未インストール |
| 画面真っ白 | `public/index.html` の存在確認 |
| 文字化け | UTF-8 で保存されているか確認 |

---

MIT License
