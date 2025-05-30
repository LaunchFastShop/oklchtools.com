import React from "react";
import { Palette } from "lucide-react";
import { Link } from "react-router-dom";

const ColorConverterHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary text-primary-foreground p-4 rounded-4xl mr-4">
          <Palette size={32} />
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl text-primary-600 font-satoshi font-semibold mb-4">
        OKLCH color converter
      </h1>
      <Link
        to="/what-is-oklch"
        className="inline-block text-primary hover:text-primary-600 font-medium text-lg mb-6 underline decoration-2 underline-offset-4 hover:decoration-primary-600 transition-colors"
      >
        What is OKLCH?
      </Link>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Convert your HSL, RGB, and Hex colors to modern OKLCH format with
        precision.
      </p>
    </div>
  );
};

export default ColorConverterHeader;
