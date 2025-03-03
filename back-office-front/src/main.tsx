import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home.tsx";
import Cafe from "./pages/cafe.tsx";
import About from "./pages/about.tsx";
import App from "./App.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "./pages/test.jsx";
import ComedyClub from "./pages/comedy-club";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />}>
                      <Route index element={<Home />} />
                      <Route path="about" element={<About />} />
                      <Route path="cafe" element={<Cafe />} />
                      <Route path="comedyclub" element={<ComedyClub />} />
                      <Route path="test" element={<Test />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>,
)
