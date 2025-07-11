import React from "react";
import { Palette, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ColorConverterHeader: React.FC<{
  title: string;
  description?: string;
  withBackButton?: boolean;
}> = ({ title, description, withBackButton = false }) => {
  return (
    <div className="mb-12 flex flex-col justify-start items-start">
      <h1 className="flex items-center text-2xl md:text-3xl text-primary-600 text-left font-satoshi font-semibold">
        <Palette
          className="inline-block mr-4 bg-primary text-primary-foreground p-2 rounded-full"
          size={40}
        />
        {title}
      </h1>
      {description && (
        <p className="pl-12 text-xl text-gray-600 max-w-2xl leading-relaxed mb-6 text-left">
          {description}
        </p>
      )}
      {withBackButton && (
        <Link to="/">
          <Button
            variant="outline"
            className="rounded-3xl border-primary text-primary hover:bg-primary hover:text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            All Converters
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ColorConverterHeader;
