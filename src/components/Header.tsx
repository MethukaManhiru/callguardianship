
import React from "react";
import { Shield, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-secure-black z-10">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-white" />
          <span className="font-semibold text-lg text-white">{title || "SecureBlock"}</span>
        </div>
        
        {!isSettingsPage && (
          <Link 
            to="/settings" 
            className="p-2 rounded-full hover:bg-secure-darkGray default-transition"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-white" />
          </Link>
        )}
        
        {isSettingsPage && (
          <Link 
            to="/dashboard" 
            className="text-sm text-white hover:text-secure-green default-transition"
            aria-label="Back to dashboard"
          >
            Back
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
