import ColorConverter from "@/components/ColorConverter";
import { FAQ } from "@/components/FAQ";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { POPULAR_CONVERSIONS } from "@/utils/commonColors";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="space-y-8">
      <SEO canonicalUrl="https://oklchtools.com/" />
      <ColorConverter />

      {/* Popular Color Conversions Section */}
      <Card className="border-0 bg-white/80">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 text-left font-satoshi">
            <div className="inline-block bg-primary h-3 w-3 rounded-full mr-2" />{" "}
            Popular Color Conversions
          </CardTitle>
          <p className="text-gray-600 text-sm text-left">
            Convert any color by visiting{" "}
            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
              /color/[hex-code]
            </code>
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {POPULAR_CONVERSIONS.map((conversion, index) => {
              const colorParam = conversion.from.replace("#", "");
              return (
                <Link
                  key={index}
                  to={`/color/${colorParam}`}
                  className="block bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors group"
                >
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-2xl border-2 border-white shadow-md mx-auto mb-3 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: conversion.from }}
                    ></div>
                    <p className="font-mono text-sm font-semibold mb-1">
                      {conversion.from}
                    </p>
                    <p className="text-xs text-gray-600">{conversion.query}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <FAQ />
      <footer className="py-4 text-center text-gray-500">
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
  );
};

export default Index;
