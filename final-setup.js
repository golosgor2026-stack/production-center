const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  // Сохранить PM2
  'pm2 save',
  
  // Настроить автозапуск
  'pm2 startup | grep -E "sudo|pm2" | tail -1',
  
  // Установить Nginx для порта 80
  'apt install -y nginx',
  
  // Настроить Nginx
  `cat > /etc/nginx/sites-available/production-center << 'EOF'
server {
    listen 80;
    server_name 178.212.13.25;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF`,
  
  // Активировать конфиг
  'rm -f /etc/nginx/sites-enabled/default',
  'ln -sf /etc/nginx/sites-available/production-center /etc/nginx/sites-enabled/',
  
  // Проверить конфиг
  'nginx -t',
  
  // Перезапустить Nginx
  'systemctl restart nginx',
  
  // Проверить
  'curl -s -o /dev/null -w "%{http_code}" http://178.212.13.25/',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено\n');
  runNextCommand();
});

function runNextCommand() {
  if (cmdIndex >= commands.length) {
    console.log('\n🎉 УСТАНОВКА ЗАВЕРШЕНА!\n');
    console.log('🌐 Сайт: http://178.212.13.25');
    console.log('🔐 Админка: http://178.212.13.25/admin');
    console.log('\nЛогин: io-fund@yandex.ru');
    console.log('Пароль: Leverpulslava0409?');
    conn.end();
    return;
  }
  
  const cmd = commands[cmdIndex];
  console.log(`\n[${cmdIndex + 1}/${commands.length}] $ ${cmd.substring(0, 50)}...`);
  
  conn.exec(cmd, (err, stream) => {
    if (err) console.log('❌:', err.message);
    
    let output = '';
    stream.on('data', (d) => output += d);
    stream.stderr.on('data', (d) => output += d);
    stream.on('close', () => {
      if (output.length < 500) {
        console.log(output);
      } else {
        console.log(output.substring(0, 200) + '\n...\n' + output.substring(output.length - 200));
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
