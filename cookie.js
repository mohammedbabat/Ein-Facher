// Cookie Banner – Ein-Facher Cloud
(function () {
  // Don't show on datenschutz page
  if (window.location.pathname.includes('datenschutz')) return;

  // Already accepted?
  if (localStorage.getItem('cookie_accepted') === 'true') return;

  // Create banner
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-text">
        <span class="cookie-icon">🍪</span>
        <span id="cookie-msg">Diese Webseite verwendet externe Dienste (Google Fonts, EmailJS, Calendly). Mit der Nutzung stimmen Sie unserer <a href="datenschutz.html">Datenschutzerklärung</a> zu.</span>
      </div>
      <div class="cookie-btns">
        <button class="cookie-accept" onclick="acceptCookies()">Akzeptieren</button>
        <a href="datenschutz.html" class="cookie-more">Mehr erfahren</a>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #cookie-banner {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
      background: #1A0A2E; color: #fff;
      padding: 16px 24px;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.2);
      animation: slideUp 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
    }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    .cookie-inner {
      max-width: 1100px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      gap: 20px; flex-wrap: wrap;
    }
    .cookie-text {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: 0.85rem; color: rgba(255,255,255,0.85); line-height: 1.5;
      flex: 1; min-width: 200px;
    }
    .cookie-icon { font-size: 1.2rem; flex-shrink: 0; }
    .cookie-text a { color: #FB923C; text-decoration: underline; }
    .cookie-btns { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .cookie-accept {
      padding: 9px 22px; background: #7B2FBE; border: none;
      border-radius: 8px; color: #fff; font-size: 0.88rem; font-weight: 700;
      font-family: inherit; cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .cookie-accept:hover { background: #A855F7; transform: translateY(-1px); }
    .cookie-more {
      font-size: 0.82rem; color: rgba(255,255,255,0.55);
      text-decoration: underline; white-space: nowrap;
    }
    #cookie-banner.hiding { animation: slideDown 0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
    @keyframes slideDown { from { transform: translateY(0); } to { transform: translateY(100%); } }
    @media(max-width: 600px) {
      .cookie-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
      .cookie-btns { width: 100%; }
      .cookie-accept { flex: 1; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(banner);

  // Arabic support
  const lang = document.documentElement.lang;
  if (lang === 'ar') {
    document.getElementById('cookie-msg').textContent = 'يستخدم هذا الموقع خدمات خارجية (Google Fonts وEmailJS وCalendly). باستخدامك للموقع، فإنك توافق على سياسة الخصوصية.';
    banner.querySelector('.cookie-accept').textContent = 'قبول';
  }

  // Listen for language changes
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isAr = btn.textContent.trim().toLowerCase() === 'ar';
      const msg = document.getElementById('cookie-msg');
      const acceptBtn = banner.querySelector('.cookie-accept');
      if (msg) {
        if (isAr) {
          msg.textContent = 'يستخدم هذا الموقع خدمات خارجية. باستخدامك للموقع، فإنك توافق على ';
          const link = document.createElement('a');
          link.href = 'datenschutz.html';
          link.textContent = 'سياسة الخصوصية';
          link.style.color = '#FB923C';
          msg.appendChild(link);
          acceptBtn.textContent = 'قبول';
        } else {
          msg.innerHTML = 'Diese Webseite verwendet externe Dienste (Google Fonts, EmailJS, Calendly). Mit der Nutzung stimmen Sie unserer <a href="datenschutz.html" style="color:#FB923C;text-decoration:underline;">Datenschutzerklärung</a> zu.';
          acceptBtn.textContent = 'Akzeptieren';
        }
      }
    });
  });
})();

function acceptCookies() {
  localStorage.setItem('cookie_accepted', 'true');
  const banner = document.getElementById('cookie-banner');
  banner.classList.add('hiding');
  setTimeout(() => banner.remove(), 400);
}
