import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
    Bars3Icon,
    XMarkIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useUserDataQuery } from "@/api/authApi";
import { useAppSelector } from "@/app/hooks";

const navigation = [
    { name: "Profile", href: "/profile", isAdmin: false },
    { name: "Dashboard", href: "/dashboard", isAdmin: true },
    { name: "Settings", href: "#", isAdmin: false },
];

export default function Navbar() {
    const { data: user } = useUserDataQuery();
    const items = useAppSelector((state) => state.cart.items);

    const handleSignout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({ open }) =>
                    clsx(
                        open ? "fixed inset-0 z-40 overflow-y-auto" : "",
                        "bg-white shadow-sm lg:static lg:overflow-y-visible"
                    )
                }
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
                            <div className="relative flex justify-between gap-4 lg:gap-8">
                                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link
                                            to="/"
                                            className="text-xl font-bold text-indigo-700"
                                        >
                                            Market
                                        </Link>
                                    </div>
                                </div>
                                <div className="min-w-0 md:px-8 lg:px-0 xl:basis-3/5">
                                    <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                                        <div className="w-full">
                                            <label
                                                htmlFor="search"
                                                className="sr-only"
                                            >
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <MagnifyingGlassIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <input
                                                    id="search"
                                                    name="search"
                                                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                    placeholder="Search"
                                                    type="search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Link
                                        to="/cart"
                                        className="flex items-center"
                                    >
                                        <span className="relative">
                                            <ShoppingCartIcon
                                                className="h-8 w-8 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="absolute -bottom-0.5 -right-1.5 text-white text-xs font-semibold rounded-full bg-indigo-500 px-1.5 py-0.5">
                                                {items.length}
                                            </span>
                                            <span className="sr-only">
                                                Cart
                                            </span>
                                        </span>
                                    </Link>
                                    <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                                        {!user ? (
                                            <Link
                                                to="/auth"
                                                className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Sign in
                                            </Link>
                                        ) : (
                                            <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Bars3Icon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Popover.Button>
                                        )}
                                    </div>
                                </div>
                                <div className="hidden lg:flex lg:items-center xl:col-span-1">
                                    {user ? (
                                        <Menu
                                            as="div"
                                            className="relative flex-shrink-0"
                                        >
                                            <div>
                                                <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <img
                                                        className="h-9 w-9 rounded-full"
                                                        src={user.avatar}
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {navigation
                                                        .filter((x) => {
                                                            return x.isAdmin &&
                                                                !user.isAdmin
                                                                ? false
                                                                : true;
                                                        })
                                                        .map((item) => (
                                                            <Menu.Item
                                                                key={item.name}
                                                            >
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <Link
                                                                        to={
                                                                            item.href
                                                                        }
                                                                        className={clsx(
                                                                            active
                                                                                ? "bg-gray-100"
                                                                                : "",
                                                                            "block px-4 py-2 text-sm text-gray-700"
                                                                        )}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={
                                                                    handleSignout
                                                                }
                                                                className={clsx(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                                                )}
                                                            >
                                                                Sign out
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    ) : (
                                        <Link
                                            to="/auth"
                                            className="rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {user ? (
                            <Popover.Panel
                                as="nav"
                                className="lg:hidden"
                                aria-label="Navbar"
                            >
                                <div className="border-t border-gray-200 pb-3 pt-4">
                                    <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user?.avatar}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">
                                                {user?.name}
                                            </div>
                                            <div className="text-sm font-medium text-gray-500">
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                                        {navigation
                                            .filter((x) => {
                                                return x.isAdmin &&
                                                    !user.isAdmin
                                                    ? false
                                                    : true;
                                            })
                                            .map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        <button
                                            onClick={handleSignout}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </Popover.Panel>
                        ) : null}
                    </>
                )}
            </Popover>
        </>
    );
}
