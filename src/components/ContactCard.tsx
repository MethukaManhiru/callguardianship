
import React from "react";
import { Phone, PhoneOff } from "lucide-react";
import { Contact } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  contact: Contact;
  onToggleBlock: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  onToggleBlock
}) => {
  return (
    <div className="glass-card p-3 mb-3 w-full flex items-center justify-between animate-slide-up">
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secure-gray/50 mr-3">
          {contact.avatar ? (
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = "https://i.pravatar.cc/150?u=" + contact.id;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold">
              {contact.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-white">{contact.name}</h3>
          <p className="text-sm text-gray-300">{contact.phone}</p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        className={cn(
          "btn-block min-w-[80px]",
          contact.isBlocked && "blocked"
        )}
        onClick={() => onToggleBlock(contact.id)}
      >
        {contact.isBlocked ? (
          <span className="flex items-center">
            <PhoneOff className="w-4 h-4 mr-1" /> Blocked
          </span>
        ) : (
          <span className="flex items-center">
            <Phone className="w-4 h-4 mr-1" /> Block
          </span>
        )}
      </Button>
    </div>
  );
};

export default ContactCard;
