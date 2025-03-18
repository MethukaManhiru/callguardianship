
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, PhoneOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ContactCard from '@/components/ContactCard';
import Header from '@/components/Header';
import { useContacts } from '@/context/ContactContext';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredContacts, setFilteredContacts] = useState<Array<any>>([]);
  const { contacts, toggleBlock } = useContacts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = contacts.filter(
        contact => 
          contact.name.toLowerCase().includes(query) || 
          contact.phone.includes(query)
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  return (
    <div className="min-h-screen bg-secure-black pb-6">
      <Header title="Block Contacts" />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <div className="relative mb-6 mt-2">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search contacts..."
            className="pl-10 py-5 bg-secure-darkGray/70 border-secure-gray/30 text-white rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredContacts.length === 0 ? (
          <div className="glass-card p-6 flex flex-col items-center justify-center">
            <PhoneOff className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-300 text-center">
              {searchQuery ? "No contacts found" : "No contacts available"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredContacts.map((contact, index) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onToggleBlock={toggleBlock}
              />
            ))}
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Protected by SecureBlock</p>
          <div className="flex items-center justify-center mt-1">
            <Shield className="w-3 h-3 mr-1" />
            <span>Call protection active</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
