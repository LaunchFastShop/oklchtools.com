import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  convertColorsFromInput,
  getPickedColorOklch,
  ConvertedColor,
} from "@/utils/colorConverterLogic";
import ColorConverterHeader from "./ColorConverterHeader";
import ColorInput from "./ColorInput";
import ColorResults from "./ColorResults";
import { ColorPicker } from "./ColorPicker";
import { Ad } from "./Ad";
import RgbConverter from "./RgbConverter";
import HexConverter from "./HexConverter";

const ColorConverter = () => {
  const [input, setInput] = useState("");
  const [convertedColors, setConvertedColors] = useState<ConvertedColor[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [pickedColor, setPickedColor] = useState("#228B22");
  const { toast } = useToast();

  const handleColorPick = (color: string) => {
    setPickedColor(color);
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

    const result = convertColorsFromInput(input);

    setHasErrors(result.hasErrors);
    setConvertedColors(result.convertedColors);

    if (result.convertedColors.length === 0) {
      toast({
        title: "No valid colors found",
        description:
          "Please check your HSL color format. Examples: hsl(120, 50%, 75%) or 120, 50%, 75%",
        variant: "destructive",
      });
      return;
    }

    if (result.errorCount > 0) {
      toast({
        title: `Partial conversion completed`,
        description: `Converted ${result.convertedColors.length} colors, ${result.errorCount} had errors.`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Colors converted!",
        description: `Successfully converted ${
          result.convertedColors.length
        } color${result.convertedColors.length > 1 ? "s" : ""}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        <ColorConverterHeader title="OKLCH to Hex, RGB, HSL converter and more" />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ColorInput
            input={input}
            setInput={setInput}
            onConvert={handleConvert}
            hasErrors={hasErrors}
          />
          <ColorResults
            convertedColors={convertedColors}
            hasErrors={hasErrors}
          />
        </div>

        {/* Additional Converters Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <RgbConverter />
          <HexConverter />
          <ColorPicker
            pickedColor={pickedColor}
            onColorPick={handleColorPick}
            getPickedColorOklch={() => getPickedColorOklch(pickedColor)}
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
