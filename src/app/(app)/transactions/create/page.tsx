import CreateProductTransactionForm from "./_components/form";
import CreateProductTransactionHeader from "./_components/header";

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <CreateProductTransactionHeader />
      <div className="mt-4">
        <CreateProductTransactionForm />
      </div>
    </div>
  );
};

export default Page;
