## Что выяснили
На сервере 11 из 14 SSL-блоков используют `listen 443 ssl http2;` и 3 — без `http2`. Подстраиваемся под большинство → ставим `http2`. Существующий рассинхрон не трогаем (это не наша зона ответственности сегодня, починка чужих конфигов — отдельная задача).

## Шаг 4.3 — создать конфиг nginx

На сервере (под root) создать файл `/etc/nginx/sites-available/chebrukov-frontend.conf` со следующим содержимым:

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name chebrukov.ru www.chebrukov.ru;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name chebrukov.ru www.chebrukov.ru;

  root /var/www/chebrukov/dist;
  index index.html;

  location / {
    try_files $uri $uri.html $uri/ /index.html;
  }

  location ~* \.(?:js|css|png|jpg|jpeg|svg|webp|woff2?|mp4|ico)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }
}
```

Команды (по одной, в указанном порядке):

```bash
nano /etc/nginx/sites-available/chebrukov-frontend.conf
# вставить содержимое выше, Ctrl+O, Enter, Ctrl+X

# проверить что server_name не дублируется с другими сайтами:
grep -RIl "chebrukov" /etc/nginx/sites-enabled/
# должно быть пусто (или только наш файл после следующего шага)

# временная заглушка-страница, чтобы certbot прошёл валидацию:
echo "ok" > /var/www/chebrukov/dist/index.html
chown -R www-data:www-data /var/www/chebrukov

# активировать конфиг:
ln -sf /etc/nginx/sites-available/chebrukov-frontend.conf /etc/nginx/sites-enabled/

# ВАЖНО: пока без SSL-сертификата 443-блок не запустится.
# Сначала временно закомментируем 443-блок, чтобы nginx прошёл проверку
# и certbot мог отработать через 80-й порт. Делаем это руками:
nano /etc/nginx/sites-available/chebrukov-frontend.conf
# закомментируй ВЕСЬ второй server-блок (тот, что с listen 443) — добавь # в начале каждой строки
# сохрани

nginx -t
systemctl reload nginx
```

## Шаг 4.4 — DNS-проверка перед certbot

```bash
dig +short chebrukov.ru
dig +short www.chebrukov.ru
```

Оба должны вернуть `159.194.222.73`. Если нет — ждём пропагации, не запускаем certbot.

## Шаг 4.5 — выпустить SSL через certbot

```bash
certbot --nginx -d chebrukov.ru -d www.chebrukov.ru
```

Certbot сам:
- найдёт наш server-блок (раскомментированный 80-й),
- добавит SSL-блок с правильными путями к сертификатам,
- настроит редирект.

После него вручную раскомментируй наш 443-блок (если certbot создал свой — оставляем certbot'овский, наш удаляем; если нет — раскомментируем свой и проверяем что `ssl_certificate` пути есть).

```bash
nginx -t
```

Должно быть `syntax is ok` и `test is successful`. Если появится `protocol options redefined` — значит где-то остался рассинхрон, разберём по логу.

```bash
systemctl reload nginx
```

## Шаг 4.6 — проверка

```bash
curl -I https://chebrukov.ru
```

Должен вернуть `HTTP/2 200` и страницу с текстом `ok`.

Проверить что соседи живы:
```bash
curl -I https://shabbly.ru
curl -I https://framyr.com
# и т.п. — любой соседний сайт
```

Все должны отвечать 200/301, не 525/SSL-ошибки.

## Что дальше
После того как `https://chebrukov.ru` отдаёт `ok`, идём к шагу 5:
- запустить GitHub Action (push в main или вручную)
- он соберёт статику и зальёт в `/var/www/chebrukov/dist/`
- сайт оживёт

## Технические заметки
- В `vite.config.ts` уже добавлен флаг `BUILD_TARGET=static` (см. предыдущий шаг).
- Action `.github/workflows/deploy.yml` использует `appleboy/scp-action` и заливает в `/var/www/chebrukov/dist/`.
- Путь к статике в workflow определяется автоматически: `.output/public` (nitro static) или `dist/client`.
- Если после билда выяснится, что nitro static кладёт файлы в другое место — поправим один шаг в workflow, остальное останется.
