import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cleanText } from "@/utils/colorConversion";

interface ColorInputProps {
  input: string;
  setInput: (value: string) => void;
  onConvert: () => void;
  hasErrors: boolean;
}

const ColorInput: React.FC<ColorInputProps> = ({
  input,
  setInput,
  onConvert,
  hasErrors,
}) => {
  const { toast } = useToast();

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

  const exampleColors = `hsl(120, 100%, 50%)
hsl(240, 100%, 50%)
hsl(0, 100%, 50%)
60, 80%, 60%
300 70% 40%`;

  return (
    <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="font-satoshi text-lg font-semibold text-gray-900 flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
            HSL to OKLCH converter
          </CardTitle>
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
          onClick={onConvert}
          size="lg"
          className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-4 rounded-3xl transition-all duration-200"
        >
          Convert colors
        </Button>
      </CardContent>
    </Card>
  );
};

export default ColorInput;
