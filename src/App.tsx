import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF } from "react-icons/fa";

// Props type for InputField component
type InputFieldProps = {
  type: string;
  placeholder: string;
  Icon: React.ElementType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Reusable input field component
const InputField = ({ type, placeholder, Icon, value, onChange }: InputFieldProps) => (
  <div className="relative w-full focus-within:ring-2 focus-within:ring-secondary rounded-[10px] transition duration-300">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-11 w-full bg-zinc-300 rounded-[10px] px-4 pr-10 outline-none"
    />
    <Icon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
  </div>
);

const AuthForm = () => {
  const [isActive, setIsActive] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Input state types
  type AuthData = {
    username: string;
    email: string;
    password: string;
  };

  const [signInData, setSignInData] = useState<AuthData>({
    username: "",
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState<AuthData>({
    username: "",
    email: "",
    password: "",
  });

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = signInData;
    if (!username || !email || !password) {
      setHasError(true);
      setTimeout(() => setHasError(false), 500);
    } else {
      console.log("Sign In Data:", signInData);
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = signUpData;
    if (!username || !email || !password) {
      setHasError(true);
      setTimeout(() => setHasError(false), 500);
    } else {
      console.log("Sign Up Data:", signUpData);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-200 to-secondary/10 font-['Poppins']">
      <div className="relative w-[834px] h-[530px] bg-white rounded-[30px] shadow-lg overflow-hidden">
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ease-in-out 
          ${isActive ? "translate-x-full opacity-0 z-10 scale-75 blur-sm" : "z-20 opacity-100 scale-100 blur-0"}`}
        >
          <div className="w-full px-8 text-center">
            <h2 className="text-3xl font-semibold text-black mb-6">Sign Up</h2>
            <form
              onSubmit={handleSignUpSubmit}
              className={`flex flex-col gap-4 items-center ${hasError ? "animate-shake" : ""}`}
            >
              <InputField
                type="text"
                placeholder="Username"
                Icon={FaUser}
                value={signUpData.username}
                onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
              />
              <InputField
                type="email"
                placeholder="Email"
                Icon={FaEnvelope}
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              />
              <InputField
                type="password"
                placeholder="Password"
                Icon={FaLock}
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              />
              <button
                type="submit"
                className="bg-secondary text-white py-2.5 rounded-[10px] mt-2 w-full cursor-pointer hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-500">or register with</div>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-red-500 text-white p-3 rounded-full hover:opacity-80 transition">
                <FaGoogle />
              </button>
              <button className="bg-blue-600 text-white p-3 rounded-full hover:opacity-80 transition">
                <FaFacebookF />
              </button>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full right-0 flex items-center justify-center transition-all duration-700 ease-in-out 
          ${isActive ? "z-20 opacity-100 translate-x-full scale-100 blur-0" : "translate-x-0 opacity-0 z-10 scale-75 blur-sm"}`}
        >
          <div className="w-full px-8 text-center">
            <h2 className="text-3xl font-semibold text-black mb-6">Sign In</h2>
            <form
              onSubmit={handleSignInSubmit}
              className={`flex flex-col gap-4 items-center ${hasError ? "animate-shake" : ""}`}
            >
              <InputField
                type="text"
                placeholder="Username"
                Icon={FaUser}
                value={signInData.username}
                onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
              />
              <InputField
                type="email"
                placeholder="Email"
                Icon={FaEnvelope}
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
              />
              <InputField
                type="password"
                placeholder="Password"
                Icon={FaLock}
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
              />
              <button
                type="submit"
                className="bg-secondary text-white py-2.5 rounded-[10px] mt-2 w-full cursor-pointer hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-500">or sign in with</div>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-red-500 text-white p-3 rounded-full hover:opacity-80 transition">
                <FaGoogle />
              </button>
              <button className="bg-blue-600 text-white p-3 rounded-full hover:opacity-80 transition">
                <FaFacebookF />
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Panel */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-secondary text-white flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out z-30 
          ${isActive ? "-translate-x-full rounded-r-[100px]" : "translate-x-0 rounded-l-[100px]"}`}
        >
          <div>
            <h2 className="text-3xl font-semibold">
              {isActive ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <p className="text-sm mt-2">
              {isActive
                ? "To keep connected with us please login with your info"
                : "Enter your details and start your journey with us"}
            </p>
            <button
              onClick={() => setIsActive(!isActive)}
              className="mt-6 border border-white px-5 py-2.5 rounded-[10px] cursor-pointer hover:bg-white hover:text-secondary transition"
            >
              {isActive ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
