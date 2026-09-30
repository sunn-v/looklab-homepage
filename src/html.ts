// Mảnh HTML dùng chung cho mọi trang: escape, icon, nhãn, đường dẫn theo ngôn ngữ.
import type { Lang } from './content/site.ts';
import { ICONS, type IconName } from './icons.ts';

export type Page = 'home' | 'privacy' | 'terms';

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Escape mọi chữ lấy từ content trước khi đưa vào HTML */
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]!);

/** Đường dẫn của một trang theo ngôn ngữ: EN không có tiền tố, VI nằm dưới /vi/ */
export function pathOf(page: Page, lang: Lang) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  return page === 'home' ? `${prefix}/` : `${prefix}/${page}`;
}

export function icon(name: string, size = 24, weight = 1.5) {
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

export const tag = (text: string, tone?: 'archived') =>
  `<span class="sh-tag${tone ? ` sh-tag-${tone}` : ''}"><span class="sh-tag-eyelet" aria-hidden="true"></span>${esc(text)}</span>`;

export const badge = (name: string) => `<span class="badge" aria-hidden="true">${icon(name, 22)}</span>`;
