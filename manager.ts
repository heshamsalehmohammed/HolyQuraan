import WelcomeHeader from "@assets/images/welcome-header.svg";
import Page001_Hafs_Shuba from "@assets/pages/hafs_shuba/page-001.svg";
import Page002_Hafs_Shuba from "@assets/pages/hafs_shuba/page-002.svg";
import Page003_Hafs_Shuba from "@assets/pages/hafs_shuba/page-003.svg";
import Page004_Hafs_Shuba from "@assets/pages/hafs_shuba/page-004.svg";
import Page005_Hafs_Shuba from "@assets/pages/hafs_shuba/page-005.svg";
import Page006_Hafs_Shuba from "@assets/pages/hafs_shuba/page-006.svg";
import Page007_Hafs_Shuba from "@assets/pages/hafs_shuba/page-007.svg";
import Page008_Hafs_Shuba from "@assets/pages/hafs_shuba/page-008.svg";
import Page009_Hafs_Shuba from "@assets/pages/hafs_shuba/page-009.svg";
import Page010_Hafs_Shuba from "@assets/pages/hafs_shuba/page-010.svg";
import Page011_Hafs_Shuba from "@assets/pages/hafs_shuba/page-011.svg";
import Page012_Hafs_Shuba from "@assets/pages/hafs_shuba/page-012.svg";
import Page013_Hafs_Shuba from "@assets/pages/hafs_shuba/page-013.svg"; 
import Page014_Hafs_Shuba from "@assets/pages/hafs_shuba/page-014.svg"; 
import Page015_Hafs_Shuba from "@assets/pages/hafs_shuba/page-015.svg"; 
import Page016_Hafs_Shuba from "@assets/pages/hafs_shuba/page-016.svg"; 
import Page017_Hafs_Shuba from "@assets/pages/hafs_shuba/page-017.svg"; 

import Word00001Shuba from "@assets/pages/shuba/words/00001.svg";

export const svgMapper: Record<string, React.FC<any>> = {
  WelcomeHeader: WelcomeHeader,
  "page-001-hafs-shuba": Page001_Hafs_Shuba,
  "page-002-hafs-shuba": Page002_Hafs_Shuba,
  "page-003-hafs-shuba": Page003_Hafs_Shuba,
  "page-004-hafs-shuba": Page004_Hafs_Shuba,
  "page-005-hafs-shuba": Page005_Hafs_Shuba,
  "page-006-hafs-shuba": Page006_Hafs_Shuba,
  "page-007-hafs-shuba": Page007_Hafs_Shuba,
  "page-008-hafs-shuba": Page008_Hafs_Shuba,
  "page-009-hafs-shuba": Page009_Hafs_Shuba,
  "page-010-hafs-shuba": Page010_Hafs_Shuba,
  "page-011-hafs-shuba": Page011_Hafs_Shuba, 
  "page-012-hafs-shuba": Page012_Hafs_Shuba,
  "page-013-hafs-shuba": Page013_Hafs_Shuba,
  "page-014-hafs-shuba": Page014_Hafs_Shuba,
  "page-015-hafs-shuba": Page015_Hafs_Shuba,
  "page-016-hafs-shuba": Page016_Hafs_Shuba,
  "page-017-hafs-shuba": Page017_Hafs_Shuba,
  "word-00001-shuba": Word00001Shuba,
};

export const audioMapper: Record<string, any> = {
  "00001-shuba": require("@assets/sounds/shuba/00001.mp3"),
  "00001-hafs": require("@assets/sounds/hafs/00001.mp3"),
};

export const readingsButtons: any = [
  {
    id: 1,
    title: "مصحف حفص - بالهامش شعبه",
    path: "/quraan-modal",
    params: { title: "مصحف حفص - بالهامش شعبه", readingKey: "hafs_shuba" },
    disabled: false,
    image: require("@assets/images/w.jpg"),
    sideNotes: true,
  },
  {
    id: 2,
    title: "مصحف حفص - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف حفص - رسم عثماني", readingKey: "hafs" },
    disabled: false,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 3,
    title: "مصحف شعبه - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف شعبه - رسم عثماني", readingKey: "shuba" },
    disabled: false,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 4,
    title: "مصحف ورش - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف ورش - رسم عثماني", readingKey: "warsh" },
    disabled: false,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 5,
    title: "مصحف قالون - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف قالون - رسم عثماني", readingKey: "qalon" },
    disabled: false,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 6,
    title: "مصحف الدوري - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف الدوري - رسم عثماني", readingKey: "douri" },
    disabled: false,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 7,
    title: "مصحف السوسي - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف السوسي - رسم عثماني" },
    disabled: true,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 8,
    title: "مصحف حمزة - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف حمزة - رسم عثماني" },
    disabled: true,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 9,
    title: "مصحف الكسائي - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف الكسائي - رسم عثماني" },
    disabled: true,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
  {
    id: 10,
    title: "مصحف خلف - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف خلف - رسم عثماني" },
    disabled: true,
    image: require("@assets/images/w.jpg"),
    sideNotes: false,
  },
];


const externalIndex = [
  {
    "id": 1,
    "title": "الفاتحة",
    "type": "مكية",
    "pageNumber": 1,
    "souraNumber": 1
  },
  {
    "id": 2,
    "title": "البقرة",
    "type": "مدنية",
    "pageNumber": 2,
    "souraNumber": 2
  },
  {
    "id": 3,
    "title": "آل عمران",
    "type": "مدنية",
    "pageNumber": 50,
    "souraNumber": 3
  },
  {
    "id": 4,
    "title": "النساء",
    "type": "مدنية",
    "pageNumber": 77,
    "souraNumber": 4
  },
  {
    "id": 5,
    "title": "المائدة",
    "type": "مدنية",
    "pageNumber": 106,
    "souraNumber": 5
  },
  {
    "id": 6,
    "title": "الأنعام",
    "type": "مكية",
    "pageNumber": 128,
    "souraNumber": 6
  },
  {
    "id": 7,
    "title": "الأعراف",
    "type": "مكية",
    "pageNumber": 151,
    "souraNumber": 7
  },
  {
    "id": 8,
    "title": "الأنفال",
    "type": "مدنية",
    "pageNumber": 177,
    "souraNumber": 8
  },
  {
    "id": 9,
    "title": "التوبة",
    "type": "مدنية",
    "pageNumber": 187,
    "souraNumber": 9
  },
  {
    "id": 10,
    "title": "يونس",
    "type": "مكية",
    "pageNumber": 208,
    "souraNumber": 10
  },
  {
    "id": 11,
    "title": "هود",
    "type": "مكية",
    "pageNumber": 221,
    "souraNumber": 11
  },
  {
    "id": 12,
    "title": "يوسف",
    "type": "مكية",
    "pageNumber": 235,
    "souraNumber": 12
  },
  {
    "id": 13,
    "title": "الرعد",
    "type": "مدنية",
    "pageNumber": 249,
    "souraNumber": 13
  },
  {
    "id": 14,
    "title": "إبراهيم",
    "type": "مكية",
    "pageNumber": 255,
    "souraNumber": 14
  },
  {
    "id": 15,
    "title": "الحجر",
    "type": "مكية",
    "pageNumber": 262,
    "souraNumber": 15
  },
  {
    "id": 16,
    "title": "النحل",
    "type": "مكية",
    "pageNumber": 267,
    "souraNumber": 16
  },
  {
    "id": 17,
    "title": "الإسراء",
    "type": "مكية",
    "pageNumber": 282,
    "souraNumber": 17
  },
  {
    "id": 18,
    "title": "الكهف",
    "type": "مكية",
    "pageNumber": 293,
    "souraNumber": 18
  },
  {
    "id": 19,
    "title": "مريم",
    "type": "مكية",
    "pageNumber": 305,
    "souraNumber": 19
  },
  {
    "id": 20,
    "title": "طه",
    "type": "مكية",
    "pageNumber": 312,
    "souraNumber": 20
  },
  {
    "id": 21,
    "title": "الأنبياء",
    "type": "مكية",
    "pageNumber": 322,
    "souraNumber": 21
  },
  {
    "id": 22,
    "title": "الحج",
    "type": "مدنية",
    "pageNumber": 332,
    "souraNumber": 22
  },
  {
    "id": 23,
    "title": "المؤمنون",
    "type": "مكية",
    "pageNumber": 342,
    "souraNumber": 23
  },
  {
    "id": 24,
    "title": "النور",
    "type": "مدنية",
    "pageNumber": 350,
    "souraNumber": 24
  },
  {
    "id": 25,
    "title": "الفرقان",
    "type": "مكية",
    "pageNumber": 359,
    "souraNumber": 25
  },
  {
    "id": 26,
    "title": "الشعراء",
    "type": "مكية",
    "pageNumber": 367,
    "souraNumber": 26
  },
  {
    "id": 27,
    "title": "النمل",
    "type": "مكية",
    "pageNumber": 377,
    "souraNumber": 27
  },
  {
    "id": 28,
    "title": "القصص",
    "type": "مكية",
    "pageNumber": 385,
    "souraNumber": 28
  },
  {
    "id": 29,
    "title": "العنكبوت",
    "type": "مكية",
    "pageNumber": 396,
    "souraNumber": 29
  },
  {
    "id": 30,
    "title": "الروم",
    "type": "مكية",
    "pageNumber": 404,
    "souraNumber": 30
  },
  {
    "id": 31,
    "title": "لقمان",
    "type": "مكية",
    "pageNumber": 411,
    "souraNumber": 31
  },
  {
    "id": 32,
    "title": "السجدة",
    "type": "مكية",
    "pageNumber": 415,
    "souraNumber": 32
  },
  {
    "id": 33,
    "title": "الأحزاب",
    "type": "مدنية",
    "pageNumber": 418,
    "souraNumber": 33
  },
  {
    "id": 34,
    "title": "سبأ",
    "type": "مكية",
    "pageNumber": 428,
    "souraNumber": 34
  },
  {
    "id": 35,
    "title": "فاطر",
    "type": "مكية",
    "pageNumber": 434,
    "souraNumber": 35
  },
  {
    "id": 36,
    "title": "يس",
    "type": "مكية",
    "pageNumber": 440,
    "souraNumber": 36
  },
  {
    "id": 37,
    "title": "الصافات",
    "type": "مكية",
    "pageNumber": 446,
    "souraNumber": 37
  },
  {
    "id": 38,
    "title": "ص",
    "type": "مكية",
    "pageNumber": 453,
    "souraNumber": 38
  },
  {
    "id": 39,
    "title": "الزمر",
    "type": "مكية",
    "pageNumber": 458,
    "souraNumber": 39
  },
  {
    "id": 40,
    "title": "غافر",
    "type": "مكية",
    "pageNumber": 467,
    "souraNumber": 40
  },
  {
    "id": 41,
    "title": "فصلت",
    "type": "مكية",
    "pageNumber": 477,
    "souraNumber": 41
  },
  {
    "id": 42,
    "title": "الشورى",
    "type": "مكية",
    "pageNumber": 483,
    "souraNumber": 42
  },
  {
    "id": 43,
    "title": "الزخرف",
    "type": "مكية",
    "pageNumber": 489,
    "souraNumber": 43
  },
  {
    "id": 44,
    "title": "الدخان",
    "type": "مكية",
    "pageNumber": 496,
    "souraNumber": 44
  },
  {
    "id": 45,
    "title": "الجاثية",
    "type": "مكية",
    "pageNumber": 499,
    "souraNumber": 45
  },
  {
    "id": 46,
    "title": "الأحقاف",
    "type": "مكية",
    "pageNumber": 502,
    "souraNumber": 46
  },
  {
    "id": 47,
    "title": "محمد",
    "type": "مدنية",
    "pageNumber": 507,
    "souraNumber": 47
  },
  {
    "id": 48,
    "title": "الفتح",
    "type": "مدنية",
    "pageNumber": 511,
    "souraNumber": 48
  },
  {
    "id": 49,
    "title": "الحجرات",
    "type": "مدنية",
    "pageNumber": 515,
    "souraNumber": 49
  },
  {
    "id": 50,
    "title": "ق",
    "type": "مكية",
    "pageNumber": 518,
    "souraNumber": 50
  },
  {
    "id": 51,
    "title": "الذاريات",
    "type": "مكية",
    "pageNumber": 520,
    "souraNumber": 51
  },
  {
    "id": 52,
    "title": "الطور",
    "type": "مكية",
    "pageNumber": 523,
    "souraNumber": 52
  },
  {
    "id": 53,
    "title": "النجم",
    "type": "مكية",
    "pageNumber": 526,
    "souraNumber": 53
  },
  {
    "id": 54,
    "title": "القمر",
    "type": "مكية",
    "pageNumber": 528,
    "souraNumber": 54
  },
  {
    "id": 55,
    "title": "الرحمن",
    "type": "مدنية",
    "pageNumber": 531,
    "souraNumber": 55
  },
  {
    "id": 56,
    "title": "الواقعة",
    "type": "مكية",
    "pageNumber": 534,
    "souraNumber": 56
  },
  {
    "id": 57,
    "title": "الحديد",
    "type": "مدنية",
    "pageNumber": 537,
    "souraNumber": 57
  },
  {
    "id": 58,
    "title": "المجادلة",
    "type": "مدنية",
    "pageNumber": 542,
    "souraNumber": 58
  },
  {
    "id": 59,
    "title": "الحشر",
    "type": "مدنية",
    "pageNumber": 545,
    "souraNumber": 59
  },
  {
    "id": 60,
    "title": "الممتحنة",
    "type": "مدنية",
    "pageNumber": 549,
    "souraNumber": 60
  },
  {
    "id": 61,
    "title": "الصف",
    "type": "مدنية",
    "pageNumber": 551,
    "souraNumber": 61
  },
  {
    "id": 62,
    "title": "الجمعة",
    "type": "مدنية",
    "pageNumber": 553,
    "souraNumber": 62
  },
  {
    "id": 63,
    "title": "المنافقون",
    "type": "مدنية",
    "pageNumber": 554,
    "souraNumber": 63
  },
  {
    "id": 64,
    "title": "التغابن",
    "type": "مدنية",
    "pageNumber": 556,
    "souraNumber": 64
  },
  {
    "id": 65,
    "title": "الطلاق",
    "type": "مدنية",
    "pageNumber": 558,
    "souraNumber": 65
  },
  {
    "id": 66,
    "title": "التحريم",
    "type": "مدنية",
    "pageNumber": 560,
    "souraNumber": 66
  },
  {
    "id": 67,
    "title": "الملك",
    "type": "مكية",
    "pageNumber": 562,
    "souraNumber": 67
  },
  {
    "id": 68,
    "title": "القلم",
    "type": "مكية",
    "pageNumber": 564,
    "souraNumber": 68
  },
  {
    "id": 69,
    "title": "الحاقة",
    "type": "مكية",
    "pageNumber": 566,
    "souraNumber": 69
  },
  {
    "id": 70,
    "title": "المعارج",
    "type": "مكية",
    "pageNumber": 568,
    "souraNumber": 70
  },
  {
    "id": 71,
    "title": "نوح",
    "type": "مكية",
    "pageNumber": 570,
    "souraNumber": 71
  },
  {
    "id": 72,
    "title": "الجن",
    "type": "مكية",
    "pageNumber": 572,
    "souraNumber": 72
  },
  {
    "id": 73,
    "title": "المزمل",
    "type": "مكية",
    "pageNumber": 574,
    "souraNumber": 73
  },
  {
    "id": 74,
    "title": "المدثر",
    "type": "مكية",
    "pageNumber": 575,
    "souraNumber": 74
  },
  {
    "id": 75,
    "title": "القيامة",
    "type": "مكية",
    "pageNumber": 577,
    "souraNumber": 75
  },
  {
    "id": 76,
    "title": "الإنسان",
    "type": "مدنية",
    "pageNumber": 578,
    "souraNumber": 76
  },
  {
    "id": 77,
    "title": "المرسلات",
    "type": "مكية",
    "pageNumber": 580,
    "souraNumber": 77
  },
  {
    "id": 78,
    "title": "النبأ",
    "type": "مكية",
    "pageNumber": 582,
    "souraNumber": 78
  },
  {
    "id": 79,
    "title": "النازعات",
    "type": "مكية",
    "pageNumber": 583,
    "souraNumber": 79
  },
  {
    "id": 80,
    "title": "عبس",
    "type": "مكية",
    "pageNumber": 585,
    "souraNumber": 80
  },
  {
    "id": 81,
    "title": "التكوير",
    "type": "مكية",
    "pageNumber": 586,
    "souraNumber": 81
  },
  {
    "id": 82,
    "title": "الإنفطار",
    "type": "مكية",
    "pageNumber": 587,
    "souraNumber": 82
  },
  {
    "id": 83,
    "title": "المطففين",
    "type": "مكية",
    "pageNumber": 587,
    "souraNumber": 83
  },
  {
    "id": 84,
    "title": "الإنشقاق",
    "type": "مكية",
    "pageNumber": 589,
    "souraNumber": 84
  },
  {
    "id": 85,
    "title": "البروج",
    "type": "مكية",
    "pageNumber": 590,
    "souraNumber": 85
  },
  {
    "id": 86,
    "title": "الطارق",
    "type": "مكية",
    "pageNumber": 591,
    "souraNumber": 86
  },
  {
    "id": 87,
    "title": "الأعلى",
    "type": "مكية",
    "pageNumber": 591,
    "souraNumber": 87
  },
  {
    "id": 88,
    "title": "الغاشية",
    "type": "مكية",
    "pageNumber": 592,
    "souraNumber": 88
  },
  {
    "id": 89,
    "title": "الفجر",
    "type": "مكية",
    "pageNumber": 593,
    "souraNumber": 89
  },
  {
    "id": 90,
    "title": "البلد",
    "type": "مكية",
    "pageNumber": 594,
    "souraNumber": 90
  },
  {
    "id": 91,
    "title": "الشمس",
    "type": "مكية",
    "pageNumber": 595,
    "souraNumber": 91
  },
  {
    "id": 92,
    "title": "الليل",
    "type": "مكية",
    "pageNumber": 595,
    "souraNumber": 92
  },
  {
    "id": 93,
    "title": "الضحى",
    "type": "مكية",
    "pageNumber": 596,
    "souraNumber": 93
  },
  {
    "id": 94,
    "title": "الشرح",
    "type": "مكية",
    "pageNumber": 596,
    "souraNumber": 94
  },
  {
    "id": 95,
    "title": "التين",
    "type": "مكية",
    "pageNumber": 597,
    "souraNumber": 95
  },
  {
    "id": 96,
    "title": "العلق",
    "type": "مكية",
    "pageNumber": 597,
    "souraNumber": 96
  },
  {
    "id": 97,
    "title": "القدر",
    "type": "مكية",
    "pageNumber": 598,
    "souraNumber": 97
  },
  {
    "id": 98,
    "title": "البينة",
    "type": "مدنية",
    "pageNumber": 598,
    "souraNumber": 98
  },
  {
    "id": 99,
    "title": "الزلزلة",
    "type": "مدنية",
    "pageNumber": 599,
    "souraNumber": 99
  },
  {
    "id": 100,
    "title": "العاديات",
    "type": "مكية",
    "pageNumber": 599,
    "souraNumber": 100
  },
  {
    "id": 101,
    "title": "القارعة",
    "type": "مكية",
    "pageNumber": 600,
    "souraNumber": 101
  },
  {
    "id": 102,
    "title": "التكاثر",
    "type": "مكية",
    "pageNumber": 600,
    "souraNumber": 102
  },
  {
    "id": 103,
    "title": "العصر",
    "type": "مكية",
    "pageNumber": 601,
    "souraNumber": 103
  },
  {
    "id": 104,
    "title": "الهمزة",
    "type": "مكية",
    "pageNumber": 601,
    "souraNumber": 104
  },
  {
    "id": 105,
    "title": "الفيل",
    "type": "مكية",
    "pageNumber": 601,
    "souraNumber": 105
  },
  {
    "id": 106,
    "title": "قريش",
    "type": "مكية",
    "pageNumber": 602,
    "souraNumber": 106
  },
  {
    "id": 107,
    "title": "الماعون",
    "type": "مكية",
    "pageNumber": 602,
    "souraNumber": 107
  },
  {
    "id": 108,
    "title": "الكوثر",
    "type": "مكية",
    "pageNumber": 602,
    "souraNumber": 108
  },
  {
    "id": 109,
    "title": "الكافرون",
    "type": "مكية",
    "pageNumber": 603,
    "souraNumber": 109
  },
  {
    "id": 110,
    "title": "النصر",
    "type": "مدنية",
    "pageNumber": 603,
    "souraNumber": 110
  },
  {
    "id": 111,
    "title": "المسد",
    "type": "مكية",
    "pageNumber": 603,
    "souraNumber": 111
  },
  {
    "id": 112,
    "title": "الإخلاص",
    "type": "مكية",
    "pageNumber": 604,
    "souraNumber": 112
  },
  {
    "id": 113,
    "title": "الفلق",
    "type": "مكية",
    "pageNumber": 604,
    "souraNumber": 113
  },
  {
    "id": 114,
    "title": "الناس",
    "type": "مكية",
    "pageNumber": 604,
    "souraNumber": 114
  }
]

export const readings = {
  hafs_shuba: {
    id: 1,
    name: "مصحف حفص - بالهامش شعبه",
    prePagesCount: 3,
    index: [
      {
        id: 1,
        title: "الفاتحة",
        type: "مكية",
        pageNumber: 1,
        souraNumber: 1,
      },
      {
        id: 2,
        title: "البقرة",
        type: "مدنية",
        pageNumber: 2,
        souraNumber: 2,
      },
      {
        id: 3,
        title: "آل عمران",
        type: "مدنية",
        pageNumber: 50,
        souraNumber: 3,
      },
      {
        id: 4,
        title: "النساء",
        type: "مدنية",
        pageNumber: 77,
        souraNumber: 4,
      },
      {
        id: 5,
        title: "المائدة",
        type: "مدنية",
        pageNumber: 106,
        souraNumber: 5,
      },
      {
        id: 6,
        title: "الأنعام",
        type: "مكية",
        pageNumber: 128,
        souraNumber: 6,
      },
      {
        id: 7,
        title: "الأعراف",
        type: "مكية",
        pageNumber: 151,
        souraNumber: 7,
      },
      {
        id: 8,
        title: "الأنفال",
        type: "مدنية",
        pageNumber: 177,
        souraNumber: 8,
      },
      {
        id: 9,
        title: "التوبة",
        type: "مدنية",
        pageNumber: 187,
        souraNumber: 9,
      },
      {
        id: 10,
        title: "يونس",
        type: "مكية",
        pageNumber: 208,
        souraNumber: 10,
      },
      {
        id: 11,
        title: "هود",
        type: "مكية",
        pageNumber: 221,
        souraNumber: 11,
      },
      {
        id: 12,
        title: "يوسف",
        type: "مكية",
        pageNumber: 235,
        souraNumber: 12,
      },
      {
        id: 13,
        title: "الرعد",
        type: "مدنية",
        pageNumber: 249,
        souraNumber: 13,
      },
      {
        id: 14,
        title: "إبراهيم",
        type: "مكية",
        pageNumber: 255,
        souraNumber: 14,
      },
      {
        id: 15,
        title: "الحجر",
        type: "مكية",
        pageNumber: 262,
        souraNumber: 15,
      },
      {
        id: 16,
        title: "النحل",
        type: "مكية",
        pageNumber: 267,
        souraNumber: 16,
      },
      {
        id: 17,
        title: "الإسراء",
        type: "مكية",
        pageNumber: 282,
        souraNumber: 17,
      },
      {
        id: 18,
        title: "الكهف",
        type: "مكية",
        pageNumber: 293,
        souraNumber: 18,
      },
      {
        id: 19,
        title: "مريم",
        type: "مكية",
        pageNumber: 305,
        souraNumber: 19,
      },
      {
        id: 20,
        title: "طه",
        type: "مكية",
        pageNumber: 312,
        souraNumber: 20,
      },
      {
        id: 21,
        title: "الأنبياء",
        type: "مكية",
        pageNumber: 322,
        souraNumber: 21,
      },
      {
        id: 22,
        title: "الحج",
        type: "مدنية",
        pageNumber: 332,
        souraNumber: 22,
      },
      {
        id: 23,
        title: "المؤمنون",
        type: "مكية",
        pageNumber: 342,
        souraNumber: 23,
      },
      {
        id: 24,
        title: "النور",
        type: "مدنية",
        pageNumber: 350,
        souraNumber: 24,
      },
      {
        id: 25,
        title: "الفرقان",
        type: "مكية",
        pageNumber: 359,
        souraNumber: 25,
      },
      {
        id: 26,
        title: "الشعراء",
        type: "مكية",
        pageNumber: 367,
        souraNumber: 26,
      },
      {
        id: 27,
        title: "النمل",
        type: "مكية",
        pageNumber: 377,
        souraNumber: 27,
      },
      {
        id: 28,
        title: "القصص",
        type: "مكية",
        pageNumber: 385,
        souraNumber: 28,
      },
      {
        id: 29,
        title: "العنكبوت",
        type: "مكية",
        pageNumber: 396,
        souraNumber: 29,
      },
      {
        id: 30,
        title: "الروم",
        type: "مكية",
        pageNumber: 404,
        souraNumber: 30,
      },
      {
        id: 31,
        title: "لقمان",
        type: "مكية",
        pageNumber: 411,
        souraNumber: 31,
      },
      {
        id: 32,
        title: "السجدة",
        type: "مكية",
        pageNumber: 415,
        souraNumber: 32,
      },
      {
        id: 33,
        title: "الأحزاب",
        type: "مدنية",
        pageNumber: 418,
        souraNumber: 33,
      },
      {
        id: 34,
        title: "سبأ",
        type: "مكية",
        pageNumber: 434,
        souraNumber: 34,
      },
      {
        id: 35,
        title: "فاطر",
        type: "مكية",
        pageNumber: 440,
        souraNumber: 35,
      },
      {
        id: 36,
        title: "يس",
        type: "مكية",
        pageNumber: 440,
        souraNumber: 36,
      },
      {
        id: 37,
        title: "الصافات",
        type: "مكية",
        pageNumber: 446,
        souraNumber: 37,
      },
      {
        id: 38,
        title: "ص",
        type: "مكية",
        pageNumber: 453,
        souraNumber: 38,
      },
      {
        id: 39,
        title: "الزمر",
        type: "مكية",
        pageNumber: 458,
        souraNumber: 39,
      },
      {
        id: 40,
        title: "غافر",
        type: "مكية",
        pageNumber: 467,
        souraNumber: 40,
      },
      {
        id: 41,
        title: "فصلت",
        type: "مكية",
        pageNumber: 477,
        souraNumber: 41,
      },
      {
        id: 42,
        title: "الشورى",
        type: "مكية",
        pageNumber: 483,
        souraNumber: 42,
      },
      {
        id: 43,
        title: "الزخرف",
        type: "مكية",
        pageNumber: 489,
        souraNumber: 43,
      },
      {
        id: 44,
        title: "الدخان",
        type: "مكية",
        pageNumber: 496,
        souraNumber: 44,
      },
      {
        id: 45,
        title: "الجاثية",
        type: "مكية",
        pageNumber: 499,
        souraNumber: 45,
      },
      {
        id: 46,
        title: "الأحقاف",
        type: "مكية",
        pageNumber: 502,
        souraNumber: 46,
      },
      {
        id: 47,
        title: "محمد",
        type: "مدنية",
        pageNumber: 507,
        souraNumber: 47,
      },
      {
        id: 48,
        title: "الفتح",
        type: "مدنية",
        pageNumber: 511,
        souraNumber: 48,
      },
      {
        id: 49,
        title: "الحجرات",
        type: "مدنية",
        pageNumber: 514,
        souraNumber: 49,
      },
      {
        id: 50,
        title: "ق",
        type: "مكية",
        pageNumber: 518,
        souraNumber: 50,
      },
      {
        id: 51,
        title: "الذاريات",
        type: "مكية",
        pageNumber: 520,
        souraNumber: 51,
      },
      {
        id: 52,
        title: "الطور",
        type: "مكية",
        pageNumber: 523,
        souraNumber: 52,
      },
      {
        id: 53,
        title: "النجم",
        type: "مكية",
        pageNumber: 526,
        souraNumber: 53,
      },
      {
        id: 54,
        title: "القمر",
        type: "مكية",
        pageNumber: 528,
        souraNumber: 54,
      },
      {
        id: 55,
        title: "الرحمن",
        type: "مدنية",
        pageNumber: 531,
        souraNumber: 55,
      },
      {
        id: 56,
        title: "الواقعة",
        type: "مكية",
        pageNumber: 534,
        souraNumber: 56,
      },
      {
        id: 57,
        title: "الحديد",
        type: "مدنية",
        pageNumber: 537,
        souraNumber: 57,
      },
      {
        id: 58,
        title: "المجادلة",
        type: "مدنية",
        pageNumber: 542,
        souraNumber: 58,
      },
      {
        id: 59,
        title: "الحشر",
        type: "مدنية",
        pageNumber: 545,
        souraNumber: 59,
      },
      {
        id: 60,
        title: "الممتحنة",
        type: "مدنية",
        pageNumber: 549,
        souraNumber: 60,
      },
      {
        id: 61,
        title: "الصف",
        type: "مدنية",
        pageNumber: 551,
        souraNumber: 61,
      },
      {
        id: 62,
        title: "الجمعة",
        type: "مدنية",
        pageNumber: 553,
        souraNumber: 62,
      },
      {
        id: 63,
        title: "المنافقون",
        type: "مدنية",
        pageNumber: 554,
        souraNumber: 63,
      },
      {
        id: 64,
        title: "التغابن",
        type: "مدنية",
        pageNumber: 556,
        souraNumber: 64,
      },
      {
        id: 65,
        title: "الطلاق",
        type: "مدنية",
        pageNumber: 558,
        souraNumber: 65,
      },
      {
        id: 66,
        title: "التحريم",
        type: "مدنية",
        pageNumber: 560,
        souraNumber: 66,
      },
      {
        id: 67,
        title: "الملك",
        type: "مكية",
        pageNumber: 562,
        souraNumber: 67,
      },
      {
        id: 68,
        title: "القلم",
        type: "مكية",
        pageNumber: 564,
        souraNumber: 68,
      },
      {
        id: 69,
        title: "الحاقة",
        type: "مكية",
        pageNumber: 566,
        souraNumber: 69,
      },
      {
        id: 70,
        title: "المعارج",
        type: "مكية",
        pageNumber: 568,
        souraNumber: 70,
      },
      {
        id: 71,
        title: "نوح",
        type: "مكية",
        pageNumber: 570,
        souraNumber: 71,
      },
      {
        id: 72,
        title: "الجن",
        type: "مكية",
        pageNumber: 572,
        souraNumber: 72,
      },
      {
        id: 73,
        title: "المزمل",
        type: "مكية",
        pageNumber: 574,
        souraNumber: 73,
      },
      {
        id: 74,
        title: "المدثر",
        type: "مكية",
        pageNumber: 576,
        souraNumber: 74,
      },
      {
        id: 75,
        title: "القيامة",
        type: "مكية",
        pageNumber: 578,
        souraNumber: 75,
      },
      {
        id: 76,
        title: "الإنسان",
        type: "مدنية",
        pageNumber: 580,
        souraNumber: 76,
      },
      {
        id: 77,
        title: "المرسلات",
        type: "مكية",
        pageNumber: 582,
        souraNumber: 77,
      },
      {
        id: 78,
        title: "النبأ",
        type: "مكية",
        pageNumber: 584,
        souraNumber: 78,
      },
      {
        id: 79,
        title: "النازعات",
        type: "مكية",
        pageNumber: 586,
        souraNumber: 79,
      },
      {
        id: 80,
        title: "عبس",
        type: "مكية",
        pageNumber: 588,
        souraNumber: 80,
      },
      {
        id: 81,
        title: "التكوير",
        type: "مكية",
        pageNumber: 589,
        souraNumber: 81,
      },
      {
        id: 82,
        title: "الانفطار",
        type: "مكية",
        pageNumber: 591,
        souraNumber: 82,
      },
      {
        id: 83,
        title: "المطففين",
        type: "مكية",
        pageNumber: 593,
        souraNumber: 83,
      },
      {
        id: 84,
        title: "الانشقاق",
        type: "مكية",
        pageNumber: 595,
        souraNumber: 84,
      },
      {
        id: 85,
        title: "البروج",
        type: "مكية",
        pageNumber: 597,
        souraNumber: 85,
      },
      {
        id: 86,
        title: "الطارق",
        type: "مكية",
        pageNumber: 599,
        souraNumber: 86,
      },
      {
        id: 87,
        title: "الأعلى",
        type: "مكية",
        pageNumber: 601,
        souraNumber: 87,
      },
      {
        id: 88,
        title: "الغاشية",
        type: "مكية",
        pageNumber: 602,
        souraNumber: 88,
      },
      {
        id: 89,
        title: "الفجر",
        type: "مكية",
        pageNumber: 593,
        souraNumber: 89,
      },
      {
        id: 90,
        title: "البلد",
        type: "مكية",
        pageNumber: 594,
        souraNumber: 90,
      },
      {
        id: 91,
        title: "الشمس",
        type: "مكية",
        pageNumber: 595,
        souraNumber: 91,
      },
      {
        id: 92,
        title: "الليل",
        type: "مكية",
        pageNumber: 596,
        souraNumber: 92,
      },
      {
        id: 93,
        title: "الضحى",
        type: "مكية",
        pageNumber: 597,
        souraNumber: 93,
      },
      {
        id: 94,
        title: "الشرح",
        type: "مكية",
        pageNumber: 598,
        souraNumber: 94,
      },
      {
        id: 95,
        title: "التين",
        type: "مكية",
        pageNumber: 599,
        souraNumber: 95,
      },
      {
        id: 96,
        title: "العلق",
        type: "مكية",
        pageNumber: 600,
        souraNumber: 96,
      },
      {
        id: 97,
        title: "القدر",
        type: "مكية",
        pageNumber: 601,
        souraNumber: 97,
      },
      {
        id: 98,
        title: "البينة",
        type: "مدنية",
        pageNumber: 602,
        souraNumber: 98,
      },
      {
        id: 99,
        title: "الزلزلة",
        type: "مكية",
        pageNumber: 603,
        souraNumber: 99,
      },
      {
        id: 100,
        title: "العاديات",
        type: "مكية",
        pageNumber: 603,
        souraNumber: 100,
      },
      {
        id: 101,
        title: "القارعة",
        type: "مكية",
        pageNumber: 604,
        souraNumber: 101,
      },
      {
        id: 102,
        title: "التكاثر",
        type: "مكية",
        pageNumber: 604,
        souraNumber: 102,
      },
      {
        id: 103,
        title: "العصر",
        type: "مكية",
        pageNumber: 605,
        souraNumber: 103,
      },
      {
        id: 104,
        title: "الهمزة",
        type: "مكية",
        pageNumber: 605,
        souraNumber: 104,
      },
      {
        id: 105,
        title: "الفيل",
        type: "مكية",
        pageNumber: 605,
        souraNumber: 105,
      },
      {
        id: 106,
        title: "قريش",
        type: "مكية",
        pageNumber: 606,
        souraNumber: 106,
      },
      {
        id: 107,
        title: "الماعون",
        type: "مكية",
        pageNumber: 606,
        souraNumber: 107,
      },
      {
        id: 108,
        title: "الكوثر",
        type: "مكية",
        pageNumber: 606,
        souraNumber: 108,
      },
      {
        id: 109,
        title: "الكافرون",
        type: "مكية",
        pageNumber: 607,
        souraNumber: 109,
      },
      {
        id: 110,
        title: "النصر",
        type: "مدنية",
        pageNumber: 607,
        souraNumber: 110,
      },
      {
        id: 111,
        title: "المسد",
        type: "مكية",
        pageNumber: 608,
        souraNumber: 111,
      },
      {
        id: 112,
        title: "الإخلاص",
        type: "مكية",
        pageNumber: 609,
        souraNumber: 112,
      },
      {
        id: 113,
        title: "الفلق",
        type: "مكية",
        pageNumber: 610,
        souraNumber: 113,
      },
      {
        id: 114,
        title: "الناس",
        type: "مكية",
        pageNumber: 611,
        souraNumber: 114,
      },
    ],
    pages: [
      {
        pageURL: "page-001-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-002-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-003-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-004-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-005-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-006-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-007-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-008-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-009-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-010-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-011-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-012-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-013-hafs-shuba",
        hotspots: [
          {
            id:1,
            key: "page-010-hafs-00001-shuba-1",
            wordURL: "word-00001-shuba",
            audio: "00001-shuba",
            x: 295,
            y: 407,
            w: 30,
            h: 30,
            otherAudios: ["00001-hafs"],
            instruction: "إبدال الواو همزة",
            readingTitle: "قراءة شعبه",
            surahTitle: "البقرة",
            surahId: 1,
            ayaNumber: 67,
            pageNumber:13
          },
          {
            id:2,
            key: "page-010-hafs-00001-shuba-2",
            wordURL: "word-00001-shuba",
            audio: "00001-shuba",
            x: 0,
            y: 410,
            w: 30,
            h: 90,
            otherAudios: ["00001-hafs"],
            instruction: "إبدال الواو همزة",
            readingTitle: "قراءة شعبه",
            surahTitle: "البقرة",
            surahId: 1,
            ayaNumber: 67,
            pageNumber:13
          },
        ],
      },
      {
        pageURL: "page-014-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-015-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-016-hafs-shuba",
        hotspots: [],
      },
      {
        pageURL: "page-017-hafs-shuba",
        hotspots: [],
      },
    ],
  },
  hafs: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/hafs/${i + 1}.svgz`,
      hotspots: [],
    })),
    index:externalIndex
  },
  shuba: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/shubah/${i + 1}.svgz`,
      hotspots: [],
    })),
    index:externalIndex

  },
  warsh: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/warsh/${i + 1}.svgz`,
      hotspots: [],
    })),
    index:externalIndex

  },
  qalon: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/qalon/${i + 1}.svgz`,
      hotspots: [],
    })),
    index:externalIndex

  },
  douri: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/douri/${i + 1}.svgz`,
      hotspots: [],
    })),
    index:externalIndex

  },
};



export const QuranParts = Array.from({ length: 30 }, (_, i) => `الجزء ${i + 1}`);
