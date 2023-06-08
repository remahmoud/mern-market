import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Dashboard from "@pages/Dashboard";
import NotFound from "@pages/NotFound";
import Layout from "@components/Layout";
import AuthPage from "@pages/AuthPage";
import Users from "@pages/dashboard/Users";
import Products from "./pages/dashboard/Products";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="users" element={<Users />} />
                        <Route path="products" element={<Products />} />
                        <Route path="orders" element={<div>Orders</div>} />
                    </Route>
                </Route>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
