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
    console.log(`\n>>> ${cmd}`);
    conn.exec(cmd, (err, stream) => {
      if (err) { console.error(err); return resolve(''); }
      stream.on('data', d => console.log(d.toString()))
            .stderr.on('data', d => console.log('ERR:', d.toString()))
            .on('close', resolve);
    });
  });
}

async function test() {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('✅ Connected');
      
      // Проверка доступности API
      await runCmd(conn, 'curl -s -o /dev/null -w "%{http_code}" http://172.25.136.193:8080/v1/models 2>&1 || echo "Cannot reach API"');
      
      // Проверка DNS
      await runCmd(conn, 'curl -s -I https://api.openai.com 2>&1 | head -3 || echo "Cannot reach OpenAI"');
      
      // Проверка выхода в интернет
      await runCmd(conn, 'curl -s -I https://google.com 2>&1 | head -3 || echo "No internet"');
      
      console.log('\n✅ Done!');
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

test().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
