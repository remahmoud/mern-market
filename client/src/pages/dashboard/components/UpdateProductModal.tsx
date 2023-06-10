import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICreateProduct, IProduct } from "@/types";
import { useUpdateProductMutation } from "@/api/dashboardApi";
import { PhotoIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useUploadImageMutation } from "@/api/productApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
    description: yup.string().required(),
});

export default function UpdateProductModal({ product }: { product: IProduct }) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string>(product.image);
    const [uploadImage] = useUploadImageMutation();
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    const { register, handleSubmit, reset } = useForm<ICreateProduct>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<ICreateProduct> = async (data) => {
        const updated = {
            ...data,
            image,
            id: product.id,
            price: Number(data.price),
            quantity: Number(data.quantity),
        };
        await updateProduct(updated)
            .unwrap()
            .then(() => {
                setOpen(false);
                setImage("");
                reset();
            });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("image", file);
            uploadImage(formData)
                .unwrap()
                .then((res) => {
                    setImage(res.path);
                });
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="text-indigo-600 hover:text-indigo-900"
            >
                Edit
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
                                                    defaultValue={product.name}
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
                                                    defaultValue={product.price}
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
                                                    defaultValue={
                                                        product.quantity
                                                    }
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
                                                    defaultValue={
                                                        product.category
                                                    }
                                                    {...register("category")}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor="product-photo"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Image
                                            </label>
                                            {!image ? (
                                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-4">
                                                    <div className="text-center">
                                                        <PhotoIcon
                                                            className="mx-auto h-12 w-12 text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <label
                                                                htmlFor="product-photo"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus:outline-none hover:text-indigo-500"
                                                            >
                                                                <span>
                                                                    Upload a
                                                                    file
                                                                </span>
                                                                <input
                                                                    id="product-photo"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    onChange={
                                                                        handleImageUpload
                                                                    }
                                                                />
                                                            </label>
                                                            <p className="pl-1">
                                                                or drag and drop
                                                            </p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">
                                                            PNG, JPG, GIF up to
                                                            10MB
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-2 border border-dashed relative mt-2 rounded-lg border-gray-900/25">
                                                    <img
                                                        src={image}
                                                        alt="product"
                                                        className="h-24 w-full object-contain"
                                                    />

                                                    <button
                                                        type="button"
                                                        className="p-1.5 rounded-full absolute top-4 right-4 text-sm leading-6 bg-rose-500 text-white"
                                                        onClick={() =>
                                                            setImage("")
                                                        }
                                                    >
                                                        <TrashIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <textarea
                                                rows={3}
                                                defaultValue={
                                                    product.description
                                                }
                                                {...register("description")}
                                                className="block overflow-hidden resize-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Add a description for your product..."
                                            />
                                        </div>
                                        <div className="mt-4 sm:mt-6">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Update product
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
