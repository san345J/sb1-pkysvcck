import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-500">
            CreativeConnect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              About Us
            </Link>
            <Link to="/creators" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              Digital Creators
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
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
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
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
          </div>
        )}
      </nav>
    </header>
  );
};