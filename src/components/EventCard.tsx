import { Play, Calendar, MapPin, Users, Heart, Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";

interface EventCardProps {
  id: string;
  title: string;
  creator: string;
  date: string;
  location: string;
  attendees: number;
  likes: number;
  videoThumbnail: string;
  videoUrl?: string;
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
  price,
  videoUrl,
}: EventCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    if (showVideo) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showVideo]);

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const orderCode = useMemo(() => Math.random().toString(36).slice(2, 10).toUpperCase(), []);
  const ticketPayload = useMemo(
    () => ({ code: orderCode, title, date, location }),
    [orderCode, title, date, location]
  );

  async function handleGenerateQr() {
    try {
      const data = JSON.stringify(ticketPayload);
      const url = await QRCode.toDataURL(data, { width: 256, margin: 1 });
      setQrDataUrl(url);
    } catch (e) {
      console.error("QR generation failed", e);
    }
  }

  const [tipAmount, setTipAmount] = useState<number>(2);

  return (
    <Card className="relative overflow-hidden bg-card shadow-card border-0 transition-all duration-300 hover:shadow-warm hover:-translate-y-1">
      {/* Video Preview Container */}
      <div className="relative aspect-[9/16] bg-gradient-warm">
        {showVideo && videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onEnded={() => setShowVideo(false)}
          />
        ) : (
          <img
            src={videoThumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Play Button Overlay */}
        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-primary shadow-glow"
              aria-label={showVideo ? "Pause teaser" : "Play teaser"}
              onClick={() => setShowVideo((v) => !v)}
            >
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </Button>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* Tip dialog trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70" aria-label="Tip creator">
                <Heart className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tip {creator}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[2, 5, 10].map((amt) => (
                    <Button key={amt} variant={tipAmount === amt ? "hero" : "outline"} onClick={() => setTipAmount(amt)}>
                      ${amt}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => alert(`Pretend tip of $${tipAmount} sent!`)}>Send Tip</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
                <p className="text-sm text-muted-foreground">Payment integration coming soon (Paystack/Flutterwave/M-Pesa/MoMo).</p>
              </div>
            </DialogContent>
          </Dialog>
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
          
          <Dialog onOpenChange={(open) => open && handleGenerateQr()}>
            <DialogTrigger asChild>
              <Button variant="hero" className="font-semibold px-6" aria-label="Get Ticket">
                <Ticket className="w-4 h-4 mr-2" /> Get Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Ticket for {title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Show this QR at the door. Well email a receipt later.</p>
                <div className="flex items-center justify-center">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="Ticket QR" className="w-48 h-48" />
                  ) : (
                    <div className="w-48 h-48 bg-muted animate-pulse rounded" />
                  )}
                </div>
                <div className="text-center text-sm">Order Code: <span className="font-mono">{orderCode}</span></div>
                <div className="flex justify-center gap-2">
                  <Button onClick={handleGenerateQr} variant="outline">Refresh QR</Button>
                  <Button>Checkout</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}