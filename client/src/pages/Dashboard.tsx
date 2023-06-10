import { useUserDataQuery } from "@/api/authApi";
import clsx from "clsx";

import { NavLink, Outlet, Navigate } from "react-router-dom";

const tabs = [
    { name: "Products", href: "/dashboard/products", current: true },
    { name: "Users", href: "/dashboard/users", current: false },
    { name: "Orders", href: "/dashboard/orders", current: false },
];

export default function Dashboard() {
    const { data: user, isLoading } = useUserDataQuery();

    if ((!isLoading && !user) || (!isLoading && !user?.isAdmin)) {
        return <Navigate to="/" />;
    }
    return (
        <div className="container mx-auto px-4 md:px-16 h-full">
            <div className="block my-4">
                <nav
                    className="isolate flex divide-x divide-gray-200 shadow"
                    aria-label="Tabs"
                >
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.name}
                            to={tab.href}
                            className={({ isActive }) =>
                                clsx(
                                    "min-w-0 flex-1 bg-white py-4 px-4 text-center text-lg font-bold ",
                                    isActive
                                        ? "text-indigo-700 bg-indigo-50"
                                        : "text-gray-500 hover:text-gray-700"
                                )
                            }
                        >
                            <span>{tab.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            <Outlet />
        </div>
    );
}
