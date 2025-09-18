import { Home, Search, Plus, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        <Button variant="ghost" size="icon" className="flex-col gap-1 h-auto py-2">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="flex-col gap-1 h-auto py-2">
          <Search className="w-5 h-5" />
          <span className="text-xs">Discover</span>
        </Button>
        
        <Button 
          variant="hero"
          size="icon" 
          className="rounded-full w-12 h-12 -mt-2"
        >
          <Plus className="w-6 h-6" />
        </Button>
        
        <Button variant="ghost" size="icon" className="flex-col gap-1 h-auto py-2">
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Events</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="flex-col gap-1 h-auto py-2">
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  );
}