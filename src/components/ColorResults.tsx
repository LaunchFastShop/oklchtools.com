import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatHsl, formatOklch } from "@/utils/colorConversion";
import { ConvertedColor } from "@/utils/colorConverterLogic";

interface ColorResultsProps {
  convertedColors: ConvertedColor[];
  hasErrors: boolean;
}

const ColorResults: React.FC<ColorResultsProps> = ({
  convertedColors,
  hasErrors,
}) => {
  const { toast } = useToast();

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

  return (
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
  );
};

export default ColorResults;
