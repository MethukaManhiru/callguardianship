
import React, { createContext, useState, useContext, useEffect } from "react";
import { ContactContextType, Contact } from "@/types";
import { mockContacts } from "@/lib/mockData";
import { toast } from "sonner";

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [blockedContacts, setBlockedContacts] = useState<Contact[]>([]);

  // Load contacts and blocked status from localStorage or use mock data
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
  }, []);

  // Save contacts and blocked status to localStorage when they change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("secureblock_contacts", JSON.stringify(contacts));
    }
    
    if (blockedContacts.length > 0) {
      localStorage.setItem("secureblock_blocked_contacts", JSON.stringify(blockedContacts));
    }
  }, [contacts, blockedContacts]);

  const toggleBlock = (contactId: string) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => {
        if (contact.id === contactId) {
          const newBlockedState = !contact.isBlocked;
          
          // Show appropriate notification
          if (newBlockedState) {
            toast.success(`${contact.name} has been blocked`);
            
            // Add to blocked contacts if newly blocked
            if (!blockedContacts.some(c => c.id === contact.id)) {
              setBlockedContacts(prev => [...prev, {...contact, isBlocked: true}]);
            }
          } else {
            toast.info(`${contact.name} has been unblocked`);
            
            // Remove from blocked contacts if unblocked
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
    <ContactContext.Provider value={{ contacts, blockedContacts, toggleBlock, searchContacts }}>
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
