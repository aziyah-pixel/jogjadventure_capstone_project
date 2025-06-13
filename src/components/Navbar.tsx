import { useState, useEffect } from "react";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [hovered, setHovered] = useState<"signin" | "register" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) existingRipple.remove();

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.nativeEvent.offsetX - radius}px`;
    circle.style.top = `${event.nativeEvent.offsetY - radius}px`;
    circle.classList.add("ripple");

    button.appendChild(circle);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileDropdown(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-white/20 bg-white/5"
          : "bg-transparent"
      }`}
    >
      {/* Tombol Hamburger untuk Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menu untuk Desktop */}
      <div className="hidden md:flex gap-6 text-sm text-white justify-between w-full">
        <Link to="/" className="text-2xl font-bold font-montserrat text-white">
          Jogjadventure<span className="text-white">.</span>
        </Link>

        <div className="md:flex gap-6 text-sm mt-1.5">
          <Link
            to="/"
            className="cursor-pointer hover:text-secondary transition"
          >
            Home
          </Link>
          <Link
            to="/destination"
            className="cursor-pointer hover:text-secondary transition"
          >
            Destinations
          </Link>
          <Link
            to="/about"
            className="cursor-pointer hover:text-secondary transition"
          >
            About
          </Link>
          <Link
            to="/faq"
            className="cursor-pointer hover:text-secondary transition"
          >
            FAQ & Bantuan
          </Link>
        </div>

        {/* Auth Buttons or Profile */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 text-white hover:text-secondary transition"
            >
              <FaRegUserCircle className="text-2xl" />
              <span className="text-sm">{user?.username || "User"}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 items-center relative w-[200px] h-9">
            <div
              className={`absolute h-full w-[90px] rounded-md transition-all duration-500 ease-in-out z-0 bg-secondary`}
              style={{
                transform:
                  hovered === "register"
                    ? "translateX(106px)"
                    : "translateX(0px)",
              }}
            />
            <Link
              to="/AuthForm?mode=signin"
              className="relative z-10 w-[90px] h-full"
            >
              <button
                onMouseEnter={() => setHovered("signin")}
                onMouseLeave={() => setHovered(null)}
                onClick={createRipple}
                className="ripple-btn w-full h-full rounded-md text-sm font-semibold text-white cursor-pointer overflow-hidden"
              >
                Sign in
              </button>
            </Link>
            <Link
              to="/AuthForm?mode=signup"
              className="relative z-10 w-[90px] h-full"
            >
              <button
                onMouseEnter={() => setHovered("register")}
                onMouseLeave={() => setHovered(null)}
                onClick={createRipple}
                className="ripple-btn w-full h-full rounded-md text-sm font-semibold text-white cursor-pointer overflow-hidden flex items-center justify-center"
              >
                Register
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Menu Dropdown untuk Mobile */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black md:hidden">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-200">
            Home
          </Link>
          <Link to="/destination" className="block px-4 py-2 hover:bg-gray-200">
            Destinations
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-200">
            About
          </Link>
          <Link to="/faq" className="block px-4 py-2 hover:bg-gray-200">
            FAQ & Bantuan
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/AuthForm?mode=signin"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Sign In
              </Link>
              <Link
                to="/AuthForm?mode=signup"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
