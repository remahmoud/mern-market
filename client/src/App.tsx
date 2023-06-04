import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Dashboard from "@pages/Dashboard";
import NotFound from "@pages/NotFound";
import Layout from "@components/Layout";
import AuthPage from "@pages/AuthPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
