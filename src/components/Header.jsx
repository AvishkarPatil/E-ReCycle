import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Home, User, Upload, Recycle, Wrench, Heart, LogIn, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const menuItems = [
    { href: '/', label: 'Home', icon: <Home size={20} /> },
    { href: '/upload', label: 'Classify', icon: <Upload size={20} /> },
    { href: '/marketplace', label: 'Marketplace', icon: <ShoppingCart size={20} /> },
    { href: '/donate', label: 'Donate', icon: <Heart size={20} /> },
    { href: '/dispose', label: 'Dispose', icon: <Recycle size={20} /> },
    { href: '/repair', label: 'Repair/Repurpose', icon: <Wrench size={20} /> },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-2xl font-bold text-green-600">
              <Recycle className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold tracking-tight">E-RECYCLE</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="relative">
                  <Bell size={24} className="text-gray-600 hover:text-green-600 cursor-pointer" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </div>
                <Link to="/profile" className="text-gray-600 hover:text-green-600">
                  <User size={24} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-green-600"
                >
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600 flex items-center"
              >
                <LogIn size={24} />
                <span className="ml-2">Login</span>
              </Link>
            )}
            <button
              className="md:hidden text-gray-600 hover:text-green-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMenu}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full"
              >
                <LogOut size={20} />
                <span className="ml-2">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMenu}
              >
                <LogIn size={20} />
                <span className="ml-2">Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}