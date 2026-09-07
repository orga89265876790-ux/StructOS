const translations = {
  RU: {
    syncNow: 'Синхронизировать',
    notSynchronized: 'Не синхронизировано',
    networkAvailable: 'Сеть есть',
    networkUnavailable: 'Сети нет'
  },
  EN: {
    syncNow: 'Synchronize',
    notSynchronized: 'Not synchronized',
    networkAvailable: 'Network available',
    networkUnavailable: 'No network'
  },
  KY: {
    syncNow: 'Синхрондоштуруу',
    notSynchronized: 'Синхрондоштурулган эмес',
    networkAvailable: 'Тармак бар',
    networkUnavailable: 'Тармак жок'
  },
  TJ: {
    syncNow: 'Ҳамоҳангсозӣ',
    notSynchronized: 'Ҳамоҳанг нашудааст',
    networkAvailable: 'Шабака ҳаст',
    networkUnavailable: 'Шабака нест'
  }
};

const languageControl = document.querySelector('[data-language]');
const syncSection = document.querySelector('.home-sync-section');
const primarySyncButton = document.querySelector('.home-sync-action.is-primary');
const pendingSyncButton = document.querySelector('.home-sync-action.is-pending');
const onlineIndicator = document.querySelector('[data-sync-network-online]');
const offlineIndicator = document.querySelector('[data-sync-network-offline]');

function applyHomeTranslations() {
  const language = translations[languageControl?.value] ? languageControl.value : 'RU';
  document.querySelectorAll('[data-home-i18n]').forEach((element) => {
    const value = translations[language][element.dataset.homeI18n];
    if (value) element.textContent = value;
  });
}

function renderNetworkStatus() {
  const online = navigator.onLine;
  if (syncSection) syncSection.dataset.syncNetwork = online ? 'online' : 'offline';
  onlineIndicator?.classList.toggle('is-active', online);
  offlineIndicator?.classList.toggle('is-active', !online);
  onlineIndicator?.setAttribute('aria-hidden', online ? 'false' : 'true');
  offlineIndicator?.setAttribute('aria-hidden', online ? 'true' : 'false');
}

pendingSyncButton?.addEventListener('click', () => primarySyncButton?.click());
languageControl?.addEventListener('change', applyHomeTranslations);
window.addEventListener('online', renderNetworkStatus);
window.addEventListener('offline', renderNetworkStatus);

applyHomeTranslations();
renderNetworkStatus();
