import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  parseOklchString,
  oklchToHex,
  formatOklch,
  formatHex,
  OKLCHColor,
  cleanOklchText,
} from "@/utils/colorConversion";

interface ConvertedColor {
  original: string;
  oklch: OKLCHColor;
  hex: string;
}

const OklchToHexConverter = () => {
  const [input, setInput] = useState("");
  const [convertedColors, setConvertedColors] = useState<ConvertedColor[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const { toast } = useToast();

  const handleCleanText = () => {
    const cleanedText = cleanOklchText(input);
    if (cleanedText) {
      setInput(cleanedText);
      toast({
        title: "Text cleaned!",
        description: "Found OKLCH patterns and cleaned the input.",
      });
    } else {
      toast({
        title: "No OKLCH patterns found",
        description: "Could not find valid OKLCH color patterns in the text.",
        variant: "destructive",
      });
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast({
        title: "Please enter some colors",
        description: "Add OKLCH colors to convert them to HEX format.",
        variant: "destructive",
      });
      return;
    }

    const lines = input.split("\n").filter((line) => line.trim());
    const converted: ConvertedColor[] = [];
    let errorCount = 0;

    lines.forEach((line) => {
      const oklch = parseOklchString(line);
      if (oklch) {
        const hex = oklchToHex(oklch);
        converted.push({
          original: line.trim(),
          oklch,
          hex,
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
          "Please check your OKLCH color format. Examples: oklch(92.8% 0.006 264.531) or 92.8% 0.006 264.531",
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

  const copyAllHex = () => {
    const hexValues = convertedColors
      .map((color) => formatHex(color.hex))
      .join("\n");
    navigator.clipboard.writeText(hexValues);
    toast({
      title: "All HEX values copied!",
      description: `${convertedColors.length} color values copied to clipboard.`,
    });
  };

  const exampleColors = `oklch(92.8% 0.006 264.531)
oklch(62.8% 0.25 29)
oklch(80% 0.15 142)
92.8% 0.006 264.531
50% 0.2 0`;

  return (
    <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="pb-6 flex-shrink-0">
        <CardTitle className="font-satoshi text-lg font-semibold text-gray-900 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
          OKLCH to HEX converter
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-6">
        <div className="flex-1 flex flex-col">
          <Textarea
            placeholder={`Paste your OKLCH colors here, one per line: ${exampleColors}`}
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-sm border-2 border-gray-200 rounded-3xl focus:border-green-500 transition-colors resize-none font-mono bg-gradient-to-br from-green-50 to-green-100"
          />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={handleConvert}
            size="sm"
            className="flex-1 bg-green-500 border border-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-3xl hover:shadow-xl transition-all duration-200"
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
                onClick={copyAllHex}
                variant="outline"
                size="sm"
                className="rounded-2xl border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
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
                          OKLCH
                        </Badge>
                        <p className="font-mono text-xs text-gray-600 truncate">
                          {formatOklch(color.oklch)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 mr-2">
                          <Badge
                            variant="secondary"
                            className="text-xs rounded-xl mb-1 bg-green-500 text-white"
                          >
                            HEX
                          </Badge>
                          <p className="font-mono text-xs text-gray-900 truncate">
                            {formatHex(color.hex)}
                          </p>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(formatHex(color.hex))}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-xl hover:bg-green-500 hover:text-white"
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

export default OklchToHexConverter;
