const { Client } = require('ssh2');

const config = {
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
  readyTimeout: 60000
};

function runCmd(conn, cmd) {
  return new Promise((resolve) => {
    console.log(`\n>>> ${cmd.substring(0, 80)}`);
    conn.exec(cmd, (err, stream) => {
      if (err) { console.error(err); return resolve(''); }
      stream.on('data', d => console.log(d.toString()))
            .stderr.on('data', d => console.log('ERR:', d.toString()))
            .on('close', resolve);
    });
  });
}

async function start() {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('✅ Connected');
      
      // Остановить старое
      await runCmd(conn, 'pm2 delete all || true');
      
      // Запустить через node с правильными переменными
      await runCmd(conn, 'cd /var/www/production-center/.next/standalone && DATABASE_URL="file:../../db/custom.db" PORT=3000 pm2 start server.js --name production-center');
      
      // Сохранить pm2
      await runCmd(conn, 'pm2 save');
      
      // Проверить статус
      await runCmd(conn, 'sleep 3 && pm2 status');
      
      // Проверить сайт
      await runCmd(conn, 'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000');
      
      console.log('\n✅ Done!');
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

start().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
