import WelcomeHeader from "@assets/images/welcome-header.svg";
import Page010Hafs from "@assets/pages/hafs/page-010.svg";
import Page011Hafs from "@assets/pages/hafs/page-011.svg";
import Page012Hafs from "@assets/pages/hafs/page-012.svg";

import Page010Shuba from "@assets/pages/shuba/page-010.svg";
import Page011Shuba from "@assets/pages/shuba/page-011.svg";
import Page012Shuba from "@assets/pages/shuba/page-012.svg";


import Word00001Shuba from "@assets/pages/shuba/words/00001.svg";

export const svgMapper: Record<string, React.FC<any>> = {
  "WelcomeHeader":WelcomeHeader,
  "page-010-hafs": Page010Hafs,
  "page-011-hafs": Page011Hafs,
  "page-012-hafs": Page012Hafs,
  "page-010-shuba": Page010Shuba,
  "page-011-shuba": Page011Shuba,
  "page-012-shuba": Page012Shuba,
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
        pageURL: "page-010-hafs",
        hotspots: [
          {
            key: "page-010-hafs-00001-shuba-1",
            wordURL: "word-00001-shuba",
            audio: "00001-shuba",
            x: 250,
            y: 405,
            w: 33,
            h: 30,
            otherAudios: ["00001-hafs"],
            instruction: "إبدال الواو همزة",
          },
          {
            key: "page-010-hafs-00001-shuba-2",
            wordURL: "word-00001-shuba",
            audio: "00001-shuba",
            x: 8,
            y: 405,
            w: 35,
            h: 55,
            otherAudios: ["00001-hafs"],
            instruction: "إبدال الواو همزة",
          },
        ],
      },
      {
        pageURL: "page-011-hafs",
        hotspots: [],
      },
      {
        pageURL: "page-012-hafs",
        hotspots: [],
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
