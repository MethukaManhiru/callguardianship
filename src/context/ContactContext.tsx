import React, { createContext, useState, useContext, useEffect } from "react";
import { ContactContextType, Contact, DeviceContact } from "@/types";
import { mockContacts } from "@/lib/mockData";
import { toast } from "sonner";

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [blockedContacts, setBlockedContacts] = useState<Contact[]>([]);
  const [isNativeApp, setIsNativeApp] = useState<boolean>(false);

  useEffect(() => {
    const isMobileApp = typeof (window as any).Capacitor !== 'undefined' || 
                          typeof (window as any).cordova !== 'undefined';
    setIsNativeApp(isMobileApp);
  }, []);

  useEffect(() => {
    const savedContacts = localStorage.getItem("secureblock_contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts(mockContacts);
    }

    const savedBlockedContacts = localStorage.getItem("secureblock_blocked_contacts");
    if (savedBlockedContacts) {
      setBlockedContacts(JSON.parse(savedBlockedContacts));
    }

    if (isNativeApp) {
      loadRealContacts().catch(error => {
        console.error("Failed to load contacts:", error);
        toast.error("Could not load your contacts. Using demo data instead.");
      });
    }
  }, [isNativeApp]);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("secureblock_contacts", JSON.stringify(contacts));
    }
    
    if (blockedContacts.length > 0) {
      localStorage.setItem("secureblock_blocked_contacts", JSON.stringify(blockedContacts));
    }
  }, [contacts, blockedContacts]);

  const loadRealContacts = async (): Promise<void> => {
    try {
      toast.info("In a real device, this would load your actual contacts");
      console.log("In a real app, we would load device contacts here");
    } catch (error) {
      console.error("Error loading contacts:", error);
      throw error;
    }
  };

  const toggleBlock = (contactId: string) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => {
        if (contact.id === contactId) {
          const newBlockedState = !contact.isBlocked;
          
          if (newBlockedState) {
            toast.success(`${contact.name} has been blocked`);
            
            if (!blockedContacts.some(c => c.id === contact.id)) {
              setBlockedContacts(prev => [...prev, {...contact, isBlocked: true}]);
            }
          } else {
            toast.info(`${contact.name} has been unblocked`);
            
            setBlockedContacts(prev => prev.filter(c => c.id !== contact.id));
          }
          
          return { ...contact, isBlocked: newBlockedState };
        }
        return contact;
      })
    );
  };

  const searchContacts = (query: string): Contact[] => {
    if (!query.trim()) return contacts;
    
    const lowerCaseQuery = query.toLowerCase();
    return contacts.filter(
      contact => 
        contact.name.toLowerCase().includes(lowerCaseQuery) || 
        contact.phone.includes(query)
    );
  };

  return (
    <ContactContext.Provider value={{ 
      contacts, 
      blockedContacts, 
      toggleBlock, 
      searchContacts,
      loadRealContacts
    }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
