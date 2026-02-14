import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaLocationArrow } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ResponsiveNavMenu = ({
  openNav,
  setOpenNav,
  location,
  onUseLocation,
}) => {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpenNav(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
        ${openNav ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[80%] max-w-[320px]
        bg-white shadow-2xl rounded-r-2xl
        transition-transform duration-300 ease-in-out
        ${openNav ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full px-6 py-6 gap-6">

          {/* HEADER */}
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-xl font-bold">
              <span className="text-red-500">Quick</span>Kart
            </span>
            <IoClose
              size={22}
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            />
          </div>

          {/* USER SECTION */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
              <p className="font-semibold text-lg">Hi there 👋</p>
            </SignedIn>

            <SignedOut>
              <FaRegUserCircle size={42} className="text-gray-500" />
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* LOCATION */}
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-xs uppercase text-gray-500 mb-1">
              Delivery Location
            </p>
            <p className="font-semibold text-sm">
              {location?.suburb || "Add Address"}
            </p>

            <button
              onClick={onUseLocation}
              className="mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg w-full transition"
            >
              <FaLocationArrow size={14} />
              Use Current Location
            </button>
          </div>

          {/* NAV LINKS */}
          <nav className="flex-1">
            <ul className="flex flex-col gap-4 text-lg font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setOpenNav(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* FOOTER */}
          <p className="text-xs text-center text-gray-400">
            © 2026 QuickKart
          </p>
        </div>
      </aside>
    </>
  );
};

export default ResponsiveNavMenu;
