// Chữ trên trang giới thiệu, song ngữ. Tiếng Anh là chính; vi phải có đủ mọi key của en (TypeScript kiểm tra).

export type Lang = 'en' | 'vi';
export const LANGS: Lang[] = ['en', 'vi'];

/** Địa chỉ app; mọi nút đăng ký / đăng nhập trỏ về đây */
export const APP_URL = 'https://app.looklab.space';
/** Địa chỉ trang này, dùng cho canonical, hreflang, sitemap */
export const SITE_URL = 'https://looklab.space';

const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  appName: 'LookLab',
  homeTitle: 'LookLab · A tag for every piece of clothing',
  description:
    'LookLab gives every piece of clothing its own tag. Take something out to wear, and 24 hours later it’s back in your closet by itself.',
  nav: { signIn: 'Sign in', home: 'LookLab home', language: 'Language' },
  language: { en: 'English', vi: 'Tiếng Việt' },
  hero: {
    eyebrow: 'Your closet, tagged',
    title: 'Know what’s in your closet, and what’s out.',
    lead: 'LookLab gives every piece of clothing its own tag. Take something out to wear, and 24 hours later it’s back in your closet by itself.',
    cta: 'Open your closet',
    secondary: 'I have an account',
    note: 'Runs in your phone’s browser. Add it to your home screen to open it like an app.',
  },
  demo: {
    label: 'Example closet',
    summary: '2 items · 1 in use',
    items: [
      { name: 'Cream turtleneck', meta: 'Tops · M', icon: 'shirt', inUse: 'In use 18:24' },
      { name: 'Denim jacket', meta: 'Outerwear · L', icon: 'jacket', inUse: '' },
    ],
    timeLeft: 'Time left',
    back: 'Back at 17:20 tomorrow',
    unit: 'hrs : min',
    progress: 'Time until it goes back to the closet',
  },
  how: {
    title: 'How it works',
    steps: [
      {
        icon: 'camera',
        title: 'Tag each piece',
        body: 'Add a name, category, colour, size and up to 5 photos. Use your camera or pick from your library.',
      },
      {
        icon: 'clock',
        title: 'Take it out',
        body: 'Tap Take out when you wear something. It moves to In use with a 24-hour countdown.',
      },
      {
        icon: 'return',
        title: 'It comes back by itself',
        body: 'After 24 hours it’s back in your closet, even if you forget. Return it early any time.',
      },
    ],
  },
  features: {
    title: 'Made for an everyday closet',
    list: [
      {
        icon: 'search',
        title: 'Search the way you type',
        body: 'Find items by name, with or without Vietnamese accents: “ao khoac” finds “Áo khoác”.',
      },
      {
        icon: 'closet',
        title: 'See what you never wear',
        body: 'Home shows pieces you haven’t taken out in a while, and every item keeps its usage history.',
      },
      {
        icon: 'image',
        title: 'Light, private photos',
        body: 'Photos are resized on your phone and their location data is removed before upload.',
      },
      {
        icon: 'archive',
        title: 'Put away, not thrown away',
        body: 'Archiving hides an item but keeps its history. Restore it later, or delete it for good.',
      },
    ],
  },
  privacy: {
    title: 'Your closet is yours',
    body: 'Each account sees only its own items. Download your data or delete your account and everything in it, right from the app.',
  },
  later: {
    title: 'Coming later',
    lead: 'Clothes are the first closet. Planned next:',
    list: [
      'Closets for shoes, books and tools',
      'Take out a whole outfit at once',
      'Share a closet with your family',
      'A reminder before an item goes back',
    ],
  },
  final: { title: 'Start with one piece', body: 'Add your first item and give it a tag.' },
  legal: {
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    updated: (date: string) => `Last updated ${date}`,
    back: 'Back to LookLab',
  },
  notFound: {
    title: 'Page not found',
    body: 'This page doesn’t exist or has moved.',
    home: 'Go to LookLab',
  },
};

export type Site = typeof en;

const vi: Site = {
  htmlLang: 'vi',
  ogLocale: 'vi_VN',
  appName: 'LookLab',
  homeTitle: 'LookLab · Mỗi món đồ một chiếc nhãn',
  description: 'LookLab gắn cho mỗi món quần áo một chiếc nhãn riêng. Lấy ra mặc, 24 giờ sau món đó tự về lại tủ.',
  nav: { signIn: 'Đăng nhập', home: 'Trang chủ LookLab', language: 'Ngôn ngữ' },
  language: { en: 'English', vi: 'Tiếng Việt' },
  hero: {
    eyebrow: 'Tủ đồ có nhãn',
    title: 'Biết món nào trong tủ, món nào đang mặc.',
    lead: 'LookLab gắn cho mỗi món quần áo một chiếc nhãn riêng. Lấy ra mặc, 24 giờ sau món đó tự về lại tủ.',
    cta: 'Mở tủ đồ của bạn',
    secondary: 'Mình đã có tài khoản',
    note: 'Chạy ngay trên trình duyệt điện thoại. Thêm vào màn hình chính để mở như một app.',
  },
  demo: {
    label: 'Tủ đồ mẫu',
    summary: '2 món · 1 đang dùng',
    items: [
      { name: 'Áo len cổ lọ màu kem', meta: 'Áo · M', icon: 'shirt', inUse: 'Đang dùng 18:24' },
      { name: 'Áo khoác jean', meta: 'Áo khoác · L', icon: 'jacket', inUse: '' },
    ],
    timeLeft: 'Còn lại',
    back: 'Về tủ lúc 17:20 ngày mai',
    unit: 'giờ : phút',
    progress: 'Thời gian tới khi món đồ về tủ',
  },
  how: {
    title: 'Cách hoạt động',
    steps: [
      {
        icon: 'camera',
        title: 'Gắn nhãn từng món',
        body: 'Thêm tên, danh mục, màu, size và tối đa 5 ảnh. Chụp bằng camera hoặc chọn ảnh có sẵn.',
      },
      {
        icon: 'clock',
        title: 'Lấy ra dùng',
        body: 'Bấm Lấy ra dùng khi mặc một món. Món đó chuyển sang Đang dùng, kèm đếm ngược 24 giờ.',
      },
      {
        icon: 'return',
        title: 'Tự về lại tủ',
        body: 'Sau 24 giờ món đồ tự về tủ, kể cả khi bạn quên. Muốn trả sớm lúc nào cũng được.',
      },
    ],
  },
  features: {
    title: 'Làm cho tủ đồ hằng ngày',
    list: [
      {
        icon: 'search',
        title: 'Tìm như bạn vẫn gõ',
        body: 'Tìm theo tên, có dấu hay không dấu đều được: gõ “ao khoac” vẫn ra “Áo khoác”.',
      },
      {
        icon: 'closet',
        title: 'Thấy món lâu chưa mặc',
        body: 'Trang chủ hiện những món lâu rồi bạn chưa lấy ra, và mỗi món đều giữ lịch sử dùng.',
      },
      {
        icon: 'image',
        title: 'Ảnh nhẹ và riêng tư',
        body: 'Ảnh được thu nhỏ ngay trên điện thoại và bỏ thông tin vị trí trước khi tải lên.',
      },
      {
        icon: 'archive',
        title: 'Cất đi, không vứt đi',
        body: 'Lưu trữ ẩn món đồ nhưng giữ lịch sử. Khôi phục lại khi cần, hoặc xoá vĩnh viễn.',
      },
    ],
  },
  privacy: {
    title: 'Tủ của bạn là của bạn',
    body: 'Mỗi tài khoản chỉ thấy đồ của mình. Tải dữ liệu về hoặc xoá tài khoản cùng mọi thứ trong đó, ngay trong app.',
  },
  later: {
    title: 'Sắp có',
    lead: 'Tủ quần áo là tủ đầu tiên. Dự định tiếp theo:',
    list: [
      'Tủ giày, tủ sách, tủ đồ nghề',
      'Lấy cả bộ đồ ra dùng một lần',
      'Dùng chung tủ với gia đình',
      'Nhắc trước khi món đồ về tủ',
    ],
  },
  final: { title: 'Bắt đầu từ một món', body: 'Thêm món đồ đầu tiên và gắn cho nó một chiếc nhãn.' },
  legal: {
    privacy: 'Chính sách quyền riêng tư',
    terms: 'Điều khoản sử dụng',
    updated: (date: string) => `Cập nhật lần cuối ${date}`,
    back: 'Về LookLab',
  },
  notFound: {
    title: 'Không tìm thấy trang',
    body: 'Trang này không tồn tại hoặc đã được chuyển đi.',
    home: 'Về LookLab',
  },
};

export const SITE: Record<Lang, Site> = { en, vi };
