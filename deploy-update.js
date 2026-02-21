const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const config = {
  host: '178.212.13.25',
  port: 22,
  username: 'root',
  password: 'lZg52b9Y0P',
  readyTimeout: 30000
};

const remotePath = '/var/www/production-center';

function runCommand(conn, cmd) {
  return new Promise((resolve, reject) => {
    console.log(`>>> ${cmd}`);
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let output = '';
      stream.on('data', (data) => {
        output += data.toString();
        console.log(data.toString());
      }).stderr.on('data', (data) => {
        console.error('STDERR:', data.toString());
      }).on('close', () => resolve(output));
    });
  });
}

async function deploy() {
  const conn = new Client();
  
  return new Promise((resolve, reject) => {
    conn.on('ready', async () => {
      console.log('✅ SSH connected');
      
      try {
        // 1. Обновляем код из git или копируем файлы напрямую
        console.log('\n📦 Updating code from git...');
        await runCommand(conn, `cd ${remotePath} && git pull origin main 2>/dev/null || echo "Git pull failed, using current files"`);
        
        // 2. Устанавливаем зависимости если нужно
        console.log('\n📥 Installing dependencies...');
        await runCommand(conn, `cd ${remotePath} && bun install --frozen-lockfile 2>/dev/null || npm install`);
        
        // 3. Пересобираем проект
        console.log('\n🔨 Building project...');
        await runCommand(conn, `cd ${remotePath} && bun run build 2>&1 | head -50`);
        
        // 4. Копируем public файлы в standalone
        console.log('\n📋 Copying public files to standalone...');
        await runCommand(conn, `cp -r ${remotePath}/public/* ${remotePath}/.next/standalone/public/ 2>/dev/null || true`);
        await runCommand(conn, `cp -r ${remotePath}/.next/static ${remotePath}/.next/standalone/.next/ 2>/dev/null || true`);
        
        // 5. Копируем загрузки
        await runCommand(conn, `mkdir -p ${remotePath}/.next/standalone/public/uploads && cp -r ${remotePath}/uploads/* ${remotePath}/.next/standalone/public/uploads/ 2>/dev/null || echo "No uploads to copy"`);
        
        // 6. Перезапускаем PM2
        console.log('\n🔄 Restarting PM2...');
        await runCommand(conn, 'cd /var/www/production-center/.next/standalone && pm2 restart all');
        
        // 7. Проверяем статус
        console.log('\n✅ Checking status...');
        await runCommand(conn, 'pm2 status');
        
        console.log('\n🎉 Deployment completed!');
        conn.end();
        resolve(true);
      } catch (err) {
        console.error('Error:', err);
        conn.end();
        reject(err);
      }
    }).on('error', (err) => {
      console.error('SSH Connection Error:', err);
      reject(err);
    }).connect(config);
  });
}

deploy().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
