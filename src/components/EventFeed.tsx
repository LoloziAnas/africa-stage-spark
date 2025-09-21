import { useMemo, useState } from "react";
import { EventCard } from "./EventCard";
import afrobeatsImg from "@/assets/event-afrobeats.jpg";
import fashionImg from "@/assets/event-fashion.jpg";
import comedyImg from "@/assets/event-comedy.jpg";
import amapianoImg from "@/assets/event-amapiano.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Vibe = "Afrobeats" | "Amapiano" | "Comedy" | "Fashion";

const sampleEvents = [
  {
    id: "1",
    title: "Afrobeats Night Lagos",
    creator: "DJ Spinall",
    date: "Dec 15, 2024",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    vibe: "Afrobeats" as Vibe,
    attendees: 1200,
    likes: 340,
    videoThumbnail: afrobeatsImg,
    price: 25,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "2",
    title: "Accra Fashion Week 2024",
    creator: "Ghana Fashion Council",
    date: "Dec 20, 2024",
    location: "National Theatre, Accra",
    city: "Accra",
    vibe: "Fashion" as Vibe,
    attendees: 2500,
    likes: 890,
    videoThumbnail: fashionImg,
    price: 45,
  },
  {
    id: "3",
    title: "Comedy Central Nairobi",
    creator: "Crazy Kennar",
    date: "Dec 22, 2024",
    location: "KICC, Nairobi",
    city: "Nairobi",
    vibe: "Comedy" as Vibe,
    attendees: 800,
    likes: 520,
    videoThumbnail: comedyImg,
    price: 20,
  },
  {
    id: "4",
    title: "Amapiano Festival",
    creator: "Major League DJz",
    date: "Dec 28, 2024",
    location: "Cape Town Stadium",
    city: "Cape Town",
    vibe: "Amapiano" as Vibe,
    attendees: 5000,
    likes: 1200,
    videoThumbnail: amapianoImg,
    price: 35,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

export function EventFeed() {
  const [city, setCity] = useState<string>("All");
  const [vibe, setVibe] = useState<string>("All");

  const cities = useMemo(() => ["All", ...Array.from(new Set(sampleEvents.map(e => e.city)))], []);
  const vibes = useMemo(() => ["All", ...Array.from(new Set(sampleEvents.map(e => e.vibe)))], []);

  const filtered = useMemo(() =>
    sampleEvents.filter(e => (city === "All" || e.city === city) && (vibe === "All" || e.vibe === vibe)),
  [city, vibe]);

  return (
    <div className="space-y-6 pb-20">
      <div className="px-4">
        <h2 className="text-2xl font-bold text-foreground">Trending Events</h2>
        <p className="text-muted-foreground">Discover amazing events near you</p>
      </div>

      {/* Filters */}
      <div className="px-4 grid grid-cols-2 gap-3 max-w-xl">
        <div>
          <label className="text-sm text-muted-foreground">City</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Vibe</label>
          <Select value={vibe} onValueChange={setVibe}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select vibe" />
            </SelectTrigger>
            <SelectContent>
              {vibes.map(v => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {filtered.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}