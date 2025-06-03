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
import { PageType, PartInReadingType, SuraInReadingType } from "./redux/slices/quran/types";

export const imageMapper: { [key: string]: any } = {
  "readingItem": require("@assets/images/w.jpg"),
  // Add more if needed
};

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