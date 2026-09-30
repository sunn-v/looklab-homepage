// Bộ icon nét 1.5px, lưới 24px, chép từ app (sunn-v/looklab, src/ui/icons.ts). Sửa ở app thì chép lại sang đây.
type Part = readonly [tag: 'path' | 'circle' | 'rect', attrs: Record<string, string | number>];

export const ICONS = {
  home: [
    [
      'path',
      {
        d: 'M4 10.2a2 2 0 0 1 .72-1.54l6-5a2 2 0 0 1 2.56 0l6 5A2 2 0 0 1 20 10.2V18a2 2 0 0 1-2 2h-3v-5.5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1V20H6a2 2 0 0 1-2-2z',
      },
    ],
  ],
  closet: [
    ['path', { d: 'M12 9V7.6a2.1 2.1 0 1 0-2.1-2.1' }],
    ['path', { d: 'M12 9l-8.1 5.9A2 2 0 0 0 5.1 18.5h13.8a2 2 0 0 0 1.2-3.6z' }],
  ],
  clock: [
    ['circle', { cx: 12, cy: 12, r: 8.5 }],
    ['path', { d: 'M12 7.5V12l3 2' }],
  ],
  user: [
    ['circle', { cx: 12, cy: 8, r: 3.75 }],
    ['path', { d: 'M4.5 19.5c1.4-3.2 4.2-4.75 7.5-4.75s6.1 1.55 7.5 4.75' }],
  ],
  plus: [['path', { d: 'M12 5v14M5 12h14' }]],
  search: [
    ['circle', { cx: 11, cy: 11, r: 6.5 }],
    ['path', { d: 'M20 20l-4.2-4.2' }],
  ],
  camera: [
    ['path', { d: 'M4 9a2 2 0 0 1 2-2h1.6l1.4-2h6l1.4 2H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z' }],
    ['circle', { cx: 12, cy: 13, r: 3.25 }],
  ],
  image: [
    ['rect', { x: 3.5, y: 4.5, width: 17, height: 15, rx: 3.5 }],
    ['circle', { cx: 9, cy: 10, r: 1.75 }],
    ['path', { d: 'M20.5 15.5l-4.3-4.3a1.5 1.5 0 0 0-2.1 0L6 19.5' }],
  ],
  back: [['path', { d: 'M14.5 5.5L8 12l6.5 6.5' }]],
  edit: [
    ['path', { d: 'M5 19l1-4 9.3-9.3a2 2 0 0 1 2.9 0l.1.1a2 2 0 0 1 0 2.9L9 18z' }],
    ['path', { d: 'M13.5 7.8l2.8 2.8' }],
  ],
  archive: [
    ['rect', { x: 3.5, y: 4.5, width: 17, height: 5, rx: 2 }],
    ['path', { d: 'M5.5 9.5V17a2.5 2.5 0 0 0 2.5 2.5h8a2.5 2.5 0 0 0 2.5-2.5V9.5' }],
    ['path', { d: 'M10 13.5h4' }],
  ],
  trash: [
    ['path', { d: 'M4.5 7h15' }],
    ['path', { d: 'M9 7V5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7' }],
    ['path', { d: 'M6.5 7l.8 11.1a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4L17.5 7' }],
  ],
  return: [
    ['path', { d: 'M9 14L4.5 9.5 9 5' }],
    ['path', { d: 'M4.5 9.5h9.5a5.5 5.5 0 0 1 0 11h-3' }],
  ],
  download: [
    ['path', { d: 'M12 4.5v10' }],
    ['path', { d: 'M7.5 10.5L12 15l4.5-4.5' }],
    ['path', { d: 'M5 19.5h14' }],
  ],
  mail: [
    ['rect', { x: 3.5, y: 5.5, width: 17, height: 13, rx: 2.5 }],
    ['path', { d: 'M4.5 7.5l7.5 5.5 7.5-5.5' }],
  ],
  close: [['path', { d: 'M6.5 6.5l11 11M17.5 6.5l-11 11' }]],
  chevron: [['path', { d: 'M9.5 5.5L16 12l-6.5 6.5' }]],
  shirt: [
    [
      'path',
      {
        d: 'M9 4.5L4.5 6.8a1 1 0 0 0-.45 1.3l1.3 2.7a1 1 0 0 0 1.3.47L8 10.8V19a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8.2l1.35.47a1 1 0 0 0 1.3-.47l1.3-2.7a1 1 0 0 0-.45-1.3L15 4.5c-.5 1.4-1.6 2.2-3 2.2s-2.5-.8-3-2.2z',
      },
    ],
  ],
  pants: [
    [
      'path',
      {
        d: 'M7.2 4h9.6a1 1 0 0 1 1 .92l1.2 14a1 1 0 0 1-1 1.08h-3a1 1 0 0 1-.98-.8L12 11l-2.02 8.2a1 1 0 0 1-.98.8H6a1 1 0 0 1-1-1.08l1.2-14A1 1 0 0 1 7.2 4z',
      },
    ],
    ['path', { d: 'M6.6 7h10.8' }],
  ],
  dress: [
    ['path', { d: 'M10 3.5v3.3L8.3 10.2 5.2 19a.75.75 0 0 0 .7 1h12.2a.75.75 0 0 0 .7-1l-3.1-8.8L14 6.8V3.5' }],
    ['path', { d: 'M8.3 10.2h7.4' }],
  ],
  jacket: [
    ['path', { d: 'M9 4L5.2 5.6a1.5 1.5 0 0 0-.9 1.2L3.2 19.4a.5.5 0 0 0 .5.6H7' }],
    ['path', { d: 'M15 4l3.8 1.6a1.5 1.5 0 0 1 .9 1.2l1.1 12.6a.5.5 0 0 1-.5.6H17' }],
    ['path', { d: 'M7 10v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9' }],
    ['path', { d: 'M9 4l3 3.5L15 4' }],
    ['path', { d: 'M12 7.5V20' }],
  ],
  moon: [['path', { d: 'M19 14.2A7.5 7.5 0 0 1 9.8 5a7.5 7.5 0 1 0 9.2 9.2z' }]],
  more: [
    ['circle', { cx: 6, cy: 12, r: 1.4, fill: 'currentColor', stroke: 'none' }],
    ['circle', { cx: 12, cy: 12, r: 1.4, fill: 'currentColor', stroke: 'none' }],
    ['circle', { cx: 18, cy: 12, r: 1.4, fill: 'currentColor', stroke: 'none' }],
  ],
  check: [['path', { d: 'M5 12.5l4.5 4.5L19 7.5' }]],
  bag: [
    ['path', { d: 'M6.2 8.5h11.6a1 1 0 0 1 1 .9l.9 9.5a1 1 0 0 1-1 1.1H5.3a1 1 0 0 1-1-1.1l.9-9.5a1 1 0 0 1 1-.9z' }],
    ['path', { d: 'M9 8.5V7a3 3 0 0 1 6 0v1.5' }],
  ],
} satisfies Record<string, readonly Part[]>;

export type IconName = keyof typeof ICONS;
