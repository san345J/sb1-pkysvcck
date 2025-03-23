import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isUserLoggedIn = localStorage.getItem("user") !== null;
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-500">
            CreativeConnect
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              About Us
            </Link>
            <Link
              to="/creators"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              Digital Creators
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {!isUserLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    Register
                  </Link>
                </>
              )}
              {isUserLoggedIn && userData.role == "digital creator" && (
                <>
                  <Link
                    to="/dashboard/creator"
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Creator Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
              {isUserLoggedIn && userData.role == "client" && (
                <>
                  <Link
                    to="/dashboard/client"
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Client Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/about"
              className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              About Us
            </Link>
            <Link
              to="/creators"
              className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              Digital Creators
            </Link>
            {!isUserLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
