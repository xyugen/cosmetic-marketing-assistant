"use client";

const ManageAccountsHeader = () => {
  return (
    <div className="flex items-baseline justify-between">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Manage Accounts
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage email addresses authorized to access the system
        </p>
      </div>
      {/* <Button>
        <Plus className="size-4" />{" "}
        <span className="hidden md:block">New Customer</span>
      </Button> */}
    </div>
  );
};

export default ManageAccountsHeader;
