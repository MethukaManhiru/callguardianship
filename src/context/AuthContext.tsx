
import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContextType } from "@/types";
import { defaultSettings } from "@/lib/mockData";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if there's a saved auth state
  useEffect(() => {
    const savedAuth = localStorage.getItem("secureblock_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const authenticate = async (passcode: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (passcode === defaultSettings.passcode) {
      setIsAuthenticated(true);
      localStorage.setItem("secureblock_auth", "true");
      return true;
    } else {
      toast.error("Incorrect passcode. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("secureblock_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
