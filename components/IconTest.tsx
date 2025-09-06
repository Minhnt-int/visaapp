import { 
  Facebook, 
  MessageSquare, 
  Mail, 
  Youtube, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Star,
  Shield
} from "lucide-react";

export default function IconTest() {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Icon Test</h2>
      <div className="grid grid-cols-4 gap-4">
        <div><Facebook size={24} /> Facebook</div>
        <div><MessageSquare size={24} /> MessageSquare</div>
        <div><Mail size={24} /> Mail</div>
        <div><Youtube size={24} /> Youtube</div>
        <div><Phone size={24} /> Phone</div>
        <div><MapPin size={24} /> MapPin</div>
        <div><Clock size={24} /> Clock</div>
        <div><Send size={24} /> Send</div>
        <div><Star size={24} /> Star</div>
        <div><Shield size={24} /> Shield</div>
      </div>
    </div>
  );
}
