// Chính sách quyền riêng tư và Điều khoản sử dụng, song ngữ. Viết theo đúng những gì app (repo sunn-v/looklab) đang làm:
// sửa hành vi thu thập/lưu dữ liệu thì sửa cả ở đây và đổi LEGAL_UPDATED.
import type { Lang } from './site.ts';

/** Ngày cập nhật gần nhất (YYYY-MM-DD), dùng chung cho cả hai văn bản */
export const LEGAL_UPDATED = '2026-09-29';
export const CONTACT_EMAIL = 'support@looklab.space';

/** Mỗi phần tử body: chuỗi = một đoạn văn, mảng = danh sách gạch đầu dòng */
export type LegalDoc = {
  title: string;
  intro: string;
  sections: { heading: string; body: (string | string[])[] }[];
};

const privacyEn: LegalDoc = {
  title: 'Privacy policy',
  intro: `LookLab (looklab.space) is a personal wardrobe app run by an independent developer based in Vietnam (“we”, “us”). This policy explains what we collect when you use LookLab, why we need it, and the choices you have. If anything is unclear, write to ${CONTACT_EMAIL}.`,
  sections: [
    {
      heading: 'What we collect',
      body: [
        [
          'Account details: your name, email address and password. We never store the password itself, only a salted scrypt hash that can’t be turned back into it. If you sign in with Google, Google gives us your name, email address and a link to your profile picture.',
          'Your closet: the items you add (name, category, colour, size, brand, notes), the photos you upload, and when you take items out and return them.',
          'Photos: resized on your device before upload. Your device also removes embedded details such as location and camera model (EXIF) before a photo is sent to us.',
          'Sign-in sessions: when you sign in, we store a session together with your IP address and browser type, so you stay signed in and we can spot misuse.',
          'Technical logs: our hosting provider records requests (time, address requested, IP address, errors) for up to 7 days so we can fix problems.',
          'On your device: your language choice is saved in your browser. The app stores its own files for a faster start, but never your items or photos.',
        ],
        'We don’t collect payment details, contacts or your precise location, and LookLab has no advertising or analytics trackers.',
      ],
    },
    {
      heading: 'How we use it',
      body: [
        [
          'To run LookLab for you: keep your closet, show your photos only to you, and return items to your closet after 24 hours.',
          'To keep your account safe: sign-in, email confirmation, password resets and bot protection.',
          'To send service emails: confirming your email, resetting your password, or telling you that someone tried to sign up with your address. We don’t send marketing emails.',
          'To find and fix bugs and keep the service running.',
        ],
        'We use your data because you asked us to provide LookLab and agreed to this policy when you created your account. We don’t sell or rent your data, and we don’t use your closet to show you ads.',
      ],
    },
    {
      heading: 'Who we share it with',
      body: [
        'Only with the providers that run LookLab for us, and only what each of them needs:',
        [
          'Cloudflare: hosting, database, photo storage and bot protection (Turnstile). Turnstile looks at signals such as your IP address and browser details to tell people from bots.',
          'Resend: delivering account emails. It receives your email address and the content of those emails.',
          'Google: only if you choose to sign in with Google. Google’s own privacy policy covers your Google account.',
        ],
        'We may also disclose data when the law requires it. We will never give or sell your data to anyone else.',
      ],
    },
    {
      heading: 'Where your data is stored',
      body: [
        'LookLab runs on Cloudflare’s global network. Your data may be stored and processed in countries other than the one you live in, including outside Vietnam. Our providers protect it under their own contracts and security programmes.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        [
          'Your account and closet: for as long as your account exists.',
          'After you delete your account: your account, items and history are removed from our database straight away, and your photos are removed from storage within about 15 minutes. Our database provider keeps rolling backups for recovery, so copies can remain there for up to 30 days before they expire.',
          'Items and photos you delete are removed straight away, with the same backup window of up to 30 days.',
          'Request logs: up to 7 days. Email delivery records: kept by Resend for a limited time.',
        ],
      ],
    },
    {
      heading: 'Your choices and rights',
      body: [
        [
          'See and download your data: Account → Download my data gives you a file with your account, items and usage history. Photos aren’t included yet; you can open and save each one in the app.',
          'Correct it: edit your items at any time. To change your name or email address, write to us.',
          'Delete it: delete single items or photos in the app, or your whole account under Account → Delete account.',
          'Withdraw consent or object: you can stop at any time by deleting your account, or write to us about a specific use.',
        ],
        `For any request, write to ${CONTACT_EMAIL}. We’ll answer as soon as we can and within the time the law requires. You can also complain to the personal data protection authority where you live; in Vietnam, that authority sits under the Ministry of Public Security.`,
      ],
    },
    {
      heading: 'Security',
      body: [
        'Everything travels over HTTPS. Passwords are hashed, every account can reach only its own data, and photos are served only to their owner. Email confirmation and bot protection make fake sign-ups harder. No system is perfectly secure: if a breach affects your data, we will tell you and the authorities as the law requires.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'LookLab isn’t meant for children under 16. If you are under 16, use it only with a parent’s or guardian’s permission. If you believe a child has given us data without that permission, write to us and we will delete it.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'When we change this policy, we update the date at the top. If a change affects how we use your data in a significant way, we will tell you by email or in the app before it applies.',
      ],
    },
    {
      heading: 'Contact',
      body: [`Questions or requests about your data: ${CONTACT_EMAIL}.`],
    },
  ],
};

const privacyVi: LegalDoc = {
  title: 'Chính sách quyền riêng tư',
  intro: `LookLab (looklab.space) là ứng dụng quản lý tủ đồ cá nhân do một nhà phát triển độc lập tại Việt Nam vận hành (“chúng tôi”). Chính sách này giải thích chúng tôi thu thập gì khi bạn dùng LookLab, vì sao cần, và bạn có những lựa chọn nào. Có điều gì chưa rõ, hãy viết cho ${CONTACT_EMAIL}.`,
  sections: [
    {
      heading: 'Chúng tôi thu thập gì',
      body: [
        [
          'Thông tin tài khoản: tên, địa chỉ email và mật khẩu của bạn. Chúng tôi không bao giờ lưu chính mật khẩu, chỉ lưu bản băm scrypt có muối, không thể dịch ngược lại thành mật khẩu. Nếu bạn đăng nhập bằng Google, Google gửi cho chúng tôi tên, email và đường link ảnh đại diện của bạn.',
          'Tủ đồ của bạn: các món bạn thêm (tên, loại, màu, cỡ, thương hiệu, ghi chú), ảnh bạn tải lên, và thời điểm bạn lấy đồ ra và trả về tủ.',
          'Ảnh: được thu nhỏ ngay trên máy bạn trước khi tải lên. Máy bạn cũng xoá các thông tin đi kèm ảnh như vị trí và dòng máy (EXIF) trước khi gửi ảnh cho chúng tôi.',
          'Phiên đăng nhập: khi bạn đăng nhập, chúng tôi lưu một phiên kèm địa chỉ IP và loại trình duyệt, để bạn không phải đăng nhập lại liên tục và để phát hiện hành vi lạm dụng.',
          'Nhật ký kỹ thuật: nhà cung cấp hạ tầng ghi lại các yêu cầu (thời gian, địa chỉ được truy cập, địa chỉ IP, lỗi) tối đa 7 ngày để chúng tôi sửa lỗi.',
          'Trên máy bạn: lựa chọn ngôn ngữ được lưu trong trình duyệt. Ứng dụng lưu sẵn các tệp của chính nó để mở nhanh hơn, nhưng không lưu món đồ hay ảnh của bạn.',
        ],
        'Chúng tôi không thu thập thông tin thanh toán, danh bạ hay vị trí chính xác của bạn, và LookLab không dùng công cụ theo dõi quảng cáo hay phân tích.',
      ],
    },
    {
      heading: 'Chúng tôi dùng để làm gì',
      body: [
        [
          'Để vận hành LookLab cho bạn: lưu tủ đồ, chỉ hiện ảnh cho chính bạn, và đưa đồ về tủ sau 24 giờ.',
          'Để giữ an toàn cho tài khoản: đăng nhập, xác nhận email, đặt lại mật khẩu và chặn bot.',
          'Để gửi email dịch vụ: xác nhận email, đặt lại mật khẩu, hoặc báo cho bạn khi có người thử đăng ký bằng địa chỉ của bạn. Chúng tôi không gửi email quảng cáo.',
          'Để tìm, sửa lỗi và giữ cho dịch vụ hoạt động.',
        ],
        'Chúng tôi xử lý dữ liệu của bạn vì bạn yêu cầu dùng LookLab và đã đồng ý với chính sách này khi tạo tài khoản. Chúng tôi không bán hay cho thuê dữ liệu của bạn, và không dùng tủ đồ của bạn để hiển thị quảng cáo.',
      ],
    },
    {
      heading: 'Chúng tôi chia sẻ với ai',
      body: [
        'Chỉ với các nhà cung cấp vận hành LookLab cho chúng tôi, và mỗi bên chỉ nhận phần họ cần:',
        [
          'Cloudflare: máy chủ, cơ sở dữ liệu, lưu trữ ảnh và chống bot (Turnstile). Turnstile xem các tín hiệu như địa chỉ IP và thông tin trình duyệt để phân biệt người với bot.',
          'Resend: gửi email tài khoản. Resend nhận địa chỉ email của bạn và nội dung các email đó.',
          'Google: chỉ khi bạn chọn đăng nhập bằng Google. Tài khoản Google của bạn tuân theo chính sách quyền riêng tư của Google.',
        ],
        'Chúng tôi cũng có thể cung cấp dữ liệu khi pháp luật yêu cầu. Ngoài ra, chúng tôi không bao giờ đưa hay bán dữ liệu của bạn cho bất kỳ ai.',
      ],
    },
    {
      heading: 'Dữ liệu được lưu ở đâu',
      body: [
        'LookLab chạy trên mạng lưới toàn cầu của Cloudflare. Dữ liệu của bạn có thể được lưu và xử lý ở quốc gia khác với nơi bạn sống, kể cả ngoài Việt Nam. Các nhà cung cấp bảo vệ dữ liệu theo hợp đồng và chương trình bảo mật của họ.',
      ],
    },
    {
      heading: 'Chúng tôi giữ trong bao lâu',
      body: [
        [
          'Tài khoản và tủ đồ: trong suốt thời gian tài khoản còn tồn tại.',
          'Sau khi bạn xoá tài khoản: tài khoản, món đồ và lịch sử bị xoá khỏi cơ sở dữ liệu ngay lập tức, ảnh bị xoá khỏi kho lưu trữ trong khoảng 15 phút. Nhà cung cấp cơ sở dữ liệu giữ bản sao lưu cuộn để khôi phục khi có sự cố, nên bản sao có thể còn ở đó tối đa 30 ngày rồi tự hết hạn.',
          'Món đồ và ảnh bạn xoá lẻ bị xoá ngay, và cũng có thể còn trong bản sao lưu tối đa 30 ngày.',
          'Nhật ký yêu cầu: tối đa 7 ngày. Nhật ký gửi email: Resend giữ trong một thời gian có hạn.',
        ],
      ],
    },
    {
      heading: 'Lựa chọn và quyền của bạn',
      body: [
        [
          'Xem và tải dữ liệu: Tài khoản → Tải dữ liệu của tôi cho bạn một tệp gồm tài khoản, món đồ và lịch sử dùng. Tệp chưa kèm ảnh; bạn có thể mở và lưu từng ảnh trong ứng dụng.',
          'Sửa: bạn sửa món đồ bất cứ lúc nào. Muốn đổi tên hoặc email, hãy viết cho chúng tôi.',
          'Xoá: xoá từng món hoặc từng ảnh trong ứng dụng, hoặc xoá cả tài khoản ở Tài khoản → Xoá tài khoản.',
          'Rút lại sự đồng ý hoặc phản đối: bạn có thể dừng bất cứ lúc nào bằng cách xoá tài khoản, hoặc viết cho chúng tôi về một mục đích xử lý cụ thể.',
        ],
        `Với mọi yêu cầu, hãy viết cho ${CONTACT_EMAIL}. Chúng tôi sẽ trả lời sớm nhất có thể và trong thời hạn pháp luật quy định. Bạn cũng có thể khiếu nại tới cơ quan bảo vệ dữ liệu cá nhân nơi bạn sống; tại Việt Nam, cơ quan này thuộc Bộ Công an.`,
      ],
    },
    {
      heading: 'Bảo mật',
      body: [
        'Mọi dữ liệu đều đi qua HTTPS. Mật khẩu được băm, mỗi tài khoản chỉ truy cập được dữ liệu của chính mình, và ảnh chỉ hiện cho người sở hữu. Xác nhận email và chống bot giúp hạn chế tài khoản giả. Không hệ thống nào an toàn tuyệt đối: nếu có sự cố lộ lọt ảnh hưởng tới dữ liệu của bạn, chúng tôi sẽ thông báo cho bạn và cơ quan chức năng theo quy định của pháp luật.',
      ],
    },
    {
      heading: 'Trẻ em',
      body: [
        'LookLab không dành cho trẻ em dưới 16 tuổi. Nếu bạn dưới 16 tuổi, chỉ dùng khi có sự đồng ý của cha mẹ hoặc người giám hộ. Nếu bạn cho rằng một trẻ em đã cung cấp dữ liệu cho chúng tôi mà chưa có sự đồng ý đó, hãy báo để chúng tôi xoá.',
      ],
    },
    {
      heading: 'Thay đổi chính sách',
      body: [
        'Khi thay đổi chính sách này, chúng tôi cập nhật ngày ở đầu trang. Nếu thay đổi ảnh hưởng đáng kể tới cách dùng dữ liệu của bạn, chúng tôi sẽ báo qua email hoặc trong ứng dụng trước khi áp dụng.',
      ],
    },
    {
      heading: 'Liên hệ',
      body: [`Câu hỏi hoặc yêu cầu về dữ liệu của bạn: ${CONTACT_EMAIL}.`],
    },
  ],
};

const termsEn: LegalDoc = {
  title: 'Terms of use',
  intro: `These terms apply when you use LookLab (looklab.space), a personal wardrobe app run by an independent developer based in Vietnam (“we”, “us”). By creating an account or using LookLab, you agree to them. If you don’t agree, please don’t use LookLab. Our privacy policy explains how we handle your data.`,
  sections: [
    {
      heading: 'Your account',
      body: [
        [
          'Give accurate details and keep your email address up to date, because that’s where sign-in and password emails go.',
          'Keep your password safe. You’re responsible for what happens in your account.',
          'One person per account. LookLab isn’t meant for children under 16 without a parent’s or guardian’s permission.',
        ],
      ],
    },
    {
      heading: 'Your content',
      body: [
        'The items, notes and photos you add stay yours. You let us store, process (for example, resize photos) and show them to you, only as needed to run LookLab. This permission ends when you delete the content or your account.',
        'Only upload photos you have the right to use. Don’t upload illegal content, or images of other people without their permission.',
      ],
    },
    {
      heading: 'Acceptable use',
      body: [
        'Please don’t:',
        [
          'break the law or use LookLab to harm others;',
          'try to access other people’s accounts or data, or get around our security;',
          'overload or disrupt the service, or create accounts or requests with bots or scripts;',
          'upload malware or anything designed to damage devices or systems.',
        ],
      ],
    },
    {
      heading: 'The service',
      body: [
        'LookLab is free for now. Current limits are 500 items per account and 5 photos per item. We may change features and limits over time, and we will give notice before changes that take something away from you.',
        'We work to keep LookLab running and your data safe, but we can’t promise it will always be available or free of errors. Keep your own copies of anything important, for example with Account → Download my data.',
      ],
    },
    {
      heading: 'Ending your use',
      body: [
        'You can stop using LookLab and delete your account at any time. We may suspend or close an account that seriously or repeatedly breaks these terms or puts the service or other people at risk. Where reasonable, we will warn you first and give you a chance to download your data.',
      ],
    },
    {
      heading: 'Liability',
      body: [
        'LookLab is provided “as is”. As far as the law allows, we aren’t liable for indirect or unforeseeable losses, or for losses caused by events outside our reasonable control. Nothing in these terms limits rights you have under consumer protection law, or liability that the law doesn’t allow us to limit.',
      ],
    },
    {
      heading: 'Changes to these terms',
      body: [
        'When we change these terms, we update the date at the top. For significant changes, we will tell you by email or in the app before they apply. If you keep using LookLab after that, the new terms apply.',
      ],
    },
    {
      heading: 'Law and disputes',
      body: [
        'These terms are governed by the laws of Vietnam. If something goes wrong, please write to us first and we will try to sort it out. Disputes that can’t be resolved that way go to the competent courts of Vietnam.',
      ],
    },
    {
      heading: 'Contact',
      body: [`Questions about these terms: ${CONTACT_EMAIL}.`],
    },
  ],
};

const termsVi: LegalDoc = {
  title: 'Điều khoản sử dụng',
  intro: `Các điều khoản này áp dụng khi bạn dùng LookLab (looklab.space), ứng dụng quản lý tủ đồ cá nhân do một nhà phát triển độc lập tại Việt Nam vận hành (“chúng tôi”). Khi tạo tài khoản hoặc dùng LookLab, bạn đồng ý với các điều khoản này. Nếu không đồng ý, vui lòng không dùng LookLab. Cách chúng tôi xử lý dữ liệu của bạn nằm trong chính sách quyền riêng tư.`,
  sections: [
    {
      heading: 'Tài khoản của bạn',
      body: [
        [
          'Cung cấp thông tin chính xác và giữ email luôn đúng, vì mọi email đăng nhập và đặt lại mật khẩu sẽ gửi tới đó.',
          'Giữ mật khẩu an toàn. Bạn chịu trách nhiệm về mọi hoạt động trong tài khoản của mình.',
          'Mỗi tài khoản dành cho một người. LookLab không dành cho trẻ em dưới 16 tuổi nếu chưa có sự đồng ý của cha mẹ hoặc người giám hộ.',
        ],
      ],
    },
    {
      heading: 'Nội dung của bạn',
      body: [
        'Món đồ, ghi chú và ảnh bạn thêm vẫn thuộc về bạn. Bạn cho phép chúng tôi lưu trữ, xử lý (ví dụ thu nhỏ ảnh) và hiển thị chúng cho bạn, chỉ trong phạm vi cần để vận hành LookLab. Quyền này chấm dứt khi bạn xoá nội dung hoặc xoá tài khoản.',
        'Chỉ tải lên ảnh bạn có quyền sử dụng. Không tải lên nội dung vi phạm pháp luật, hoặc ảnh người khác khi chưa được họ cho phép.',
      ],
    },
    {
      heading: 'Sử dụng đúng mục đích',
      body: [
        'Vui lòng không:',
        [
          'vi phạm pháp luật hoặc dùng LookLab để gây hại cho người khác;',
          'tìm cách truy cập tài khoản, dữ liệu của người khác, hoặc vượt qua các biện pháp bảo mật;',
          'làm quá tải, gây gián đoạn dịch vụ, hoặc dùng bot, script để tạo tài khoản hay gửi yêu cầu;',
          'tải lên mã độc hoặc bất cứ thứ gì nhằm phá hoại thiết bị, hệ thống.',
        ],
      ],
    },
    {
      heading: 'Dịch vụ',
      body: [
        'Hiện tại LookLab miễn phí. Giới hạn hiện nay là 500 món mỗi tài khoản và 5 ảnh mỗi món. Chúng tôi có thể thay đổi tính năng và giới hạn theo thời gian, và sẽ báo trước khi thay đổi làm bạn mất đi thứ gì đó.',
        'Chúng tôi cố gắng giữ LookLab luôn hoạt động và dữ liệu của bạn an toàn, nhưng không thể cam kết dịch vụ lúc nào cũng sẵn sàng hay không có lỗi. Hãy tự giữ bản sao những gì quan trọng, ví dụ bằng Tài khoản → Tải dữ liệu của tôi.',
      ],
    },
    {
      heading: 'Ngừng sử dụng',
      body: [
        'Bạn có thể ngừng dùng LookLab và xoá tài khoản bất cứ lúc nào. Chúng tôi có thể tạm khoá hoặc đóng tài khoản vi phạm nghiêm trọng hoặc lặp lại các điều khoản này, hoặc gây rủi ro cho dịch vụ hay người khác. Khi hợp lý, chúng tôi sẽ cảnh báo trước và cho bạn cơ hội tải dữ liệu về.',
      ],
    },
    {
      heading: 'Trách nhiệm',
      body: [
        'LookLab được cung cấp “nguyên trạng”. Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về thiệt hại gián tiếp, không lường trước được, hoặc do sự kiện nằm ngoài khả năng kiểm soát hợp lý của chúng tôi. Không điều khoản nào ở đây hạn chế các quyền của bạn theo pháp luật bảo vệ người tiêu dùng, hoặc trách nhiệm mà pháp luật không cho phép giới hạn.',
      ],
    },
    {
      heading: 'Thay đổi điều khoản',
      body: [
        'Khi thay đổi các điều khoản này, chúng tôi cập nhật ngày ở đầu trang. Với thay đổi quan trọng, chúng tôi sẽ báo qua email hoặc trong ứng dụng trước khi áp dụng. Nếu bạn tiếp tục dùng LookLab sau đó, điều khoản mới sẽ được áp dụng.',
      ],
    },
    {
      heading: 'Luật áp dụng và tranh chấp',
      body: [
        'Các điều khoản này tuân theo pháp luật Việt Nam. Nếu có vấn đề, hãy viết cho chúng tôi trước để hai bên cùng giải quyết. Tranh chấp không giải quyết được theo cách đó sẽ do toà án có thẩm quyền tại Việt Nam giải quyết.',
      ],
    },
    {
      heading: 'Liên hệ',
      body: [`Câu hỏi về các điều khoản này: ${CONTACT_EMAIL}.`],
    },
  ],
};

export const LEGAL: Record<'privacy' | 'terms', Record<Lang, LegalDoc>> = {
  privacy: { en: privacyEn, vi: privacyVi },
  terms: { en: termsEn, vi: termsVi },
};
