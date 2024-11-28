import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/features/product/productSlice";
import RootLayout from "@/layouts/RootLayout";

export async function getServerSideProps({ params: { category } }) {
  try {
    const baseUrl = process.env.BASE_URL;
    
    const res = await fetch(`${baseUrl}/api/categories/${category}`);
    const products = await res.json();
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default function Page({ products }) {

  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Builder products by Category
        </h2>
        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Remove</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products?.map((product) => (
                      <tr key={product._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <Image
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-sm"
                                src={product.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-bold text-gray-900">
                                {product.name}
                              </div>
                              <div className="font-semibold text-gray-500">
                                Rating: {product.rating}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="font-semibold text-gray-900">
                            {product.category}
                          </div>
                          <div className="font-medium text-gray-500">
                            Required
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500">
                          ${product.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {product.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            type="button"
                            onClick={() => {
                              handleAddProduct(product),
                                router.push("/builder");
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Add To Builder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Products</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the products available to add to your builder.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => router.push("/builder")}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
