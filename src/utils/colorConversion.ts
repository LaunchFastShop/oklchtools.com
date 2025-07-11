// Color conversion utilities for HSL to OKLCH
export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface OKLCHColor {
  l: number;
  c: number;
  h: number;
}

// Helper function to convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (1 / 6 <= h && h < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (2 / 6 <= h && h < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (3 / 6 <= h && h < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (4 / 6 <= h && h < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else if (5 / 6 <= h && h < 1) {
    r = c;
    g = 0;
    b = x;
  }

  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

// Convert RGB to linear RGB
function srgbToLinear(c: number): number {
  const abs = Math.abs(c);
  if (abs < 0.04045) {
    return c / 12.92;
  }
  return (c < 0 ? -1 : 1) * Math.pow((abs + 0.055) / 1.055, 2.4);
}

// Convert linear RGB to OKLab
function linearRgbToOklab(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ];
}

// Convert OKLab to OKLCH
function oklabToOklch(l: number, a: number, b: number): OKLCHColor {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return {
    l: Number((l * 100).toFixed(2)),
    c: Number((c * 0.4).toFixed(3)),
    h: Number(h.toFixed(1)),
  };
}

// Main conversion function from HSL to OKLCH
export function hslToOklch(hsl: HSLColor): OKLCHColor {
  const [r, g, b] = hslToRgb(hsl.h, hsl.s, hsl.l);

  const linearR = srgbToLinear(r / 255);
  const linearG = srgbToLinear(g / 255);
  const linearB = srgbToLinear(b / 255);

  const [labL, labA, labB] = linearRgbToOklab(linearR, linearG, linearB);

  return oklabToOklch(labL, labA, labB);
}

// Parse HSL string and extract HSL values
export function parseHslString(hslString: string): HSLColor | null {
  // Remove any whitespace and convert to lowercase
  const cleaned = hslString.trim().toLowerCase();

  // Match patterns like "hsl(120, 50%, 75%)" or "120, 50%, 75%" or "120 50% 75%"
  const hslRegex =
    /(?:hsl\()?(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)%?[,\s]+(\d+(?:\.\d+)?)%?\)?/;
  const match = cleaned.match(hslRegex);

  if (!match) return null;

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);

  // Validate ranges
  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
    return null;
  }

  return { h, s, l };
}

// Format HSL as CSS string
export function formatHsl(hsl: HSLColor): string {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

// Format OKLCH as CSS string
export function formatOklch(oklch: OKLCHColor): string {
  return `oklch(${oklch.l}% ${oklch.c} ${oklch.h})`;
}

// Convert RGB directly to OKLCH
export function rgbToOklch(rgb: RGBColor): OKLCHColor {
  const linearR = srgbToLinear(rgb.r / 255);
  const linearG = srgbToLinear(rgb.g / 255);
  const linearB = srgbToLinear(rgb.b / 255);

  const [labL, labA, labB] = linearRgbToOklab(linearR, linearG, linearB);

  return oklabToOklch(labL, labA, labB);
}

// Convert Hex to RGB
export function hexToRgb(hex: string): RGBColor | null {
  // Remove # if present and convert to uppercase
  const cleanHex = hex.replace("#", "").toUpperCase();

  // Validate hex format (3 or 6 characters)
  if (!/^[0-9A-F]{3}$|^[0-9A-F]{6}$/.test(cleanHex)) {
    return null;
  }

  let r: number, g: number, b: number;

  if (cleanHex.length === 3) {
    // Short format like "F0A"
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else {
    // Full format like "FF00AA"
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  }

  return { r, g, b };
}

// Convert Hex directly to OKLCH
export function hexToOklch(hex: string): OKLCHColor | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToOklch(rgb);
}

// Parse RGB string and extract RGB values
export function parseRgbString(rgbString: string): RGBColor | null {
  // Remove any whitespace and convert to lowercase
  const cleaned = rgbString.trim().toLowerCase();

  // Match patterns like "rgb(255, 128, 0)" or "255, 128, 0" or "255 128 0"
  const rgbRegex = /(?:rgb\()?(\d+)[,\s]+(\d+)[,\s]+(\d+)\)?/;
  const match = cleaned.match(rgbRegex);

  if (!match) return null;

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  // Validate ranges
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return null;
  }

  return { r, g, b };
}

// Parse Hex string
export function parseHexString(hexString: string): string | null {
  // Remove any whitespace
  const cleaned = hexString.trim();

  // Match hex patterns with or without #
  const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  const match = cleaned.match(hexRegex);

  if (!match) return null;

  // Return with # prefix
  return "#" + match[1].toUpperCase();
}

// Format RGB as CSS string
export function formatRgb(rgb: RGBColor): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

// Format Hex as string
export function formatHex(hex: string): string {
  return hex.startsWith("#") ? hex : `#${hex}`;
}

// Convert hex to HSL
export const hexToHsl = (hex: string): HSLColor => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

// Clean text to extract HSL patterns
export const cleanText = (text: string): string => {
  // Look for HSL patterns using regex and extract them
  const hslPatterns = [
    // Match hsl(h, s%, l%) format
    /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)/gi,
    // Match h, s%, l% format
    /(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%/g,
    // Match h s% l% format (space separated)
    /(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/g,
    // Match just numbers that could be h s l
    /(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/g,
  ];

  const foundColors: string[] = [];

  hslPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const h = match[1];
      const s = match[2];
      const l = match[3];
      foundColors.push(`hsl(${h}, ${s}%, ${l}%)`);
    }
  });

  // Remove duplicates and return
  return [...new Set(foundColors)].join("\n");
};

// Reverse conversion functions: OKLCH to RGB/HEX

// Convert OKLCH to OKLab
function oklchToOklab(oklch: OKLCHColor): [number, number, number] {
  const l = oklch.l / 100;
  const c = oklch.c / 0.4;
  const h = (oklch.h * Math.PI) / 180;

  const a = c * Math.cos(h);
  const b = c * Math.sin(h);

  return [l, a, b];
}

// Convert OKLab to linear RGB
function oklabToLinearRgb(
  l: number,
  a: number,
  b: number
): [number, number, number] {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  return [
    +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

// Convert linear RGB to sRGB
function linearToSrgb(c: number): number {
  const abs = Math.abs(c);
  if (abs > 0.0031308) {
    return (c < 0 ? -1 : 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
  }
  return 12.92 * c;
}

// Convert OKLCH to RGB
export function oklchToRgb(oklch: OKLCHColor): RGBColor {
  const [l, a, b] = oklchToOklab(oklch);
  const [linearR, linearG, linearB] = oklabToLinearRgb(l, a, b);

  const r = Math.round(Math.max(0, Math.min(255, linearToSrgb(linearR) * 255)));
  const g = Math.round(Math.max(0, Math.min(255, linearToSrgb(linearG) * 255)));
  const b_val = Math.round(
    Math.max(0, Math.min(255, linearToSrgb(linearB) * 255))
  );

  return { r, g, b: b_val };
}

// Convert RGB to HEX
export function rgbToHex(rgb: RGBColor): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

// Convert OKLCH to HEX
export function oklchToHex(oklch: OKLCHColor): string {
  const rgb = oklchToRgb(oklch);
  return rgbToHex(rgb);
}

// Parse OKLCH string and extract OKLCH values
export function parseOklchString(oklchString: string): OKLCHColor | null {
  // Remove any whitespace and convert to lowercase
  const cleaned = oklchString.trim().toLowerCase();

  // Match patterns like "oklch(92.8% 0.006 264.531)" or "92.8% 0.006 264.531" or "92.8 0.006 264.531"
  const oklchRegex =
    /(?:oklch\()?(\d+(?:\.\d+)?)%?\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\)?/;
  const match = cleaned.match(oklchRegex);

  if (!match) return null;

  const l = parseFloat(match[1]);
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);

  // Validate ranges
  if (l < 0 || l > 100 || c < 0 || h < 0 || h >= 360) {
    return null;
  }

  return { l, c, h };
}

// Clean text to extract OKLCH patterns
export const cleanOklchText = (text: string): string => {
  // Look for OKLCH patterns using regex and extract them
  const oklchPatterns = [
    // Match oklch(l% c h) format
    /oklch\(\s*(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*\)/gi,
    // Match l% c h format
    /(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/g,
    // Match l c h format (without %)
    /(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/g,
  ];

  const foundColors: string[] = [];

  oklchPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const l = match[1];
      const c = match[2];
      const h = match[3];
      foundColors.push(`oklch(${l}% ${c} ${h})`);
    }
  });

  // Remove duplicates and return
  return [...new Set(foundColors)].join("\n");
};
