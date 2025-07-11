// Common colors that people frequently search for conversions
export const COMMON_COLORS = {
  // Basic colors
  "#000000": { name: "Black", keywords: ["black", "pure black", "0000"] },
  "#FFFFFF": {
    name: "White",
    keywords: ["white", "pure white", "fff", "ffffff"],
  },
  "#FF0000": { name: "Red", keywords: ["red", "pure red", "f00"] },
  "#00FF00": { name: "Green", keywords: ["green", "lime", "0f0"] },
  "#0000FF": { name: "Blue", keywords: ["blue", "pure blue", "00f"] },
  "#FFFF00": { name: "Yellow", keywords: ["yellow", "pure yellow", "ff0"] },
  "#FF00FF": { name: "Magenta", keywords: ["magenta", "fuchsia", "f0f"] },
  "#00FFFF": { name: "Cyan", keywords: ["cyan", "aqua", "0ff"] },

  // Gray scale
  "#808080": { name: "Gray", keywords: ["gray", "grey", "50% gray"] },
  "#C0C0C0": { name: "Silver", keywords: ["silver", "light gray"] },
  "#404040": { name: "Dark Gray", keywords: ["dark gray", "dark grey"] },

  // Popular web colors
  "#3366CC": {
    name: "Google Blue",
    keywords: ["google blue", "material blue"],
  },
  "#1DA1F2": {
    name: "Twitter Blue",
    keywords: ["twitter blue", "twitter color"],
  },
  "#4267B2": {
    name: "Facebook Blue",
    keywords: ["facebook blue", "facebook color"],
  },
  "#FF5722": {
    name: "Material Orange",
    keywords: ["material orange", "material design orange"],
  },
  "#E91E63": {
    name: "Material Pink",
    keywords: ["material pink", "material design pink"],
  },
  "#9C27B0": {
    name: "Material Purple",
    keywords: ["material purple", "material design purple"],
  },

  // Brand colors
  "#FF6B6B": { name: "Coral Red", keywords: ["coral", "coral red", "salmon"] },
  "#4ECDC4": { name: "Turquoise", keywords: ["turquoise", "teal"] },
  "#45B7D1": { name: "Sky Blue", keywords: ["sky blue", "light blue"] },
  "#F39C12": { name: "Orange", keywords: ["orange", "amber"] },
  "#E74C3C": { name: "Crimson", keywords: ["crimson", "red crimson"] },
  "#2ECC71": { name: "Emerald", keywords: ["emerald", "emerald green"] },
  "#9B59B6": { name: "Amethyst", keywords: ["amethyst", "purple amethyst"] },
  "#1ABC9C": { name: "Turquoise Green", keywords: ["turquoise green", "mint"] },

  // Common shortened versions people search for
  "#000": { name: "Black (Short)", keywords: ["000", "black short"] },
  "#FFF": { name: "White (Short)", keywords: ["fff", "white short"] },
  "#F00": { name: "Red (Short)", keywords: ["f00", "red short"] },
  "#0F0": { name: "Green (Short)", keywords: ["0f0", "green short"] },
  "#00F": { name: "Blue (Short)", keywords: ["00f", "blue short"] },
};

// Generate SEO-friendly slugs for colors
export const generateColorSlug = (hex: string, name: string): string => {
  const cleanHex = hex.replace("#", "").toLowerCase();
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${cleanHex}-${cleanName}`;
};

// Generate meta information for color conversion pages
export const generateColorMeta = (
  hex: string,
  oklch: string,
  colorName: string
) => ({
  title: `${hex} to OKLCH = ${oklch} | Convert ${colorName} HEX to OKLCH`,
  description: `Convert ${hex} (${colorName}) to OKLCH format: ${oklch}. Free instant HEX to OKLCH color converter. Perfect for CSS, design, and accessibility.`,
  keywords: [
    `${hex} to oklch`,
    `${hex.replace("#", "")} to oklch`,
    `${colorName.toLowerCase()} hex to oklch`,
    `convert ${hex} to oklch`,
    `${hex} oklch converter`,
    `hex ${hex} to oklch`,
    `color ${hex} to oklch`,
  ],
});

// Popular color combinations that people search for
export const POPULAR_CONVERSIONS = [
  { from: "#000000", query: "black to oklch" },
  { from: "#FFFFFF", query: "white to oklch" },
  { from: "#FF0000", query: "red to oklch" },
  { from: "#00FF00", query: "green to oklch" },
  { from: "#0000FF", query: "blue to oklch" },
  { from: "#000", query: "000 to oklch" },
  { from: "#FFF", query: "fff to oklch" },
  { from: "#F00", query: "f00 to oklch" },
  { from: "#808080", query: "gray to oklch" },
  { from: "#C0C0C0", query: "silver to oklch" },
];
