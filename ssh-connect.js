const { Client } = require('ssh2');

const conn = new Client();

console.log('Подключение к 178.212.13.25...');
console.log('Логин: root');

conn.on('ready', () => {
  console.log('\n✅ УСПЕШНО ПОДКЛЮЧЕНО К СЕРВЕРУ!\n');
  
  const commands = [
    'whoami',
    'pwd',
    'cat /etc/os-release | head -3',
    'which node || echo "Node.js не установлен"',
    'which bun || echo "Bun не установлен"',
    'df -h | head -2',
    'free -h',
  ];
  
  let i = 0;
  
  function runCmd() {
    if (i >= commands.length) {
      console.log('\n✅ Проверка завершена');
      conn.end();
      return;
    }
    
    conn.exec(commands[i], (err, stream) => {
      if (err) throw err;
      let output = '';
      stream.on('data', (data) => output += data);
      stream.on('close', () => {
        console.log(`$ ${commands[i]}`);
        console.log(output.trim());
        console.log('');
        i++;
        runCmd();
      });
    });
  }
  
  runCmd();
});

conn.on('error', (err) => {
  console.log('❌ Ошибка:', err.message);
});

conn.connect({
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
  readyTimeout: 15000
});
