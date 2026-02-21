const { Client } = require('ssh2');

const config = {
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
  readyTimeout: 60000
};

function runCmd(conn, cmd, timeout = 120000) {
  return new Promise((resolve) => {
    console.log(`\n>>> ${cmd.substring(0, 80)}`);
    conn.exec(cmd, (err, stream) => {
      if (err) { console.error(err); return resolve(''); }
      const timer = setTimeout(() => { stream.close(); resolve(''); }, timeout);
      stream.on('data', d => console.log(d.toString()))
            .stderr.on('data', d => console.log('ERR:', d.toString()))
            .on('close', () => { clearTimeout(timer); resolve(''); });
    });
  });
}

async function deploy() {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('✅ Connected');
      
      // Git pull
      await runCmd(conn, 'cd /var/www/production-center && git pull origin master');
      
      // Install deps
      await runCmd(conn, 'cd /var/www/production-center && /root/.bun/bin/bun install', 180000);
      
      // Prisma generate
      await runCmd(conn, 'cd /var/www/production-center && /root/.bun/bin/bunx prisma generate');
      
      // Build
      await runCmd(conn, 'cd /var/www/production-center && /root/.bun/bin/bun run build', 300000);
      
      // Copy files
      await runCmd(conn, 'cd /var/www/production-center && cp -r public/* .next/standalone/public/');
      await runCmd(conn, 'cd /var/www/production-center && cp -r .next/static .next/standalone/.next/');
      
      // Restart
      await runCmd(conn, 'pm2 restart all');
      await runCmd(conn, 'pm2 status');
      
      // Test
      await runCmd(conn, 'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000');
      
      console.log('\n✅ Deploy complete!');
      conn.end();
      resolve();
    }).on('error', reject).connect(config);
  });
}

deploy().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
