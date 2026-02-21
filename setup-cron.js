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

async function setupCron() {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('✅ Connected');
      
      // Создаем скрипт для cron
      const cronScript = `#!/bin/bash
# Автоматическая публикация статей в блог
cd /var/www/production-center
curl -X POST -H "Authorization: Bearer auto-blog-secret-2024" http://localhost:3000/api/auto-blog >> /var/log/auto-blog.log 2>&1
`;
      
      await runCmd(conn, `echo '${cronScript}' > /var/www/production-center/auto-blog.sh`);
      await runCmd(conn, 'chmod +x /var/www/production-center/auto-blog.sh');
      
      // Добавляем cron задачу - запуск каждый день в 9:00 UTC (12:00 МСК)
      await runCmd(conn, '(crontab -l 2>/dev/null | grep -v "auto-blog.sh"; echo "0 9 * * * /var/www/production-center/auto-blog.sh") | crontab -');
      
      // Проверяем cron
      await runCmd(conn, 'crontab -l');
      
      console.log('\n✅ Cron setup complete!');
      console.log('Статьи будут публиковаться ежедневно в 12:00 МСК');
      
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

setupCron().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
