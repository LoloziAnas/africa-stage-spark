import { EventCard } from "./EventCard";
import afrobeatsImg from "@/assets/event-afrobeats.jpg";
import fashionImg from "@/assets/event-fashion.jpg";
import comedyImg from "@/assets/event-comedy.jpg";
import amapianoImg from "@/assets/event-amapiano.jpg";

const sampleEvents = [
  {
    id: "1",
    title: "Afrobeats Night Lagos",
    creator: "DJ Spinall",
    date: "Dec 15, 2024",
    location: "Victoria Island, Lagos",
    attendees: 1200,
    likes: 340,
    videoThumbnail: afrobeatsImg,
    price: 25
  },
  {
    id: "2", 
    title: "Accra Fashion Week 2024",
    creator: "Ghana Fashion Council",
    date: "Dec 20, 2024",
    location: "National Theatre, Accra",
    attendees: 2500,
    likes: 890,
    videoThumbnail: fashionImg, 
    price: 45
  },
  {
    id: "3",
    title: "Comedy Central Nairobi",
    creator: "Crazy Kennar",
    date: "Dec 22, 2024", 
    location: "KICC, Nairobi",
    attendees: 800,
    likes: 520,
    videoThumbnail: comedyImg,
    price: 20
  },
  {
    id: "4",
    title: "Amapiano Festival",
    creator: "Major League DJz",
    date: "Dec 28, 2024",
    location: "Cape Town Stadium",
    attendees: 5000,
    likes: 1200,
    videoThumbnail: amapianoImg,
    price: 35
  }
];

export function EventFeed() {
  return (
    <div className="space-y-6 pb-20">
      <div className="px-4">
        <h2 className="text-2xl font-bold text-foreground">Trending Events</h2>
        <p className="text-muted-foreground">Discover amazing events near you</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {sampleEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}