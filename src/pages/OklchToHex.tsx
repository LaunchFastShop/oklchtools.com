import React from "react";
import { Link } from "react-router-dom";
import OklchToHexConverter from "@/components/OklchToHexConverter";
import { Ad } from "@/components/Ad";
import ColorConverterHeader from "@/components/ColorConverterHeader";
import { SEO } from "@/components/SEO";

const OklchToHex = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <SEO canonicalUrl="https://oklchtools.com/oklch-to-hex" />
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        {/* Header */}
        <ColorConverterHeader
          title="OKLCH to HEX converter"
          description="Convert OKLCH colors to HEX format instantly"
          withBackButton
        />

        {/* Main Converter */}
        <OklchToHexConverter />

        {/* How to use section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 my-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            How to convert OKLCH to HEX
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Easy steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    1
                  </span>
                  Paste your OKLCH color values in the input area
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    2
                  </span>
                  Click "Convert Colors" to transform OKLCH to HEX
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    3
                  </span>
                  Copy individual HEX values or all at once
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Supported formats:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  oklch(92.8% 0.006 264.531)
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  92.8% 0.006 264.531
                </li>
                <li className="font-mono text-sm bg-gray-100 p-2 rounded">
                  92.8 0.006 264.531
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Our converter automatically detects OKLCH patterns and converts
                them to standard HEX format.
              </p>
            </div>
          </div>
        </div>

        {/* Why convert OKLCH to HEX */}
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Why convert OKLCH to HEX?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Legacy Support</h3>
              <p className="text-gray-600 text-sm">
                Convert modern OKLCH colors to HEX for compatibility with older
                browsers and design tools.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Web Development</h3>
              <p className="text-gray-600 text-sm">
                Use HEX values in CSS frameworks and libraries that don't yet
                support OKLCH.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold mb-2">Tool Integration</h3>
              <p className="text-gray-600 text-sm">
                Export OKLCH colors as HEX for use in graphics software and
                design tools.
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
            Need to convert in the other direction? Try our{" "}
            <Link
              to="/hex-to-oklch"
              className="text-primary underline underline-offset-4"
            >
              HEX to OKLCH converter
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

export default OklchToHex;
