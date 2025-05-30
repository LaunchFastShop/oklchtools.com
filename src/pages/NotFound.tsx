import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-satoshi">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-4xl mr-4">
              <AlertTriangle size={32} />
            </div>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex justify-center mb-12">
          <Card className="border-0 shadow-2xl rounded-4xl bg-white/80 backdrop-blur-sm max-w-md">
            <CardHeader className="pb-6">
              <CardTitle className="font-satoshi text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                404 Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6">
                <div className="text-6xl font-bold text-primary mb-4">404</div>
                <p className="text-gray-600 mb-6">
                  Oops! The page you requested could not be found.
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-4 rounded-3xl text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Home size={20} className="mr-2" />
                  Go Back Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="flex justify-center">
          <Card className="border-0 shadow-xl rounded-4xl bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden max-w-md">
            <CardContent className="p-8 text-center">
              <h3 className="font-playfair text-3xl font-bold mb-4">
                LaunchFast.shop
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Hire Senior Product Engineer on a fractional basis
              </p>
              <Button
                size="lg"
                onClick={() =>
                  (window.location.href = "https://launchfast.shop")
                }
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-3xl text-lg"
              >
                Learn more
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
