import { Play, Calendar, MapPin, Users, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  id: string;
  title: string;
  creator: string;
  date: string;
  location: string;
  attendees: number;
  likes: number;
  videoThumbnail: string;
  price: number;
}

export function EventCard({
  title,
  creator,
  date,
  location,
  attendees,
  likes,
  videoThumbnail,
  price
}: EventCardProps) {
  return (
    <Card className="relative overflow-hidden bg-card shadow-card border-0 transition-all duration-300 hover:shadow-warm hover:-translate-y-1">
      {/* Video Preview Container */}
      <div className="relative aspect-[9/16] bg-gradient-warm">
        <img 
          src={videoThumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button 
            size="icon" 
            className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-primary shadow-glow"
          >
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1 bg-gradient-sunset text-white rounded-full text-sm font-semibold shadow-glow">
            ${price}
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">by {creator}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{attendees}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
          </div>
          
          <Button variant="hero" className="font-semibold px-6">
            Get Ticket
          </Button>
        </div>
      </div>
    </Card>
  );
}