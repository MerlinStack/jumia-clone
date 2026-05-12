import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import JumiaFooter from "../components/JumiaFooter";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <JumiaFooter />
    </div>
  );
}

export default RootLayout;