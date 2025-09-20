-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  creator_verified BOOLEAN DEFAULT false,
  phone_number TEXT,
  preferred_payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Update Event table structure (correct case)
ALTER TABLE public."Event" 
  DROP COLUMN IF EXISTS name,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS location,
  DROP COLUMN IF EXISTS "time",
  DROP COLUMN IF EXISTS ticket_type;

ALTER TABLE public."Event" ADD COLUMN title TEXT NOT NULL DEFAULT '';
ALTER TABLE public."Event" ADD COLUMN description TEXT;
ALTER TABLE public."Event" ADD COLUMN location TEXT;
ALTER TABLE public."Event" ADD COLUMN start_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public."Event" ADD COLUMN end_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public."Event" ADD COLUMN creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public."Event" ADD COLUMN cover_image_url TEXT;
ALTER TABLE public."Event" ADD COLUMN video_url TEXT;
ALTER TABLE public."Event" ADD COLUMN status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled'));
ALTER TABLE public."Event" ADD COLUMN category TEXT;
ALTER TABLE public."Event" ADD COLUMN max_attendees INTEGER;
ALTER TABLE public."Event" ADD COLUMN is_free BOOLEAN DEFAULT false;
ALTER TABLE public."Event" ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create ticket types table
CREATE TABLE public.ticket_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id BIGINT REFERENCES public."Event"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  quantity_available INTEGER,
  quantity_sold INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id BIGINT REFERENCES public."Event"(id) ON DELETE CASCADE,
  ticket_type_id UUID REFERENCES public.ticket_types(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  qr_code TEXT UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'cancelled', 'refunded')),
  purchase_amount DECIMAL(10,2),
  payment_id TEXT,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_method TEXT NOT NULL,
  payment_provider TEXT NOT NULL,
  provider_payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tips table
CREATE TABLE public.tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id BIGINT REFERENCES public."Event"(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tipper_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  message TEXT,
  payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payouts table
CREATE TABLE public.payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payout_method TEXT,
  account_details JSONB,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public."Event" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for Event table
CREATE POLICY "Public events are viewable by everyone" ON public."Event"
  FOR SELECT USING (status = 'published');

CREATE POLICY "Creators can view their own events" ON public."Event"
  FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Creators can create events" ON public."Event"
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their own events" ON public."Event"
  FOR UPDATE USING (auth.uid() = creator_id);

-- Create RLS policies for ticket_types
CREATE POLICY "Public ticket types are viewable by everyone" ON public.ticket_types
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public."Event" 
      WHERE id = ticket_types.event_id AND status = 'published'
    )
  );

CREATE POLICY "Creators can manage their event ticket types" ON public.ticket_types
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public."Event" 
      WHERE id = ticket_types.event_id AND creator_id = auth.uid()
    )
  );

-- Create RLS policies for tickets
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Event creators can view tickets for their events" ON public.tickets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public."Event" 
      WHERE id = tickets.event_id AND creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can purchase tickets" ON public.tickets
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tickets 
      WHERE id = payments.ticket_id AND buyer_id = auth.uid()
    )
  );

-- Create RLS policies for tips
CREATE POLICY "Users can view tips they gave" ON public.tips
  FOR SELECT USING (auth.uid() = tipper_id);

CREATE POLICY "Creators can view tips they received" ON public.tips
  FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can create tips" ON public.tips
  FOR INSERT WITH CHECK (auth.uid() = tipper_id);

-- Create RLS policies for payouts
CREATE POLICY "Creators can view their own payouts" ON public.payouts
  FOR SELECT USING (auth.uid() = creator_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public."Event"
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for event media
INSERT INTO storage.buckets (id, name, public) VALUES ('event-media', 'event-media', true);

-- Create storage policies for event media
CREATE POLICY "Event media is publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-media');

CREATE POLICY "Authenticated users can upload event media" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'event-media' 
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own event media" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'event-media' 
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own event media" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'event-media' 
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::text
  );