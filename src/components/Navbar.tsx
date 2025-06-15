import { useState, useEffect } from "react";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [hovered, setHovered] = useState<"signin" | "register" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
          setIsLoggedIn(true);
          setUser(JSON.parse(userData));
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        checkAuthStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Listen for route changes to update auth state
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location.pathname]);

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

  const handleDestinationsClick = (e: React.MouseEvent) => {
    e.preventDefault();

    navigate("/destination");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-gray-200 bg-white/95 text-black"
          : "bg-transparent text-white"
      }`}
    >
      {/* Tombol Hamburger untuk Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`focus:outline-none ${
            scrolled ? "text-black" : "text-white"
          }`}
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
      <div className="hidden md:flex items-center justify-between w-full">
        <Link to="/" className="text-2xl font-bold font-montserrat">
          Jogjadventure
          <span className={scrolled ? "text-secondary" : "text-white"}>.</span>
        </Link>
        <div className="flex gap-6 text-sm">
          <Link
            to="/"
            className={`cursor-pointer hover:text-secondary transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Home
          </Link>

          {/* Destinations navigation */}
          <button
            onClick={handleDestinationsClick}
            className={`cursor-pointer hover:text-secondary transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Destination
          </button>

          <Link
            to="/about"
            className={`cursor-pointer hover:text-secondary transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            About Us
          </Link>
          <Link
            to="/faq"
            className={`cursor-pointer hover:text-secondary transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            FAQ & Bantuan
          </Link>
        </div>
        {/* Auth Buttons or Profile */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={`flex items-center gap-2 hover:text-secondary transition ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              <FaRegUserCircle className="text-2xl" />
              <span className="text-sm">{user?.username || "User"}</span>
            </button>

            {/* Profile Dropdown tetap sama */}
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
                className={`ripple-btn w-full h-full rounded-md text-sm font-semibold cursor-pointer overflow-hidden ${
                  // PERBAIKAN: Jika tidak di-hover dan scrolled, maka hitam. Selainnya putih
                  hovered === "signin" || !scrolled
                    ? "text-white"
                    : "text-black"
                }`}
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
                className={`ripple-btn w-full h-full rounded-md text-sm font-semibold cursor-pointer overflow-hidden flex items-center justify-center ${
                  // PERBAIKAN: Jika tidak di-hover dan scrolled, maka hitam. Selainnya putih
                  hovered === "register" || !scrolled
                    ? "text-white"
                    : "text-black"
                }`}
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

          {/* Mobile destinations navigation */}
          <button
            onClick={(e) => {
              handleDestinationsClick(e);
              setIsOpen(false); // Close mobile menu
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Destination
          </button>

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
