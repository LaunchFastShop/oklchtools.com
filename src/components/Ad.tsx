import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export const Ad = () => {
  return (
    <Card className="border shadow-2xl rounded-4xl bg-gradient-to-r from-primary-100/70 via-primary-50 to-primary-100/70 backdrop-blur-lg text-white overflow-hidden w-full">
      <CardContent className="p-8 text-center">
        <h3 className="text-3xl mb-4 text-primary-600 font-semibold">
          Launch your startup <br />
          in{" "}
          <span className="font-playfair px-1 text-primary-700 italic">
            Record
          </span>{" "}
          time
        </h3>
        <p className="text-primary mb-6 max-w-2xl mx-auto text-xl">
          LaunchFast.shop - MVP development and fractional development support
          for small teams and solo founders
        </p>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-primary bg-gradient-to-r text-primary from-primary-200/50 via-primary-300/50 to-primary-200/50"
          onClick={() => (window.location.href = "https://launchfast.shop")}
        >
          Click to launch your MVP in 4 weeks
        </Button>
      </CardContent>
    </Card>
  );
};
