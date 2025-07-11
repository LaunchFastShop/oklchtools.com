import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import OKLCHInfo from "./pages/OKLCHInfo";
import NotFound from "./pages/NotFound";
import OklchToHex from "./pages/OklchToHex";
import HexToOklch from "./pages/HexToOklch";
import OklchColorPicker from "./pages/OklchColorPicker";
import RgbToOklch from "./pages/RgbToOklch";
import HslToOklch from "./pages/HslToOklch";
import SpecificColorConversion from "./pages/SpecificColorConversion";
import InlineAD from "./components/InlineAD";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <InlineAD />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/what-is-oklch" element={<OKLCHInfo />} />
          <Route path="/oklch-to-hex" element={<OklchToHex />} />
          <Route path="/hex-to-oklch" element={<HexToOklch />} />
          <Route path="/oklch-color-picker" element={<OklchColorPicker />} />
          <Route path="/rgb-to-oklch" element={<RgbToOklch />} />
          <Route path="/hsl-to-oklch" element={<HslToOklch />} />
          <Route
            path="/color/:colorParam"
            element={<SpecificColorConversion />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
