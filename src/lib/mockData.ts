
import { Contact, Settings } from "@/types";

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    avatar: "/lovable-uploads/34c3e0d8-69a3-43cd-9195-2cc5a7f02e04.png",
    isBlocked: false
  },
  {
    id: "2",
    name: "Emily Johnson",
    phone: "+1 (555) 234-5678",
    avatar: "/lovable-uploads/9faf85a9-5bf6-461d-9bed-8c310be7fec9.png",
    isBlocked: false
  },
  {
    id: "3",
    name: "Michael Brown",
    phone: "+1 (555) 345-6789",
    avatar: "/lovable-uploads/b6864def-6e6c-40d8-be0c-2bd42460845f.png",
    isBlocked: false
  },
  {
    id: "4",
    name: "Sarah Wilson",
    phone: "+1 (555) 456-7890",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    isBlocked: false
  },
  {
    id: "5",
    name: "David Lee",
    phone: "+1 (555) 567-8901",
    avatar: "https://i.pravatar.cc/150?u=david",
    isBlocked: false
  },
  {
    id: "6",
    name: "Jennifer Garcia",
    phone: "+1 (555) 678-9012",
    avatar: "https://i.pravatar.cc/150?u=jennifer",
    isBlocked: false
  },
  {
    id: "7",
    name: "Robert Martinez",
    phone: "+1 (555) 789-0123",
    avatar: "https://i.pravatar.cc/150?u=robert",
    isBlocked: false
  },
  {
    id: "8",
    name: "Lisa Anderson",
    phone: "+1 (555) 890-1234",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    isBlocked: false
  }
];

export const defaultSettings: Settings = {
  passcode: "7987",
  notifications: true,
  volume: 50,
  backgroundService: true,
  scheduledBlocking: {
    enabled: false,
    startTime: "22:00",
    endTime: "06:00"
  },
  whatsappIntegration: true
};
