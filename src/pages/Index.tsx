import ColorConverter from "@/components/ColorConverter";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <div className="space-y-8">
      <ColorConverter />
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
