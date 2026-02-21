const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  // 1. Обновить систему
  'apt update -y',
  
  // 2. Установить Node.js 20
  'curl -fsSL https://deb.nodesource.com/setup_20.x | bash -',
  'apt install -y nodejs',
  
  // 3. Проверить Node
  'node -v',
  'npm -v',
  
  // 4. Установить Bun
  'curl -fsSL https://bun.sh/install | bash',
  
  // 5. Установить Git
  'apt install -y git',
  
  // 6. Создать папку и скачать проект
  'mkdir -p /var/www && cd /var/www && rm -rf production-center && git clone https://github.com/golosgor2026-stack/production-center.git',
  
  // 7. Установить зависимости
  'cd /var/www/production-center && /root/.bun/bin/bun install',
  
  // 8. Настроить базу данных
  'cd /var/www/production-center && /root/.bun/bin/bunx prisma generate',
  'cd /var/www/production-center && /root/.bun/bin/bunx prisma db push',
  
  // 9. Собрать проект
  'cd /var/www/production-center && /root/.bun/bin/bun run build',
  
  // 10. Установить PM2
  'npm install -g pm2',
  
  // 11. Запустить сайт
  'cd /var/www/production-center && pm2 start bun --name "production-center" -- run start -- -p 3000',
  'pm2 save',
  'pm2 startup | tail -1',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено к серверу\n');
  runNextCommand();
});

function runNextCommand() {
  if (cmdIndex >= commands.length) {
    console.log('\n✅ УСТАНОВКА ЗАВЕРШЕНА!');
    console.log('\nСайт должен быть доступен: http://178.212.13.25:3000');
    conn.end();
    return;
  }
  
  const cmd = commands[cmdIndex];
  console.log(`\n[${cmdIndex + 1}/${commands.length}] $ ${cmd.substring(0, 80)}...`);
  
  conn.exec(cmd, (err, stream) => {
    if (err) {
      console.log('❌ Ошибка:', err.message);
    }
    
    let output = '';
    stream.on('data', (data) => {
      output += data.toString();
    });
    stream.stderr.on('data', (data) => {
      output += data.toString();
    });
    stream.on('close', (code) => {
      if (output.length < 500) {
        console.log(output);
      } else {
        console.log(output.substring(0, 200) + '\n... (обрезано) ...\n' + output.substring(output.length - 200));
      }
      cmdIndex++;
      runNextCommand();
    });
  });
}

conn.on('error', (err) => {
  console.log('❌ Ошибка подключения:', err.message);
});

console.log('Подключение...');
conn.connect({
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
  readyTimeout: 30000
});
