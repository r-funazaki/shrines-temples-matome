// =====================================================
//  全国神社仏閣まとめ - モックサーバー
//  Node.js + Express による静的サイト + モックAPI配信
// =====================================================
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// ----- ログ用ミドルウェア（簡易） -----
app.use((req, res, next) => {
  const t = new Date().toISOString();
  console.log(`[${t}] ${req.method} ${req.url}`);
  next();
});

// ----- 静的ファイル配信（public配下） -----
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  maxAge: '0'   // 開発用にキャッシュ無効
}));

// =====================================================
//  モックAPI（将来の動的化用スタブ）
//  HTML側のJSは現状ハードコード値で動きますが、
//  必要に応じてこれらのエンドポイントから fetch する形に切替可能。
// =====================================================

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'shrines-temples-mock',
    time: new Date().toISOString(),
    uptimeSec: Math.floor(process.uptime())
  });
});

// 総合ランキング（上位サンプル）
app.get('/api/ranking', (req, res) => {
  res.json({
    updatedAt: new Date().toISOString(),
    items: [
      { rank: 1, name: '伊勢神宮', prefecture: '三重', type: '神宮', score: 95.8 },
      { rank: 2, name: '出雲大社', prefecture: '島根', type: '大社', score: 92.4 },
      { rank: 3, name: '明治神宮', prefecture: '東京', type: '神宮', score: 91.7 },
      { rank: 4, name: '伏見稲荷大社', prefecture: '京都', type: '大社', score: 90.3 },
      { rank: 5, name: '成田山新勝寺', prefecture: '千葉', type: '寺', score: 89.6 }
    ]
  });
});

// SNS指標サンプル
app.get('/api/sns', (req, res) => {
  res.json({
    updatedAt: new Date().toISOString(),
    accounts: [
      { name: '伊勢神宮', instagram: 152000, x: 48000, tiktok: null },
      { name: '出雲大社', instagram: 121000, x: 31000, tiktok: 18000 },
      { name: '明治神宮', instagram: 98000,  x: 22000, tiktok: null },
      { name: '伏見稲荷大社', instagram: 187000, x: 41000, tiktok: 9200 },
      { name: '浅草寺', instagram: 9283, x: 3176, tiktok: null }
    ]
  });
});

// 物販在庫サンプル
app.get('/api/merch', (req, res) => {
  res.json({
    updatedAt: new Date().toISOString(),
    items: [
      { temple: '伊勢神宮', name: '神宮御札', price: 1000, stock: 'in_stock' },
      { temple: '出雲大社', name: '縁結守', price: 800, stock: 'low' },
      { temple: '明治神宮', name: '勝守', price: 1000, stock: 'in_stock' },
      { temple: '伏見稲荷大社', name: 'きつね絵馬', price: 800, stock: 'in_stock' }
    ]
  });
});

// 次回更新時刻（深夜2:00 JST）
app.get('/api/next-update', (req, res) => {
  const now = new Date();
  const next = new Date(now);
  next.setHours(2, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  res.json({
    now: now.toISOString(),
    nextUpdate: next.toISOString(),
    remainingMs: next - now
  });
});

// ----- 404 -----
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// ----- 起動 -----
app.listen(PORT, HOST, () => {
  console.log('==============================================');
  console.log('  🏯  全国神社仏閣まとめ - モックサーバー起動');
  console.log('==============================================');
  console.log(`  ローカルURL : http://localhost:${PORT}/`);
  console.log(`  API ヘルス  : http://localhost:${PORT}/api/health`);
  console.log(`  API ランキング: http://localhost:${PORT}/api/ranking`);
  console.log('  停止するには Ctrl + C を押してください');
  console.log('==============================================');
});
