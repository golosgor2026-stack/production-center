const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  // Установить unzip
  'apt install -y unzip',
  
  // Установить Bun
  'curl -fsSL https://bun.sh/install | bash',
  
  // Перезагрузить профиль
  'source ~/.bashrc || true',
  
  // Проверить bun
  '/root/.bun/bin/bun -v',
  
  // Установить зависимости через bun
  'cd /var/www/production-center && /root/.bun/bin/bun install',
  
  // Сгенерировать Prisma
  'cd /var/www/production-center && /root/.bun/bin/bunx prisma generate',
  
  // Создать базу данных
  'cd /var/www/production-center && /root/.bun/bin/bunx prisma db push',
  
  // Собрать проект
  'cd /var/www/production-center && /root/.bun/bin/bun run build',
  
  // Остановить старый PM2 процесс
  'pm2 delete all || true',
  
  // Запустить сайт
  'cd /var/www/production-center && pm2 start "bun run start" --name "production-center"',
  
  // Сохранить PM2
  'pm2 save',
  
  // Показать статус
  'pm2 status',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено\n');
  runNextCommand();
});

function runNextCommand() {
  if (cmdIndex >= commands.length) {
    console.log('\n✅ ГОТОВО!');
    console.log('\n🌐 Сайт: http://178.212.13.25:3000');
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
      if (output.length < 800) {
        console.log(output);
      } else {
        console.log(output.substring(0, 300) + '\n...\n' + output.substring(output.length - 300));
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
