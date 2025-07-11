import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import HexConverter from "@/components/HexConverter";
import { Ad } from "@/components/Ad";
import {
  hexToOklch,
  formatOklch,
  parseHexString,
} from "@/utils/colorConversion";
import ColorConverterHeader from "@/components/ColorConverterHeader";
import { SEO } from "@/components/SEO";

const HexToOklch = () => {
  const [searchParams] = useSearchParams();
  const [specificConversion, setSpecificConversion] = useState<{
    hex: string;
    oklch: string;
  } | null>(null);

  // State for dynamic SEO values
  const [seoData, setSeoData] = useState({
    canonicalUrl: "https://oklchtools.com/hex-to-oklch",
    title: "",
    description: "",
  });

  useEffect(() => {
    // Check for color parameter in URL
    const colorParam = searchParams.get("color") || searchParams.get("hex");
    if (colorParam) {
      const hex = parseHexString(colorParam);
      if (hex) {
        const oklch = hexToOklch(hex);
        if (oklch) {
          const oklchString = formatOklch(oklch);
          setSpecificConversion({
            hex,
            oklch: oklchString,
          });

          // Update SEO data for specific color conversion
          // Use the /color/ canonical URL format to match sitemap and avoid duplication
          const colorParam = hex.replace("#", "");
          setSeoData({
            canonicalUrl: `https://oklchtools.com/color/${colorParam}`,
            title: `${hex} to OKLCH = ${oklchString} | HEX to OKLCH Converter`,
            description: `Convert ${hex} to OKLCH format: ${oklchString}. Free HEX to OKLCH color converter tool.`,
          });
        }
      }
    } else {
      // Reset to default SEO for base page
      setSeoData({
        canonicalUrl: "https://oklchtools.com/hex-to-oklch",
        title: "",
        description: "",
      });
    }
  }, [searchParams]);

  const pageTitle = specificConversion
    ? `${specificConversion.hex} to OKLCH converter`
    : "HEX to OKLCH converter";

  const pageDescription = specificConversion
    ? `Convert ${specificConversion.hex} to OKLCH format instantly. Result: ${specificConversion.oklch}.`
    : "Convert HEX colors to OKLCH format instantly";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <SEO
        canonicalUrl={seoData.canonicalUrl}
        title={seoData.title || undefined}
        description={seoData.description || undefined}
      />
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        {/* Header */}
        <ColorConverterHeader
          title={pageTitle}
          description={pageDescription}
          withBackButton
        />

        {/* Specific conversion result at the top */}
        {specificConversion && (
          <div className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-xl p-6 mb-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg mx-auto mb-2"
                  style={{ backgroundColor: specificConversion.hex }}
                ></div>
                <p className="font-mono font-semibold text-lg">
                  {specificConversion.hex}
                </p>
                <p className="text-gray-600 text-sm">HEX</p>
              </div>
              <div className="text-2xl text-primary">→</div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg mx-auto mb-2"
                  style={{ backgroundColor: specificConversion.hex }}
                ></div>
                <p className="font-mono font-semibold text-lg">
                  {specificConversion.oklch}
                </p>
                <p className="text-gray-600 text-sm">OKLCH</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Converter */}

        <HexConverter />

        {/* How to use section */}
        <div className="bg-white/80 mt-12 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            How to convert HEX to OKLCH
          </h2>

          {/* URL conversion tip */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              💡 Pro Tip: Direct URL Conversion
            </h3>
            <p className="text-blue-700 mb-3">
              Convert any HEX color instantly by adding it to the URL:
            </p>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-3 font-mono text-sm">
                <span className="text-gray-600">oklchtools.com/color/</span>
                <span className="text-blue-600">FF0000</span>
                <span className="text-gray-500 ml-2">(recommended)</span>
              </div>
              <div className="bg-white rounded-lg p-3 font-mono text-sm">
                <span className="text-gray-600">
                  oklchtools.com/hex-to-oklch?color=
                </span>
                <span className="text-blue-600">#FF0000</span>
              </div>
            </div>
            <p className="text-blue-600 text-sm mt-2">
              Both formats work, but /color/ URLs are preferred for SEO!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Easy steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    1
                  </span>
                  Paste your HEX color values in the input area
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    2
                  </span>
                  Click "Convert Colors" to transform HEX to OKLCH
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    3
                  </span>
                  Copy individual OKLCH values or all at once
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Supported formats:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  #FF0000
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  #f00
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  FF0000
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  f00
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Our converter automatically detects HEX patterns and converts
                them to precise OKLCH values.
              </p>
            </div>
          </div>
        </div>

        {/* Why convert HEX to OKLCH */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Why convert HEX to OKLCH?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="font-semibold mb-2">Perceptual Uniformity</h3>
              <p className="text-gray-600 text-sm">
                OKLCH provides better perceptual uniformity than HEX, making
                color adjustments more predictable.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">♿</span>
              </div>
              <h3 className="font-semibold mb-2">Better Accessibility</h3>
              <p className="text-gray-600 text-sm">
                OKLCH makes it easier to create accessible color combinations
                and maintain contrast ratios.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Modern CSS</h3>
              <p className="text-gray-600 text-sm">
                Use OKLCH in modern CSS for superior color manipulation and
                future-proof design.
              </p>
            </div>
          </div>
        </div>

        {/* Common HEX to OKLCH conversions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Common HEX to OKLCH conversions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { hex: "#FF0000", oklch: "oklch(62.8% 0.25 29)", name: "Red" },
              { hex: "#00FF00", oklch: "oklch(86.6% 0.29 142)", name: "Green" },
              { hex: "#0000FF", oklch: "oklch(45.2% 0.31 264)", name: "Blue" },
              { hex: "#FFFFFF", oklch: "oklch(100% 0 0)", name: "White" },
              { hex: "#000000", oklch: "oklch(0% 0 0)", name: "Black" },
              { hex: "#808080", oklch: "oklch(59.8% 0 0)", name: "Gray" },
            ].map((color, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center mb-3">
                  <div
                    className="w-8 h-8 rounded-xl border-2 border-white shadow-md mr-3"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <span className="font-semibold">{color.name}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">HEX:</span>
                    <p className="font-mono text-sm">
                      <Link
                        to={`/color/${color.hex.replace("#", "")}`}
                        className="text-blue-600 hover:underline"
                      >
                        {color.hex}
                      </Link>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">OKLCH:</span>
                    <p className="font-mono text-sm">{color.oklch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-12">
          <Ad />
        </div>

        {/* Footer */}
        <footer className="py-4 text-center text-gray-500">
          <p className="mb-2">
            Need to convert in the other direction? Try our{" "}
            <Link
              to="/oklch-to-hex"
              className="text-primary underline underline-offset-4"
            >
              OKLCH to HEX converter
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

export default HexToOklch;
