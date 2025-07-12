// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Toggle controls on mobile
    const navControls = document.querySelector('.nav-controls');
    hamburger.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                navControls.classList.toggle('show', navMenu.classList.contains('active'));
            }, 100);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && !navControls.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navControls.classList.remove('show');
            document.body.classList.remove('menu-open');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for stat numbers
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .download-card, .stat-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Animate numbers
function animateNumber(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const suffix = element.textContent.replace(/[\d,]/g, '');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 20);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// App window interaction
document.addEventListener('DOMContentLoaded', function() {
    const appWindow = document.querySelector('.app-window');
    
    if (appWindow) {
        // Add click animation
        appWindow.addEventListener('click', function() {
            this.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(-5deg) scale(1.02)';
            
            setTimeout(() => {
                this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(10deg) scale(1)';
            }, 200);
        });

        // Mouse move effect
        appWindow.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        appWindow.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(10deg)';
        });
    }
});

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
        }
        
        .nav-menu a {
            font-size: 1.2rem;
            padding: 10px 20px;
            border-radius: 8px;
            transition: background 0.3s ease;
        }
        
        .nav-menu a:hover {
            background: var(--background-secondary);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`;

// Add mobile menu styles to head
if (!document.querySelector('#mobile-menu-styles')) {
    const mobileStyleSheet = document.createElement('style');
    mobileStyleSheet.id = 'mobile-menu-styles';
    mobileStyleSheet.textContent = mobileMenuStyles;
    document.head.appendChild(mobileStyleSheet);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Navbar scroll effect (already defined above)
}, 10));

// Translation system
const translations = {
    ru: {
        // Navigation
        'nav-performance': 'Performance',
        'nav-features': 'Features',
        'nav-developers': 'Developers',
        'nav-faq': 'FAQ',
        'nav-download': 'Скачать',
        'nav-contact': 'Контакты',
        
        // Theme and language controls
        'theme-light-tooltip': 'Переключить на тёмную тему',
        'theme-dark-tooltip': 'Переключить на светлую тему',
        'lang-to-english': 'Switch to English',
        'lang-to-russian': 'Переключить на русский',
        
        // Hero section
        'hero-badge': 'Следующее поколение',
        'hero-title': 'Satisfactory Calculator',
        'hero-tagline': 'Создан для —',
        'hero-word1': 'Производительности',
        'hero-word2': 'Инженеров',
        'hero-word3': 'Эффективности',
        'hero-word4': 'Инноваций',
        'hero-subtitle': 'Продвинутый калькулятор производственных цепочек с красивым интерфейсом и мощными возможностями расчета',
        'hero-description': 'Qt-приложение с многопоточным движком, 113+ альтернативными рецептами, кэшированием 95%+ и производительностью до 10,000 предметов/сек',
        'btn-download': 'Скачать приложение',
        'btn-demo': 'Смотреть демо',
        'scroll-hint': 'Продолжайте прокрутку',
        
        // Features section
        'features-title': 'Возможности приложения',
        
        // Feature cards
        'feature-elevator': 'Космический лифт',
        'feature-elevator-desc': 'Расчет всех 5 фаз космического лифта с автоматической оптимизацией производственных цепочек',
        'feature-hub': '9 уровней хаба',
        'feature-hub-desc': 'Полная поддержка всех milestone-уровней технологий с настройкой скорости производства',
        'feature-recipes': '113+ альтернативных рецептов',
        'feature-recipes-desc': 'Полная база альтернативных рецептов с умным выбором оптимальных вариантов',
        'feature-engine': 'Многопоточный движок',
        'feature-engine-desc': 'Высокопроизводительные вычисления до 10,000 предметов/сек с кэшированием 95%+',
        'feature-visualization': 'Визуализация дерева',
        'feature-visualization-desc': 'Красивое отображение производственных цепочек с иконками зданий и анимациями',
        'feature-theme': 'Современный Dark Theme',
        'feature-theme-desc': 'Элегантный интерфейс в стиле GitHub с адаптивными компонентами и плавными эффектами',
        
        // FAQ section
        'faq-title': 'Часто задаваемые вопросы',
        'faq-q1': 'Поддерживает ли калькулятор новые обновления Satisfactory?',
        'faq-a1': 'Да! Мы регулярно обновляем базу данных рецептов и предметов в соответствии с последними обновлениями игры.',
        'faq-q2': 'Работает ли приложение на macOS и Linux?',
        'faq-a2': 'Да, благодаря Qt 6 приложение работает на Windows, macOS и Linux. Скачайте исходный код и соберите для своей системы.',
        'faq-q3': 'Как настроить альтернативные рецепты?',
        'faq-a3': 'В разделе "Alt рецепты" вы можете выбрать какие альтернативные рецепты использовать. Калькулятор автоматически выберет оптимальные варианты или вы можете настроить вручную.',
        'faq-q4': 'Сколько места занимает программа?',
        'faq-a4': 'Приложение очень легковесное - менее 50 МБ оперативной памяти и быстрый запуск менее чем за 2 секунды. Размер установочного файла около 25 МБ.',
        'faq-q5': 'Есть ли поддержка мультиплеера?',
        'faq-a5': 'Калькулятор работает автономно и не требует подключения к игре. Вы можете использовать его для планирования фабрики в одиночной игре или мультиплеере.',
        'faq-q6': 'Планируется ли веб-версия?',
        'faq-a6': 'В настоящее время мы фокусируемся на нативном приложении для лучшей производительности. Веб-версия рассматривается для будущих релизов.',
        
        // Vold.io inspired sections
        'built-for-performance-title': 'Создан для —<br>Производительности',
        'built-for-performance-desc': 'Мы используем передовые технологии расчетов, чтобы обеспечить истинно быстрый опыт вычислений для наших пользователей. Это быстро и мощно — поэтому вы можете сосредоточиться на том, что важно.',
        'tech-qt': 'Qt6',
        'tech-cpp': 'C++17',
        'tech-multithreading': 'Многопоточность',
        'tech-cache': 'Кэш-движок',
        'tech-simd': 'SIMD',
        'tech-memory-pool': 'Memory Pool',
        'keep-scrolling': 'Продолжайте изучение',
        'built-for-engineers-title': 'Создан для<br>Инженеров',
        'built-for-engineers-desc': 'Satisfactory Calculator разработан для лучшего инженерного опыта. Он создан так, чтобы быть понятным каждому, с минимальной кривой обучения, и говорит на языке инженеров.',
        'platform-subtitle': 'Универсальная платформа для расчета вашей фабрики',
        'overview-title': 'Обзор возможностей',
        'platform-main': 'Универсальная платформа означает, что Satisfactory Calculator — это продвинутая система, которая делает все, что вам нужно для расчета производства — и вашей фабрики.',
        'feature-elevator-title': 'Управляйте фазами лифта — Проще чем когда-либо.',
        'feature-elevator-vold-desc': 'Минималистичный калькулятор фаз — это означает, что каждый элемент, представленный на экране, продуман и полезен, так что вы можете сосредоточиться на самом важном.',
        'feature-analytics-title': 'Визуализируйте вашу производительность. На языке, который вы понимаете.',
        'feature-analytics-vold-desc': 'Отслеживайте ресурсы, понимайте, насколько хорошо каждая из ваших стратегий работает для вашего успеха.',
        'feature-recipes-title': 'Управляйте рецептами легко в облаке.',
        'feature-recipes-vold-desc': 'Сложный менеджер рецептов, который бесшовно подключен к базе альтернативных рецептов.',
        'summary-text': '<strong>Многопоточный.</strong> Настраиваемый интерфейс. Drag and drop планировщик фабрики. Редактор производства на множественных размерах экранов. Автоматизированная оптимизация. Интегрированный менеджер рецептов. <strong>Быстрая производительность, простота использования.</strong>',
        'built-for-developers-title': 'Built for —<br>Developers',
        'built-for-developers-desc': 'Мы считаем, что для успешного предоставления лучшего опыта расчета производства, нам нужно сосредоточиться на разработчиках в первую очередь. Мы одержимо устраняем ненужную сложность и посторонние детали, так что вы можете настроить и запустить Satisfactory Calculator с легкостью, прямо с первого дня.',
        'keep-scrolling': 'Keep scrolling.'
    },
    en: {
        // Navigation
        'nav-performance': 'Performance',
        'nav-features': 'Features',
        'nav-developers': 'Developers',
        'nav-faq': 'FAQ',
        'nav-download': 'Download',
        'nav-contact': 'Contact',
        
        // Theme and language controls
        'theme-light-tooltip': 'Switch to dark theme',
        'theme-dark-tooltip': 'Switch to light theme',
        'lang-to-english': 'Switch to English',
        'lang-to-russian': 'Переключить на русский',
        
        // Hero section
        'hero-badge': 'Next Generation',
        'hero-title': 'Satisfactory Calculator',
        'hero-tagline': 'Built for —',
        'hero-word1': 'Performance',
        'hero-word2': 'Engineers',
        'hero-word3': 'Efficiency',
        'hero-word4': 'Innovation',
        'hero-subtitle': 'Advanced production chain calculator with beautiful interface and powerful calculation capabilities',
        'hero-description': 'Qt application with multi-threaded engine, 113+ alternative recipes, 95%+ caching and performance up to 10,000 items/sec',
        'btn-download': 'Download App',
        'btn-demo': 'Watch Demo',
        'scroll-hint': 'Keep scrolling',
        
        // Features section
        'features-title': 'App Features',
        
        // Feature cards
        'feature-elevator': 'Space Elevator',
        'feature-elevator-desc': 'Calculate all 5 phases of the space elevator with automatic production chain optimization',
        'feature-hub': '9 Hub Tiers',
        'feature-hub-desc': 'Full support for all milestone technology levels with production speed customization',
        'feature-recipes': '113+ Alternative Recipes',
        'feature-recipes-desc': 'Complete database of alternative recipes with smart selection of optimal variants',
        'feature-engine': 'Multi-threaded Engine',
        'feature-engine-desc': 'High-performance calculations up to 10,000 items/sec with 95%+ caching',
        'feature-visualization': 'Tree Visualization',
        'feature-visualization-desc': 'Beautiful display of production chains with building icons and animations',
        'feature-theme': 'Modern Dark Theme',
        'feature-theme-desc': 'Elegant GitHub-style interface with adaptive components and smooth effects',
        
        // FAQ section
        'faq-title': 'Frequently Asked Questions',
        'faq-q1': 'Does the calculator support new Satisfactory updates?',
        'faq-a1': 'Yes! We regularly update the recipe and item database according to the latest game updates.',
        'faq-q2': 'Does the app work on macOS and Linux?',
        'faq-a2': 'Yes, thanks to Qt 6 the application works on Windows, macOS and Linux. Download the source code and build for your system.',
        'faq-q3': 'How to configure alternative recipes?',
        'faq-a3': 'In the "Alt Recipes" section you can choose which alternative recipes to use. The calculator will automatically select optimal variants or you can configure manually.',
        'faq-q4': 'How much space does the program take?',
        'faq-a4': 'The application is very lightweight - less than 50 MB of RAM and fast startup in less than 2 seconds. Installation file size is about 25 MB.',
        'faq-q5': 'Is there multiplayer support?',
        'faq-a5': 'The calculator works autonomously and does not require connection to the game. You can use it for factory planning in single player or multiplayer.',
        'faq-q6': 'Is a web version planned?',
        'faq-a6': 'Currently we are focusing on the native application for better performance. A web version is being considered for future releases.',
        
        // Vold.io inspired sections
        'built-for-performance-title': 'Built for —<br>Performance',
        'built-for-performance-desc': 'We use leading calculation technologies to empower true fast computation experience for our users. It\'s fast and powerful — so you can focus on what\'s important.',
        'built-for-engineers-title': 'Built for<br>Engineers',
        'built-for-engineers-desc': 'Satisfactory Calculator is designed for the best engineering interface experience. It\'s built to be understood by everyone, much less learning curve, and it speaks engineer.',
        'platform-subtitle': 'All-in-one Platform to Calculate your Factory',
        'overview-title': 'Overview — Overview — Overview',
        'platform-main': 'The all-in-one platform means Satisfactory Calculator is an advanced system that does everything you need to calculate your production — and your factory.',
        'feature-elevator-title': 'Manage Elevator Phases — Easier than ever.',
        'feature-elevator-vold-desc': 'Minimalistic phase calculator — it means every element presented on screen is deliberate and useful, so you can focus on the essentials.',
        'feature-analytics-title': 'Visualize your Performance. In languages you understand.',
        'feature-analytics-vold-desc': 'Track your resources, understand how well each of your strategies are working for your success.',
        'feature-recipes-title': 'Manage your Recipes fluidly in the Cloud.',
        'feature-recipes-vold-desc': 'Sophisticated Recipe Manager that seamlessly connected to Alternative Recipe Database.',
        'summary-text': '<strong>Multi-threaded.</strong> Custom dashboard. Drag and drop factory planner. Production editor on multiple screen sizes. Automated optimization. Recipe-Integrated Manager. <strong>Fast Performance, easy to use.</strong>',
        'built-for-developers-title': 'Built for —<br>Developers',
        'built-for-developers-desc': 'We believe that in order to succeed in delivering the best production calculation experience, we need to focus on the Developers-first. We obsessively eliminate needless complexity and extraneous details, so you can set up and running with Satisfactory Calculator at ease, right on day one.',
        'keep-scrolling': 'Keep scrolling.'
    }
};

// Theme and language management
class SiteControls {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ru';
        this.currentTheme = localStorage.getItem('theme') || this.getSystemTheme();
        
        this.init();
    }
    
    getSystemTheme() {
        // Detect system dark mode preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    init() {
        this.setupThemeToggle();
        this.setupLanguageToggle();
        this.setupSystemThemeListener();
        this.applyStoredSettings();
    }
    
    setupSystemThemeListener() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only update if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme();
            this.saveSettings();
            
            // Animation
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
    
    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        
        langToggle.addEventListener('click', () => {
            this.currentLang = this.currentLang === 'ru' ? 'en' : 'ru';
            this.applyLanguage();
            this.updateLanguageButton();
            this.saveSettings();
            
            // Animation
            langToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                langToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    applyTheme() {
        const body = document.body;
        const themeIcon = document.getElementById('themeIcon');
        const themeToggle = document.getElementById('themeToggle');
        const currentTranslations = translations[this.currentLang];
        
        if (this.currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = currentTranslations['theme-dark-tooltip'];
        } else {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = currentTranslations['theme-light-tooltip'];
        }
    }
    
    applyLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        const currentTranslations = translations[this.currentLang];
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations[key]) {
                // Check if translation contains HTML
                const translation = currentTranslations[key];
                if (translation.includes('<') && translation.includes('>')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update theme button tooltip
        this.updateThemeTooltip();
        
        // Update document language
        document.documentElement.lang = this.currentLang;
    }
    
    updateThemeTooltip() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTranslations = translations[this.currentLang];
        
        if (this.currentTheme === 'dark') {
            themeToggle.title = currentTranslations['theme-dark-tooltip'];
        } else {
            themeToggle.title = currentTranslations['theme-light-tooltip'];
        }
    }
    
    updateLanguageButton() {
        const langToggle = document.getElementById('langToggle');
        const flagIcon = langToggle.querySelector('.flag-icon');
        const langText = langToggle.querySelector('.lang-text');
        const currentTranslations = translations[this.currentLang];
        
        if (this.currentLang === 'ru') {
            flagIcon.textContent = '🇺🇸';
            langText.textContent = 'EN';
            langToggle.title = currentTranslations['lang-to-english'];
        } else {
            flagIcon.textContent = '🇷🇺';
            langText.textContent = 'RU';
            langToggle.title = currentTranslations['lang-to-russian'];
        }
    }
    
    applyStoredSettings() {
        this.applyTheme();
        this.applyLanguage();
        this.updateLanguageButton();
    }
    
    saveSettings() {
        localStorage.setItem('theme', this.currentTheme);
        localStorage.setItem('language', this.currentLang);
    }
}

// PWA Service Worker Registration
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.setupUpdateNotification();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('PWA: Service Worker registered:', registration);
                
                // Проверяем обновления
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('PWA: New Service Worker found');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateNotification();
                        }
                    });
                });
            } catch (error) {
                console.log('PWA: Service Worker registration failed:', error);
            }
        }
    }

    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Обработчик успешной установки
        window.addEventListener('appinstalled', (e) => {
            console.log('PWA: App installed successfully');
            this.hideInstallButton();
            this.showInstallSuccessMessage();
        });
    }

    showInstallButton() {
        // Создаём кнопку установки PWA
        const installButton = document.createElement('button');
        installButton.id = 'pwa-install-btn';
        installButton.className = 'pwa-install-button';
        installButton.innerHTML = `
            <i class="fas fa-download"></i>
            <span>Установить приложение</span>
        `;
        
        installButton.addEventListener('click', () => {
            this.promptInstall();
        });

        // Добавляем кнопку в навигацию
        const navControls = document.querySelector('.nav-controls');
        if (navControls && !document.getElementById('pwa-install-btn')) {
            navControls.appendChild(installButton);
        }

        // Добавляем стили для кнопки установки
        if (!document.getElementById('pwa-styles')) {
            const style = document.createElement('style');
            style.id = 'pwa-styles';
            style.textContent = `
                .pwa-install-button {
                    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
                }
                
                .pwa-install-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
                }
                
                .pwa-update-banner {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
                    color: white;
                    padding: 12px;
                    text-align: center;
                    z-index: 10000;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease;
                }
                
                .pwa-update-banner.show {
                    transform: translateY(0);
                }
                
                .pwa-update-button {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    color: white;
                    padding: 6px 12px;
                    margin-left: 12px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                
                .pwa-update-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                @media (max-width: 768px) {
                    .pwa-install-button {
                        padding: 6px 12px;
                        font-size: 0.8rem;
                    }
                    
                    .pwa-install-button span {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    hideInstallButton() {
        const installButton = document.getElementById('pwa-install-btn');
        if (installButton) {
            installButton.remove();
        }
    }

    async promptInstall() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log('PWA: User choice:', outcome);
            
            if (outcome === 'accepted') {
                console.log('PWA: User accepted install prompt');
            } else {
                console.log('PWA: User dismissed install prompt');
            }
            
            this.deferredPrompt = null;
        }
    }

    showUpdateNotification() {
        const banner = document.createElement('div');
        banner.className = 'pwa-update-banner';
        banner.innerHTML = `
            <span>🎉 Доступна новая версия приложения!</span>
            <button class="pwa-update-button" onclick="location.reload()">Обновить</button>
        `;
        
        document.body.appendChild(banner);
        
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
        
        // Автоскрытие через 10 секунд
        setTimeout(() => {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        }, 10000);
    }

    showInstallSuccessMessage() {
        // Показываем уведомление об успешной установке
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span style="margin-left: 8px;">Приложение успешно установлено!</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    setupUpdateNotification() {
        // Слушаем сообщения от Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                    this.showUpdateNotification();
                }
            });
        }
    }
}

// FAQ Functionality
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFAQToggle();
        this.setupScrollAnimations();
    }

    setupFAQToggle() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все остальные FAQ
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Переключаем текущий FAQ
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
                
                // Добавляем анимацию клика
                question.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    question.style.transform = 'scale(1)';
                }, 150);
                
                // Haptic feedback на мобильных
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });
        });
    }

    setupScrollAnimations() {
        // Intersection Observer для анимаций при скролле
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDelay = '0s';
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Наблюдаем за FAQ элементами
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.animation = 'none';
                
                setTimeout(() => {
                    item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                }, 100);
                
                observer.observe(item);
            });
        }
    }
}

// Advanced Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.measureUserInteractions();
        this.measureResourceLoading();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            // Performance timing
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            this.metrics.loadTime = loadTime;
            this.metrics.domContentLoaded = domContentLoaded;
            
            console.log(`Page load time: ${loadTime}ms`);
            console.log(`DOM content loaded: ${domContentLoaded}ms`);
            
            // Web Vitals если поддерживается
            if ('PerformanceObserver' in window) {
                this.measureWebVitals();
            }
        });
    }

    measureWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
            console.log(`LCP: ${lastEntry.startTime}ms`);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // First Input Delay (FID)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                this.metrics.fid = entry.processingStart - entry.startTime;
                console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
            });
        }).observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cls = clsValue;
            console.log(`CLS: ${clsValue}`);
        }).observe({ type: 'layout-shift', buffered: true });
    }

    measureUserInteractions() {
        // Отслеживание кликов по кнопкам
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .faq-question, .theme-toggle, .lang-toggle')) {
                const element = e.target.className || e.target.tagName;
                this.logInteraction('click', element);
            }
        });

        // Отслеживание времени на странице
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - startTime;
            this.metrics.timeOnPage = timeOnPage;
            console.log(`Time on page: ${timeOnPage}ms`);
        });
    }

    measureResourceLoading() {
        // Мониторинг загрузки ресурсов
        if ('PerformanceObserver' in window) {
            new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.name.includes('fontawesome') || 
                        entry.name.includes('.css') || 
                        entry.name.includes('.js')) {
                        console.log(`Resource ${entry.name}: ${entry.loadEnd - entry.startTime}ms`);
                    }
                });
            }).observe({ type: 'resource', buffered: true });
        }
    }

    logInteraction(type, element) {
        if (!this.metrics.interactions) {
            this.metrics.interactions = [];
        }
        
        this.metrics.interactions.push({
            type,
            element,
            timestamp: Date.now()
        });
    }

    getMetrics() {
        return this.metrics;
    }
}

// Modern Animations Manager - Vold.io inspired
class ModernAnimationsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupRotatingWords();
        this.setupSmoothScrolling();
        this.setupScrollIndicator();
        this.setupParallaxEffects();
    }

    setupRotatingWords() {
        const words = document.querySelectorAll('.rotating-words .word');
        if (words.length === 0) return;

        let currentIndex = 0;
        
        const rotateWords = () => {
            // Убираем активный класс с текущего слова
            words[currentIndex].classList.remove('active');
            
            // Переходим к следующему слову
            currentIndex = (currentIndex + 1) % words.length;
            
            // Добавляем активный класс к новому слову
            words[currentIndex].classList.add('active');
        };

        // Запускаем анимацию каждые 3 секунды
        setInterval(rotateWords, 3000);
    }

    setupSmoothScrolling() {
        // Smooth scroll для всех внутренних ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', () => {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Скрываем индикатор при скролле
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const opacity = Math.max(0, 1 - scrollY / 300);
                    scrollIndicator.style.opacity = opacity;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupParallaxEffects() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    
                    // Параллакс для фона hero секции
                    hero.style.transform = `translateY(${rate}px)`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Tech Stack Hover Effects
class TechStackManager {
    constructor() {
        this.setupTechStackEffects();
    }

    setupTechStackEffects() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateTechItem(item, 'enter');
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateTechItem(item, 'leave');
            });
        });
    }

    animateTechItem(item, action) {
        if (action === 'enter') {
            item.style.transform = 'translateY(-4px) scale(1.05)';
            item.style.boxShadow = '0 8px 25px rgba(56, 178, 172, 0.3)';
        } else {
            item.style.transform = 'translateY(-2px) scale(1)';
            item.style.boxShadow = 'none';
        }
    }
}

// Enhanced Scroll Animations
class ScrollAnimationsManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Анимируемые элементы
        const animatedElements = document.querySelectorAll(`
            .feature-card,
            .step,
            .tech-item,
            .stat-card,
            .faq-item,
            .spec-item
        `);

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(element);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

// Performance Optimized Manager
class PerformanceOptimizedManager {
    constructor() {
        this.setupLazyLoading();
        this.setupCriticalResourcePreloading();
    }

    setupLazyLoading() {
        // Lazy loading для изображений если появятся
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupCriticalResourcePreloading() {
        // Preload критических ресурсов
        const criticalResources = [
            '/icons/icon-192x192.png',
            '/icons/icon-512x512.png'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }
}

// Initialize controls when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const siteControls = new SiteControls();
    const pwaManager = new PWAManager();
    const faqManager = new FAQManager();
    const performanceMonitor = new PerformanceMonitor();
    
    // New Vold.io inspired managers
    const modernAnimations = new ModernAnimationsManager();
    const techStackManager = new TechStackManager();
    const scrollAnimations = new ScrollAnimationsManager();
    const performanceOptimized = new PerformanceOptimizedManager();
    
    // Expose performance metrics to global scope for debugging
    window.getPerformanceMetrics = () => performanceMonitor.getMetrics();
    
    console.log('🚀 Satisfactory Calculator - Next Generation initialized!');
});

// Interactive tabs for app preview
document.addEventListener('DOMContentLoaded', function() {
    const previewTabs = document.querySelectorAll('.tabs-preview .tab');
    const previewContents = document.querySelectorAll('.tab-content');
    
    previewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            previewTabs.forEach(t => t.classList.remove('active'));
            previewContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content with a slight delay for smoother transition
            setTimeout(() => {
                const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }, 50);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Haptic feedback on mobile devices
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
        
        // Add hover effect
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
                 });
     });
     
     // Optional auto-demo mode for tabs (uncomment to enable)
     // let currentDemoTab = 0;
     // const demoTabs = ['elevator', 'hub', 'custom', 'recipes'];
     // 
     // function startTabDemo() {
     //     setInterval(() => {
     //         currentDemoTab = (currentDemoTab + 1) % demoTabs.length;
     //         const targetTab = document.querySelector(`[data-tab="${demoTabs[currentDemoTab]}"]`);
     //         if (targetTab) {
     //             targetTab.click();
     //         }
     //     }, 4000); // Change tab every 4 seconds
     // }
     // 
     // // Start demo after 10 seconds of inactivity
     // let demoTimeout = setTimeout(startTabDemo, 10000);
     // 
     // // Reset demo timer on user interaction
     // previewTabs.forEach(tab => {
     //     tab.addEventListener('click', () => {
     //         clearTimeout(demoTimeout);
     //         demoTimeout = setTimeout(startTabDemo, 10000);
     //     });
     // });
}); 

// Carousel functionality for "How it works" section
class CarouselManager {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.carousel = null;
        this.indicators = [];
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds
        this.touchStartX = null;
        this.touchEndX = null;
    }

    init() {
        console.log('Carousel Manager: Initializing...');
        this.carousel = document.querySelector('.steps-carousel');
        this.indicators = document.querySelectorAll('.indicator');
        
        console.log('Carousel element found:', this.carousel);
        console.log('Indicators found:', this.indicators.length);
        
        if (!this.carousel) {
            console.error('Carousel not found!');
            return;
        }

        this.setupAutoSlide();
        this.setupTouchEvents();
        this.setupKeyboardNavigation();
        this.updateCarousel();
        
        // Pause auto-slide on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.pauseAutoSlide());
            carouselContainer.addEventListener('mouseleave', () => this.resumeAutoSlide());
        }
        
        console.log('Carousel Manager: Initialized successfully!');
    }

    moveCarousel(direction) {
        this.currentSlide += direction;
        
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        } else if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        }
        
        this.updateCarousel();
        this.resetAutoSlide();
    }

    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            this.currentSlide = slideIndex;
            this.updateCarousel();
            this.resetAutoSlide();
        }
    }

    updateCarousel() {
        if (!this.carousel) return;

        // Move carousel
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;

        // Update step active states
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentSlide);
        });

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    setupAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.moveCarousel(1);
        }, this.autoSlideDelay);
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resumeAutoSlide() {
        if (!this.autoSlideInterval) {
            this.setupAutoSlide();
        }
    }

    resetAutoSlide() {
        this.pauseAutoSlide();
        this.resumeAutoSlide();
    }

    setupTouchEvents() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;

        carouselContainer.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        if (!this.touchStartX || !this.touchEndX) return;

        const diff = this.touchStartX - this.touchEndX;
        const minSwipeDistance = 50;

        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                // Swipe left - next slide
                this.moveCarousel(1);
            } else {
                // Swipe right - previous slide
                this.moveCarousel(-1);
            }
        }

        this.touchStartX = null;
        this.touchEndX = null;
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle keys when carousel is in view
            const carouselSection = document.querySelector('#how-it-works');
            if (!carouselSection) return;

            const rect = carouselSection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (isInView) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.moveCarousel(-1);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.moveCarousel(1);
                        break;
                    case ' ': // Spacebar
                        e.preventDefault();
                        this.pauseAutoSlide();
                        setTimeout(() => this.resumeAutoSlide(), 3000);
                        break;
                }
            }
        });
    }
}

// Global functions for onclick handlers
window.moveCarousel = function(direction) {
    if (window.carouselManager) {
        window.carouselManager.moveCarousel(direction);
    }
};

window.goToSlide = function(slideIndex) {
    if (window.carouselManager) {
        window.carouselManager.goToSlide(slideIndex);
    }
};

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    window.carouselManager = new CarouselManager();
    window.carouselManager.init();
});