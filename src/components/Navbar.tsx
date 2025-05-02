import React, { useState, useEffect } from "react";
import "./Navbar.css"; // Pastikan efek ripple dan lainnya ada di sini

function Navbar() {
  const [hovered, setHovered] = useState<"signin" | "register" | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md border-b border-white/20 bg-white/5" : "bg-transparent"
      }`}
    >
      <h1 className="text-2xl font-bold font-montserrat text-white">
        Jogjadventure<span className="text-white">.</span>
      </h1>

      <div className="hidden md:flex gap-6 text-sm text-white">
        <a href="#" className="cursor-pointer hover:text-secondary transition">Home</a>
        <a href="#explore" className="cursor-pointer hover:text-secondary transition">Explore</a>
        <a href="#faq" className="cursor-pointer hover:text-secondary transition">FAQ & Bantuan</a>
      </div>

      <div className="flex gap-4 items-center relative w-[200px] h-9">
        {/* Background animasi */}
        <div
          className={`absolute h-full w-[90px] rounded-md transition-all duration-500 ease-in-out z-0 bg-secondary`}
          style={{
            transform:
              hovered === "register"
                ? "translateX(104px)"
                : "translateX(0px)",
          }}
        />
s
        {/* Tombol Sign in */}
        <button
          onMouseEnter={() => setHovered("signin")}
          onMouseLeave={() => setHovered(null)}
          className="relative z-10 w-[90px] h-full rounded-md text-sm font-semibold text-white cursor-pointer overflow-hidden"
        >
          Sign in
        </button>

        {/* Tombol Register */}
        <button
          onMouseEnter={() => setHovered("register")}
          onMouseLeave={() => setHovered(null)}
          className="relative z-10 w-[90px] h-full rounded-md text-sm font-semibold text-white cursor-pointer overflow-hidden"
        >
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
