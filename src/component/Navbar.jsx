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
import { ResponsiveNavManu } from "./ResponsiveNavManu";

const Navbar = ({ location }) => {
  const { cartItem } = useCart();
  const [openNav, setOpenNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="bg-white shadow-md relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold transition-transform duration-300 hover:scale-105">
          <span className="text-red-500 font-serif">Quick</span>Kart
        </Link>

        {/* LOCATION */}
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="hidden md:flex items-center gap-1 cursor-pointer transition-all duration-300 hover:text-red-500"
        >
          <CiLocationOn size={24} />
          <span className="font-semibold text-sm">
            {location?.city || "Add Address"}
          </span>

          <RiArrowDropDownLine
            size={24}
            className={`transition-transform duration-300 ${
              openDropdown ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-7 font-bold uppercase">
          {["/", "/products", "/about", "/contact"].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive
                    ? "border-b-2 border-red-500"
                    : "hover:text-red-500"
                }`
              }
            >
              {path === "/" ? "Home" : path.slice(1)}
            </NavLink>
          ))}

          {/* CART */}
          <Link to="/cart" className="relative group">
            <FaCartPlus size={24} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-2 -right-2 bg-amber-500 text-xs px-2 rounded-full transition-transform duration-300 group-hover:scale-110">
              {cartItem.length}
            </span>
          </Link>

          {/* AUTH */}
          <SignedOut>
            <SignInButton className="bg-blue-500 px-4 py-2 rounded-lg text-white transition-all duration-300 hover:bg-blue-600 hover:scale-105" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>

        {/* MOBILE CART */}
        <Link to="/cart" className="relative left-10 md:hidden">
          <FaCartPlus size={24} />
          <span className="absolute -top-2 -right-2 bg-amber-500 text-xs px-2 rounded-full">
            {cartItem.length}
          </span>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden transition-transform duration-300"
          onClick={() => setOpenNav(!openNav)}
        >
          <div
            className={`transition-all duration-300 transform ${
              openNav ? "rotate-180 scale-110" : "rotate-0 scale-100"
            }`}
          >
            {openNav ?  <RxCross1 size={28} /> :  <RxHamburgerMenu size={28} /> }
          </div>
        </button>
      </div>

      {/* LOCATION DROPDOWN */}
      <div
        className={`hidden md:block absolute top-16 left-1/2 -translate-x-1/2 bg-gray-100 p-4 rounded-lg shadow-lg
        transition-all duration-300 origin-top
        ${openDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold uppercase text-sm">Change Location</span>
          <IoClose
            onClick={() => setOpenDropdown(false)}
            className="cursor-pointer"
          />
        </div>
        <button className="bg-blue-500 px-4 py-2 rounded text-white w-full transition hover:bg-blue-600">
          Use Current Location
        </button>
      </div>

      {/* MOBILE MENU */}
      <ResponsiveNavManu openNav={openNav} setOpenNav={setOpenNav} />
    </header>
  );
};

export default Navbar;
