import { dark as darkTheme } from "@eva-design/eva";

export const customDarkTheme = {
  ...darkTheme,

  backgroundColor: darkTheme["color-basic-800"],

  quraanFillColor: "#2b62af",
  quraanTextColor: darkTheme["color-basic-100"],
  "color-primary-500": darkTheme["color-basic-900"],
  "color-primary-600": darkTheme["color-basic-1000"],

  textColor: darkTheme["color-basic-100"],
  iconColor: darkTheme["color-basic-100"],
  textInactiveColor: darkTheme["color-basic-600"],
  systemNavBarColor: darkTheme["color-basic-800"],
  systemStatusBarColor: darkTheme["color-basic-800"],
  overlayBackground: "#00000050",

  fontSize: 16,
  fontWeight: "600",
  "text-caption-line-height": 16,
};
