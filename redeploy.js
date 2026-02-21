const { Client } = require('ssh2');
const conn = new Client();

const commands = [
  // Остановить PM2
  'pm2 stop production-center || true',
  
  // Обновить код с GitHub
  'cd /var/www/production-center && git pull',
  
  // Обновить next.config.ts
  `cat > /var/www/production-center/next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  types: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
EOF`,

  // Установить зависимости
  'cd /var/www/production-center && /root/.bun/bin/bun install',
  
  // Пересобрать проект
  'cd /var/www/production-center && /root/.bun/bin/bun run build',
  
  // Скопировать static и public
  'cd /var/www/production-center && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/',
  
  // Запустить PM2
  'pm2 restart production-center || pm2 start .next/standalone/server.js --name "production-center" -- -p 3000',
  
  // Статус
  'pm2 status',
  
  // Ждать 3 сек
  'sleep 3',
  
  // Проверить
  'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/',
];

let cmdIndex = 0;

conn.on('ready', () => {
  console.log('✅ Подключено к серверу\n');
  runNext();
});

function runNext() {
  if (cmdIndex >= commands.length) {
    console.log('\n✅ ОБНОВЛЕНИЕ ЗАВЕРШЕНО!');
    console.log('🌐 Проверьте: http://178.212.13.25');
    conn.end();
    return;
  }
  
  const cmd = commands[cmdIndex];
  console.log(`\n[${cmdIndex + 1}/${commands.length}] $ ${cmd.substring(0, 50)}...`);
  
  conn.exec(cmd, (err, stream) => {
    if (err) console.log('❌:', err);
    let out = '';
    stream.on('data', (d) => out += d);
    stream.stderr.on('data', (d) => out += d);
    stream.on('close', () => {
      if (out.length < 600) console.log(out);
      else console.log(out.substring(0, 200) + '\n...\n' + out.substring(out.length - 200));
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
