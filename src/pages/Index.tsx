
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    // Redirect to passcode entry after 2 seconds
    const timer = setTimeout(() => {
      navigate('/passcode');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen bg-secure-black flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center animate-fade-in">
        <Shield className="w-16 h-16 text-white mb-6 animate-pulse-soft" />
        <h1 className="text-2xl font-semibold text-white mb-2">SecureBlock</h1>
        <p className="text-gray-400 text-center">Welcome to SecureBlock</p>
      </div>
    </div>
  );
};

export default Index;
