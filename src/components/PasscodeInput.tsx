
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PasscodeInputProps {
  onComplete: (passcode: string) => void;
  length?: number;
}

const PasscodeInput: React.FC<PasscodeInputProps> = ({ 
  onComplete, 
  length = 4 
}) => {
  const [passcode, setPasscode] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  
  // Handle input changes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow only numbers and backspace
    if (
      !/^[0-9]$/.test(e.key) && 
      e.key !== "Backspace" && 
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
      return;
    }
    
    // Only process key events here, don't update the passcode
    // The actual update will happen in the onChange handler
  };
  
  // Call onComplete when all digits are entered
  useEffect(() => {
    if (passcode.length === length) {
      onComplete(passcode);
    }
  }, [passcode, length, onComplete]);
  
  return (
    <div className="w-full max-w-xs flex flex-col items-center">
      <div className="relative w-full mb-8">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          className="opacity-0 absolute top-0 left-0 w-full h-full z-10"
          maxLength={length}
          value={passcode}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length <= length) {
              setPasscode(value);
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus
        />
        
        <div className="flex justify-center space-x-4">
          {Array.from({ length }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-12 h-12 border-2 border-white/30 rounded-lg flex items-center justify-center text-xl text-white bg-white/10 backdrop-blur-sm",
                passcode.length > index && "border-secure-green bg-secure-green/10",
                focused && passcode.length === index && "border-secure-green ring-2 ring-secure-green/50"
              )}
            >
              {passcode.length > index ? "•" : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasscodeInput;
