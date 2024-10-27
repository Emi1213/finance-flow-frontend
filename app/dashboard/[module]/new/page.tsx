"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const { module } = useParams() as { module: string };

  //   const AvaliableCreateViews: Record<string, FC> = {
  //     expenses: BrandsCreateView,
  //     incomes: CategoriesCreateView,
  //     reports: ProductsCreateView,
  //   };

  //   const CreateView = AvaliableCreateViews[module];

  //   if (!CreateView) {
  //     return <div>Not found</div>;
  //   }

  return (
    <div>
      <div>HOLA</div>
    </div>
  );
};

export default Page;
