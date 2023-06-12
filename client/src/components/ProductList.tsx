import { useGetProductsQuery } from "@/api/productApi";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/app/cartSlice";

export default function ProductList() {
    const { data: products } = useGetProductsQuery();
    const dispatch = useAppDispatch();

    if (!products) {
        return null;
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div className="flex flex-col" key={product.id}>
                            <div className="relative mb-4">
                                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-contain object-center"
                                    />
                                </div>
                                <div className="relative mt-4">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        <Link to={`/product/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                </div>
                                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                    />
                                    <p className="relative text-lg font-semibold text-white">
                                        ${product.price}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-auto flex">
                                <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className="relative w-full rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                                >
                                    Add to bag
                                    <span className="sr-only">
                                        , {product.name}
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
