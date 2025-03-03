import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home.jsx";
import Cafe from "./pages/cafe.jsx";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ComedyClub from "./pages/comedy-club.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/profile.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="cafe" element={<Cafe />} />
                        <Route path="comedyclub" element={<ComedyClub />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="register" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
