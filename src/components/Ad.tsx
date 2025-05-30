import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export const Ad = () => {
  return (
    <Card className="border shadow-2xl rounded-4xl bg-gradient-to-r from-primary-100/70 via-primary-50 to-primary-100/70 backdrop-blur-lg text-white overflow-hidden w-full">
      <CardContent className="p-8 text-center">
        <h3 className="text-3xl font-playfair mb-4 text-primary">
          LaunchFast.shop
        </h3>
        <p className="text-primary mb-6 text-xl">
          Hire Senior Product Engineer on a{" "}
          <span className="font-playfair italic font-medium">fractional</span>
        </p>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-primary bg-gradient-to-r text-primary from-primary-200/50 via-primary-300/50 to-primary-200/50"
          onClick={() => (window.location.href = "https://launchfast.shop")}
        >
          Learn more
        </Button>
      </CardContent>
    </Card>
  );
};
