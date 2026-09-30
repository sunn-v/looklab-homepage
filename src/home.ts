// Trang chủ: thanh treo đồ ở hero, băng chữ chạy, thẻ bước hình nhãn treo, đồng hồ 24 giờ, lưới tính năng.
// Chỉ HTML + CSS (không JS): chuyển động nằm trong home.css và tắt khi người dùng chọn giảm chuyển động.
import { APP_URL, SITE, type Lang, type Site } from './content/site.ts';
import { esc, icon, pathOf, tag } from './html.ts';

// ── Thanh treo đồ (SVG). Toạ độ cục bộ: gốc là cổ móc áo, thanh treo ở y = 46. ──

const GARMENTS = {
  shirt: {
    fill: 'var(--primary)',
    body: 'M-16 88L-44 98L-62 136L-46 146L-38 128V232Q0 238 38 232V128L46 146L62 136L44 98L16 88Q0 102-16 88Z',
    extra:
      '<path d="M0 100V230" stroke="#fdfbf7" stroke-opacity=".45" stroke-width="2"/><path d="M14 128h14v16H14z" fill="none" stroke="#fdfbf7" stroke-opacity=".45" stroke-width="2"/>',
  },
  dress: {
    fill: 'var(--blush)',
    body: 'M-12 88L-26 94L-24 140Q-28 150-24 156L-58 282Q0 296 58 282L24 156Q28 150 24 140L26 94L12 88Q0 98-12 88Z',
    extra: '<path d="M-25 150Q0 157 25 150" fill="none" stroke="var(--navy)" stroke-opacity=".35" stroke-width="2"/>',
  },
  jacket: {
    fill: 'var(--navy)',
    body: 'M-18 88L-48 98L-60 226L-44 230L-40 140V250H40V140L44 230L60 226L48 98L18 88Z',
    extra:
      '<path d="M-18 88L0 150L18 88" fill="none" stroke="#fdfbf7" stroke-width="2.5" stroke-linejoin="round"/><circle cx="5" cy="172" r="3" fill="#fdfbf7"/><circle cx="5" cy="198" r="3" fill="#fdfbf7"/>',
  },
  tee: {
    fill: '#fdfbf7',
    body: 'M-16 88L-46 100L-58 130L-40 138L-34 124V214Q0 220 34 214V124L40 138L58 130L46 100L16 88Q0 100-16 88Z',
    extra:
      '<path d="M-34 150H34M-34 170H34M-34 190H34" stroke="var(--blush)" stroke-width="7"/><path d="M-16 88Q0 100 16 88" fill="none" stroke="var(--navy)" stroke-width="2"/>',
  },
} as const;

const RAIL: { kind: keyof typeof GARMENTS; x: number; tagFill: string; tagInk: string }[] = [
  { kind: 'shirt', x: 80, tagFill: '#fdfbf7', tagInk: 'var(--navy)' },
  { kind: 'dress', x: 213, tagFill: '#fdfbf7', tagInk: 'var(--navy)' },
  { kind: 'jacket', x: 347, tagFill: 'var(--butter)', tagInk: 'var(--navy)' },
  { kind: 'tee', x: 480, tagFill: 'var(--primary)', tagInk: '#fdfbf7' },
];

const HANGER =
  '<path class="hook" d="M0 72V58a10 10 0 1 0-10-10" fill="none" stroke="var(--navy)" stroke-width="3.5" stroke-linecap="round"/>' +
  '<path d="M0 72L50 96H-50Z" fill="none" stroke="var(--navy)" stroke-width="3.5" stroke-linejoin="round"/>';

/** Nhãn treo: đầu nhọn có lỗ xỏ dây, dây nối về cổ móc áo */
function railTag(text: string, fill: string, ink: string, cls = '') {
  return `<g class="rtag ${cls}"><path d="M0 72Q-4 110-33 138" fill="none" stroke="var(--navy)" stroke-width="1.5"/><g transform="translate(-44 124) rotate(-6)"><path d="M12 0H104a6 6 0 0 1 6 6V24a6 6 0 0 1-6 6H12L0 15Z" fill="${fill}" stroke="var(--navy)" stroke-width="1.5" stroke-linejoin="round"/><circle cx="11" cy="15" r="3" fill="var(--butter)" stroke="var(--navy)" stroke-width="1.2"/><text x="22" y="19.5" fill="${ink}">${esc(text)}</text></g></g>`;
}

function railScene(t: Site) {
  const items = RAIL.map((it, i) => {
    const g = GARMENTS[it.kind];
    const garment = `<path d="${g.body}" fill="${g.fill}" stroke="var(--navy)" stroke-width="2" stroke-linejoin="round"/>${g.extra}`;
    const label = railTag(t.rail.tags[i] ?? '', it.tagFill, it.tagInk);
    if (it.kind === 'dress') {
      // Món được "lấy ra": rời thanh treo, để lại viền nét đứt và nhãn Đang dùng, rồi quay về
      return `<g transform="translate(${it.x} 0)">
        <path class="ghost" d="${g.body}" fill="none" stroke="var(--navy)" stroke-width="2" stroke-dasharray="6 6" stroke-linejoin="round"/>
        ${HANGER}
        <g class="leave">${garment}${label}</g>
        ${railTag(t.rail.out, 'var(--inuse)', '#fdfbf7', 'outtag')}
      </g>`;
    }
    return `<g transform="translate(${it.x} 0)"><g class="swing s${i}">${HANGER}${garment}${label}</g></g>`;
  }).join('');
  return `<svg class="rail" viewBox="0 0 560 310" role="img" aria-label="${esc(t.rail.label)}">
      <path d="M22 18V46M538 18V46" stroke="var(--navy)" stroke-width="6" stroke-linecap="round"/>
      <path d="M16 46H544" stroke="var(--navy)" stroke-width="7" stroke-linecap="round"/>
      ${items}
    </svg>`;
}

// ── Các khối ──

function phoneDemo(t: Site) {
  const cards = t.demo.items
    .map(
      (it) => `<div class="sh-card">
            <div class="sh-card-photo">
              <span class="sh-ph sh-ph-fill" aria-hidden="true">${icon(it.icon, 56, (1.5 * 24 * 1.15) / 56)}</span>
              ${it.inUse ? `<div class="sh-card-band"><span>${esc(it.inUse)}</span></div>` : ''}
            </div>
            <div class="sh-card-text"><div class="sh-card-name">${esc(it.name)}</div><div class="sh-card-meta">${esc(it.meta)}</div></div>
          </div>`,
    )
    .join('');
  const lit = 19;
  const ticks = Array.from(
    { length: 24 },
    (_, i) => `<span class="sh-tick${i < lit ? ' sh-tick-on' : ''}"></span>`,
  ).join('');
  return `<figure class="phone">
        <div class="phone-screen">
          <figcaption class="demo-head">${tag(t.demo.label)}<span class="demo-summary">${esc(t.demo.summary)}</span></figcaption>
          <div class="demo-grid">${cards}</div>
          <div class="sh-count">
            <div class="sh-count-head"><span class="sh-count-label">${esc(t.demo.timeLeft)}</span><span class="sh-count-due">${esc(t.demo.back)}</span></div>
            <div class="sh-count-time">18:24<span class="sh-count-unit">${esc(t.demo.unit)}</span></div>
            <div class="sh-count-ticks" role="progressbar" aria-label="${esc(t.demo.progress)}" aria-valuemin="0" aria-valuemax="24" aria-valuenow="18.4" aria-valuetext="18:24">${ticks}</div>
            <div class="sh-count-scale" aria-hidden="true"><span>0h</span><span>12h</span><span>24h</span></div>
          </div>
        </div>
      </figure>`;
}

function bento(t: Site) {
  const [search, idle, photos, archive] = t.features.list;
  const head = (f: { title: string; body: string } | undefined) =>
    f ? `<h3>${esc(f.title)}</h3><p>${esc(f.body)}</p>` : '';
  return `<div class="bento">
          <article class="tile tile-search reveal">
            ${head(search)}
            <div class="mock" aria-hidden="true">
              <div class="mock-search">${icon('search', 20)}<span class="typed">${esc(t.bento.query)}</span></div>
              <div class="mock-result"><span class="sh-ph">${icon('jacket', 26, 1.3)}</span><span><b>${esc(t.bento.result)}</b><small>${esc(t.demo.items[1]?.meta ?? '')}</small></span></div>
            </div>
          </article>
          <article class="tile tile-idle reveal">
            ${head(idle)}
            <ul class="mock mock-idle" aria-hidden="true">${t.bento.idle.map((r) => `<li><span>${esc(r.name)}</span><b>${esc(r.days)}</b></li>`).join('')}</ul>
          </article>
          <article class="tile tile-photo reveal">
            ${head(photos)}
            <div class="mock mock-photo" aria-hidden="true">
              <span class="sh-ph">${icon('shirt', 40, 1.2)}</span>
              <span class="gps"><s>${esc(t.bento.gps)}</s><small>${esc(t.bento.gpsGone)}</small></span>
            </div>
          </article>
          <article class="tile tile-archive reveal">
            ${head(archive)}
            <div class="mock mock-archive" aria-hidden="true">${tag(t.demo.items[0]?.name ?? '')}<span class="arrow">→</span>${tag(t.bento.archived, 'archived')}</div>
          </article>
        </div>`;
}

export function homeBody(lang: Lang) {
  const t = SITE[lang];
  // ?lang= để app mở đúng ngôn ngữ của trang người dùng đang đọc
  const signup = `${APP_URL}/signup?lang=${lang}`;
  const [line1, line2] = t.hero.titleLines;
  const marquee = t.marquee.map((m) => `<span>${esc(m)}</span><i>✦</i>`).join('');

  return `      <section class="hero-band">
        <div class="wrap hero">
          <div class="hero-text">
            ${tag(t.hero.eyebrow)}
            <h1><span>${esc(line1 ?? '')}</span> <em>${esc(line2 ?? '')}</em></h1>
            <p class="lead">${esc(t.hero.lead)}</p>
            <div class="actions">
              <a class="sh-btn sh-btn-primary btn-lg" href="${signup}">${esc(t.hero.cta)}${icon('chevron', 20)}</a>
              <a class="sh-btn btn-cream btn-lg" href="${APP_URL}/login?lang=${lang}">${esc(t.hero.secondary)}</a>
            </div>
            <p class="note">${icon('download', 18)}<span>${esc(t.hero.note)}</span></p>
          </div>
          <div class="hero-art">${railScene(t)}</div>
        </div>
      </section>

      <div class="marquee" aria-hidden="true"><div class="marquee-track">${marquee}${marquee}</div></div>

      <section class="wrap block" aria-labelledby="how">
        <h2 id="how" class="display reveal">${esc(t.how.title)}</h2>
        <ol class="tag-steps">
${t.how.steps
  .map(
    (s, i) => `          <li class="tag-step t${i + 1} reveal">
            <div class="tag-card">
              <span class="tag-no" aria-hidden="true">0${i + 1}</span>
              <span class="tag-icon" aria-hidden="true">${icon(s.icon, 26)}</span>
              <h3>${esc(s.title)}</h3>
              <p>${esc(s.body)}</p>
            </div>
          </li>`,
  )
  .join('\n')}
        </ol>
      </section>

      <section class="count-band" aria-labelledby="countdown">
        <div class="wrap count-grid">
          <div class="count-text reveal">
            <p class="big-num" aria-hidden="true">24<small>h</small></p>
            <h2 id="countdown" class="display">${esc(t.countdown.title)}</h2>
            <p class="lead">${esc(t.countdown.body)}</p>
          </div>
          ${phoneDemo(t)}
        </div>
      </section>

      <section class="wrap block" aria-labelledby="features">
        <h2 id="features" class="display reveal">${esc(t.features.title)}</h2>
        ${bento(t)}
      </section>

      <section class="wrap pair">
        <div class="panel panel-navy reveal">
          <span class="panel-icon" aria-hidden="true">${icon('user', 26)}</span>
          <h2>${esc(t.privacy.title)}</h2>
          <p>${esc(t.privacy.body)}</p>
          <p class="panel-links">
            <a class="link" href="${pathOf('privacy', lang)}">${esc(t.legal.privacy)}</a>
            <a class="link" href="${pathOf('terms', lang)}">${esc(t.legal.terms)}</a>
          </p>
        </div>
        <div class="panel panel-later reveal">
          <h2>${esc(t.later.title)}</h2>
          <p>${esc(t.later.lead)}</p>
          <!-- Nhãn viền đứt treo trên dây: thứ chưa có, giống nhãn món đồ đã lưu trữ trong app -->
          <ul class="string-tags">${t.later.list.map((x) => `<li>${tag(x, 'archived')}</li>`).join('')}</ul>
        </div>
      </section>

      <section class="wrap">
        <div class="final reveal">
          <img class="final-logo" src="/icon.svg" alt="" width="120" height="120">
          <h2 class="display">${esc(t.final.title)}</h2>
          <p class="lead">${esc(t.final.body)}</p>
          <a class="sh-btn btn-butter btn-lg" href="${signup}">${icon('plus', 20)}${esc(t.hero.cta)}</a>
        </div>
      </section>`;
}
