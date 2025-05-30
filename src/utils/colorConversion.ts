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
