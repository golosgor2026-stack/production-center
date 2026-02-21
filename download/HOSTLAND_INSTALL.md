# Установка сайта на Hostland VPS

## ⚠️ Важно!

Для этого сайта нужен **VPS/VDS сервер**, обычный shared-хостинг НЕ подойдёт.

Закажите VPS на Hostland: https://www.hostland.ru/vps-vds

Минимальные требования:
- 2 GB RAM
- 20 GB SSD
- Ubuntu 20.04 или 22.04

---

## 1. Подключение к серверу

```bash
ssh root@IP_ВАШЕГО_СЕРВЕРА
```

---

## 2. Установка Node.js и Bun

```bash
# Обновите систему
apt update && apt upgrade -y

# Установите Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Установите Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Проверьте версии
node -v
bun -v
```

---

## 3. Загрузка проекта

### Вариант A: Через Git
```bash
cd /var/www
git clone https://github.com/golosgor2026-stack/production-center.git
cd production-center
```

### Вариант B: Через SCP (загрузка архива)
```bash
# На вашем компьютере:
scp project_clean.tar.gz root@IP_СЕРВЕРА:/var/www/

# На сервере:
cd /var/www
tar -xzvf project_clean.tar.gz
cd my-project
```

---

## 4. Установка зависимостей

```bash
bun install
```

---

## 5. Настройка базы данных

```bash
# Генерация Prisma клиента
bunx prisma generate

# Создание базы данных
bunx prisma db push
```

---

## 6. Сборка проекта

```bash
bun run build
```

---

## 7. Установка PM2 (автозапуск)

```bash
npm install -g pm2

# Создайте файл экосистемы
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'production-center',
    script: 'bun',
    args: 'run start',
    cwd: '/var/www/my-project',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Запустите
pm2 start ecosystem.config.js

# Сохраните для автозапуска
pm2 save
pm2 startup
```

---

## 8. Настройка Nginx

```bash
apt install -y nginx

# Создайте конфиг
cat > /etc/nginx/sites-available/production-center << 'EOF'
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Активируйте
ln -s /etc/nginx/sites-available/production-center /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 9. SSL сертификат (HTTPS)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

---

## 10. Проверка

Откройте в браузере: `http://ваш-домен.ru` или `http://IP_СЕРВЕРА`

---

## Полезные команды

```bash
# Статус приложения
pm2 status

# Логи
pm2 logs production-center

# Перезапуск
pm2 restart production-center

# Остановка
pm2 stop production-center
```

---

## Данные админки

- **URL:** http://ваш-домен.ru/admin
- **Email:** io-fund@yandex.ru
- **Пароль:** Leverpulslava0409?

---

## Контакты

Если возникнут проблемы - проверьте логи:
```bash
pm2 logs production-center
```
