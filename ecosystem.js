import './ecosystem.css';

const videoFrame = document.querySelector('.video-frame--main');

if (videoFrame && !document.querySelector('.ecosystem-section')) {
  const icons = {
    design: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 25h18M10 25V9l6-4 6 4v16M13 12h2m2 0h2m-6 4h2m2 0h2m-6 4h2m2 0h2M6 25l4-4m16 4-4-4"/></svg>',
    contract: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 4h10l5 5v17H9zM19 4v6h5M13 14h7m-7 4h5m-5 4h4M21 23l5-5 2 2-5 5-3 1z"/></svg>',
    estimate: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8" y="4" width="16" height="24" rx="2"/><path d="M12 9h8M12 14h3m2 0h3m-8 5h3m2 0h3m-8 5h8M13.5 12.5v3M18.5 12.5v3"/></svg>',
    snab: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m16 4 10 6v12l-10 6-10-6V10zM6 10l10 6 10-6M16 16v12"/></svg>',
    radar: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 13a6 6 0 0 1 12 0M8 13h16M12 13v2a4 4 0 0 0 8 0v-2M9 27v-3a7 7 0 0 1 14 0v3M6 27h20M16 7V4"/></svg>',
    analytics: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27h22M8 23v-6h4v6m3 0V11h4v12m3 0V6h4v17"/></svg>',
    center: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 9h10l2 3h12v14H4zM4 9V6h9l2 3M9 18h14"/></svg>'
  };

  const moduleCard = (key, name, subtitle) => `
    <article class="ecosystem-module ecosystem-module--${key}">
      <span class="ecosystem-icon">${icons[key]}</span>
      <span class="ecosystem-module-copy">
        <strong>${name}</strong>
        <span>${subtitle}</span>
      </span>
    </article>`;

  const ecosystem = document.createElement('section');
  ecosystem.className = 'ecosystem-section';
  ecosystem.setAttribute('aria-labelledby', 'ecosystem-title');
  ecosystem.innerHTML = `
    <div class="ecosystem-head">
      <p class="ecosystem-kicker">Что дальше?</p>
      <h2 id="ecosystem-title">ЭКОСИСТЕМА STRUCTOS</h2>
      <p>Все процессы строительства связаны в едином интеллекте</p>
    </div>

    <div class="ecosystem-stage">
      <svg class="ecosystem-links" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
        <path class="eco-link" pathLength="1" d="M500 238 L500 116" />
        <path class="eco-link" pathLength="1" d="M429 262 L350 184 L270 184" />
        <path class="eco-link" pathLength="1" d="M571 262 L650 184 L730 184" />
        <path class="eco-link" pathLength="1" d="M402 303 L310 315 L240 315" />
        <path class="eco-link" pathLength="1" d="M598 303 L690 315 L760 315" />
        <path class="eco-link" pathLength="1" d="M431 374 L360 468 L300 468" />
        <path class="eco-link" pathLength="1" d="M569 374 L640 468 L700 468" />

        <path class="eco-flow" d="M500 238 L500 116" />
        <path class="eco-flow" d="M429 262 L350 184 L270 184" />
        <path class="eco-flow" d="M571 262 L650 184 L730 184" />
        <path class="eco-flow" d="M402 303 L310 315 L240 315" />
        <path class="eco-flow" d="M598 303 L690 315 L760 315" />
        <path class="eco-flow" d="M431 374 L360 468 L300 468" />
        <path class="eco-flow" d="M569 374 L640 468 L700 468" />

        <circle class="ecosystem-node" cx="500" cy="116" r="5" />
        <circle class="ecosystem-node" cx="270" cy="184" r="5" />
        <circle class="ecosystem-node" cx="730" cy="184" r="5" />
        <circle class="ecosystem-node" cx="240" cy="315" r="5" />
        <circle class="ecosystem-node" cx="760" cy="315" r="5" />
        <circle class="ecosystem-node" cx="300" cy="468" r="5" />
        <circle class="ecosystem-node" cx="700" cy="468" r="5" />
      </svg>

      <div class="ecosystem-core-wrap" aria-label="StructOS Core — единый центр объекта">
        <span class="ecosystem-ring ecosystem-ring--one" aria-hidden="true"></span>
        <span class="ecosystem-ring ecosystem-ring--two" aria-hidden="true"></span>
        <span class="ecosystem-ring ecosystem-ring--three" aria-hidden="true"></span>
        <div class="ecosystem-core">
          <div class="ecosystem-core-copy">
            <strong>StructOS Core</strong>
            <span>единый центр объекта</span>
          </div>
        </div>
      </div>

      ${moduleCard('design', 'StructOS Design', 'чертежи и BIM')}
      ${moduleCard('contract', 'StructOS Contract', 'анализ договоров')}
      ${moduleCard('estimate', 'StructOS Estimate', 'анализ смет')}
      ${moduleCard('snab', 'StructOS Snab', 'материалы и поставщики')}
      ${moduleCard('radar', 'StructOS Radar Job', 'исполнители и работа')}
      ${moduleCard('analytics', 'StructOS Analytics', 'показатели, риски и экономика')}
      ${moduleCard('center', 'StructOS Center', 'документы и взаимодействие')}
    </div>
  `;

  videoFrame.insertAdjacentElement('afterend', ecosystem);

  const showEcosystem = () => ecosystem.classList.add('is-visible');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        showEcosystem();
        currentObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.16 });

    observer.observe(ecosystem);
  } else {
    showEcosystem();
  }
}
