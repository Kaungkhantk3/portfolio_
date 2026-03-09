import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Home />
      <Analytics />
    </BrowserRouter>
  );
}
