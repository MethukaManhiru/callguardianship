
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import PasscodeInput from '@/components/PasscodeInput';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const PasscodeEntry = () => {
  const [passcode, setPasscode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const handlePasscodeComplete = (code: string) => {
    setPasscode(code);
  };

  const handleContinue = async () => {
    if (passcode.length !== 4) {
      setError('Please enter a 4-digit passcode');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const success = await authenticate(passcode);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Incorrect passcode');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secure-black flex flex-col items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-xs animate-slide-up">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-10 h-10 text-white mb-4" />
          <h1 className="text-xl font-semibold text-white mb-1">Enter Passcode</h1>
        </div>

        <PasscodeInput onComplete={handlePasscodeComplete} />

        {error && (
          <div className="text-secure-red text-sm text-center mb-4">
            {error}
          </div>
        )}

        <Button
          onClick={handleContinue}
          disabled={isSubmitting || passcode.length !== 4}
          className="w-full bg-white text-secure-black hover:bg-white/90 font-medium rounded-full"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-secure-black border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Lock className="w-4 h-4 mr-2" />
              Continue
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PasscodeEntry;
