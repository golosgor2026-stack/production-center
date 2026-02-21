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
      
      // Создать директорию db в standalone
      await runCmd(conn, 'mkdir -p /var/www/production-center/.next/standalone/db');
      
      // Скопировать базу
      await runCmd(conn, 'cp /var/www/production-center/db/custom.db /var/www/production-center/.next/standalone/db/');
      
      // Проверить что скопировалось
      await runCmd(conn, 'ls -la /var/www/production-center/.next/standalone/db/');
      
      // Создать .env в standalone
      await runCmd(conn, 'echo \'DATABASE_URL="file:./db/custom.db"\' > /var/www/production-center/.next/standalone/.env');
      
      // Перезапустить
      await runCmd(conn, 'pm2 restart all');
      
      // Подождать и проверить
      await runCmd(conn, 'sleep 3 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000');
      
      console.log('\n✅ Done!');
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

fix().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
