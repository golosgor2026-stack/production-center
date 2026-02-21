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
    console.log(`\n>>> ${cmd}`);
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
      
      // Правильный конфиг в формате JSON
      const zaiConfig = '{"baseUrl": "http://172.25.136.193:8080/v1", "apiKey": "Z.ai"}';
      
      // Создать конфиг во всех нужных местах
      await runCmd(conn, `echo '${zaiConfig}' > ~/.z-ai-config`);
      await runCmd(conn, `echo '${zaiConfig}' > /var/www/production-center/.z-ai-config`);
      await runCmd(conn, `echo '${zaiConfig}' > /var/www/production-center/.next/standalone/.z-ai-config`);
      await runCmd(conn, `mkdir -p /etc && echo '${zaiConfig}' > /etc/.z-ai-config`);
      
      // Проверить
      await runCmd(conn, 'cat ~/.z-ai-config');
      
      // Перезапустить
      await runCmd(conn, 'pm2 restart all');
      
      await runCmd(conn, 'sleep 3 && pm2 status');
      
      console.log('\n✅ Done!');
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

fix().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
