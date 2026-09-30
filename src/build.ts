// Sinh toàn bộ site tĩnh vào dist/: trang chủ, chính sách, điều khoản (EN ở /, VI ở /vi/), 404, sitemap.
// Chạy: node src/build.ts (Node 22.18+ chạy thẳng TypeScript, không cần bước biên dịch).
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTACT_EMAIL, LEGAL, LEGAL_UPDATED, type LegalDoc } from './content/legal.ts';
import { APP_URL, LANGS, SITE, SITE_URL, type Lang } from './content/site.ts';
import { ICONS, type IconName } from './icons.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');

type Page = 'home' | 'privacy' | 'terms';

// ── Tiện ích ──

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Escape mọi chữ lấy từ content trước khi đưa vào HTML */
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]!);

/** Đường dẫn của một trang theo ngôn ngữ: EN không có tiền tố, VI nằm dưới /vi/ */
export function pathOf(page: Page, lang: Lang) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  return page === 'home' ? `${prefix}/` : `${prefix}/${page}`;
}

function icon(name: string, size = 24, weight = 1.5) {
  const parts = ICONS[name as IconName];
  if (!parts) throw new Error(`Không có icon "${name}"`);
  const body = parts
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .map(([k, v]) => `${k}="${v}"`)
          .join(' ')}/>`,
    )
    .join('');
  return `<svg class="sh-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

const tag = (text: string, tone?: 'archived') =>
  `<span class="sh-tag${tone ? ` sh-tag-${tone}` : ''}"><span class="sh-tag-eyelet" aria-hidden="true"></span>${esc(text)}</span>`;

const badge = (name: string) => `<span class="badge" aria-hidden="true">${icon(name, 22)}</span>`;

/** Link email liên hệ trong văn bản pháp lý thành mailto (sau khi đã escape) */
const withMailto = (s: string) =>
  esc(s).replaceAll(CONTACT_EMAIL, `<a class="link" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`);

/** Mô tả cho thẻ meta: cắt ở ranh giới từ, tối đa ~155 ký tự */
const summary = (s: string) => (s.length <= 155 ? s : `${s.slice(0, s.lastIndexOf(' ', 154))}…`);

// ── Khung trang ──

let cssVersion = '';

/** Script inline duy nhất của site; CSP chỉ cho chạy đúng script này (theo hash) */
const STANDALONE_JS = `if(matchMedia('(display-mode: standalone)').matches)location.replace('${APP_URL}/')`;
const scriptHash = `'sha256-${createHash('sha256').update(STANDALONE_JS).digest('base64')}'`;

function layout(opts: { lang: Lang; page: Page | '404'; title: string; description: string; body: string }) {
  const t = SITE[opts.lang];
  const page = opts.page;
  const indexable = page !== '404';
  const alternates = indexable
    ? [
        ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${pathOf(page, l)}">`),
        `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${pathOf(page, 'en')}">`,
      ].join('\n    ')
    : '<meta name="robots" content="noindex">';
  const canonical = indexable ? `<link rel="canonical" href="${SITE_URL}${pathOf(page, opts.lang)}">` : '';
  // App cũ từng chạy ở looklab.space: ai đã cài PWA thì mở ra là trang này, chuyển thẳng sang app
  const standalone = page === 'home' ? `<script>${STANDALONE_JS}</script>` : '';
  const home = pathOf('home', opts.lang);
  const switcher = LANGS.map((l) => {
    const target = indexable ? pathOf(page, l) : pathOf('home', l);
    const current = l === opts.lang ? ' aria-current="true"' : '';
    return `<a href="${target}" hreflang="${l}" lang="${l}"${current} aria-label="${esc(t.language[l])}">${l.toUpperCase()}</a>`;
  }).join('');

  return `<!doctype html>
<html lang="${t.htmlLang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(opts.title)}</title>
    <meta name="description" content="${esc(opts.description)}">
    <meta name="theme-color" content="#f3efe7">
    <meta name="color-scheme" content="light">
    ${canonical}
    ${alternates}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="LookLab">
    <meta property="og:title" content="${esc(opts.title)}">
    <meta property="og:description" content="${esc(opts.description)}">
    <meta property="og:locale" content="${t.ogLocale}">
    ${indexable ? `<meta property="og:url" content="${SITE_URL}${pathOf(page, opts.lang)}">` : ''}
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="stylesheet" href="/styles.css?v=${cssVersion}">
    ${standalone}
  </head>
  <body>
    <header class="wrap site-header">
      <a class="brand" href="${home}" aria-label="${esc(t.nav.home)}">
        <img src="/icon.svg" alt="" width="32" height="32">
        <span class="brand-name">${t.appName}</span>
      </a>
      <div class="header-actions">
        <nav class="lang-switch" aria-label="${esc(t.nav.language)}">${switcher}</nav>
        <a class="signin" href="${APP_URL}/login?lang=${opts.lang}">${esc(t.nav.signIn)}</a>
      </div>
    </header>
    <main>
${opts.body}
    </main>
    <footer class="site-footer">
      <div class="wrap footer-row">
        <span class="muted small">© ${new Date().getFullYear()} ${t.appName}</span>
        <span class="footer-links">
          <a href="${pathOf('privacy', opts.lang)}">${esc(t.legal.privacy)}</a>
          <a href="${pathOf('terms', opts.lang)}">${esc(t.legal.terms)}</a>
          <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        </span>
      </div>
    </footer>
  </body>
</html>
`;
}

// ── Nội dung từng trang ──

function homeBody(lang: Lang) {
  const t = SITE[lang];
  // ?lang= để app mở đúng ngôn ngữ của trang người dùng đang đọc
  const signup = `${APP_URL}/signup?lang=${lang}`;
  const cards = t.demo.items
    .map(
      (it) => `
            <div class="sh-card">
              <div class="sh-card-photo">
                <span class="sh-ph sh-ph-fill" aria-hidden="true">${icon(it.icon, 56, (1.5 * 24 * 1.15) / 56)}</span>
                ${it.inUse ? `<div class="sh-card-band"><span>${esc(it.inUse)}</span></div>` : ''}
              </div>
              <div class="sh-card-text">
                <div class="sh-card-name">${esc(it.name)}</div>
                <div class="sh-card-meta">${esc(it.meta)}</div>
              </div>
            </div>`,
    )
    .join('');
  const hoursLeft = 18.4;
  const ticks = Array.from(
    { length: 24 },
    (_, i) => `<span class="sh-tick${i < Math.ceil(hoursLeft) ? ' sh-tick-on' : ''}"></span>`,
  ).join('');

  return `      <section class="wrap hero">
        <div class="hero-text">
          ${tag(t.hero.eyebrow)}
          <h1>${esc(t.hero.title)}</h1>
          <p class="lead">${esc(t.hero.lead)}</p>
          <div class="actions">
            <a class="sh-btn sh-btn-primary" href="${signup}">${esc(t.hero.cta)}</a>
            <a class="sh-btn sh-btn-tonal" href="${APP_URL}/login?lang=${lang}">${esc(t.hero.secondary)}</a>
          </div>
          <p class="note">${icon('download', 18)}<span>${esc(t.hero.note)}</span></p>
        </div>
        <figure class="demo">
          <figcaption class="demo-head">${tag(t.demo.label)}<span class="demo-summary">${esc(t.demo.summary)}</span></figcaption>
          <div class="demo-grid">${cards}
          </div>
          <div class="sh-count">
            <div class="sh-count-head">
              <span class="sh-count-label">${esc(t.demo.timeLeft)}</span>
              <span class="sh-count-due">${esc(t.demo.back)}</span>
            </div>
            <div class="sh-count-time">18:24<span class="sh-count-unit">${esc(t.demo.unit)}</span></div>
            <div class="sh-count-ticks" role="progressbar" aria-label="${esc(t.demo.progress)}" aria-valuemin="0" aria-valuemax="24" aria-valuenow="${hoursLeft}" aria-valuetext="18:24">${ticks}</div>
            <div class="sh-count-scale" aria-hidden="true"><span>0h</span><span>12h</span><span>24h</span></div>
          </div>
        </figure>
      </section>

      <section class="wrap block" aria-labelledby="how">
        <h2 id="how">${esc(t.how.title)}</h2>
        <ol class="steps">
${t.how.steps
  .map(
    (s, i) => `          <li class="step">
            <div class="step-top">${badge(s.icon)}<span class="step-no" aria-hidden="true">0${i + 1}</span></div>
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.body)}</p>
          </li>`,
  )
  .join('\n')}
        </ol>
      </section>

      <section class="band" aria-labelledby="features">
        <div class="wrap">
          <h2 id="features">${esc(t.features.title)}</h2>
          <ul class="features">
${t.features.list
  .map(
    (f) =>
      `            <li class="feature">${badge(f.icon)}<div><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></div></li>`,
  )
  .join('\n')}
          </ul>
        </div>
      </section>

      <section class="wrap pair">
        <div class="panel panel-primary">
          <h2>${esc(t.privacy.title)}</h2>
          <p>${esc(t.privacy.body)}</p>
          <p class="panel-links">
            <a class="link" href="${pathOf('privacy', lang)}">${esc(t.legal.privacy)}</a>
            <a class="link" href="${pathOf('terms', lang)}">${esc(t.legal.terms)}</a>
          </p>
        </div>
        <div class="panel">
          <h2>${esc(t.later.title)}</h2>
          <p class="muted">${esc(t.later.lead)}</p>
          <!-- Nhãn viền đứt: thứ chưa có, giống nhãn món đồ đã lưu trữ trong app -->
          <ul class="tags">${t.later.list.map((x) => `<li>${tag(x, 'archived')}</li>`).join('')}</ul>
        </div>
      </section>

      <section class="wrap final">
        <h2>${esc(t.final.title)}</h2>
        <p class="lead">${esc(t.final.body)}</p>
        <a class="sh-btn sh-btn-primary" href="${signup}">${icon('plus', 20)}${esc(t.hero.cta)}</a>
      </section>`;
}

function legalBody(lang: Lang, doc: 'privacy' | 'terms', content: LegalDoc) {
  const t = SITE[lang];
  const other = doc === 'privacy' ? 'terms' : 'privacy';
  const updated = new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-GB', { dateStyle: 'long' }).format(
    new Date(`${LEGAL_UPDATED}T00:00:00Z`),
  );
  const sections = content.sections
    .map(
      (s) => `        <section>
          <h2>${esc(s.heading)}</h2>
${s.body
  .map((b) =>
    typeof b === 'string'
      ? `          <p>${withMailto(b)}</p>`
      : `          <ul>${b.map((li) => `<li>${withMailto(li)}</li>`).join('')}</ul>`,
  )
  .join('\n')}
        </section>`,
    )
    .join('\n');
  return `      <article class="wrap-narrow legal">
        <a class="back" href="${pathOf('home', lang)}">${icon('back', 20)}${esc(t.legal.back)}</a>
        <header>
          ${tag(t.appName)}
          <h1>${esc(content.title)}</h1>
          <p class="muted small">${esc(t.legal.updated(updated))}</p>
        </header>
        <p>${withMailto(content.intro)}</p>
${sections}
        <p class="legal-other"><a class="link" href="${pathOf(other, lang)}">${esc(t.legal[other])}</a></p>
      </article>`;
}

function notFoundBody() {
  // 404 dùng chung cho mọi đường dẫn nên hiện cả hai ngôn ngữ
  return `      <section class="wrap-narrow not-found">
${LANGS.map((l) => {
  const t = SITE[l];
  return `        <div lang="${l}">
          <h1>${esc(t.notFound.title)}</h1>
          <p class="muted">${esc(t.notFound.body)}</p>
          <a class="sh-btn sh-btn-tonal" href="${pathOf('home', l)}">${esc(t.notFound.home)}</a>
        </div>`;
}).join('\n')}
      </section>`;
}

// ── Ghi ra dist/ ──

/** Đường dẫn → file: /privacy → privacy.html, /vi/ → vi/index.html (Workers assets tự bỏ .html) */
const fileOf = (path: string) => (path.endsWith('/') ? `${path}index.html` : `${path}.html`).slice(1);

export function build() {
  rmSync(out, { recursive: true, force: true });
  cpSync(join(root, 'public'), out, { recursive: true });

  const css = ['tokens.css', 'components.css', 'site.css']
    .map((f) => readFileSync(join(root, 'src', f), 'utf8'))
    .join('\n');
  writeFileSync(join(out, 'styles.css'), css);
  cssVersion = createHash('sha256').update(css).digest('hex').slice(0, 10);

  const pages: { path: string; html: string }[] = [];
  for (const lang of LANGS) {
    const t = SITE[lang];
    pages.push({
      path: pathOf('home', lang),
      html: layout({ lang, page: 'home', title: t.homeTitle, description: t.description, body: homeBody(lang) }),
    });
    for (const doc of ['privacy', 'terms'] as const) {
      const content = LEGAL[doc][lang];
      pages.push({
        path: pathOf(doc, lang),
        html: layout({
          lang,
          page: doc,
          title: `${content.title} · LookLab`,
          description: summary(content.intro),
          body: legalBody(lang, doc, content),
        }),
      });
    }
  }
  pages.push({
    path: '/404',
    html: layout({ lang: 'en', page: '404', title: 'LookLab', description: SITE.en.description, body: notFoundBody() }),
  });

  for (const p of pages) {
    const file = join(out, fileOf(p.path));
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, p.html);
  }

  const urls = pages.filter((p) => p.path !== '/404').map((p) => `  <url><loc>${SITE_URL}${p.path}</loc></url>`);
  writeFileSync(
    join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  );
  const csp = [
    "default-src 'none'",
    "style-src 'self'",
    "img-src 'self'",
    `script-src ${scriptHash}`,
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join('; ');
  writeFileSync(
    join(out, '_headers'),
    `/*\n  Content-Security-Policy: ${csp}\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n\n` +
      `/styles.css\n  Cache-Control: public, max-age=31536000, immutable\n\n` +
      `/sw.js\n  Cache-Control: no-cache\n`,
  );
  writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  return pages.map((p) => p.path);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const paths = build();
  console.log(`dist/: ${paths.length} trang (${paths.join(', ')})`);
}
