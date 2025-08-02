import {
  Link,
  Scissors,
  BarChart3,
  User,
  Menu,
  X,
  Link2Icon,
  Link2,
  Home,
  User2,
  PowerCircle,
  Power,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignInUp = (text) => {
    navigate("/login", { state: { formType: text } });
  };

  const handleLogout = () => {
    logout();
    setIsLogedIn(false);
    navigate("/");
  };

  function getInitials(name, maxLetters = 2) {
    if (!name || typeof name !== "string") return "";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, maxLetters)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);
    if (storedUser) {
      setIsLogedIn(true);
    }
  }, [user]);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center"
              onClick={() => navigate("/")}
            >
              <Link className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ShortLink
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    : "text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                }
              >
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </NavLink>
              <NavLink
                to={"/links"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    : "text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                }
              >
                <Link2 className="h-4 w-4 mr-1" />
                Links
              </NavLink>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    : "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                }
              >
                <User2 className="h-4 w-4 mr-1" />
                Profile
              </NavLink>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          {!isLogedIn && (
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => handleSignInUp("login")}
              >
                Sign In
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                onClick={() => handleSignInUp("signUp")}
              >
                Sign Up
              </button>
            </div>
          )}

          {isLogedIn && user && (
            <div className="hidden md:flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <div className="w-8 h-8 bg-gray-200 hover:bg-blue-100 rounded-full flex items-center justify-center">
                  {getInitials(user.name)}
                </div>
              </button>
              <button
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                onClick={handleLogout}
              >
                <Power className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <NavLink
                to={"dashboard"}
                className="text-blue-600 block px-3 py-2 text-base font-medium hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Dashboard
              </NavLink>
              <NavLink className="text-gray-600 px-3 py-2 text-base font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </NavLink>
              <NavLink
                to={"links"}
                className="text-gray-600 block px-3 py-2 text-base font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Links
              </NavLink>
              <NavLink className="text-gray-600 block px-3 py-2 text-base font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                Settings
              </NavLink>
              {!isLogedIn && (
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="space-y-2">
                    <button className="w-full text-left text-gray-600 block px-3 py-2 text-base font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                      Sign In
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
              {isLogedIn && user && (
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="space-y-2">
                    <button className="w-full text-left text-gray-600 flex items-center px-3 py-2 text-base font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User className="h-3 w-3" />
                      </div>
                      Profile
                    </button>
                    <button className="w-full text-left text-gray-600 block px-3 py-2 text-base font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
