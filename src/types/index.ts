
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
  contactId: string;
  name?: {
    display: string;
    given?: string;
    family?: string;
  };
  phones?: {
    type: string;
    number: string;
  }[];
  image?: {
    base64String?: string;
  };
}
