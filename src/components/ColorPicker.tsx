import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Pipette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatOklch, OKLCHColor } from "@/utils/colorConversion";

interface ColorPickerProps {
  pickedColor: string;
  onColorPick: (color: string) => void;
  getPickedColorOklch: () => OKLCHColor;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  pickedColor,
  onColorPick,
  getPickedColorOklch,
  className,
}) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Color value copied to clipboard.",
    });
  };

  return (
    <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="font-satoshi text-lg font-semibold text-gray-900 flex items-center">
          <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
          OKLCH Color Picker
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`space-y-6 flex flex-col items-center space-y-4 ${className}`}
      >
        <div className="relative">
          <input
            type="color"
            value={pickedColor}
            onChange={(e) => onColorPick(e.target.value)}
            className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg cursor-pointer mx-auto"
          />
          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full">
            <Pipette size={16} />
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="bg-gray-50 rounded-3xl p-4">
            <Badge variant="secondary" className="text-xs rounded-xl mb-2">
              Selected Color
            </Badge>
            <p className="font-mono text-sm text-gray-600 text-center">
              {pickedColor}
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-2">
                <Badge
                  variant="secondary"
                  className="text-xs rounded-xl mb-2 bg-primary text-white"
                >
                  OKLCH
                </Badge>
                <p className="font-mono text-sm text-gray-900">
                  {formatOklch(getPickedColorOklch())}
                </p>
              </div>
              <Button
                onClick={() =>
                  copyToClipboard(formatOklch(getPickedColorOklch()))
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
      </CardContent>
    </Card>
  );
};
