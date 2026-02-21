const { Client } = require('ssh2');
const conn = new Client();

const commands = [
  // Проверим файл статьи блога
  'ls -la /var/www/production-center/src/app/blog/',
  'head -100 /var/www/production-center/src/app/blog/\\[slug\\]/page.tsx | grep -A5 "content"',
  'grep -n "content" /var/www/production-center/src/app/blog/\\[slug\\]/page.tsx | head -10',
  
  // Проверим next.config
  'cat /var/www/production-center/next.config.ts',
  
  // Проверим public папку
  'ls -la /var/www/production-center/public/',
  
  // Проверим standalone public
  'ls -la /var/www/production-center/.next/standalone/public/ 2>/dev/null || echo "No standalone public"',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено\n');
  runNext();
});

function runNext() {
  if (cmdIndex >= commands.length) {
    conn.end();
    return;
  }
  const cmd = commands[cmdIndex];
  console.log(`\n[${cmdIndex + 1}] $ ${cmd.substring(0, 60)}...`);
  
  conn.exec(cmd, (err, stream) => {
    if (err) console.log('Error:', err);
    let output = '';
    stream.on('data', (d) => output += d);
    stream.stderr.on('data', (d) => output += d);
    stream.on('close', () => {
      console.log(output);
      cmdIndex++;
      runNext();
    });
  });
}

conn.connect({
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
});
