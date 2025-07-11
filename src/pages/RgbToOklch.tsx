import React from "react";

import { Link } from "react-router-dom";

import RgbConverter from "@/components/RgbConverter";
import { Ad } from "@/components/Ad";
import ColorConverterHeader from "@/components/ColorConverterHeader";
import { SEO } from "@/components/SEO";

const RgbToOklch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <SEO canonicalUrl="https://oklchtools.com/rgb-to-oklch" />
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        {/* Header */}
        <ColorConverterHeader
          title="RGB to OKLCH converter"
          description="Convert RGB colors to OKLCH format instantly"
          withBackButton
        />

        {/* Main Converter */}

        <RgbConverter />

        {/* How to use section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 my-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            How to convert RGB to OKLCH
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Easy steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    1
                  </span>
                  Paste your RGB color values in the input area
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    2
                  </span>
                  Click "Convert Colors" to transform RGB to OKLCH
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
                  rgb(255, 0, 0)
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  255, 0, 0
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  255 0 0
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Our converter automatically detects RGB patterns and converts
                them to precise OKLCH values.
              </p>
            </div>
          </div>
        </div>

        {/* Why convert RGB to OKLCH */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Why convert RGB to OKLCH?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="font-semibold mb-2">Mathematical Precision</h3>
              <p className="text-gray-600 text-sm">
                OKLCH provides mathematically uniform color space, making color
                calculations more accurate.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="font-semibold mb-2">Human Perception</h3>
              <p className="text-gray-600 text-sm">
                OKLCH better matches human color perception than RGB, leading to
                more intuitive color work.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎛️</span>
              </div>
              <h3 className="font-semibold mb-2">Better Control</h3>
              <p className="text-gray-600 text-sm">
                Separate lightness, chroma, and hue channels provide more
                intuitive color manipulation.
              </p>
            </div>
          </div>
        </div>

        {/* RGB vs OKLCH comparison */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            RGB vs OKLCH: Understanding the difference
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-700">
                RGB Color Space
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Based on display technology (Red, Green, Blue)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Non-uniform perceptual spacing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Difficult to predict color relationships
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Widely supported legacy format
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
                  Based on human visual perception
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Perceptually uniform color space
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Predictable color manipulation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Modern CSS Color Level 4 standard
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common RGB to OKLCH conversions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Common RGB to OKLCH conversions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                rgb: "rgb(255, 0, 0)",
                oklch: "oklch(62.8% 0.25 29)",
                name: "Red",
              },
              {
                rgb: "rgb(0, 255, 0)",
                oklch: "oklch(86.6% 0.29 142)",
                name: "Green",
              },
              {
                rgb: "rgb(0, 0, 255)",
                oklch: "oklch(45.2% 0.31 264)",
                name: "Blue",
              },
              {
                rgb: "rgb(255, 255, 0)",
                oklch: "oklch(96.8% 0.21 109)",
                name: "Yellow",
              },
              {
                rgb: "rgb(255, 0, 255)",
                oklch: "oklch(70.2% 0.32 328)",
                name: "Magenta",
              },
              {
                rgb: "rgb(0, 255, 255)",
                oklch: "oklch(91.1% 0.15 195)",
                name: "Cyan",
              },
            ].map((color, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center mb-3">
                  <div
                    className="w-8 h-8 rounded-xl border-2 border-white shadow-md mr-3"
                    style={{
                      backgroundColor: color.rgb
                        .replace("rgb", "")
                        .replace("(", "")
                        .replace(")", "")
                        .split(",")
                        .map((v) => parseInt(v.trim()))
                        .reduce((acc, val, i) => acc + (val << (16 - i * 8)), 0)
                        .toString(16)
                        .padStart(6, "0")
                        .replace(/^/, "#"),
                    }}
                  ></div>
                  <span className="font-semibold">{color.name}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">RGB:</span>
                    <p className="font-mono text-sm">{color.rgb}</p>
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
              to="/hex-to-oklch"
              className="text-primary underline underline-offset-4"
            >
              HEX to OKLCH converter
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

export default RgbToOklch;
