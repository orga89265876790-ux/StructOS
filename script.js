const root = document.documentElement;
const themeButton = document.querySelector('.theme-switch');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const languageButton = document.querySelector('.language-button');
const languageMenu = document.querySelector('.language-menu');
const currentLanguage = document.querySelector('#current-language');
const menuButton = document.querySelector('.menu-button');
const startCard = document.querySelector('.start-card');
const ctaButton = document.querySelector('.primary-cta');
const toast = document.querySelector('.toast');
let toastTimer;

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
  themeMeta.setAttribute('content', isDark ? '#07111e' : '#f7fbff');
  localStorage.setItem('structos-theme', theme);
}

const savedTheme = localStorage.getItem('structos-theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeButton.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

languageButton.addEventListener('click', () => {
  const willOpen = languageMenu.hidden;
  languageMenu.hidden = !willOpen;
  languageButton.setAttribute('aria-expanded', String(willOpen));
});

languageMenu.addEventListener('click', (event) => {
  const option = event.target.closest('[data-language]');
  if (!option) return;
  currentLanguage.textContent = option.dataset.language;
  languageMenu.hidden = true;
  languageButton.setAttribute('aria-expanded', 'false');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.language-wrap')) {
    languageMenu.hidden = true;
    languageButton.setAttribute('aria-expanded', 'false');
  }
});

menuButton.addEventListener('click', () => {
  const active = menuButton.getAttribute('aria-pressed') === 'true';
  menuButton.setAttribute('aria-pressed', String(!active));
  menuButton.setAttribute('aria-label', active ? 'Открыть меню' : 'Закрыть меню');
});

function goToUploads() {
  document.querySelector('#uploads').scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => document.querySelector('.project .upload-button').focus(), 480);
}

startCard.addEventListener('click', goToUploads);
startCard.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    goToUploads();
  }
});

document.querySelectorAll('.upload-card').forEach((card) => {
  const input = card.querySelector('input[type="file"]');
  const label = card.querySelector('.upload-button');
  const fileName = card.querySelector('.file-name');

  card.addEventListener('click', (event) => {
    if (!event.target.closest('.upload-button')) input.click();
  });

  label.setAttribute('tabindex', '0');
  label.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      input.click();
    }
  });

  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) return;
    fileName.textContent = file.name;
    card.classList.add('file-selected');
    showToast(`Файл «${file.name}» выбран`);
  });
});

ctaButton.addEventListener('click', () => {
  const selectedFiles = [...document.querySelectorAll('input[type="file"]')].filter((input) => input.files?.length);
  if (selectedFiles.length) {
    showToast('Документы готовы к анализу');
  } else {
    showToast('Сначала загрузите проект, договор или смету');
    goToUploads();
  }
});

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}
