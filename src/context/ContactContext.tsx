
import React, { createContext, useState, useContext, useEffect } from "react";
import { ContactContextType, Contact, DeviceContact } from "@/types";
import { mockContacts } from "@/lib/mockData";
import { toast } from "sonner";

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [blockedContacts, setBlockedContacts] = useState<Contact[]>([]);
  const [isNativeApp, setIsNativeApp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkIfNative = async () => {
      const isMobileApp = typeof (window as any).Capacitor !== 'undefined' || 
                           typeof (window as any).cordova !== 'undefined';
      setIsNativeApp(isMobileApp);
      
      if (isMobileApp) {
        console.log("Running as a native app with Capacitor");
      } else {
        console.log("Running as a web app");
      }
    };
    
    checkIfNative();
  }, []);

  useEffect(() => {
    const loadSavedContacts = () => {
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
    };
    
    loadSavedContacts();
    
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
    setIsLoading(true);
    try {
      if (isNativeApp) {
        try {
          // Import the Contacts plugin from @anuradev/capacitor-contacts
          const { Contacts } = await import('@anuradev/capacitor-contacts');
          
          // Request permissions - use requestPermissions (plural) instead of requestPermission
          const permissionStatus = await Contacts.requestPermissions();
          console.log("Permission status:", permissionStatus);
          
          if (permissionStatus.granted) {
            // Fetch all contacts using the plugin
            const result = await Contacts.getContacts();
            console.log("Contacts result:", result);
            
            if (result && result.contacts && result.contacts.length > 0) {
              // Map the contacts to our app's contact format
              const deviceContacts: Contact[] = result.contacts.map((contact: any) => {
                return {
                  id: contact.contactId || contact.id || Math.random().toString(),
                  name: contact.displayName || contact.givenName || 'Unknown',
                  phone: contact.phoneNumbers && contact.phoneNumbers.length > 0 
                    ? contact.phoneNumbers[0].number 
                    : 'No phone number',
                  avatar: contact.photoThumbnail 
                    ? `data:image/jpeg;base64,${contact.photoThumbnail}` 
                    : 'https://i.pravatar.cc/150?u=' + (contact.contactId || contact.id),
                  isBlocked: false
                };
              });
              
              setContacts(deviceContacts);
              toast.success(`Loaded ${deviceContacts.length} contacts from your device`);
              console.log("Loaded contacts:", deviceContacts);
            } else {
              toast.warning("No contacts found on your device");
              setContacts(mockContacts);
            }
          } else {
            console.log("Permission denied for contacts");
            toast.error("Permission to access contacts was denied");
            setContacts(mockContacts);
          }
        } catch (error) {
          console.error("Error accessing @anuradev/capacitor-contacts plugin:", error);
          toast.error("Error accessing your contacts");
          setContacts(mockContacts);
        }
      } else {
        // In web environment, simulate contact loading
        toast.info("In a real device, this would load your actual contacts");
        console.log("In a real app, we would load device contacts here");
        // Wait a bit to simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
      setContacts(mockContacts);
    } finally {
      setIsLoading(false);
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
      loadRealContacts,
      isLoading
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
