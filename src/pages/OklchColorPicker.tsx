import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ColorPicker } from "@/components/ColorPicker";
import { Ad } from "@/components/Ad";
import { getPickedColorOklch } from "@/utils/colorConverterLogic";
import ColorConverterHeader from "@/components/ColorConverterHeader";
import { SEO } from "@/components/SEO";

const OklchColorPicker = () => {
  const [pickedColor, setPickedColor] = useState("#228B22");

  const handleColorPick = (color: string) => {
    setPickedColor(color);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <SEO canonicalUrl="https://oklchtools.com/oklch-color-picker" />
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        {/* Header */}
        <ColorConverterHeader
          title="OKLCH Color Picker"
          description="Pick colors visually and get instant OKLCH values"
          withBackButton
        />

        {/* Main Color Picker */}
        <ColorPicker
          pickedColor={pickedColor}
          onColorPick={handleColorPick}
          getPickedColorOklch={() => getPickedColorOklch(pickedColor)}
        />

        {/* How to use section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 my-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            How to use the OKLCH color picker
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Easy steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    1
                  </span>
                  Click on the color picker to open the color selection
                  interface
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    2
                  </span>
                  Select your desired color from the picker
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    3
                  </span>
                  Copy the OKLCH value for use in your CSS or design tools
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Features:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Real-time OKLCH value updates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  One-click copy to clipboard
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Visual color preview
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Both HEX and OKLCH formats displayed
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why use OKLCH color picker */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Why use an OKLCH color picker?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Precision</h3>
              <p className="text-gray-600 text-sm">
                Get precise OKLCH values directly from visual color selection,
                ensuring accuracy in your designs.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Efficiency</h3>
              <p className="text-gray-600 text-sm">
                Skip manual conversion steps - pick colors and get OKLCH values
                instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="font-semibold mb-2">Future-Ready</h3>
              <p className="text-gray-600 text-sm">
                Work directly with modern OKLCH color space for next-generation
                web design.
              </p>
            </div>
          </div>
        </div>

        {/* Color theory with OKLCH */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Understanding OKLCH values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold mb-3 text-primary">L - Lightness</h3>
              <div className="w-full h-4 bg-gradient-to-r from-black to-white rounded-lg mb-3"></div>
              <p className="text-sm text-gray-600">
                Ranges from 0% (black) to 100% (white). Controls how light or
                dark the color appears.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold mb-3 text-primary">C - Chroma</h3>
              <div className="w-full h-4 bg-gradient-to-r from-gray-400 to-red-500 rounded-lg mb-3"></div>
              <p className="text-sm text-gray-600">
                Controls color intensity/saturation. Higher values = more vivid
                colors.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold mb-3 text-primary">H - Hue</h3>
              <div className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-lg mb-3"></div>
              <p className="text-sm text-gray-600">
                Position on the color wheel (0-360°). Determines the base color.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-12">
          <Ad />
        </div>

        {/* Footer */}
        <footer className="py-4 text-center text-gray-500">
          <p className="mb-2">
            Need color conversion tools? Try our{" "}
            <Link
              to="/hex-to-oklch"
              className="text-primary underline underline-offset-4"
            >
              HEX to OKLCH converter
            </Link>
            {" or "}
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

export default OklchColorPicker;
