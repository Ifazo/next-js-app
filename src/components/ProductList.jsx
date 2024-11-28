import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList({ products }) {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Featured products
          </h2>
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            See everything<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-x-8 lg:space-x-0"
            >
              {products?.map((product) => (
                <li
                  key={product._id}
                  className="inline-flex w-64 flex-col text-center lg:w-auto"
                >
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                      <Image
                        height={200}
                        width={200}
                        src={product.image}
                        alt="Product"
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="mt-1 font-semibold text-gray-900">
                        <Link href={`products/${product._id}`}>
                          <span className="absolute inset-0" />
                          {product.name.substring(0, 15)}...
                        </Link>
                      </h3>
                      <div className="m-3 flex justify-between">
                        <p className="font-medium text-gray-700">
                          {product.category.substring(0, 10)}...
                        </p>
                        <p className="font-medium text-gray-700">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <h4 className="sr-only">Available colors</h4>
                  <ul
                    role="list"
                    className="mt-auto pt-6 flex items-center justify-center space-x-3">
                    {product.availableColors.map((color) => (
                      <li
                        key={color.name}
                        className="w-4 h-4 rounded-full border border-black border-opacity-10"
                        style={{ backgroundColor: color.colorBg }}>
                        <span className="sr-only">{color.name}</span>
                      </li>
                    ))}
                  </ul> */}
                  {/* Product Rating Stars */}
                  <div className="flex items-center space-x-2">
                    {/* Star Ratings */}
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? "text-yellow-400" // Use a vibrant color for filled stars
                              : "text-gray-300", // Subtle color for empty stars
                            "h-5 w-5 flex-shrink-0",
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    {/* Numeric Rating */}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      ({product.rating.toFixed(1)} / 5)
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex px-4 sm:hidden">
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            See everything<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
