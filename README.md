# 全国神社仏閣まとめ — Node.js モックサーバー

添付HTMLをローカルでブラウザ表示するExpress製の最小サーバーです。
**起動時に既定ブラウザが自動で開きます**。

---

## 📁 ファイル構成

```
shrines-temples-mock/
├── package.json          # 依存定義（express のみ）
├── server.js             # Expressサーバー本体
├── public/
│   └── index.html        # 添付HTML
└── README.md             # 本ファイル
```

---

## 🛠 前提

- Node.js **18 以上**（推奨: 20.x / 22.x LTS）
- 確認: `node -v` / `npm -v`
- 未導入なら <https://nodejs.org/ja>

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

ターミナル表示の **<http://localhost:3000/>** をクリック（または自動で開きます）。

> 自動オープンを無効化: `NO_OPEN=1 npm start`

---

## 🔌 提供エンドポイント

| URL | 内容 |
|---|---|
| <http://localhost:3000/> | 添付HTML表示 |
| <http://localhost:3000/api/health> | ヘルスチェック |
| <http://localhost:3000/api/ranking> | ランキングJSON（モック） |
| <http://localhost:3000/api/sns> | SNS指標JSON（モック） |
| <http://localhost:3000/api/merch> | 物販JSON（モック） |
| <http://localhost:3000/api/next-update> | 次回更新時刻 |

---

## ⚙ 任意設定

```bash
PORT=8080 npm start    # ポート変更
NO_OPEN=1 npm start    # 自動ブラウザ起動を抑止
npm run dev            # ファイル変更で自動再起動
```

---

## 🌐 外部からアクセスしたい場合

| 方法 | コマンド |
|---|---|
| 同一LAN内別端末から | PCのIP直打ち 例: `http://192.168.1.10:3000/` |
| インターネット一時公開 | `npx ngrok http 3000` |
| 本番デプロイ（無料枠あり） | Render / Railway / Fly.io / Vercel |

---

## 🧯 トラブル時

| 症状 | 対処 |
|---|---|
| `EADDRINUSE` | `PORT=8080 npm start` |
| `command not found: npm` | Node.js 未インストール |
| 画面真っ白 | `public/index.html` の存在確認 |

---

MIT License
