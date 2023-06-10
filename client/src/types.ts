export interface IAuthResponse {
    message: string;
    token: string;
}
export interface IAuthError {
    message?: string;
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}

export type ICreateProduct = Omit<IProduct, "id" | "createdAt" | "updatedAt">;
