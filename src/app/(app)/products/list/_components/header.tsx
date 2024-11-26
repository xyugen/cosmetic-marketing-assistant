"use client";

const ProductListHeader = () => {
  return (
    <div className="flex items-baseline justify-between">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Product List
        </h2>
        <p className="mt-2 text-sm text-gray-600">Manage your product list</p>
      </div>
      {/* <Button>
        <Plus className="size-4" />{" "}
        <span className="hidden md:block">New Product</span>
      </Button> */}
    </div>
  );
};

export default ProductListHeader;
