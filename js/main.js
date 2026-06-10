// ========== i18n Module ==========
const i18n = {
  currentLocale: 'en',
  translations: {},

  async init() {
    const savedLocale = localStorage.getItem('eazylaunch-locale');
    const browserLocale = navigator.language.split('-')[0];
    
    this.currentLocale = savedLocale || 
      ['en', 'zh', 'ja', 'ko', 'es', 'fr'].includes(browserLocale) 
        ? browserLocale : 'en';

    await this.loadTranslations(this.currentLocale);
    this.updatePageContent();
    this.updateLangSwitcher();
  },

  async loadTranslations(locale) {
    try {
      const response = await fetch(`/js/i18n/${locale}.json`);
      this.translations = await response.json();
    } catch (e) {
      console.warn(`Failed to load ${locale}, falling back to English`);
      if (locale !== 'en') {
        const response = await fetch('/js/i18n/en.json');
        this.translations = await response.json();
      }
    }
  },

  async switchLocale(newLocale) {
    if (newLocale === this.currentLocale) return;
    
    this.currentLocale = newLocale;
    localStorage.setItem('eazylaunch-locale', newLocale);
    
    await this.loadTranslations(newLocale);
    this.updatePageContent();
    this.updateLangSwitcher();
    document.documentElement.lang = newLocale;
  },

  t(key) {
    const keys = key.split('.');
    let value = this.translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  },

  updatePageContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
  },

  updateLangSwitcher() {
    const currentLangEl = document.querySelector('.lang-current');
    if (currentLangEl) {
      currentLangEl.textContent = this.getLangName(this.currentLocale);
    }
    
    document.querySelectorAll('.lang-option').forEach(option => {
      option.classList.toggle('active', 
        option.getAttribute('data-locale') === this.currentLocale);
    });
  },

  getLangName(locale) {
    const names = {
      en: 'English', zh: '中文', ja: '日本語',
      ko: '한국어', es: 'Español', fr: 'Français'
    };
    return names[locale] || 'English';
  }
};

// ========== Lang Switcher ==========
function initLangSwitcher() {
  const switcher = document.querySelector('.lang-switcher');
  if (!switcher) return;

  switcher.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    switcher.classList.remove('active');
  });

  switcher.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
      const locale = option.getAttribute('data-locale');
      i18n.switchLocale(locale);
    });
  });
}

// ========== Init ==========
document.addEventListener('DOMContentLoaded', async () => {
  await i18n.init();
  initLangSwitcher();
});