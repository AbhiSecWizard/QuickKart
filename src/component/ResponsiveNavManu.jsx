import { UserButton, useUser } from "@clerk/clerk-react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ResponsiveNavManu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();

  return (
    <>
      {/* BACKDROP / OVERLAY */}
      <div
        onClick={() => setOpenNav(false)}
        className={`
          fixed inset-0 z-10 bg-black/40
          transition-opacity duration-300
          ${openNav ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 z-20
          h-screen w-[75%]
          bg-white text-black
          md:hidden
          px-8 pt-16 pb-6
          rounded-r-xl shadow-lg

          transition-transform duration-300 ease-in-out
          ${openNav ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-6">

          {/* USER INFO */}
          <div className="flex items-center gap-3">
            {user ? <UserButton size={50} /> : <FaRegUserCircle size={50} />}
            <div className="font-semibold">
              {user?.fullName ? `Hello ${user.fullName}` : "Unknown User"}
            </div>
          </div>

          {/* NAV LINKS */}
          <nav>
            <ul className="flex flex-col gap-4 font-semibold text-2xl text-gray-600">
              <Link to="/" onClick={() => setOpenNav(false)}>
                <li className="hover:text-red-500 transition">Home</li>
              </Link>

              <Link to="/products" onClick={() => setOpenNav(false)}>
                <li className="hover:text-red-500 transition">Products</li>
              </Link>

              <Link to="/about" onClick={() => setOpenNav(false)}>
                <li className="hover:text-red-500 transition">About</li>
              </Link>

              <Link to="/contact" onClick={() => setOpenNav(false)}>
                <li className="hover:text-red-500 transition">Contact</li>
              </Link>
            </ul>
          </nav>

        </div>
      </div>
    </>
  );
};
