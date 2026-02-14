import { Link, NavLink } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import ResponsiveNavMenu from "./ResponsiveNavManu";

const Navbar = () => {
  const { cartTotalItems } = useCart();

  // 🔹 STATES
  const [openNav, setOpenNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // 🔹 LOCATION HANDLER
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Temporary label (later API se city nikal sakte ho)
        setUserLocation({
          suburb: "Current Location",
          lat: latitude,
          lng: longitude,
        });

        setOpenDropdown(false);
      },
      () => alert("Please allow location access")
    );
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl md:text-3xl font-bold hover:scale-105 transition"
        >
          <span className="text-red-500 font-serif">Quick</span>Kart
        </Link>

        {/* LOCATION (DESKTOP) */}
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="hidden md:flex items-center gap-1 cursor-pointer hover:text-red-500 transition"
        >
          <CiLocationOn size={22} />
          <span className="text-sm font-semibold">
            {userLocation?.suburb || "Add Address"}
          </span>
          <RiArrowDropDownLine
            size={22}
            className={`transition-transform ${
              openDropdown ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-7 font-semibold uppercase">
          {["/", "/products", "/about", "/contact"].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-red-500"
                  : "hover:text-red-500 transition"
              }
            >
              {path === "/" ? "Home" : path.slice(1)}
            </NavLink>
          ))}

          {/* CART */}
          <Link to="/cart" className="relative">
            <FaCartPlus size={22} />
            <span className="absolute -top-2 -right-2 bg-amber-500 text-xs px-2 rounded-full">
              {cartTotalItems}
            </span>
          </Link>

          {/* AUTH */}
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>

        {/* MOBILE CART */}
        <Link to="/cart" className="relative md:hidden left-8">
          <FaCartPlus size={22} />
          <span className="absolute -top-2 -right-2 bg-amber-500 text-xs px-2 rounded-full">
            {cartTotalItems}
          </span>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpenNav(!openNav)}
          className="md:hidden transition"
        >
          {openNav ? <RxCross1 size={26} /> : <RxHamburgerMenu size={26} />}
        </button>
      </div>

      {/* LOCATION DROPDOWN */}
      <div
        className={`absolute top-16 left-1/2 -translate-x-1/2 bg-gray-100 p-4 rounded-xl shadow-lg
        transition-all origin-top
        ${
          openDropdown
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-sm uppercase">Change Location</span>
          <IoClose
            className="cursor-pointer"
            onClick={() => setOpenDropdown(false)}
          />
        </div>

        <button
          onClick={handleUseCurrentLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg w-full transition"
        >
          Use Current Location
        </button>
      </div>

      {/* MOBILE MENU */}
      <ResponsiveNavMenu
        openNav={openNav}
        setOpenNav={setOpenNav}
        location={userLocation}
        onUseLocation={handleUseCurrentLocation}
      />
    </header>
  );
};

export default Navbar;
