import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Palette, Wand2, Pipette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  parseHslString,
  hslToOklch,
  formatHsl,
  formatOklch,
  HSLColor,
  OKLCHColor,
} from "@/utils/colorConversion";
import { ColorPicker } from "./ColorPicker";
import { Ad } from "./Ad";
import RgbConverter from "./RgbConverter";
import HexConverter from "./HexConverter";

interface ConvertedColor {
  original: string;
  hsl: HSLColor;
  oklch: OKLCHColor;
}

const ColorConverter = () => {
  const [input, setInput] = useState("");
  const [convertedColors, setConvertedColors] = useState<ConvertedColor[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [pickedColor, setPickedColor] = useState("#228B22");
  const { toast } = useToast();

  // Convert hex to HSL
  const hexToHsl = (hex: string): HSLColor => {
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

  const handleColorPick = (color: string) => {
    setPickedColor(color);
  };

  const getPickedColorOklch = () => {
    const hsl = hexToHsl(pickedColor);
    return hslToOklch(hsl);
  };

  const cleanText = (text: string): string => {
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

  const handleCleanText = () => {
    const cleanedText = cleanText(input);
    if (cleanedText) {
      setInput(cleanedText);
      toast({
        title: "Text cleaned!",
        description: "Found HSL patterns and cleaned the input.",
      });
    } else {
      toast({
        title: "No HSL patterns found",
        description: "Could not find valid HSL color patterns in the text.",
        variant: "destructive",
      });
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast({
        title: "Please enter some colors",
        description: "Add HSL colors to convert them to OKLCH format.",
        variant: "destructive",
      });
      return;
    }

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

    setHasErrors(errorCount > 0);

    if (converted.length === 0) {
      toast({
        title: "No valid colors found",
        description:
          "Please check your HSL color format. Examples: hsl(120, 50%, 75%) or 120, 50%, 75%",
        variant: "destructive",
      });
      return;
    }

    setConvertedColors(converted);

    if (errorCount > 0) {
      toast({
        title: `Partial conversion completed`,
        description: `Converted ${converted.length} colors, ${errorCount} had errors.`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Colors converted!",
        description: `Successfully converted ${converted.length} color${
          converted.length > 1 ? "s" : ""
        }.`,
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Color value copied to clipboard.",
    });
  };

  const copyAllOklch = () => {
    const oklchValues = convertedColors
      .map((color) => formatOklch(color.oklch))
      .join("\n");
    navigator.clipboard.writeText(oklchValues);
    toast({
      title: "All OKLCH values copied!",
      description: `${convertedColors.length} color values copied to clipboard.`,
    });
  };

  const exampleColors = `hsl(120, 100%, 50%)
hsl(240, 100%, 50%)
hsl(0, 100%, 50%)
60, 80%, 60%
300 70% 40%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-4xl mr-4">
              <Palette size={32} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl text-gray-900 mb-4">
            OKLCH color converter
          </h1>
          <Link
            to="/what-is-oklch"
            className="inline-block text-primary hover:text-primary-600 font-medium text-lg mb-6 underline decoration-2 underline-offset-4 hover:decoration-primary-600 transition-colors"
          >
            What is OKLCH?
          </Link>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Convert your HSL, RGB, and Hex colors to modern OKLCH format with
            precision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-satoshi text-lg font-semibold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                HSL to OKLCH converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Textarea
                  placeholder={`Paste your HSL colors here, one per line:
${exampleColors}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[200px] text-lg border-2 border-gray-200 rounded-3xl focus:border-primary transition-colors resize-none font-mono bg-gradient-to-br from-primary-50 to-primary-100"
                />
              </div>
              <Button
                onClick={handleConvert}
                size="lg"
                className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-4 rounded-3xl transition-all duration-200"
              >
                Convert colors
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="font-satoshi text-lg font-semibold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                  Converted Colors
                </CardTitle>
                {convertedColors.length > 0 && !hasErrors && (
                  <Button
                    onClick={copyAllOklch}
                    variant="outline"
                    size="sm"
                    className="rounded-2xl border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy All
                  </Button>
                )}
                {hasErrors && (
                  <Button
                    onClick={handleCleanText}
                    variant="outline"
                    size="sm"
                    className="rounded-2xl border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                  >
                    <Wand2 size={16} className="mr-2" />
                    Clean Text
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {convertedColors.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Palette size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No colors converted yet</p>
                  <p className="text-sm">Add HSL colors and click convert</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {convertedColors.map((color, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-3xl p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-12 h-12 rounded-2xl border-2 border-white shadow-md flex-shrink-0"
                          style={{ backgroundColor: formatHsl(color.hsl) }}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <Badge
                              variant="secondary"
                              className="text-xs rounded-xl mb-1"
                            >
                              HSL
                            </Badge>
                            <p className="font-mono text-sm text-gray-600 truncate">
                              {formatHsl(color.hsl)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0 mr-2">
                              <Badge
                                variant="secondary"
                                className="text-xs rounded-xl mb-1 bg-primary text-white"
                              >
                                OKLCH
                              </Badge>
                              <p className="font-mono text-sm text-gray-900 truncate">
                                {formatOklch(color.oklch)}
                              </p>
                            </div>
                            <Button
                              onClick={() =>
                                copyToClipboard(formatOklch(color.oklch))
                              }
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-xl hover:bg-primary hover:text-white"
                            >
                              <Copy size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Converters Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <RgbConverter />
          <HexConverter />
          {/* Color Picker Section */}
          <ColorPicker
            pickedColor={pickedColor}
            onColorPick={handleColorPick}
            getPickedColorOklch={getPickedColorOklch}
          />
        </div>

        {/* CTA Section - Using Ad component */}
        <div className="mb-12">
          <Ad />
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
