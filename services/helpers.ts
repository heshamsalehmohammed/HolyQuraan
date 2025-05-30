export const toArabicNumber = (number: number): string => {
  return number.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
};
