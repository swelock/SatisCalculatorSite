# 🚨 Руководство по страницам ошибок | Error Pages Guide

Этот проект включает в себя набор красивых тематических страниц ошибок в стиле Satisfactory Calculator с поддержкой переключения тем и языков.

## 📋 Список созданных страниц ошибок

### Клиентские ошибки (4xx)
- **400.html** - Неверный запрос / Bad Request
- **401.html** - Доступ запрещён / Unauthorized  
- **403.html** - Доступ заблокирован / Forbidden
- **404.html** - Страница не найдена / Page Not Found
- **405.html** - Метод не разрешён / Method Not Allowed
- **406.html** - Неприемлемый формат / Not Acceptable
- **408.html** - Превышено время ожидания / Request Timeout
- **409.html** - Конфликт данных / Conflict

### Серверные ошибки (5xx)  
- **500.html** - Ошибка сервера / Internal Server Error
- **501.html** - Не реализовано / Not Implemented
- **502.html** - Шлюз недоступен / Bad Gateway
- **503.html** - Сервис недоступен / Service Unavailable
- **504.html** - Тайм-аут шлюза / Gateway Timeout

## ✨ Особенности дизайна

### 🎨 Уникальные стили для каждой ошибки
- Каждая страница имеет уникальный градиентный фон
- Соответствующие иконки FontAwesome для каждого типа ошибки
- Анимированные элементы в стиле промышленной тематики Satisfactory

### 🌙 Поддержка тем
- **Светлая тема** - дневной режим с яркими градиентами
- **Тёмная тема** - ночной режим с приглушёнными цветами
- Автоматическое определение системной темы
- Переключение одним кликом с анимацией

### 🌍 Мультиязычность
- **Русский язык** - полная локализация
- **Английский язык** - полная локализация
- Мгновенное переключение без перезагрузки страницы
- Сохранение настроек в localStorage

### 📱 Адаптивный дизайн
- Полная поддержка мобильных устройств
- Масштабируемые элементы интерфейса
- Сенсорная обратная связь (вибрация)

## ⚙️ Настройка сервера

### Apache (.htaccess)
Файл `.htaccess` автоматически создается скриптом генерации:

```apache
ErrorDocument 400 /400.html
ErrorDocument 401 /401.html
ErrorDocument 403 /403.html
ErrorDocument 404 /404.html
# ... и так далее
```

### Nginx
Используйте конфигурацию из файла `nginx.conf`:

```nginx
error_page 400 /400.html;
error_page 401 /401.html;
error_page 403 /403.html;
error_page 404 /404.html;
# ... и так далее

location = /400.html { internal; }
location = /401.html { internal; }
# ... и так далее
```

### IIS (web.config)
Для серверов Windows IIS:

```xml
<configuration>
  <system.webServer>
    <httpErrors>
      <remove statusCode="400" />
      <error statusCode="400" path="/400.html" responseMode="File" />
      <remove statusCode="404" />
      <error statusCode="404" path="/404.html" responseMode="File" />
      <!-- ... добавьте остальные коды ошибок -->
    </httpErrors>
  </system.webServer>
</configuration>
```

## 🔧 Технические детали

### Структура файлов
```
project/
├── error-template.html     # Базовый шаблон
├── generate-error-pages.js # Скрипт генерации
├── 400.html               # Страницы ошибок
├── 401.html
├── 403.html
├── 404.html
├── 405.html
├── 406.html
├── 408.html
├── 409.html
├── 500.html
├── 501.html
├── 502.html
├── 503.html
├── 504.html
├── .htaccess              # Конфигурация Apache
├── nginx.conf             # Конфигурация Nginx
└── ERROR_PAGES_GUIDE.md   # Этот файл
```

### Используемые технологии
- **HTML5** - семантическая разметка
- **CSS3** - CSS-переменные, Grid, Flexbox, анимации
- **JavaScript (ES6+)** - классы, localStorage API, fetch API
- **FontAwesome 6.0** - иконки
- **CSS Grid & Flexbox** - адаптивная вёрстка

### Настройки localStorage
Страницы сохраняют пользовательские настройки:
- `theme` - выбранная тема (light/dark)
- `language` - выбранный язык (ru/en)

## 🚀 Установка и развёртывание

### 1. Генерация страниц
```bash
# Убедитесь, что Node.js установлен
node --version

# Запустите генератор
node generate-error-pages.js
```

### 2. Загрузка на сервер
Загрузите все созданные HTML-файлы в корневую директорию сайта.

### 3. Настройка сервера
Добавьте соответствующую конфигурацию для вашего веб-сервера.

### 4. Тестирование
Проверьте работу страниц ошибок:
```bash
# Тест 404 ошибки
curl -I http://your-domain.com/nonexistent-page

# Тест прямого доступа (должен быть заблокирован)
curl -I http://your-domain.com/404.html
```

## 🎨 Кастомизация

### Изменение цветовых схем
Отредактируйте массив `errorPages` в `generate-error-pages.js`:

```javascript
'404': {
    gradient: 'linear-gradient(135deg, #your-color1 0%, #your-color2 100%)'
}
```

### Добавление новых языков
Расширьте объект `translations` в шаблоне:

```javascript
const translations = {
    ru: { /* русский */ },
    en: { /* английский */ },
    de: { /* немецкий */ }
};
```

### Изменение анимаций
Отредактируйте CSS-анимации в шаблоне:

```css
@keyframes your-animation {
    /* ваша анимация */
}
```

## 🔒 Безопасность

### Рекомендации
- Используйте директиву `internal` в Nginx для предотвращения прямого доступа
- Настройте правильные заголовки безопасности
- Регулярно обновляйте FontAwesome CDN

### Заголовки безопасности
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
```

## 📊 Производительность

### Оптимизации
- Сжатие Gzip/Brotli включено
- Кэширование статических ресурсов
- Ленивая загрузка FontAwesome
- Минимальный JavaScript код

### Размеры файлов
- Каждая страница ошибки: ~15-20 KB
- Общий размер проекта: ~250 KB
- FontAwesome CDN: ~75 KB (кэшируется)

## 🐛 Отладка

### Проверка работы тем
```javascript
// В консоли браузера
localStorage.getItem('theme')
localStorage.getItem('language')
```

### Проверка серверной конфигурации
```bash
# Apache
apache2ctl configtest

# Nginx  
nginx -t
```

## 📝 Changelog

### v1.0.0 (Текущая версия)
- ✅ 13 страниц ошибок с уникальным дизайном
- ✅ Поддержка светлой/тёмной темы
- ✅ Русский и английский языки
- ✅ Полная адаптивность
- ✅ Конфигурации для Apache/Nginx
- ✅ Автоматическая генерация через Node.js

## 🤝 Вклад в проект

Для улучшения страниц ошибок:
1. Форкните репозиторий
2. Создайте feature branch
3. Внесите изменения
4. Протестируйте на разных устройствах
5. Создайте Pull Request

## 📞 Поддержка

Если возникли вопросы:
- Проверьте логи веб-сервера
- Убедитесь в правильности путей к файлам
- Проверьте права доступа к файлам
- Используйте инструменты разработчика браузера для отладки

---

*Создано для Satisfactory Calculator*  
*🏭 Автоматизация расчётов в мире Satisfactory* 