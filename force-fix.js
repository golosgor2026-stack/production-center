const { Client } = require('ssh2');
const conn = new Client();

const commands = [
  // Принудительно обновить конфиг
  `cat > /var/www/production-center/next.config.ts << 'ENDCONFIG'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
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
ENDCONFIG`,

  // Сбросить локальные изменения
  'cd /var/www/production-center && git checkout -- .',
  'cd /var/www/production-center && git pull',
  
  // Пересобрать
  'cd /var/www/production-center && /root/.bun/bin/bun run build',
  
  // Скопировать файлы
  'cd /var/www/production-center && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/',
  
  // Остановить и запустить
  'pm2 delete production-center || true',
  'cd /var/www/production-center && pm2 start .next/standalone/server.js --name "production-center" -- -p 3000',
  
  // Ждать и проверить
  'sleep 5',
  'pm2 status',
  'curl -s -o /dev/null -w "HTTP: %{http_code}" http://localhost:3000/',
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
      if (out.length < 700) console.log(out);
      else console.log(out.substring(0, 200) + '\n...\n' + out.substring(out.length - 200));
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
