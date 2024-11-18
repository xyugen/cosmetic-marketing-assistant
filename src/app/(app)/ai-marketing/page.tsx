import MarketingForm from "./_components/form"

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 md:max-w-4xl">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
        AI Marketing Assistant
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Your AI-powered marketing solution
      </p>
      <div className="mt-4">
        <MarketingForm />
      </div>
      <footer className="flex items-center justify-center p-2">
        <p className="text-sm text-gray-600">
          Please note that this is a prototype and may not be accurate.
        </p>
      </footer>
    </div>
  );
}

export default Page