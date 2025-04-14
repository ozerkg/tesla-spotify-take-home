import { Outlet } from "@tanstack/react-router";
import Navbar from "../pages/Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Child routes will render here */}
    </div>
  );
}
