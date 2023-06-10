import { useGetProductsQuery } from "@/api/dashboardApi";
import NewProductModal from "./components/NewProductModal";
import DeleteProductModal from "./components/DeleteProductModal";

export default function Products() {
    const { data: products } = useGetProductsQuery();

    if (!products) {
        return null;
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-4">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the products in the store.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <NewProductModal />
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Image
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <img
                                                className="h-14 w-14"
                                                src={product.image}
                                                alt=""
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-700 capitalize text-center">
                                            {product.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
                                            {product.price}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
                                            {product.quantity}
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            {/* <UpdateUserModal user={user} />*/}
                                            <DeleteProductModal
                                                id={product.id}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
