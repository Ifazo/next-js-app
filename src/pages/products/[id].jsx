import { Disclosure, Tab } from "@headlessui/react";
import Image from "next/image";
import { MinusSmIcon, PlusSmIcon, StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import RootLayout from "@/layouts/RootLayout";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export async function getServerSideProps({ params: { id } }) {
  try {
    const baseUrl = process.env.BASE_URL;

    const res = await fetch(`${baseUrl}/api/products/${id}`);
    const product = await res.json();
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        product: {},
      },
    };
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page({ product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [{ ...product, quantity }],
      }),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              <Tab.Panel key={product.image}>
                <Image
                  height={200}
                  width={200}
                  src={product.image}
                  alt="Cover"
                  className="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              {/* Buttons Section */}
              <div className="sm:flex-col1 mt-10 flex">
                {/* Buy Button */}
                <button
                  type="button"
                  onClick={() => {
                    toast.loading("Processing payment...");
                    handlePayment();
                  }}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Buy ${product.price * quantity}
                </button>

                {/* Quantity Box with + and - */}
                <div className="ml-4 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex items-center justify-center rounded-md border border-gray-300 p-3 text-gray-600 hover:bg-gray-100"
                  >
                    <span className="text-xl font-bold">-</span>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-14 rounded-md border border-gray-300 py-3 text-center text-lg font-medium text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex items-center justify-center rounded-md border border-gray-300 p-3 text-gray-600 hover:bg-gray-100"
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <h3>
                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span
                            className={classNames(
                              open ? "text-indigo-600" : "text-gray-900",
                              "text-sm font-medium",
                            )}
                          >
                            Key Features
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel
                        as="div"
                        className="prose prose-sm pb-6"
                      >
                        <ul role="list">
                          {product.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
