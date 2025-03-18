
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Volume2,
  Clock,
  Lock,
  Phone,
  ToggleRight,
  LogOut,
  Shield
} from 'lucide-react';
import Header from '@/components/Header';
import SettingsOption from '@/components/SettingsOption';
import { Button } from '@/components/ui/button';
import { defaultSettings } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { Settings as SettingsType } from '@/types';
import { toast } from 'sonner';

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('secureblock_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [isAuthenticated, navigate]);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('secureblock_settings', JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast.success(`Setting updated`);
  };

  const handleScheduledBlockingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      scheduledBlocking: {
        ...prev.scheduledBlocking,
        [key]: value
      }
    }));
    
    toast.success(`Scheduled blocking updated`);
  };

  const handleChangePasscode = () => {
    // In a real app, this would open a passcode change dialog
    toast.info("Passcode change functionality would be implemented here");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-secure-black pb-6">
      <Header title="Settings" />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <div className="glass-card p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-secure-green mr-3" />
              <div>
                <h3 className="font-medium text-white">Passcode</h3>
                <p className="text-sm text-gray-300">Change your security passcode</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-secure-green hover:text-secure-green/80 hover:bg-secure-gray/20"
              onClick={handleChangePasscode}
            >
              Change
            </Button>
          </div>
        </div>
        
        <SettingsOption
          title="Notifications"
          description="Get notified when calls are blocked"
          type="toggle"
          icon={<Bell className="w-5 h-5" />}
          value={settings.notifications}
          onChange={(value) => handleSettingChange('notifications', value)}
        />
        
        <SettingsOption
          title="Volume Control"
          description="Adjust ringtone volume for blocked calls"
          type="slider"
          icon={<Volume2 className="w-5 h-5" />}
          value={settings.volume}
          onChange={(value) => handleSettingChange('volume', value)}
        />
        
        <div className="glass-card p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-secure-green mr-3" />
              <div>
                <h3 className="font-medium text-white">Scheduled Blocking</h3>
                <p className="text-sm text-gray-300">Block calls during specific times</p>
              </div>
            </div>
            
            <Switch
              checked={settings.scheduledBlocking.enabled}
              onCheckedChange={(value) => handleScheduledBlockingChange('enabled', value)}
              className="data-[state=checked]:bg-secure-green"
            />
          </div>
          
          {settings.scheduledBlocking.enabled && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Start Time</label>
                <input
                  type="time"
                  value={settings.scheduledBlocking.startTime}
                  onChange={(e) => handleScheduledBlockingChange('startTime', e.target.value)}
                  className="bg-secure-gray text-white rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">End Time</label>
                <input
                  type="time"
                  value={settings.scheduledBlocking.endTime}
                  onChange={(e) => handleScheduledBlockingChange('endTime', e.target.value)}
                  className="bg-secure-gray text-white rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          )}
        </div>
        
        <SettingsOption
          title="WhatsApp Integration"
          description="Block calls from WhatsApp too"
          type="toggle"
          icon={<Phone className="w-5 h-5" />}
          value={settings.whatsappIntegration}
          onChange={(value) => handleSettingChange('whatsappIntegration', value)}
        />
        
        <SettingsOption
          title="Background Service"
          description="Keep monitoring in the background"
          type="toggle"
          icon={<ToggleRight className="w-5 h-5" />}
          value={settings.backgroundService}
          onChange={(value) => handleSettingChange('backgroundService', value)}
        />
        
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full glass-card mt-6 py-5 text-white hover:bg-secure-red/20 hover:text-secure-red"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log Out</span>
        </Button>
        
        <div className="mt-6 text-center text-xs text-gray-500 flex flex-col items-center">
          <div className="flex items-center mb-1">
            <Shield className="w-3 h-3 mr-1" />
            <span>SecureBlock v1.0</span>
          </div>
          <p>© 2023 All rights reserved</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;

// Import the Switch component locally to use in this file
import { Switch } from "@/components/ui/switch";
