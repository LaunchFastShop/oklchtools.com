import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  parseHexString,
  hexToOklch,
  formatHex,
  formatOklch,
  OKLCHColor,
} from "@/utils/colorConversion";

interface ConvertedColor {
  original: string;
  hex: string;
  oklch: OKLCHColor;
}

const HexConverter = () => {
  const [input, setInput] = useState("");
  const [convertedColors, setConvertedColors] = useState<ConvertedColor[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const { toast } = useToast();

  const cleanText = (text: string): string => {
    // Look for Hex patterns using regex and extract them
    const hexPatterns = [
      // Match #hex format
      /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/g,
      // Match hex without # (standalone)
      /\b([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g,
    ];

    const foundColors: string[] = [];

    hexPatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const hex = match[1];
        foundColors.push(`#${hex}`);
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
        description: "Found Hex patterns and cleaned the input.",
      });
    } else {
      toast({
        title: "No Hex patterns found",
        description: "Could not find valid Hex color patterns in the text.",
        variant: "destructive",
      });
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast({
        title: "Please enter some colors",
        description: "Add Hex colors to convert them to OKLCH format.",
        variant: "destructive",
      });
      return;
    }

    const lines = input.split("\n").filter((line) => line.trim());
    const converted: ConvertedColor[] = [];
    let errorCount = 0;

    lines.forEach((line) => {
      const hex = parseHexString(line);
      if (hex) {
        const oklch = hexToOklch(hex);
        if (oklch) {
          converted.push({
            original: line.trim(),
            hex,
            oklch,
          });
        } else {
          errorCount++;
        }
      } else {
        errorCount++;
      }
    });

    setHasErrors(errorCount > 0);

    if (converted.length === 0) {
      toast({
        title: "No valid colors found",
        description:
          "Please check your Hex color format. Examples: #FF0000, #f00, FF0000, f00",
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

  const exampleColors = `#FF0000
#00FF00
#0000FF
#f00
A52A2A
800080`;

  return (
    <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="pb-6 flex-shrink-0">
        <CardTitle className="font-satoshi text-lg font-semibold text-gray-900 flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
          Hex to OKLCH converter
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-6">
        <div className="flex-1 flex flex-col">
          <Textarea
            placeholder={`Paste your Hex colors here, one per line:
${exampleColors}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-sm border-2 border-gray-200 rounded-3xl focus:border-blue-500 transition-colors resize-none font-mono bg-gradient-to-br from-blue-50 to-blue-100"
          />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={handleConvert}
            size="sm"
            className="flex-1 bg-blue-500 border border-blue-700 hover:bg-blue-600 text-white font-semibold py-3 rounded-3xl hover:shadow-xl transition-all duration-200"
          >
            Convert Colors
          </Button>
          {hasErrors && (
            <Button
              onClick={handleCleanText}
              variant="outline"
              size="sm"
              className="rounded-2xl border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
            >
              <Wand2 size={16} className="mr-2" />
              Clean
            </Button>
          )}
        </div>

        {/* Results */}
        {convertedColors.length > 0 && (
          <div className="space-y-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Converted Colors</h4>
              <Button
                onClick={copyAllOklch}
                variant="outline"
                size="sm"
                className="rounded-2xl border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <Copy size={16} className="mr-2" />
                Copy All
              </Button>
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {convertedColors.map((color, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-3xl p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-xl border-2 border-white shadow-md flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <Badge
                          variant="secondary"
                          className="text-xs rounded-xl mb-1"
                        >
                          HEX
                        </Badge>
                        <p className="font-mono text-xs text-gray-600 truncate">
                          {formatHex(color.hex)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 mr-2">
                          <Badge
                            variant="secondary"
                            className="text-xs rounded-xl mb-1 bg-blue-500 text-white"
                          >
                            OKLCH
                          </Badge>
                          <p className="font-mono text-xs text-gray-900 truncate">
                            {formatOklch(color.oklch)}
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            copyToClipboard(formatOklch(color.oklch))
                          }
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-xl hover:bg-blue-500 hover:text-white"
                        >
                          <Copy size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HexConverter;
