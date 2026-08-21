const root = document.documentElement;
const themeMeta = document.querySelector('meta[name="theme-color"]');

let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('structos-theme') === 'dark' ? 'dark' : 'light';
} catch {
  savedTheme = 'light';
}

root.dataset.theme = savedTheme;
if (themeMeta) themeMeta.content = savedTheme === 'dark' ? '#06101d' : '#f4f9ff';

const videos = [...document.querySelectorAll('video')];

videos.forEach((video) => {
  const frame = video.closest('.video-frame');

  video.addEventListener('play', () => {
    videos.forEach((candidate) => {
      if (candidate !== video && !candidate.paused) candidate.pause();
    });
    frame?.classList.add('is-playing');
  });

  video.addEventListener('pause', () => frame?.classList.remove('is-playing'));
  video.addEventListener('ended', () => frame?.classList.remove('is-playing'));
});

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && !entry.target.paused) entry.target.pause();
    });
  }, { threshold: 0.15 });

  videos.forEach((video) => videoObserver.observe(video));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  document.querySelectorAll('.feature-video-card, .media-closing').forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll('.feature-video-card, .media-closing').forEach((element) => {
    element.classList.add('is-visible');
  });
}
