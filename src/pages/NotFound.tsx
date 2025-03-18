
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secure-black flex flex-col items-center justify-center p-4">
      <ShieldAlert className="w-16 h-16 text-secure-red mb-6" />
      <h1 className="text-3xl font-bold text-white mb-2">404</h1>
      <p className="text-xl text-gray-300 mb-8">Page Not Found</p>
      <p className="text-gray-400 mb-6 text-center">
        The page at <span className="text-secure-red">{location.pathname}</span> doesn't exist.
      </p>
      
      <Button 
        className="bg-secure-green text-white hover:bg-secure-green/90 px-6 py-2 rounded-full"
        onClick={() => navigate("/")}
      >
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
