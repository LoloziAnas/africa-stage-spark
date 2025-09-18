import { Play, Sparkles, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { EventFeed } from "@/components/EventFeed";
import { Navigation } from "@/components/Navigation";
import heroImage from "@/assets/hero-events.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="African events and creators"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>
        
        <div className="relative px-4 py-16 sm:py-24 max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Africa's Premier Event Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
              Discover & Create
              <br />
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Amazing Events
              </span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Connect with Africa's most talented creators, discover vibrant events, 
              and be part of the continent's growing creator economy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                variant="hero"
                size="lg" 
                className="font-semibold px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Explore Events
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Become a Creator
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="relative px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Creators", value: "10K+" },
                { label: "Events Hosted", value: "50K+" },
                { label: "Cities Covered", value: "200+" },
                { label: "Happy Guests", value: "1M+" }
              ].map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose EventHub?
            </h2>
            <p className="text-muted-foreground text-lg">
              Built for African creators and event-goers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Play className="w-8 h-8" />,
                title: "TikTok-Style Previews",
                description: "Watch engaging video previews before buying tickets"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Creator Economy",
                description: "Support African creators and earn from your events"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Local Payments",
                description: "Pay with M-Pesa, MTN MoMo, Paystack, and more"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center shadow-card border-0 hover:shadow-warm transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-glow">
          {feature.icon}
        </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Feed */}
      <section className="pb-8">
        <EventFeed />
      </section>
      
      <Navigation />
    </div>
  );
};

export default Index;