import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Eye, Lightbulb, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const OKLCHInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <div className="container mx-auto px-4 py-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-4xl mr-4">
              <Palette size={32} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl text-primary-600 font-semibold mb-4">
            What is OKLCH?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover what OKLCH is and why OKLCH color format is the future of
            digital design - a perceptually uniform color space designed for
            modern web development and CSS.
          </p>
          <Link to="/">
            <Button
              variant="outline"
              className="mt-6 rounded-3xl border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Converter
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {/* Quick Answer Section */}
          <Card className="shadow-2xl rounded-4xl bg-primary/5 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h2 className="font-satoshi text-xl font-bold text-gray-900">
                  Quick answer: What is OKLCH color?
                </h2>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  <strong>OKLCH</strong> is a modern color format that stands
                  for <strong>OK Lightness, Chroma, and Hue</strong>. OKLCH
                  color provides better perceptual uniformity than RGB or HSL,
                  making it ideal for creating accessible, consistent color
                  palettes in CSS and design tools. It's part of the CSS Color
                  Level 4 specification and offers superior color manipulation
                  capabilities for modern web development.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What is OKLCH */}
          <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-satoshi text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                Understanding OKLCH
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-3xl p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>What does OKLCH stand for?</strong> OKLCH stands for{" "}
                  <strong>OK Lightness, Chroma, and Hue</strong>. If you're
                  wondering "what is OKLCH" or "OKLCH what is it", it's a
                  cylindrical representation of the Oklab color space designed
                  to be perceptually uniform - meaning that numerical changes in
                  color values correspond to similar visual changes that humans
                  actually perceive.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  OKLCH color format represents a significant advancement over
                  traditional color spaces like RGB, HSL, and HEX, making it
                  easier for designers and developers to work with consistent,
                  accessible colors in modern web design.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-2xl p-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-black to-white rounded-xl mx-auto mb-3"></div>
                    <Badge
                      variant="secondary"
                      className="mb-2 bg-primary/10 text-primary"
                    >
                      L - Lightness
                    </Badge>
                    <p className="text-sm text-gray-600">
                      From 0% (black) to 100% (white)
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-red-500 rounded-xl mx-auto mb-3"></div>
                    <Badge
                      variant="secondary"
                      className="mb-2 bg-primary/10 text-primary"
                    >
                      C - Chroma
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Color intensity/saturation
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-xl mx-auto mb-3"></div>
                    <Badge
                      variant="secondary"
                      className="mb-2 bg-primary/10 text-primary"
                    >
                      H - Hue
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Color wheel position (0-360°)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why OKLCH */}
          <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-satoshi text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                Why OKLCH? Why use OKLCH color format?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-3xl p-6">
                  <div className="flex items-center mb-4">
                    <Eye className="text-primary mr-3" size={24} />
                    <h3 className="font-semibold text-gray-900">
                      Perceptual Uniformity
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Changes in OKLCH values correspond to how humans actually
                    perceive color differences, making it easier to create
                    harmonious color palettes.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="text-primary mr-3" size={24} />
                    <h3 className="font-semibold text-gray-900">
                      Better Accessibility
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    OKLCH makes it easier to ensure sufficient contrast ratios
                    and create accessible color combinations for users with
                    different visual needs.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6">
                  <div className="flex items-center mb-4">
                    <Target className="text-primary mr-3" size={24} />
                    <h3 className="font-semibold text-gray-900">
                      Predictable Results
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Color manipulations like lightening, darkening, or adjusting
                    saturation produce more predictable and visually pleasing
                    results.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6">
                  <div className="flex items-center mb-4">
                    <Zap className="text-primary mr-3" size={24} />
                    <h3 className="font-semibold text-gray-900">
                      Future-Ready
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    OKLCH is part of the CSS Color Level 4 specification and is
                    increasingly supported by modern browsers and design tools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Browser Support */}
          <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-satoshi text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                Can I use OKLCH? OKLCH browser support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  What is OKLCH in CSS? Usage Examples
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  OKLCH in CSS provides a modern way to define colors with
                  better perceptual accuracy. Here's how to use OKLCH color
                  format in your stylesheets:
                </p>
                <div className="bg-gray-900 rounded-2xl p-4 font-mono text-sm">
                  <div className="text-green-400">
                    /* Modern OKLCH CSS syntax */
                  </div>
                  <div className="text-white">
                    .my-element {"{"}
                    <br />
                    <span className="ml-4 text-blue-300">color:</span>{" "}
                    <span className="text-yellow-300">oklch(65% 0.15 180)</span>
                    ;
                    <br />
                    <span className="ml-4 text-blue-300">background:</span>{" "}
                    <span className="text-yellow-300">oklch(85% 0.08 120)</span>
                    ;
                    <br />
                    {"}"}
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Can I Use OKLCH? Current Browser Support (June 2025)
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  <strong>Good news!</strong> OKLCH browser support is excellent
                  in modern browsers. You can confidently use OKLCH in
                  production with appropriate fallbacks.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Desktop Browsers
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Chrome
                        </span>
                        <span className="text-gray-600">111+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Edge
                        </span>
                        <span className="text-gray-600">111+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Safari
                        </span>
                        <span className="text-gray-600">
                          15.4+ (March 2022)
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Firefox
                        </span>
                        <span className="text-gray-600">113+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Opera
                        </span>
                        <span className="text-gray-600">97+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          Internet Explorer
                        </span>
                        <span className="text-gray-600">Not supported</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Mobile Browsers
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Chrome Android
                        </span>
                        <span className="text-gray-600">136+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Safari iOS
                        </span>
                        <span className="text-gray-600">15.4+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Samsung Internet
                        </span>
                        <span className="text-gray-600">22+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Firefox Android
                        </span>
                        <span className="text-gray-600">137+</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Android Browser
                        </span>
                        <span className="text-gray-600">136+</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-200">
                  <p className="text-green-800 text-sm font-medium">
                    <span className="font-semibold">Coverage:</span> OKLCH is
                    supported by approximately 85%+ of global users as of June
                    2025, making it safe to implement with fallbacks for legacy
                    browsers.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-3xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Comprehensive browser support data
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    Detailed version support for OKLCH across all major
                    browsers:
                  </p>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span>Chrome:</span>{" "}
                      <span className="text-green-600">111-139+ ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Edge:</span>{" "}
                      <span className="text-green-600">111-139+ ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Safari:</span>{" "}
                      <span className="text-green-600">15.4-18.5+ ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Firefox:</span>{" "}
                      <span className="text-green-600">113-141+ ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Opera:</span>{" "}
                      <span className="text-green-600">97-117+ ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IE:</span>{" "}
                      <span className="text-red-600">Not supported ✗</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    What is OKLCH in Tailwind CSS?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    TailwindCSS v4 started using OKLCH color format for themes
                    instead of previous HSL color format. Now the colors you see
                    in your theme variables in index.css are in OKLCH format.
                  </p>
                  <div className="bg-gray-900 rounded-2xl p-3 font-mono text-xs">
                    <div className="text-green-400">
                      /* OKLCH with Tailwind arbitrary values */
                    </div>
                    <div className="text-blue-300">
                      text-[oklch(65%_0.15_180)]
                    </div>
                    <div className="text-blue-300">
                      bg-[oklch(85%_0.08_120)]
                    </div>
                    <div className="text-blue-300">
                      border-[oklch(70%_0.12_240)]
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Fallback strategy for OKLCH browser support
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    Always provide fallbacks for older browsers that don't
                    support OKLCH:
                  </p>
                  <div className="bg-gray-900 rounded-2xl p-3 font-mono text-xs">
                    <div className="text-green-400">
                      /* Fallback first, then OKLCH */
                    </div>
                    <div className="text-blue-300">color:</div>
                    <div className="text-yellow-300 ml-2">
                      hsl(180, 50%, 65%)
                    </div>
                    <div className="text-blue-300">color:</div>
                    <div className="text-yellow-300 ml-2">
                      oklch(65% 0.15 180)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-satoshi text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick tips for using OKLCH color format
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Now that you understand what OKLCH is and why use OKLCH over
                  traditional color formats, here are practical tips for
                  implementing OKLCH in your projects:
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start space-x-3">
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-primary text-white text-xs"
                    >
                      1
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900">
                        Start with Lightness
                      </p>
                      <p className="text-sm text-gray-600">
                        Adjust the L value first to get the right brightness
                        level
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-primary text-white text-xs"
                    >
                      2
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900">
                        Control Chroma for Intensity
                      </p>
                      <p className="text-sm text-gray-600">
                        Higher chroma values create more vibrant colors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-primary text-white text-xs"
                    >
                      3
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900">
                        Use Hue for Color Relationships
                      </p>
                      <p className="text-sm text-gray-600">
                        Complementary colors are 180° apart on the hue wheel
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link to="/">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-3xl text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Try the OKLCH Converter
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OKLCHInfo;
