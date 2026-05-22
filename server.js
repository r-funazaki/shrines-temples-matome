/**
 * 全国神社仏閣まとめ｜モックサーバー
 * Express による静的サイト配信 + 簡易APIモック
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// ====== Middleware ======
app.use((req, res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.url}`);
  next();
});

// ====== 静的ファイル配信 ======
// public/ ディレクトリを静的配信。index.html は自動でルート('/')に割り当てられる
app.use(express.static(path.join(__dirname, 'public'), {
  index: 'index.html',
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      // HTMLは毎回最新を取得（モック用途）
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// ====== モックAPI（自動更新の仕組み用のダミーエンドポイント） ======
// サイト内 JS が将来データ取得に使う想定の簡易API
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    lastUpdate: new Date().toISOString(),
    nextUpdate: '02:00 JST',
    crawledAccounts: 261
  });
});

app.get('/api/shrines', (req, res) => {
  res.json({
    total: 20,
    updatedAt: new Date().toISOString(),
    message: 'モックデータです。実データは index.html 内の <table> を参照してください。'
  });
});

// ====== ルートのフォールバック（SPA的に index.html を返す） ======
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ====== 404ハンドラ ======
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="ja"><head><meta charset="UTF-8"><title>404 Not Found</title>
    <style>body{font-family:sans-serif;text-align:center;padding:60px;background:#FBF7F0}
    h1{color:#C41E3A}a{color:#C41E3A}</style></head>
    <body><h1>⛩ 404 - ページが見つかりません</h1>
    <p>お探しのページは存在しません。</p>
    <p><a href="/">トップへ戻る</a></p></body></html>
  `);
});

// ====== サーバ起動 ======
app.listen(PORT, HOST, () => {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ⛩  全国神社仏閣まとめ｜モックサーバー起動  ⛩');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  ▶ ローカル:   http://localhost:${PORT}`);
  console.log(`  ▶ ネットワーク: http://${HOST}:${PORT}`);
  console.log('');
  console.log('  停止するには Ctrl+C を押してください');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});

// ====== グレースフルシャットダウン ======
process.on('SIGINT', () => {
  console.log('\n👋 サーバを停止しました');
  process.exit(0);
});
