import { GuestAccountType } from "./type";

export const COOKIE_ACCESS_TOKEN_KEY = "access_token";
export const MAX_FILE_SIZE = 5000000;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ID_CHAT_BOT = "0308051202024GZMTH";
export const API_PRIVATE_SOCKET_URL =
  "https://test-mental-heath-backend-production.up.railway.app";

export const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    JOIN_NOTIFICATION_IDENTIFY: "JOIN_NOTIFICATION",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

export const PERMISSION_POST = {
  PUBLIC: "genzmth@pms_p_345432",
  PRIVATE: "genzmth@pms_p_887123",
  FOLLOW: "genzmth@pms_p_6673892",
};

export const TYPE_NOTIFY = {
  LIKE: "@genz-mth-ntf-997",
  COMMENT: "@genz-mth-ntf-994",
  SHARE: "@genz-mth-ntf-993",
  ACCEPT_FL: "@genz-mth-ntf-995",
  REQUEST_FL: "@genz-mth-ntf-996",
};

export const TYPE_ACTION_USER = {
  LIKE_POST: "@genz-mth-oie-3213",
  COMMENT_POST: "@genz-mth-oie-3453",
  SHARE_POST: "@genz-mth-dsa-0954",
  FOLLOW_REQUEST: "@genz-mth-dsa-0614",
  FOLLOW_ACCEPT: "@genz-mth-dsa-0654",
  READ_POST: "@genz-mth-dsa-54623",
  READ_BLOG: "@genz-mth-dsa-76575",
  VIEW_ACCOUNT: "@genz-mth-dsa-54567",
};

export const TYPE_QUOTE_BLOG = "@genz-mth-ncc-83649";
export const TYPE_QUOTE_HOME = "@genz-mth-ewqs-85674";
//VỀ CHÚNG TÔI
export const TYPE_INFO_COMPANY_ABOUT_US = "@genz-mth-ifcmp32143124";
//Sứ mệnh của chúng tôI
export const TYPE_INFO_COMPANY_TARGET = "@genz-mth-ifcmp32143124";
//ại sao chúng tôi lại bắt đầ
export const TYPE_INFO_COMPANY_WHY_MAKE = "@genz-mth-ifcmp32143213aws";
//LỜI CHỨNG THỰC
export const TYPE_INFO_COMPANY_RESPONSIBILITY = "@genz-mth-ifcmp32d9373213aws";
//Đội ngũ sáng tạo của chúng tôi
export const TYPE_INFO_COMPANY_ABOUT_MEMBER = "@genz-mth-jfdsius34134s";

//account guest
export const GUEST_LIST_ACCOUNT: Array<GuestAccountType> = [
  { key: 0, id: 'ninjadaulanh12313123', name: 'Ninja Đầu Lạnh', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/ninja-dau-lanh.png" },
  { key: 1, id: 'thanhluoibieng12312312', name: 'Thánh Lười Biếng', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/thanh-luoi-bieng.png" },
  { key: 2, id: 'meoluoichanh12311223', name: 'Mèo Lười Chảnh', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/meo-luoi-chanh.png" },
  { key: 3, id: 'thongongac12311234', name: 'Thỏ Ngơ Ngác', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/tho-ngo-ngac.png" },
  { key: 4, id: 'gautrucanhai12312445', name: 'Gấu Trúc Ăn Hại', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/gau-truc-an-hai.png" },
  { key: 5, id: 'bexoailan12351235', name: 'Bé Xoài Lăn', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/be-xoai-lan.png" },
  { key: 6, id: 'daudausieuquay123665', name: 'Đậu Đậu Siêu Quậy', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/dau-dau-sieu-quay.png" },
  { key: 7, id: 'cavangquennao12312345', name: 'Cá Vàng Quên Não', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/ca-vang-quen-nao.png" },
  { key: 8, id: 'daigiabosua12377885', name: 'Đại Gia Bò Sữa', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/dai-gia-bo-sua.png" },
  { key: 9, id: 'socsieunhang12321255', name: 'Sóc Siêu Nhắng', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/soc-sieu-nhang.png" },
  { key: 10, id: 'cudemvodich12323112', name: 'Cú Đêm Vô Địch', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/cu-dem-vo-dich.png" },
  { key: 11, id: 'bebapmenu12321345', name: 'Bé Bắp Mê Ngủ', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/be-bap-me-ngu.png" },
  { key: 12, id: 'luonleolongvong12388766', name: 'Lươn Leo Lòng Vòng', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/luon-leo-long-vong.png" },
  { key: 13, id: 'banhbaosieucap12345566', name: 'Bánh Bao Siêu Cấp', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/banh-bao-sieu-cap.png" },
  { key: 14, id: 'sutuso123234523', name: 'Sư Tử Sợ Chuột', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/su-tu-so-chuot.png" },
  { key: 15, id: 'garungbantia12321345', name: 'Gà Rừng Bắn Tia', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/ga-rung-ban-tia.png" },
  { key: 16, id: 'thangio12312434', name: 'Thần Gió Lặng', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/than-gio-lang.png" },
  { key: 17, id: 'teptinhnghich12312234', name: 'Tép Tinh Nghịch', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/tep-tinh-nghich.png" },
  { key: 18, id: 'quadenkute12355678', name: 'Quạ Đen Kute', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/qua-den-kute.png" },
  { key: 19, id: 'cunconhangmau12321234', name: 'Cún Con Hăng Máu', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/cun-con-hang-mau.png" },
  { key: 20, id: 'caolanhchanh12321324', name: 'Cáo Lanh Chanh', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/cao-lanh-chanh.png" },
  { key: 21, id: 'soicodon12344322', name: 'Sói Cô Đơn', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/soi-co-don.png" },
  { key: 22, id: 'cuunongaytho12312434', name: 'Cừu Non Ngây Thơ', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/cuu-non-ngay-tho.png" },
  { key: 23, id: 'cunmocsieungoc12366778', name: 'Cún Mốc Siêu Ngốc', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/cun-moc-sieu-ngoc.png" },
  { key: 24, id: 'mitomsieucay12355667', name: 'Mì Tôm Siêu Cay', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/mi-tom-sieu-cay.png" },
  { key: 25, id: 'rongnhinao12312432', name: 'Rồng Nhí Ngáo', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/rong-nhi-ngao.png" },
  { key: 26, id: 'naivangngongac12312435', name: 'Nai Vàng Ngơ Ngác', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/nai-vang-ngo-ngac.png" },
  { key: 27, id: 'bosuacute12355678', name: 'Bò Sữa Cute', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/bo-sua-cute.png" },
  { key: 28, id: 'gamodethuong12324345', name: 'Gà Mờ Dễ Thương', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/ga-mo-de-thuong.png" },
  { key: 29, id: 'vitconloiao12312432', name: 'Vịt Con Lội Ao', banner: "/guest-image/genzmentalhealthbanner.png", avatar: "/guest-image/vit-con-loi-ao.png" }
]


export const COOKIE_ACCOUNT_GUEST = "account_guest_info";

//PAGE dont need authen
export const URL_PAGE_NOT_AUTH = ["landingpage", "blog"];

export const LIMIT_DEFAULT = 3;
export const PAGE_NO_DEFAULT = 1;
export const LIMIT_DEFAULT_CATE_DIARY = 30;
export const TopicIcons = [
  { label: "ước mơ", url: "/icons-system/topics/dream.svg" },
  { label: "cảm xúc", url: "/icons-system/topics/emotion.svg" },
  { label: "sự kiện", url: "/icons-system/topics/events.svg" },
  { label: "gia đình", url: "/icons-system/topics/family.svg" },
  { label: "tài chính", url: "/icons-system/topics/finance.svg" },
  { label: "bạn bè", url: "/icons-system/topics/friend.svg" },
  { label: "sức khỏe", url: "/icons-system/topics/heathy.svg" },
  { label: "học tập", url: "/icons-system/topics/learning.svg" },
  { label: "tình yêu", url: "/icons-system/topics/love.svg" },
  { label: "bản thân", url: "/icons-system/topics/my-self.svg" },
  { label: "công việc", url: "/icons-system/topics/working.svg" },
  { label: "thư giãn", url: "/icons-system/topics/chill.svg" },
];

export const EmotionIcons = [
  {
    descriptionMood: "",
    moodDiaryName: "chóng mặt",
    iconMood: "/icons-system/emotions/dizzy-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "hải lòng",
    iconMood: "/icons-system/emotions/enjoy-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "háo hức",
    iconMood: "/icons-system/emotions/excited-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "kiệt sức",
    iconMood: "/icons-system/emotions/exhausted-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "bực bội",
    iconMood: "/icons-system/emotions/frustrated-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "cười sản khoái",
    iconMood: "/icons-system/emotions/grinning-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "hạnh phúc",
    iconMood: "/icons-system/emotions/happy-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "hân hoan",
    iconMood: "/icons-system/emotions/joyful-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "nụ hôn",
    iconMood: "/icons-system/emotions/kiss-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "thích thú",
    iconMood: "/icons-system/emotions/like.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "cô đơn",
    iconMood: "/icons-system/emotions/lonely-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "nhiều tiền",
    iconMood: "/icons-system/emotions/money-eye-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "buồn nôn",
    iconMood: "/icons-system/emotions/nausea-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "buồn bã ",
    iconMood: "/icons-system/emotions/sad-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "cười vui",
    iconMood: "/icons-system/emotions/sly-smile-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "mệt mõi",
    iconMood: "/icons-system/emotions/tired-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "lo lắng",
    iconMood: "/icons-system/emotions/worried-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "nổi dận",
    iconMood: "/icons-system/emotions/angry-emoticon-1.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "bực tức",
    iconMood: "/icons-system/emotions/angry-emoticon-2.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "nóng nảy",
    iconMood: "/icons-system/emotions/angry-emoticon-3.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "lạnh lùng",
    iconMood: "/icons-system/emotions/cool-emoticon.svg",
  },
  {
    descriptionMood: "",
    moodDiaryName: "khinh bỉ",
    iconMood: "/icons-system/emotions/despicable-emoticon.svg",
  },
];
