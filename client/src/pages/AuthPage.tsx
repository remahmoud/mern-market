import * as yup from "yup";
import clsx from "clsx";
import { useState, useCallback } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { isAxiosError } from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WomanShopping from "@assets/woman-shopping.jpg";
import type { IAuthResponse, IAuthError } from "@/types";

// yup validation schema
const schema = yup.object({
    name: yup.string().optional(),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
});

export default function AuthPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);
    const isAuth = useAuth();
    const [authState, setAuthState] = useState<"login" | "register">("login");
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors, isDirty, isValid },
    } = useForm<FieldValues>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    // change auth state
    const handleChangeAuthState = useCallback(() => {
        setAuthState((prevState) =>
            prevState === "login" ? "register" : "login"
        );
    }, []);

    // submit handler
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (authState === "login") {
            axios
                .post<IAuthResponse>("/api/auth/login", data)
                .then((res) => {
                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        navigate("/");
                    }
                })
                .catch((err) => {
                    if (isAxiosError<IAuthError>(err)) {
                        setMessage(err.response?.data?.message!);
                    }
                    resetField("password");
                });
        } else {
            axios
                .post<IAuthResponse>("/api/auth/register", data)
                .then((res) => {
                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        navigate("/");
                    }
                })
                .catch((err) => {
                    if (isAxiosError<IAuthError>(err)) {
                        setMessage(err.response?.data?.message!);
                    }
                    resetField("password");
                });
        }
    };
    // check if user loged in
    if (isAuth) return <Navigate to="/" replace />;

    return (
        <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h1 className="text-indigo-700 font-bold text-3xl text-center">
                            Market
                        </h1>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {message && (
                                    <div className="text-red-500 text-sm font-semibold flex justify-between items-center">
                                        <span>{message}</span>

                                        <button
                                            onClick={() => setMessage(null)}
                                            className="ml-2 text-red-500 focus:outline-none"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                                {authState === "register" && (
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Full Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                type="text"
                                                autoComplete="name"
                                                {...register("name")}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div>
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
                                            autoComplete="email"
                                            {...register("email", {
                                                required: true,
                                            })}
                                            className={clsx(
                                                "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                                                errors.email
                                                    ? "focus:ring-red-500"
                                                    : "focus:ring-indigo-600"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
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
                                            autoComplete="current-password"
                                            {...register("password", {
                                                required: true,
                                            })}
                                            className={clsx(
                                                "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                                                errors.password
                                                    ? "focus:ring-red-500"
                                                    : "focus:ring-indigo-600"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={!isDirty || !isValid}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
                                    >
                                        {authState === "login"
                                            ? "Login"
                                            : "Register"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4">
                                <button
                                    onClick={handleChangeAuthState}
                                    className="flex w-full items-center justify-center rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                                >
                                    <span className="text-sm font-semibold leading-6">
                                        {authState === "login"
                                            ? "Register"
                                            : "Login"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    src={WomanShopping}
                    alt=""
                />
            </div>
        </div>
    );
}
