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

async function fix() {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('✅ Connected');
      
      // Остановить PM2
      await runCmd(conn, 'pm2 delete all || true');
      
      // Запустить через node standalone
      await runCmd(conn, 'cd /var/www/production-center/.next/standalone && PORT=3000 pm2 start server.js --name production-center');
      
      // Сохранить
      await runCmd(conn, 'pm2 save');
      
      // Проверить
      await runCmd(conn, 'pm2 status');
      await runCmd(conn, 'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000');
      
      console.log('\n✅ Done!');
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

fix().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
