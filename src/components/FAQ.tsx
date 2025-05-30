import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  title?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "What is OKLCH color space?",
    answer:
      "OKLCH is a perceptually uniform color space that stands for OK Lightness, Chroma, and Hue. It's designed to be more intuitive for humans to work with compared to traditional color spaces like RGB or HSL.",
    category: "Color Theory",
  },
  {
    question: "How to convert HSL to OKLCH?",
    answer:
      "Our HSL to OKLCH converter allows you to easily transform HSL color values into OKLCH format. Simply input your HSL values (hue, saturation, lightness) and get the corresponding OKLCH values instantly. This HSL to OKLCH conversion is perfect for modern web development and design workflows.",
    category: "Conversion",
  },
  {
    question: "How to convert OKLCH to RGB?",
    answer:
      "Converting OKLCH to RGB is seamless with our color converter tool. Enter your OKLCH values (lightness, chroma, hue) and instantly get the RGB equivalent. This OKLCH to RGB conversion maintains color accuracy and is essential for web development and digital design projects.",
    category: "Conversion",
  },
  {
    question: "How to convert OKLCH to HEX?",
    answer:
      "Our OKLCH to HEX converter transforms OKLCH color values into hexadecimal format for web use. Simply input your OKLCH coordinates and get the corresponding HEX color code. This OKLCH to HEX conversion is perfect for CSS, HTML, and web design applications.",
    category: "Conversion",
  },
  {
    question: "Is there an OKLCH bulk converter?",
    answer:
      "Yes! Our OKLCH bulk converter feature allows you to convert multiple colors at once. Whether you need to convert multiple OKLCH values to RGB, HEX, HSL, or other formats, our bulk conversion tool saves time when working with large color palettes or design systems.",
    category: "Features",
  },
  {
    question: "How to convert RGB to OKLCH?",
    answer:
      "Converting RGB to OKLCH is simple with our color converter. Input your RGB values (red, green, blue) and instantly receive the OKLCH equivalent. This RGB to OKLCH conversion preserves color accuracy and helps you work with the more perceptually uniform OKLCH color space.",
    category: "Conversion",
  },
  {
    question: "What is the difference between OKLCH and HSL?",
    answer:
      "OKLCH provides better perceptual uniformity compared to HSL. While HSL uses traditional hue, saturation, and lightness, OKLCH uses perceptually uniform lightness, chroma, and hue. This makes OKLCH superior for creating consistent color palettes and accessibility-compliant designs.",
    category: "Color Theory",
  },
  {
    question: "How to use OKLCH in CSS?",
    answer:
      "OKLCH can be used directly in modern CSS with the oklch() function. For example: color: oklch(70% 0.15 180). For broader browser support, use our converter to get fallback RGB or HEX values. Our tool generates CSS-ready OKLCH values for your web projects.",
    category: "Usage",
  },
  {
    question: "Can I convert colors from any format to OKLCH?",
    answer:
      "Yes! Our comprehensive color converter supports conversions from RGB, HEX, HSL, and other color formats to OKLCH. Whether you're working with web colors, design tokens, or color palettes, our tool handles all major color format conversions to and from OKLCH.",
    category: "Features",
  },
  {
    question: "Why should I use OKLCH over other color formats?",
    answer:
      "OKLCH provides better perceptual uniformity, making it easier to create consistent color palettes. It also offers better accessibility, more predictable color adjustments, and superior color interpolation compared to RGB, HSL, or HEX formats.",
    category: "Benefits",
  },
  {
    question: "How do I create color palettes with OKLCH?",
    answer:
      "With OKLCH, you can create harmonious palettes by keeping lightness and chroma consistent while varying the hue, or by systematically adjusting these values for different color relationships. Our tool helps you experiment with OKLCH values to build perfect color schemes.",
    category: "Color Theory",
  },
  {
    question: "Is OKLCH supported in all browsers?",
    answer:
      "OKLCH has good support in modern browsers including Chrome, Firefox, and Safari. For older browsers, you can use our converter to generate fallback RGB or HEX values. Always test your OKLCH colors across target browsers or use progressive enhancement techniques.",
    category: "Compatibility",
  },
];

export const FAQ: React.FC<FAQProps> = ({
  faqs = defaultFaqs,
  title = "Frequently Asked Questions",
}) => {
  const categories = Array.from(
    new Set(faqs.map((faq) => faq.category).filter(Boolean))
  );

  return (
    <Card className="border-0 rounded-4xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="font-satoshi text-lg font-semibold text-gray-900 flex items-center">
          <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs rounded-xl bg-gray-50 text-gray-600 hover:bg-primary hover:text-white transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        <div className="bg-gray-50 rounded-3xl p-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0 bg-white rounded-2xl px-4 shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <HelpCircle size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-satoshi font-semibold text-gray-900 text-sm">
                        {faq.question}
                      </h3>
                      {faq.category && (
                        <Badge
                          variant="secondary"
                          className="text-xs rounded-xl mt-2 bg-primary/10 text-primary border-0"
                        >
                          {faq.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-0">
                  <div className="pl-7">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};
