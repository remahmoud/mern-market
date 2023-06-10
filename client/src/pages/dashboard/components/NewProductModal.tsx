import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICreateProduct } from "@/types";
import { useCreateProductMutation } from "@/api/dashboardApi";

export default function NewProductModal() {
    const [open, setOpen] = useState(false);
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const { register, handleSubmit, reset } = useForm<ICreateProduct>();

    const onSubmit: SubmitHandler<ICreateProduct> = async (data) => {
        const product = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity),
        };
        await createProduct(product)
            .unwrap()
            .then(() => {
                setOpen(false);
                reset();
            });
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add Product
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                                <ShoppingBagIcon
                                                    className="h-8 w-8 text-green-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="name"
                                                    type="text"
                                                    {...register("name", {
                                                        required: true,
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor="Price"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Price
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="Price"
                                                    type="number"
                                                    step="0.01"
                                                    {...register("price")}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor="Quantity"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Quantity
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="Quantity"
                                                    type="number"
                                                    {...register("quantity")}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor="Category"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Category
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="Category"
                                                    type="text"
                                                    {...register("category")}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <textarea
                                                rows={5}
                                                {...register("description")}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Add a description for your product..."
                                            />
                                        </div>
                                        <div className="mt-4 sm:mt-6">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Create new product
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
