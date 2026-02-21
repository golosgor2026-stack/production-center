const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  // Создать .env файл
  'echo "DATABASE_URL=\\"file:./db/custom.db\\"" > /var/www/production-center/.env',
  
  // Создать папку для базы
  'mkdir -p /var/www/production-center/db',
  
  // Сгенерировать Prisma снова
  'cd /var/www/production-center && /root/.bun/bin/bunx prisma generate',
  
  // Создать базу данных
  'cd /var/www/production-center && /root/.bun/bin/bunx prisma db push',
  
  // Проверить что база создана
  'ls -la /var/www/production-center/db/',
  
  // Остановить PM2
  'pm2 delete all || true',
  
  // Запустить правильно
  'cd /var/www/production-center && pm2 start /root/.bun/bin/bun --name "production-center" -- run start',
  
  // Ждать 3 секунды
  'sleep 3',
  
  // Статус
  'pm2 status',
  
  // Логи
  'pm2 logs production-center --lines 20 --nostream',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено\n');
  runNextCommand();
});

function runNextCommand() {
  if (cmdIndex >= commands.length) {
    console.log('\n✅ ИСПРАВЛЕНО!');
    console.log('\n🌐 Сайт: http://178.212.13.25:3000');
    console.log('\nАдминка: http://178.212.13.25:3000/admin');
    conn.end();
    return;
  }
  
  const cmd = commands[cmdIndex];
  console.log(`\n[${cmdIndex + 1}/${commands.length}] $ ${cmd.substring(0, 60)}...`);
  
  conn.exec(cmd, (err, stream) => {
    if (err) console.log('❌:', err.message);
    
    let output = '';
    stream.on('data', (d) => output += d);
    stream.stderr.on('data', (d) => output += d);
    stream.on('close', () => {
      if (output.length < 1000) {
        console.log(output);
      } else {
        console.log(output.substring(0, 400) + '\n...\n' + output.substring(output.length - 400));
      }
      cmdIndex++;
      runNextCommand();
    });
  });
}

conn.on('error', (err) => console.log('❌:', err.message));

conn.connect({
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
  readyTimeout: 30000
});
