const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  // Остановить PM2
  'pm2 delete all || true',
  
  // Запустить через node (standalone)
  'cd /var/www/production-center && pm2 start .next/standalone/server.js --name "production-center" -- -p 3000',
  
  // Ждать
  'sleep 3',
  
  // Статус
  'pm2 status',
  
  // Проверить порт
  'netstat -tlnp | grep 3000 || ss -tlnp | grep 3000',
  
  // Проверить curl
  'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ || echo "failed"',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено\n');
  runNextCommand();
});

function runNextCommand() {
  if (cmdIndex >= commands.length) {
    console.log('\n✅ ПРОВЕРЬТЕ САЙТ:');
    console.log('🌐 http://178.212.13.25:3000');
    conn.end();
    return;
  }
  
  const cmd = commands[cmdIndex];
  console.log(`\n[${cmdIndex + 1}/${commands.length}] $ ${cmd}`);
  
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
