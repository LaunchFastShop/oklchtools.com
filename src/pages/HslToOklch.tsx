import React from "react";

import { Link } from "react-router-dom";

import HslConverter from "@/components/HslConverter";
import { Ad } from "@/components/Ad";
import ColorConverterHeader from "@/components/ColorConverterHeader";
import { SEO } from "@/components/SEO";

const HslToOklch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <SEO canonicalUrl="https://oklchtools.com/hsl-to-oklch" />
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        {/* Header */}
        <ColorConverterHeader
          title="HSL to OKLCH converter"
          description="Convert HSL colors to OKLCH format instantly"
          withBackButton
        />

        {/* Main Converter */}
        <HslConverter />

        {/* How to use section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 m-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            How to convert HSL to OKLCH
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Easy steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    1
                  </span>
                  Paste your HSL color values in the input area
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    2
                  </span>
                  Click "Convert Colors" to transform HSL to OKLCH
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
                  hsl(120, 50%, 75%)
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  120, 50%, 75%
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  120 50% 75%
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Our converter automatically detects HSL patterns and converts
                them to precise OKLCH values.
              </p>
            </div>
          </div>
        </div>

        {/* Why convert HSL to OKLCH */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Why convert HSL to OKLCH?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Better Precision</h3>
              <p className="text-gray-600 text-sm">
                OKLCH provides more accurate color representation than HSL,
                especially for accessibility calculations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌈</span>
              </div>
              <h3 className="font-semibold mb-2">Uniform Lightness</h3>
              <p className="text-gray-600 text-sm">
                Unlike HSL, OKLCH lightness values correspond to how humans
                actually perceive brightness.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="font-semibold mb-2">Future Standards</h3>
              <p className="text-gray-600 text-sm">
                OKLCH is part of CSS Color Level 4 and represents the future of
                web color standards.
              </p>
            </div>
          </div>
        </div>

        {/* HSL vs OKLCH comparison */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            HSL vs OKLCH: Key differences
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">
                HSL Color Space
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Hue, Saturation, Lightness model
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Non-perceptually uniform lightness
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Widely supported in CSS
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Can produce unexpected results in calculations
                </li>
              </ul>
            </div>
            <div className="bg-primary-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                OKLCH Color Space
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  OK Lightness, Chroma, Hue model
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Perceptually uniform lightness
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Modern browsers support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Predictable color manipulations
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common HSL to OKLCH conversions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Common HSL to OKLCH conversions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                hsl: "hsl(0, 100%, 50%)",
                oklch: "oklch(62.8% 0.25 29)",
                name: "Red",
              },
              {
                hsl: "hsl(120, 100%, 50%)",
                oklch: "oklch(86.6% 0.29 142)",
                name: "Green",
              },
              {
                hsl: "hsl(240, 100%, 50%)",
                oklch: "oklch(45.2% 0.31 264)",
                name: "Blue",
              },
              {
                hsl: "hsl(60, 100%, 50%)",
                oklch: "oklch(96.8% 0.21 109)",
                name: "Yellow",
              },
              {
                hsl: "hsl(300, 100%, 50%)",
                oklch: "oklch(70.2% 0.32 328)",
                name: "Magenta",
              },
              {
                hsl: "hsl(180, 100%, 50%)",
                oklch: "oklch(91.1% 0.15 195)",
                name: "Cyan",
              },
            ].map((color, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center mb-3">
                  <div
                    className="w-8 h-8 rounded-xl border-2 border-white shadow-md mr-3"
                    style={{ backgroundColor: color.hsl }}
                  ></div>
                  <span className="font-semibold">{color.name}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">HSL:</span>
                    <p className="font-mono text-sm">{color.hsl}</p>
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
            Need other conversions? Try our{" "}
            <Link
              to="/rgb-to-oklch"
              className="text-primary underline underline-offset-4"
            >
              RGB to OKLCH converter
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

export default HslToOklch;
