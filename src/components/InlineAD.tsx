import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";

const InlineAD: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      className={`cursor-pointer fixed bottom-10 z-50 hover:scale-105 transition-all duration-300 ${
        isVisible ? "right-2 animate-slide-in-right" : "right-[-300px]"
      }`}
      href="https://launchfast.shop?ref=oklchtools"
      rel="dofollow"
      target="_blank"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg backdrop-blur-sm max-w-xs">
        <div
          className="absolute inset-0 animate-gradient-shift opacity-95"
          style={{
            background:
              "linear-gradient(-45deg, #228B22, #5bb85b, #9d4edd, #8fd48f, #228B22)",
            backgroundSize: "300% 300%",
          }}
        ></div>

        {/* Content */}
        <div className="relative p-4 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="bg-white/20 rounded-xl p-2">
              <Zap size={20} className="text-yellow-200" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm font-satoshi truncate">
              Launch your MVP in 4 weeks
            </h3>
            <p className="text-white/80 text-xs font-medium">
              Click to learn more
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default InlineAD;
