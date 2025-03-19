
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aef1e72fdf464d53a6ef7b182a1a84d0',
  appName: 'callguardianship',
  webDir: 'dist',
  server: {
    url: 'https://aef1e72f-df46-4d53-a6ef-7b182a1a84d0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Contacts: {
      androidPermissions: ['android.permission.READ_CONTACTS']
    }
  }
};

export default config;
