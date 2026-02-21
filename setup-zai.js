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

async function setup() {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('✅ Connected');
      
      // Проверить есть ли конфиг
      await runCmd(conn, 'cat ~/.z-ai-config 2>/dev/null || echo "No config"');
      await runCmd(conn, 'cat /var/www/production-center/.z-ai-config 2>/dev/null || echo "No project config"');
      
      // Конфиг z-ai (используем переменные окружения)
      const zaiConfig = `ZAI_API_KEY=default
ZAI_BASE_URL=https://api.z-ai.com
`;
      
      // Создать конфиг в домашней директории
      await runCmd(conn, `echo 'ZAI_API_KEY=default
ZAI_BASE_URL=https://api.z-ai.com' > ~/.z-ai-config`);
      
      // И в директории проекта
      await runCmd(conn, `echo 'ZAI_API_KEY=default
ZAI_BASE_URL=https://api.z-ai.com' > /var/www/production-center/.z-ai-config`);
      
      // И в standalone
      await runCmd(conn, `echo 'ZAI_API_KEY=default
ZAI_BASE_URL=https://api.z-ai.com' > /var/www/production-center/.next/standalone/.z-ai-config`);
      
      // Перезапустить
      await runCmd(conn, 'pm2 restart all');
      
      await runCmd(conn, 'sleep 3 && pm2 status');
      
      console.log('\n✅ Done!');
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

setup().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
