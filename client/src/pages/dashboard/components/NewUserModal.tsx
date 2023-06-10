import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUser } from "@/types";
import { useCreateUserMutation } from "@/api/dashboardApi";

type ICreateUser = Pick<IUser, "name" | "email"> & {
    password: string;
};

export default function NewUserModal() {
    const [open, setOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState("user");
    const [createUser] = useCreateUserMutation();

    const { register, handleSubmit, reset } = useForm<ICreateUser>();

    const onSubmit: SubmitHandler<ICreateUser> = async (data) => {
        const user = {
            ...data,
            isAdmin: isAdmin === "admin",
        };
        await createUser(user)
            .unwrap()
            .then(() => {
                reset();
                setOpen(false);
                setIsAdmin("user");
            });
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add user
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
                                                <UserPlusIcon
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
                                                Full name
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
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    autoComplete="new-email"
                                                    {...register("email")}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    {...register("password")}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <fieldset className="mt-4">
                                            <div className="space-y-5">
                                                <div className="relative flex items-start">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="AdminRadio"
                                                            type="radio"
                                                            value="admin"
                                                            checked={
                                                                isAdmin ===
                                                                "admin"
                                                            }
                                                            onChange={() =>
                                                                setIsAdmin(
                                                                    "admin"
                                                                )
                                                            }
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm leading-6">
                                                        <label
                                                            htmlFor="AdminRadio"
                                                            className="font-medium text-gray-900"
                                                        >
                                                            Admin
                                                        </label>
                                                        <p className="text-gray-500">
                                                            Full access to all
                                                            settings
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="relative flex items-start">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="UserRadio"
                                                            type="radio"
                                                            value="user"
                                                            checked={
                                                                isAdmin ===
                                                                "user"
                                                            }
                                                            onChange={() =>
                                                                setIsAdmin(
                                                                    "user"
                                                                )
                                                            }
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm leading-6">
                                                        <label
                                                            htmlFor="UserRadio"
                                                            className="font-medium text-gray-900"
                                                        >
                                                            User
                                                        </label>
                                                        <p className="text-gray-500">
                                                            Restricted access to
                                                            certain settings
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Create new user
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
