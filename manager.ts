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



import Word00001Shuba from "@assets/pages/shuba/words/00001.svg";

export const svgMapper: Record<string, React.FC<any>> = {
  'WelcomeHeader': WelcomeHeader,
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

export const readings = {
  hafs_shuba: {
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
            key: "page-010-hafs-00001-shuba-1",
            wordURL: "word-00001-shuba",
            audio: "00001-shuba",
            x: 295,
            y: 407,
            w: 30,
            h: 30,
            otherAudios: ["00001-hafs"],
            instruction: "إبدال الواو همزة",
          },
          {
            key: "page-010-hafs-00001-shuba-2",
            wordURL: "word-00001-shuba",
            audio: "00001-shuba",
            x: 0,
            y: 410,
            w: 30,
            h: 55,
            otherAudios: ["00001-hafs"],
            instruction: "إبدال الواو همزة",
          },
        ],
      },
    ],
  },
  hafs: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/hafs/${i + 1}.svgz`,
      hotspots: [],
    })),
  },
  shuba: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/shubah/${i + 1}.svgz`,
      hotspots: [],
    })),
  },
  warsh: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/warsh/${i + 1}.svgz`,
      hotspots: [],
    })),
  },
  qalon: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/qalon/${i + 1}.svgz`,
      hotspots: [],
    })),
  },
  douri: {
    pages: Array.from({ length: 604 }, (_, i) => ({
      pageURL: `https://maknoon.com/quran/douri/${i + 1}.svgz`,
      hotspots: [],
    })),
  },
};
