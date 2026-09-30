import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { before, describe, it } from 'node:test';
import { build, pathOf } from '../src/build.ts';
import { LEGAL } from '../src/content/legal.ts';
import { LANGS } from '../src/content/site.ts';

const dist = join(import.meta.dirname, '..', 'dist');
const read = (f: string) => readFileSync(join(dist, f), 'utf8');
/** Đường dẫn → file như Workers assets phục vụ (html_handling: auto-trailing-slash) */
const fileFor = (path: string) =>
  (path.endsWith('/') ? `${path}index.html` : existsSync(join(dist, `${path}.html`)) ? `${path}.html` : path).slice(1);

let paths: string[] = [];
before(() => {
  paths = build();
});

describe('build', () => {
  it('sinh đủ trang cho cả hai ngôn ngữ', () => {
    for (const lang of LANGS)
      for (const page of ['home', 'privacy', 'terms'] as const) assert.ok(paths.includes(pathOf(page, lang)));
    assert.ok(existsSync(join(dist, '404.html')));
  });

  it('mỗi trang có lang, canonical, hreflang và không lọt giá trị hỏng', () => {
    for (const lang of LANGS)
      for (const page of ['home', 'privacy', 'terms'] as const) {
        const html = read(fileFor(pathOf(page, lang)));
        assert.match(html, new RegExp(`<html lang="${lang}">`));
        assert.match(html, new RegExp(`rel="canonical" href="https://looklab.space${pathOf(page, lang)}"`));
        for (const l of LANGS)
          assert.ok(html.includes(`hreflang="${l}" href="https://looklab.space${pathOf(page, l)}"`));
        assert.ok(html.includes('hreflang="x-default"'));
        assert.doesNotMatch(html, /undefined|NaN|\[object Object\]/);
      }
  });

  it('link nội bộ đều trỏ tới file có thật', () => {
    for (const p of [...paths.filter((x) => x !== '/404'), '/404']) {
      const html = read(p === '/404' ? '404.html' : fileFor(p));
      for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
        assert.ok(existsSync(join(dist, fileFor(href!))), `${p}: link hỏng ${href}`);
      }
    }
  });

  it('link đăng ký, đăng nhập trỏ sang app.looklab.space', () => {
    for (const lang of LANGS) {
      const html = read(fileFor(pathOf('home', lang)));
      assert.ok(html.includes(`href="https://app.looklab.space/signup?lang=${lang}"`));
      assert.ok(html.includes(`href="https://app.looklab.space/login?lang=${lang}"`));
    }
  });

  it('CSP cho phép đúng script inline của trang chủ', () => {
    const script = read('index.html').match(/<script>(.*?)<\/script>/)?.[1];
    assert.ok(script);
    const hash = createHash('sha256').update(script).digest('base64');
    assert.ok(read('_headers').includes(`'sha256-${hash}'`));
  });

  it('văn bản pháp lý hai ngôn ngữ có cùng số mục', () => {
    for (const doc of ['privacy', 'terms'] as const) {
      const [en, vi] = [LEGAL[doc].en, LEGAL[doc].vi];
      assert.equal(en.sections.length, vi.sections.length, doc);
      en.sections.forEach((s, i) => assert.equal(s.body.length, vi.sections[i]!.body.length, `${doc} mục ${i + 1}`));
    }
  });
});
