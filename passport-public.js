function decodePayload() {
  const encoded = new URLSearchParams(location.hash.slice(1)).get('p');
  if (!encoded) throw new Error('Missing passport payload');
  const base64 = encoded.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - encoded.length % 4) % 4);
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function renderPassport() {
  const card = document.querySelector('[data-passport-card]');
  const error = document.querySelector('[data-passport-error]');
  try {
    const payload = decodePayload();
    if (!payload?.id || !Array.isArray(payload.entries)) throw new Error('Invalid passport payload');
    document.querySelector('[data-passport-name]').textContent = payload.name || 'StructOS';
    document.querySelector('[data-passport-id]').textContent = payload.id;
    if (payload.photo) document.querySelector('[data-passport-photo]').innerHTML = `<img src="${payload.photo}" alt="" />`;
    const fields = document.querySelector('[data-passport-fields]');
    payload.entries.forEach((entry) => {
      const article = document.createElement('article');
      const label = document.createElement('small'); label.textContent = String(entry.label || '');
      const value = document.createElement('strong'); value.textContent = String(entry.value || '');
      article.append(label, value); fields.append(article);
    });
    document.querySelector('[data-copy-public-id]').addEventListener('click', async () => {
      const id = String(payload.id).replaceAll(' ', '');
      try { await navigator.clipboard.writeText(id); }
      catch { const input = document.createElement('input'); input.value = id; document.body.append(input); input.select(); document.execCommand('copy'); input.remove(); }
      const toast = document.querySelector('[data-public-toast]'); toast.hidden = false; setTimeout(() => { toast.hidden = true; }, 1800);
    });
    card.hidden = false;
  } catch (reason) {
    console.warn('StructOS public passport is unavailable:', reason);
    error.hidden = false;
  }
}

renderPassport();
