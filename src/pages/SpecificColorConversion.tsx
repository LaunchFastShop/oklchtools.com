import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Palette, ArrowLeft, Copy, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Ad } from "@/components/Ad";
import {
  hexToOklch,
  formatOklch,
  parseHexString,
  oklchToHex,
  formatHex,
} from "@/utils/colorConversion";
import { COMMON_COLORS, generateColorMeta } from "@/utils/commonColors";
import { SEO } from "@/components/SEO";

const SpecificColorConversion = () => {
  const { colorParam } = useParams<{ colorParam: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conversion, setConversion] = useState<{
    hex: string;
    oklch: string;
    colorName: string;
    isValid: boolean;
  } | null>(null);

  // State for dynamic SEO values
  const [seoData, setSeoData] = useState({
    canonicalUrl: "",
    title: "",
    description: "",
    keywords: [] as string[],
  });

  useEffect(() => {
    if (!colorParam) return;

    // Try to parse the color parameter
    let hex: string | null = null;
    let colorName = "Unknown Color";

    // Check if it's a direct hex match
    if (colorParam.startsWith("#")) {
      hex = parseHexString(colorParam);
    } else {
      // Try with # prefix
      hex = parseHexString(`#${colorParam}`);
    }

    // Check if it's a known common color
    const foundColor = Object.entries(COMMON_COLORS).find(
      ([colorHex, info]) => {
        const cleanParam = colorParam.toLowerCase().replace("#", "");
        const cleanColorHex = colorHex.toLowerCase().replace("#", "");
        return (
          cleanColorHex === cleanParam ||
          info.keywords.some((keyword) => keyword.toLowerCase() === cleanParam)
        );
      }
    );

    if (foundColor) {
      hex = foundColor[0];
      colorName = foundColor[1].name;
    }

    if (hex) {
      const oklch = hexToOklch(hex);
      if (oklch) {
        const oklchString = formatOklch(oklch);
        setConversion({
          hex,
          oklch: oklchString,
          colorName,
          isValid: true,
        });

        // Update SEO data using the same meta generation logic
        const meta = generateColorMeta(hex, oklchString, colorName);
        setSeoData({
          canonicalUrl: `https://oklchtools.com/color/${colorParam}`,
          title: meta.title,
          description: meta.description,
          keywords: meta.keywords,
        });
      } else {
        setConversion({ hex, oklch: "", colorName, isValid: false });
      }
    } else {
      // Invalid color, redirect to main converter
      navigate("/hex-to-oklch");
    }
  }, [colorParam, navigate]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} value copied to clipboard.`,
    });
  };

  const shareConversion = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Share this specific color conversion with others.",
    });
  };

  if (!conversion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading color conversion...</p>
        </div>
      </div>
    );
  }

  if (!conversion.isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Invalid color format</p>
          <Button onClick={() => navigate("/hex-to-oklch")}>
            Go to HEX Converter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <SEO
        canonicalUrl={seoData.canonicalUrl}
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-4xl mr-4">
              <Palette size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl text-primary-600 font-satoshi font-semibold mb-4">
            {conversion.hex} to OKLCH Converter
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Convert {conversion.colorName} ({conversion.hex}) to OKLCH format
            instantly
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/hex-to-oklch">
              <Button
                variant="outline"
                className="rounded-3xl border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ArrowLeft size={16} className="mr-2" />
                All HEX Conversions
              </Button>
            </Link>
            <Button
              onClick={shareConversion}
              variant="outline"
              className="rounded-3xl border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Share size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Conversion Result */}
        <Card className="border-0 shadow-2xl rounded-4xl bg-white/90 backdrop-blur-sm mb-12">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {conversion.colorName} Color Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
              {/* HEX Side */}
              <div className="text-center">
                <div
                  className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl mx-auto mb-4"
                  style={{ backgroundColor: conversion.hex }}
                ></div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h3 className="font-semibold mb-2 text-primary">HEX Color</h3>
                  <p className="font-mono text-2xl font-bold mb-2">
                    {conversion.hex}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {conversion.colorName}
                  </p>
                  <Button
                    onClick={() => copyToClipboard(conversion.hex, "HEX")}
                    size="sm"
                    variant="outline"
                    className="rounded-2xl"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy HEX
                  </Button>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-4xl text-primary rotate-90 md:rotate-0">
                →
              </div>

              {/* OKLCH Side */}
              <div className="text-center">
                <div
                  className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl mx-auto mb-4"
                  style={{ backgroundColor: conversion.hex }}
                ></div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h3 className="font-semibold mb-2 text-primary">
                    OKLCH Color
                  </h3>
                  <p className="font-mono text-lg font-bold mb-2 break-all">
                    {conversion.oklch}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Perceptually uniform
                  </p>
                  <Button
                    onClick={() => copyToClipboard(conversion.oklch, "OKLCH")}
                    size="sm"
                    variant="outline"
                    className="rounded-2xl"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy OKLCH
                  </Button>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">CSS Usage Examples</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Legacy CSS (HEX):
                  </p>
                  <code className="block bg-white p-3 rounded text-sm font-mono">
                    color: {conversion.hex};
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Modern CSS (OKLCH):
                  </p>
                  <code className="block bg-white p-3 rounded text-sm font-mono">
                    color: {conversion.oklch};
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why use OKLCH */}
        <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Why convert {conversion.colorName} to OKLCH?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="font-semibold mb-2">Human Perception</h3>
                <p className="text-gray-600 text-sm">
                  OKLCH matches how humans actually see colors, making{" "}
                  {conversion.colorName} adjustments more intuitive.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">♿</span>
                </div>
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  Better control over lightness ensures {conversion.colorName}{" "}
                  meets accessibility requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔮</span>
                </div>
                <h3 className="font-semibold mb-2">Future-Ready</h3>
                <p className="text-gray-600 text-sm">
                  OKLCH is the future of CSS colors, making{" "}
                  {conversion.colorName} compatible with modern standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Conversions */}
        <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Related Color Conversions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(COMMON_COLORS)
                .slice(0, 6)
                .map(([hex, info]) => (
                  <Link
                    key={hex}
                    to={`/color/${hex.replace("#", "")}`}
                    className="block bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm mr-3"
                        style={{ backgroundColor: hex }}
                      ></div>
                      <span className="font-semibold text-sm">{info.name}</span>
                    </div>
                    <p className="font-mono text-xs text-gray-600">{hex}</p>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mb-12">
          <Ad />
        </div>

        {/* Footer */}
        <footer className="py-4 text-center text-gray-500">
          <p className="mb-2">
            Need other conversions? Try our{" "}
            <Link
              to="/oklch-to-hex"
              className="text-primary underline underline-offset-4"
            >
              OKLCH to HEX converter
            </Link>
            {" or "}
            <Link
              to="/oklch-color-picker"
              className="text-primary underline underline-offset-4"
            >
              OKLCH color picker
            </Link>
          </p>
          a{" "}
          <a
            rel="dofollow"
            href="https://launchfast.shop?ref=oklch"
            className="text-primary underline underline-offset-4"
          >
            LaunchFast.shop
          </a>{" "}
          product ♥️
        </footer>
      </div>
    </div>
  );
};

export default SpecificColorConversion;
