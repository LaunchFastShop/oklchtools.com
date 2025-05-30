import {
  parseHslString,
  hslToOklch,
  HSLColor,
  OKLCHColor,
  hexToHsl,
} from "./colorConversion";

export interface ConvertedColor {
  original: string;
  hsl: HSLColor;
  oklch: OKLCHColor;
}

export interface ConversionResult {
  convertedColors: ConvertedColor[];
  hasErrors: boolean;
  errorCount: number;
}

export const convertColorsFromInput = (input: string): ConversionResult => {
  const lines = input.split("\n").filter((line) => line.trim());
  const converted: ConvertedColor[] = [];
  let errorCount = 0;

  lines.forEach((line) => {
    const hsl = parseHslString(line);
    if (hsl) {
      const oklch = hslToOklch(hsl);
      converted.push({
        original: line.trim(),
        hsl,
        oklch,
      });
    } else {
      errorCount++;
    }
  });

  return {
    convertedColors: converted,
    hasErrors: errorCount > 0,
    errorCount,
  };
};

export const getPickedColorOklch = (pickedColor: string): OKLCHColor => {
  const hsl = hexToHsl(pickedColor);
  return hslToOklch(hsl);
};
