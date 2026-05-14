/**
 * 神社仏閣まとめ モックサーバー
 * Node.js 標準モジュールのみ使用 ・ 依存パッケージなし
 *
 * 起動方法:  node server.js
 * アクセス:  http://localhost:3000
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// 拡張子 → Content-Type マッピング
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css; charset=utf-8',
  '.js'  : 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif' : 'image/gif',
  '.svg' : 'image/svg+xml',
  '.ico' : 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf' : 'font/ttf',
  '.map' : 'application/json; charset=utf-8',
};

const server = http.createServer((req, res) => {
  // URLをパースし、パスを取り出す ( ?query は無視 )
  let pathname = decodeURIComponent(url.parse(req.url).pathname);

  // ディレクトリトラバーサル防止
  if (pathname.includes('..')) {
    res.writeHead(400); res.end('Bad Request'); return;
  }

  // ルートは index.html
  if (pathname === '/') pathname = '/index.html';

  const filePath = path.join(PUBLIC_DIR, pathname);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p>' + pathname + ' は見つかりません</p>');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  });

  // 簡易アクセスログ
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
});

server.listen(PORT, () => {
  console.log('\n=================================================');
  console.log('  🏯 神社仏閣まとめ モックサーバー 起動完了');
  console.log('=================================================');
  console.log(`  ▶ ブラウザで以下のURLを開いてください:`);
  console.log(`\n    \x1b[36mhttp://localhost:${PORT}\x1b[0m\n`);
  console.log('  停止: Ctrl + C');
  console.log('=================================================\n');
});
