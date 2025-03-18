
export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isBlocked: boolean;
}

export interface Settings {
  passcode: string;
  notifications: boolean;
  volume: number;
  backgroundService: boolean;
  scheduledBlocking: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  whatsappIntegration: boolean;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: (passcode: string) => Promise<boolean>;
  logout: () => void;
}

export interface ContactContextType {
  contacts: Contact[];
  blockedContacts: Contact[];
  toggleBlock: (contactId: string) => void;
  searchContacts: (query: string) => Contact[];
  loadRealContacts?: () => Promise<void>;
  isLoading?: boolean;
}

export interface DeviceContact {
  id: string;
  displayName: string;
  phoneNumbers: string[];
  photoUri?: string;
}
