import Page010Hafs from "@assets/pages/hafs/page-010.svg";
import Word00001Shuba from "@assets/pages/shuba/words/00001.svg";
import Page011Hafs from "@assets/pages/hafs/page-011.svg";
import Page012Hafs from "@assets/pages/hafs/page-012.svg";

export const svgMapper: Record<string, React.FC<any>> = {
  "page-010-hafs": Page010Hafs,
  "word-00001-shuba": Word00001Shuba,
  "page-011-hafs": Page011Hafs,
  "page-012-hafs": Page012Hafs,
};

export const audioMapper: Record<string, any> = {
  "00001-shuba": require("@assets/sounds/shuba/00001.mp3"),
  "00001-hafs": require("@assets/sounds/hafs/00001.mp3"),
};

export const readingsButtons: any = [
  {
    title: "مصحف شعبه - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف شعبه - رسم عثماني", readingKey: "shuba_hafs" },
    disabled: false,
  },
  {
    title: "مصحف ورش - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف ورش - رسم عثماني" },
    disabled: true,
  },
  {
    title: "مصحف قالون - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف قالون - رسم عثماني" },
    disabled: true,
  },
  {
    title: "مصحف الدوري - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف الدوري - رسم عثماني" },
    disabled: true,
  },
  {
    title: "مصحف السوسي - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف السوسي - رسم عثماني" },
    disabled: true,
  },
  {
    title: "مصحف حمزة - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف حمزة - رسم عثماني" },
    disabled: true,
  },
  {
    title: "مصحف الكسائي - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف الكسائي - رسم عثماني" },
    disabled: true,
  },
  {
    title: "مصحف خلف - رسم عثماني",
    path: "/quraan-modal",
    params: { title: "مصحف خلف - رسم عثماني" },
    disabled: true,
  },
];

export const readings = {
  shuba_hafs: {
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
};