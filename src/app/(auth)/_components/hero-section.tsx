import heroImage from "@/assets/images/hero-image.png";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative hidden h-full w-full overflow-hidden lg:block">
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-400/80 to-blue-600/80">
        <div className="relative h-full w-full">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            <div className="text-4xl font-light text-white">
              <span className="font-semibold">D</span>’Shine
            </div>
            <div className="space-y-6">
              <h2 className="font-light text-white md:text-7xl lg:text-8xl xl:text-9xl">
                <span className="font-semibold">D</span>
                ’Shine
              </h2>
              <div className="text-wrap text-2xl text-white md:text-3xl xl:text-4xl">
                Analyze. Personalize. Promote.
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 h-2/3 w-4/5">
            <Image
              className="object-cover object-left"
              src={heroImage}
              alt="Marketing analytics dashboard"
              layout="fill"
              objectFit="cover"
              objectPosition="left"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
