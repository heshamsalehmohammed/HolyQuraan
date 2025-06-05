import WelcomeHeader from "@assets/images/welcome-header.svg";


export const imageMapper: { [key: string]: any } = {
  readingItem: require("@assets/images/w.jpg"),
  // Add more if needed
};

export const svgMapper: Record<string, React.FC<any>> = {
  WelcomeHeader: WelcomeHeader,
};

export const audioMapper: Record<string, any> = {
};
