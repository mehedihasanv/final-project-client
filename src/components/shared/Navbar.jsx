import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import api from "../../services/apiClient";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      api
        .get(`/users/role/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch(() => setRole(null));
    }
  }, [user]);

  const dashboardLink =
    role === "admin"
      ? "/dashboard/manage-users"
      : role === "creator"
        ? "/dashboard/add-contest"
        : "/dashboard/profile";

  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-contests">All Contests</Link>
      </li>
      <li>
        <Link to="/leaderboard">Leaderboard</Link>
      </li>
      <li>
        <Link to="/extra-2">Testimonials</Link>
      </li>
      
      <li>
        <Link to="/about">About</Link>
        </li> 
        <li>
          <Link to="/blog">Blog</Link>
          </li>
         <li>
          <Link to="/contact">Contact</Link>
          </li>
          <li>
        <Link to="/extra-1">HelpZone</Link>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="text-2xl font-bold">
            <span className="text-blue-300">Contest</span>Hub
          </Link>
          <img
            className="h-5"
            src="https://img.icons8.com/?size=100&id=52425&format=png&color=000000"
            alt=""
          />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex items-center gap-3">
          <ThemeToggle />

          {!user ? (
            <Link
              to="/login"
              className="btn btn-primary btn-sm bg-blue-300 text-black border-0"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="profile"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="font-semibold text-center py-2">
                  {user?.displayName || "User"}
                </li>

                <li>
                  <Link to={dashboardLink}>Dashboard</Link>
                </li>

                <li>
                  <button onClick={logoutUser} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
