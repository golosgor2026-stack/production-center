const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  // Проверить логи ошибок
  'pm2 logs production-center --lines 30 --nostream 2>&1 | tail -30',
  
  // Проверить папку public
  'ls -la /var/www/production-center/public/',
  
  // Проверить папку с изображениями
  'ls -la /var/www/production-center/public/*.jpg 2>/dev/null || echo "Нет jpg файлов"',
  
  // Проверить блог страницу
  'curl -s http://localhost:3000/blog | grep -o "error" | head -5 || echo "Блог OK"',
  
  // Проверить статью
  'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blog/organizatsiya-forumov-rossiya',
  
  // Проверить ошибку при запросе картинки
  'curl -sI http://localhost:3000/hero-bg.jpg | head -5',
  
  // Проверить next.config
  'cat /var/www/production-center/next.config.ts',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено к серверу\n');
  runNextCommand();
});

function runNextCommand() {
  if (cmdIndex >= commands.length) {
    conn.end();
    return;
  }
  
  const cmd = commands[cmdIndex];
  console.log(`\n[${cmdIndex + 1}] $ ${cmd.substring(0, 60)}...`);
  
  conn.exec(cmd, (err, stream) => {
    if (err) console.log('❌:', err.message);
    
    let output = '';
    stream.on('data', (d) => output += d);
    stream.stderr.on('data', (d) => output += d);
    stream.on('close', () => {
      console.log(output);
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
