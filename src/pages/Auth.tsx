import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Eye, EyeOff, ArrowLeft, Users, Zap } from "lucide-react";

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'guest' | 'creator'>('guest');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          user_type: userType,
        }
      }
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Please check your email to confirm your account.",
      });
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-6 bg-white/80 backdrop-blur-sm border-border/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-warm border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center">
            <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto shadow-glow">
              {userType === 'creator' ? (
                <Zap className="w-8 h-8 text-white" />
              ) : (
                <Users className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {authMode === 'login' ? 'Welcome Back' : 'Join EventHub'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {authMode === 'login' 
                  ? `Sign in as a ${userType === 'creator' ? 'Creator' : 'Guest'}`
                  : `Create your ${userType === 'creator' ? 'Creator' : 'Guest'} account`
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <Tabs 
              value={userType} 
              onValueChange={(value) => setUserType(value as 'guest' | 'creator')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="guest" className="data-[state=active]:bg-white">
                  <Users className="w-4 h-4 mr-2" />
                  Guest
                </TabsTrigger>
                <TabsTrigger value="creator" className="data-[state=active]:bg-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Creator
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guest" className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Discover and attend amazing events across Africa
                </p>
              </TabsContent>
              
              <TabsContent value="creator" className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Create events, build your audience, and monetize your content
                </p>
              </TabsContent>
            </Tabs>

            {/* Auth Form */}
            <form onSubmit={authMode === 'login' ? handleSignIn : handleSignUp} className="space-y-4">
              {authMode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-white/80"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/80"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/80 pr-10"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-transparent border-0 hover:bg-muted/50"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>

              {authMode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white/80"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-sunset hover:opacity-90 text-white font-semibold py-2 shadow-warm"
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  authMode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Switch between Login/Signup */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-2">
                {authMode === 'login' 
                  ? "Don't have an account?" 
                  : "Already have an account?"
                }
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login');
                  // Reset form
                  setEmail('');
                  setPassword('');
                  setFullName('');
                  setConfirmPassword('');
                }}
                className="bg-white/60 hover:bg-white/80"
              >
                {authMode === 'login' ? 'Create Account' : 'Sign In Instead'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;