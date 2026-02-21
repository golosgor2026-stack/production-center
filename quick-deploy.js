const { Client } = require('ssh2');
const conn = new Client();

const commands = [
  'pm2 stop production-center || true',
  'cd /var/www/production-center && git pull',
  'cd /var/www/production-center && /root/.bun/bin/bun install',
  'cd /var/www/production-center && /root/.bun/bin/bun run build',
  'cd /var/www/production-center && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/',
  'pm2 restart production-center',
  'sleep 5',
  'pm2 status',
  'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/',
];

let i = 0;

conn.on('ready', () => {
  console.log('✅ Подключено\n');
  run();
});

function run() {
  if (i >= commands.length) {
    console.log('\n✅ ГОТОВО! http://178.212.13.25');
    conn.end();
    return;
  }
  
  console.log(`\n[${i + 1}/${commands.length}] $ ${commands[i].substring(0, 50)}`);
  
  conn.exec(commands[i], (err, stream) => {
    if (err) console.log('❌', err);
    let out = '';
    stream.on('data', (d) => out += d);
    stream.stderr.on('data', (d) => out += d);
    stream.on('close', () => {
      if (out.length < 800) console.log(out);
      else console.log(out.substring(0, 250) + '\n...\n' + out.substring(out.length - 250));
      i++;
      run();
    });
  });
}

conn.connect({
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
});
