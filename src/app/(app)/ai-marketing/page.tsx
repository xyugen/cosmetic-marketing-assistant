import Header from "@/components/header";
import MarketingContent from "./_components/marketing-content";

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 md:max-w-4xl">
      <Header title="AI Marketing" subtitle="Generate marketing content" />
      <MarketingContent />
      <footer className="flex items-center justify-center p-2">
        <p className="text-sm text-muted-foreground">
          Please note that this is a prototype and may not be accurate.
        </p>
      </footer>
    </div>
  );
};

export default Page;
