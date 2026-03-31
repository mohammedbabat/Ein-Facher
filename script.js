// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 1200);
});

// ── DYNAMIC COPYRIGHT YEAR ──
const footerCopy = document.getElementById('footerCopy');
const year = new Date().getFullYear();
footerCopy.textContent = `© ${year} Ein-Facher Cloud · Alle Rechte vorbehalten`;

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
});

// ── LANGUAGE ──
let currentLang = 'de';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.classList.toggle('ar', lang === 'ar');
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('.lang-btn').forEach(btn =>
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang)
  );

  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
    else el.textContent = val;
  });

  const ta = document.getElementById('message');
  if (ta) ta.placeholder = lang === 'ar' ? 'اشرح باختصار ما تحتاجه...' : 'Beschreiben Sie kurz Ihr Anliegen...';

  // Update footer year text for language
  const copy = document.getElementById('footerCopy');
  if (copy) {
    copy.textContent = lang === 'ar'
      ? `© ${year} Ein-Facher Cloud · جميع الحقوق محفوظة`
      : `© ${year} Ein-Facher Cloud · Alle Rechte vorbehalten`;
  }
}

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ── EMAIL VALIDATION ──
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── EMAILJS SETUP ──
const EMAILJS_PUBLIC_KEY = 'WXLm-gO2Zp2r_UI6U';
const EMAILJS_SERVICE_ID = 'service_1maf1tj';
const EMAILJS_TEMPLATE_ID = 'template_2e21xzj';

(function () {
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = function () { emailjs.init(EMAILJS_PUBLIC_KEY); };
  document.head.appendChild(s);
})();

// ── FORM SUBMIT ──
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const topic = document.getElementById('topic').value;
  const message = document.getElementById('message').value.trim();

  // Improved validation
  if (!fname) {
    alert(currentLang === 'ar' ? 'يرجى إدخال اسمك الأول.' : 'Bitte geben Sie Ihren Vornamen ein.');
    return;
  }
  if (!email) {
    alert(currentLang === 'ar' ? 'يرجى إدخال بريدك الإلكتروني.' : 'Bitte geben Sie Ihre E-Mail-Adresse ein.');
    return;
  }
  if (!isValidEmail(email)) {
    alert(currentLang === 'ar' ? 'البريد الإلكتروني غير صحيح.' : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    return;
  }

  const btn = document.querySelector('.form-submit .btn-primary');
  btn.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Wird gesendet...';
  btn.disabled = true;

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: fname + ' ' + lname,
    from_email: email,
    phone: phone || '—',
    topic: topic || '—',
    message: message || '—'
  }).then(() => {
    document.getElementById('successMsg').style.display = 'block';
    btn.style.display = 'none';
  }).catch(err => {
    alert('Fehler: ' + JSON.stringify(err));
    btn.textContent = currentLang === 'ar' ? 'إرسال الرسالة ←' : 'Nachricht senden →';
    btn.disabled = false;
  });
}

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 100);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));

// ── MODAL DATA ──
const tagData = {
  'SharePoint': { icon: '📁', tag: 'Microsoft 365', de: { title: 'SharePoint', desc: 'SharePoint ist die zentrale Plattform von Microsoft für Zusammenarbeit und Dokumentenverwaltung.', features: ['Dokumentenbibliotheken & Versionierung', 'Team-Webseiten & Intranet erstellen', 'Berechtigungen & Zugriffssteuerung', 'Integration mit Teams und Outlook'] }, ar: { title: 'SharePoint', desc: 'SharePoint هي منصة مايكروسوفت المركزية للتعاون وإدارة المستندات.', features: ['مكتبات المستندات والإصدارات', 'إنشاء مواقع الفريق والإنترانت', 'الأذونات والتحكم في الوصول', 'التكامل مع Teams وOutlook'] } },
  'Exchange': { icon: '📧', tag: 'Microsoft 365', de: { title: 'Exchange Online', desc: 'Exchange Online ist der cloudbasierte E-Mail-Dienst von Microsoft für professionelle Postfächer, Kalender und Kontaktverwaltung.', features: ['Professionelle E-Mail-Postfächer', 'Freigegebene Kalender & Ressourcen', 'Spam- und Virenschutz', 'E-Mail-Archivierung & Compliance'] }, ar: { title: 'Exchange Online', desc: 'Exchange Online هو خدمة البريد الإلكتروني السحابية من مايكروسوفت.', features: ['صناديق بريد إلكتروني احترافية', 'تقاويم وموارد مشتركة', 'الحماية من البريد العشوائي', 'أرشفة البريد الإلكتروني والامتثال'] } },
  'Teams': { icon: '💬', tag: 'Microsoft 365', de: { title: 'Microsoft Teams', desc: 'Microsoft Teams ist die zentrale Kommunikationsplattform für Chat, Videoanrufe und Zusammenarbeit.', features: ['Chat & Videoanrufe', 'Kanäle für Teams & Projekte', 'Dateifreigabe & gemeinsames Bearbeiten', 'Integration mit allen M365-Apps'] }, ar: { title: 'Microsoft Teams', desc: 'Microsoft Teams هي منصة التواصل المركزية للمحادثة ومكالمات الفيديو والتعاون.', features: ['المحادثة ومكالمات الفيديو', 'القنوات للفرق والمشاريع', 'مشاركة الملفات والتحرير المشترك', 'التكامل مع جميع تطبيقات M365'] } },
  'Entra ID': { icon: '🔐', tag: 'Identität & Sicherheit', de: { title: 'Microsoft Entra ID', desc: 'Entra ID verwaltet Benutzer, Gruppen und den sicheren Zugriff auf alle Unternehmensanwendungen.', features: ['Single Sign-On (SSO) für alle Apps', 'Multi-Faktor-Authentifizierung (MFA)', 'Conditional Access Richtlinien', 'Benutzer- & Gruppenverwaltung'] }, ar: { title: 'Microsoft Entra ID', desc: 'يدير Entra ID المستخدمين والمجموعات والوصول الآمن.', features: ['تسجيل الدخول الموحد (SSO)', 'المصادقة متعددة العوامل (MFA)', 'سياسات الوصول المشروط', 'إدارة المستخدمين والمجموعات'] } },
  'Intune': { icon: '📱', tag: 'Geräteverwaltung', de: { title: 'Microsoft Intune', desc: 'Intune ermöglicht die zentrale Verwaltung und Absicherung aller Geräte – Windows, iOS und Android.', features: ['Zentrale Geräteverwaltung', 'Unternehmens-Apps verteilen', 'Geräteverschlüsselung & Sicherheit', 'Fernzugriff & Fernlöschung'] }, ar: { title: 'Microsoft Intune', desc: 'يتيح Intune الإدارة المركزية وتأمين جميع الأجهزة.', features: ['إدارة الأجهزة المركزية', 'توزيع تطبيقات الشركة', 'تشفير الأجهزة والأمان', 'الوصول عن بُعد والمسح عن بُعد'] } },
  'MFA': { icon: '🔒', tag: 'Sicherheit', de: { title: 'Multi-Faktor-Authentifizierung', desc: 'MFA schützt Konten durch eine zusätzliche Sicherheitsebene.', features: ['Schutz vor Passwort-Diebstahl', 'Authenticator App oder SMS', 'Einfache Einrichtung für alle Benutzer', 'Pflicht für Administratoren'] }, ar: { title: 'المصادقة متعددة العوامل', desc: 'تحمي MFA الحسابات بطبقة أمان إضافية.', features: ['الحماية من سرقة كلمة المرور', 'تطبيق Authenticator أو SMS', 'إعداد سهل لجميع المستخدمين', 'إلزامي للمسؤولين'] } },
  'Conditional Access': { icon: '🛡️', tag: 'Sicherheit', de: { title: 'Conditional Access', desc: 'Conditional Access definiert Regeln, wann und wie Benutzer auf Unternehmensressourcen zugreifen dürfen.', features: ['Zugriff nur von vertrauenswürdigen Geräten', 'Standortbasierte Richtlinien', 'Risikobewertung in Echtzeit', 'Integration mit Entra ID & Intune'] }, ar: { title: 'الوصول المشروط', desc: 'يحدد Conditional Access قواعد الوصول إلى موارد الشركة.', features: ['الوصول فقط من الأجهزة الموثوقة', 'سياسات قائمة على الموقع', 'تقييم المخاطر في الوقت الفعلي', 'التكامل مع Entra ID وIntune'] } },
  'Power Apps': { icon: '⚡', tag: 'Power Platform', de: { title: 'Microsoft Power Apps', desc: 'Power Apps ermöglicht professionelle Geschäftsanwendungen ohne Programmierkenntnisse.', features: ['Apps per Drag & Drop erstellen', 'Verbindung zu Excel, SharePoint, SQL', 'Mobile & Desktop Apps', 'Automatische Datenspeicherung'] }, ar: { title: 'Microsoft Power Apps', desc: 'يتيح Power Apps إنشاء تطبيقات أعمال احترافية دون برمجة.', features: ['إنشاء التطبيقات بالسحب والإفلات', 'الاتصال بـ Excel وSharePoint وSQL', 'تطبيقات للجوال وسطح المكتب', 'حفظ البيانات التلقائي'] } },
  'Power Automate': { icon: '🔄', tag: 'Power Platform', de: { title: 'Microsoft Power Automate', desc: 'Power Automate automatisiert wiederkehrende Aufgaben und Workflows.', features: ['Workflows automatisch ausführen', 'E-Mail-Benachrichtigungen & Genehmigungen', 'Verbindung zu 500+ Apps', 'Zeitgesteuerte Prozesse'] }, ar: { title: 'Microsoft Power Automate', desc: 'يؤتمت Power Automate المهام والسير الوظيفي المتكررة.', features: ['تنفيذ سير العمل تلقائياً', 'إشعارات البريد الإلكتروني والموافقات', 'الاتصال بأكثر من 500 تطبيق', 'العمليات المجدولة'] } },
  'Local AD': { icon: '🖥️', tag: 'Lokale Infrastruktur', de: { title: 'Lokales Active Directory', desc: 'Das lokale Active Directory ist das zentrale Verzeichnis für Benutzer und Computer im Netzwerk.', features: ['Benutzer & Computer verwalten', 'Gruppenrichtlinien (GPO)', 'Domänen-Authentifizierung', 'Integration mit Microsoft Cloud'] }, ar: { title: 'Active Directory المحلي', desc: 'Active Directory المحلي هو الدليل المركزي في شبكة الشركة.', features: ['إدارة المستخدمين والأجهزة', 'سياسات المجموعة (GPO)', 'مصادقة النطاق', 'التكامل مع سحابة مايكروسوفت'] } },
  'GPO': { icon: '⚙️', tag: 'Lokale Infrastruktur', de: { title: 'Group Policy Objects (GPO)', desc: 'GPOs sind zentrale Richtlinien für alle Computer und Benutzer im Netzwerk.', features: ['Desktop-Einstellungen zentral steuern', 'Software automatisch verteilen', 'Sicherheitsrichtlinien durchsetzen', 'Benutzerrechte einschränken'] }, ar: { title: 'كائنات سياسة المجموعة (GPO)', desc: 'GPOs هي سياسات مركزية لجميع الأجهزة والمستخدمين في الشبكة.', features: ['التحكم المركزي في إعدادات سطح المكتب', 'توزيع البرامج تلقائياً', 'تطبيق سياسات الأمان', 'تقييد حقوق المستخدمين'] } },
  'DNS': { icon: '🌐', tag: 'Netzwerk', de: { title: 'DNS', desc: 'DNS übersetzt Domainnamen in IP-Adressen – essenziell für das Netzwerk.', features: ['Namensauflösung im Netzwerk', 'Interne & externe DNS-Zonen', 'Fehlerdiagnose & Optimierung', 'Integration mit Active Directory'] }, ar: { title: 'DNS', desc: 'يترجم DNS أسماء النطاقات إلى عناوين IP.', features: ['تحليل الأسماء في الشبكة', 'مناطق DNS الداخلية والخارجية', 'تشخيص الأخطاء والتحسين', 'التكامل مع Active Directory'] } },
  'DHCP': { icon: '📡', tag: 'Netzwerk', de: { title: 'DHCP', desc: 'DHCP verteilt automatisch IP-Adressen an Geräte im Netzwerk.', features: ['Automatische IP-Vergabe', 'IP-Reservierungen für Server', 'Netzwerksegmentierung', 'Überwachung & Verwaltung'] }, ar: { title: 'DHCP', desc: 'يوزع DHCP عناوين IP تلقائياً على الأجهزة في الشبكة.', features: ['تعيين عناوين IP تلقائياً', 'حجوزات IP للخوادم', 'تقسيم الشبكة', 'المراقبة والإدارة'] } },
  'Hybrid Join': { icon: '🔗', tag: 'Cloud Migration', de: { title: 'Hybrid Azure AD Join', desc: 'Hybrid Join verbindet lokale Windows-Geräte mit lokalem AD und Entra ID gleichzeitig.', features: ['Lokale & Cloud-Identität kombinieren', 'Schrittweise Cloud-Migration', 'Conditional Access für lokale Geräte', 'Kein Neustart nötig'] }, ar: { title: 'Hybrid Azure AD Join', desc: 'يربط Hybrid Join أجهزة Windows بـ Active Directory المحلي وEntra ID.', features: ['الجمع بين الهوية المحلية والسحابية', 'الهجرة التدريجية إلى السحابة', 'الوصول المشروط للأجهزة المحلية', 'لا حاجة لإعادة التشغيل'] } },
  'Azure AD Connect': { icon: '🔄', tag: 'Cloud Migration', de: { title: 'Azure AD Connect', desc: 'Azure AD Connect synchronisiert Benutzer vom lokalen AD mit Entra ID.', features: ['Benutzer-Synchronisierung lokal ↔ Cloud', 'Passwort-Hash-Synchronisierung', 'Single Sign-On ermöglichen', 'Automatische Synchronisierung alle 30 Min.'] }, ar: { title: 'Azure AD Connect', desc: 'يزامن Azure AD Connect المستخدمين من Active Directory المحلي مع Entra ID.', features: ['مزامنة المستخدمين محلياً ↔ سحابياً', 'مزامنة تجزئة كلمة المرور', 'تمكين تسجيل الدخول الموحد', 'مزامنة تلقائية كل 30 دقيقة'] } },
  'AADDS': { icon: '☁️', tag: 'Cloud Migration', de: { title: 'Azure AD Domain Services', desc: 'AADDS bietet verwaltete Domänendienste in der Cloud ohne eigene Domain Controller.', features: ['Domäne ohne eigene Server', 'Kerberos & LDAP in der Cloud', 'Automatische Patches & Updates', 'Hochverfügbarkeit inklusive'] }, ar: { title: 'Azure AD Domain Services', desc: 'يوفر AADDS خدمات النطاق المُدارة في السحابة.', features: ['نطاق بدون خوادم خاصة', 'Kerberos وLDAP في السحابة', 'تصحيحات وتحديثات تلقائية', 'توافر عالٍ مدمج'] } },
  'Azure Backup': { icon: '💾', tag: 'Backup', de: { title: 'Azure Backup', desc: 'Azure Backup sichert Daten, Server und VMs automatisch in der Microsoft Cloud.', features: ['Automatische tägliche Backups', 'Verschlüsselte Datenspeicherung', 'Schnelle Wiederherstellung', 'Langzeitarchivierung möglich'] }, ar: { title: 'Azure Backup', desc: 'يحفظ Azure Backup البيانات والخوادم تلقائياً في سحابة مايكروسوفت.', features: ['نسخ احتياطية يومية تلقائية', 'تخزين البيانات مشفراً', 'استرداد سريع', 'أرشفة طويلة الأمد'] } },
  'Veeam': { icon: '🗄️', tag: 'Backup', de: { title: 'Veeam Backup', desc: 'Veeam bietet schnelle, zuverlässige Backups für virtuelle und physische Umgebungen.', features: ['VM & physische Server-Backups', 'Sekundenschnelle Wiederherstellung', 'Replikation für Hochverfügbarkeit', 'On-Premise & Cloud Speicher'] }, ar: { title: 'Veeam Backup', desc: 'يوفر Veeam نسخاً احتياطية سريعة وموثوقة.', features: ['نسخ احتياطية للأجهزة الافتراضية والخوادم', 'استرداد فوري في ثوانٍ', 'النسخ المتطابق لتوافر عالٍ', 'تخزين محلي وسحابي'] } },
  'Beratung': { icon: '🤝', tag: 'IT-Beratung', de: { title: 'IT-Beratung', desc: 'Wir beraten Sie umfassend bei IT-Entscheidungen – von der Infrastrukturplanung bis zur Cloud-Strategie.', features: ['Infrastruktur-Analyse & Planung', 'Cloud-Strategie entwickeln', 'Lizenzoptimierung bei Microsoft', 'Projektbegleitung & Umsetzung'] }, ar: { title: 'الاستشارات التقنية', desc: 'نقدم استشارات شاملة في جميع قرارات تقنية المعلومات.', features: ['تحليل وتخطيط البنية التحتية', 'تطوير استراتيجية السحابة', 'تحسين تراخيص مايكروسوفت', 'مرافقة المشروع والتنفيذ'] } }
};

function openModal(tagName) {
  const data = tagData[tagName];
  if (!data) return;
  const content = data[currentLang] || data['de'];
  document.getElementById('modalIcon').textContent = data.icon;
  document.getElementById('modalTag').textContent = data.tag;
  document.getElementById('modalTitle').textContent = content.title;
  document.getElementById('modalDesc').textContent = content.desc;
  document.getElementById('modalFeatures').innerHTML = content.features.map(f =>
    '<div class="modal-feature"><span class="check">✦</span><span>' + f + '</span></div>'
  ).join('');
  document.getElementById('modalCta').textContent = currentLang === 'ar' ? 'تواصل معنا الآن ←' : 'Jetzt anfragen →';
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
document.getElementById('modalOverlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Close on ESC
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Add click to all tags
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => openModal(tag.textContent.trim()));
});
