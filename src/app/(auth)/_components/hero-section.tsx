import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative hidden size-full overflow-hidden lg:block">
      <div className="flex h-full items-center justify-center bg-gray-100">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-70"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px",
            }}
          ></div>
          <Image
            className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
            height={1080}
            width={1920}
            src="/placeholder.svg?height=1080&width=1920"
            alt="Marketing analytics dashboard"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
