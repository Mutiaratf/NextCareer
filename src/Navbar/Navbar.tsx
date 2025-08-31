import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import {Briefcase } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span>NextCareer</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-foreground hover:text-primary transition-colors ${
              isActive('/') ? 'text-primary font-medium' : ''
            }`}>
              Home
            </Link>
            <Link to="/vacancy" className={`text-foreground hover:text-primary transition-colors ${
              isActive('/vacancy') ? 'text-primary font-medium' : ''
            }`}>
              Vacancy
            </Link>
           
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/vacancy" onClick={() => setIsMenuOpen(false)}>Vacancy</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;