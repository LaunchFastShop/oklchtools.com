import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Palette, InfoIcon, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    {
      icon: <Home className="w-4 h-4" />,
      href: "/",
      label: "Home",
      description: "All converters",
    },
    {
      icon: null,
      href: "/hex-to-oklch",
      label: "HEX to OKLCH",
      description: "Convert HEX colors to OKLCH format",
    },
    {
      icon: null,
      href: "/oklch-to-hex",
      label: "OKLCH to HEX",
      description: "Convert OKLCH colors to HEX format",
    },
    {
      icon: null,
      href: "/rgb-to-oklch",
      label: "RGB to OKLCH",
      description: "Convert RGB colors to OKLCH format",
    },
    {
      icon: null,
      href: "/hsl-to-oklch",
      label: "HSL to OKLCH",
      description: "Convert HSL colors to OKLCH format",
    },
    {
      icon: null,
      href: "/oklch-color-picker",
      label: "OKLCH Color Picker",
      description: "Pick and generate OKLCH colors",
    },
    {
      icon: <InfoIcon className="w-4 h-4" />,
      href: "/what-is-oklch",
      label: "What is OKLCH?",
      description: "Learn about OKLCH color format",
    },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Fixed navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-primary/5"
            : "bg-white/60 backdrop-blur-lg"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-primary to-primary-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-satoshi font-bold text-xl text-gray-900">
                OKLCH<span className="text-primary">Tools</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = isActivePath(link.href);

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl lowercase text-sm font-medium transition-all duration-200 whitespace-nowrap",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-gray-700 hover:text-primary"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-white/80"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "lg:hidden transition-all duration-300 overflow-hidden",
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-xl">
            <div className="container mx-auto px-4 py-4">
              <div className="grid gap-2">
                {navLinks.map((link) => {
                  const isActive = isActivePath(link.href);

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "flex flex-col px-4 py-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-primary text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <div className="font-medium text-base">{link.label}</div>
                      <div
                        className={cn(
                          "text-sm mt-1",
                          isActive ? "text-white/80" : "text-gray-500"
                        )}
                      >
                        {link.description}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
