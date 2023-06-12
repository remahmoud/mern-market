import {
    CheckIcon,
    ClockIcon,
    QuestionMarkCircleIcon,
    XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { removeFromCart, updateCount } from "@/app/cartSlice";

export default function Cart() {
    const TAX = 0.03;
    const SHIPPING = 5;
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);

    const itemsPrice = items.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);

    const taxPrice = itemsPrice * TAX;
    const shippingPrice = itemsPrice > 0 ? SHIPPING : 0;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const handleUpdateCount = (id: string, count: number) => {
        dispatch(updateCount({ id, count }));
    };

    const handleDeleteItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="bg-white">
            <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>

                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section
                        aria-labelledby="cart-heading"
                        className="lg:col-span-7"
                    >
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul
                            role="list"
                            className="divide-y divide-gray-200 border-b border-t border-gray-200"
                        >
                            {items.map((product, idx) => (
                                <li
                                    key={product.id}
                                    className="flex py-6 sm:py-10"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a
                                                            href={product.id}
                                                            className="font-medium text-gray-700 hover:text-gray-800"
                                                        >
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">
                                                    {product.price}
                                                </p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label
                                                    htmlFor={`quantity-${idx}`}
                                                    className="sr-only"
                                                >
                                                    Quantity, {product.name}
                                                </label>
                                                <select
                                                    id={`quantity-${idx}`}
                                                    name={`quantity-${idx}`}
                                                    defaultValue={product.count}
                                                    onChange={(e) =>
                                                        handleUpdateCount(
                                                            product.id,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    {Array.from(
                                                        Array(
                                                            product.countInStock
                                                        ).keys()
                                                    ).map((_, i) => (
                                                        <option
                                                            key={i}
                                                            value={i + 1}
                                                        >
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="absolute right-0 top-0">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteItem(
                                                                product.id
                                                            )
                                                        }
                                                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">
                                                            Remove
                                                        </span>
                                                        <XMarkIconMini
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                            {product.countInStock ? (
                                                <CheckIcon
                                                    className="h-5 w-5 flex-shrink-0 text-green-500"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <ClockIcon
                                                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                                                    aria-hidden="true"
                                                />
                                            )}

                                            <span>
                                                {product.countInStock
                                                    ? "In stock"
                                                    : `Ships in 3–4 weeks`}
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2
                            id="summary-heading"
                            className="text-lg font-medium text-gray-900"
                        >
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">
                                    Subtotal
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ${itemsPrice.toFixed(2)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a
                                        href="#"
                                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">
                                            Learn more about how shipping is
                                            calculated
                                        </span>
                                        <QuestionMarkCircleIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ${shippingPrice.toFixed(2)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a
                                        href="#"
                                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">
                                            Learn more about how tax is
                                            calculated
                                        </span>
                                        <QuestionMarkCircleIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ${taxPrice.toFixed(2)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">
                                    Order total
                                </dt>
                                <dd className="text-base font-medium text-gray-900">
                                    ${totalPrice.toFixed(2)}
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={items.length === 0}
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                </form>
            </main>
        </div>
    );
}
