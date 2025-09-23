import React, { useState } from 'react';
import { Search, User, Bell, Menu, X } from 'lucide-react';

interface HeaderProps {
  onLogin: () => void;
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
  userTokens: number;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onSearch, isLoggedIn, userTokens }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['Politics', 'Technology', 'Sports', 'Business', 'Entertainment'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">NewsHub</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {categories.map(category => (
              <a key={category} href="#" className="text-gray-700 hover:text-red-600 font-medium">
                {category}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </form>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ₦{userTokens}
                </div>
                <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
                <User className="w-5 h-5 text-gray-600 cursor-pointer" />
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;